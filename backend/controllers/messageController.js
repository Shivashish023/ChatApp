import { Message } from "../modals/messageModel.js";
import { Conversation } from "../modals/roomModel.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const sendMessage= async(req,res)=>{
    try{
       let senderId=req.id;
       let receiverId=req.params.id;
       const {message, conversationId} =req.body;
       
       let gotConversation;
       let newMessage;

       if (conversationId) {
           gotConversation = await Conversation.findById(conversationId);
           
           if (!gotConversation || !gotConversation.isGroup) {
               return res.status(404).json({
                   success: false,
                   message: "Group not found"
               });
           }

           const isParticipant = gotConversation.participants.some(
               p => p.toString() === senderId.toString()
           );

           if (!isParticipant) {
               return res.status(403).json({
                   success: false,
                   message: "You are not a member of this group"
               });
           }

           newMessage = await Message.create({
               senderId,
               conversationId,
               message,
               messageType: "text"
           });
       } else {
           gotConversation = await Conversation.findOne({
               participants:{$all:[senderId,receiverId]},
               isGroup: false
           });
           
           if(!gotConversation){
               gotConversation = await Conversation.create({
                   participants:[senderId,receiverId],
                   isGroup: false
               });
           }

           newMessage = await Message.create({
               senderId,
               receiverId,
               conversationId: gotConversation._id,
               message,
               messageType: "text"
           });
       }

       if(newMessage){
           gotConversation.messages.push(newMessage._id);
       }
       await Promise.all([gotConversation.save(),newMessage.save()]);

       await newMessage.populate("senderId", "name username profilePhoto");

       if (conversationId) {
           gotConversation.participants.forEach(participantId => {
               const socketId = getReceiverSocketId(participantId.toString());
               if (socketId) {
                   io.to(socketId).emit("newMessage", newMessage);
               }
           });
       } else {
           const receiverSocketId = getReceiverSocketId(receiverId);
           if(receiverSocketId){
               io.to(receiverSocketId).emit("newMessage", newMessage);
           }
       }

       return res.status(201).json({
           success: true,
           newMessage
       });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error sending message"
        });
    }
}

export const getMessage= async (req,res)=>{
    try{
        const senderId=req.id;
        const receiverId=req.params.id;
        const { type } = req.query;

        let conversation;

        if (type === "group") {
            conversation = await Conversation.findOne({
                _id: receiverId,
                isGroup: true,
                participants: senderId
            }).populate({
                path: "messages",
                populate: {
                    path: "senderId",
                    select: "name username profilePhoto"
                }
            });

            if (!conversation) {
                return res.status(404).json({
                    success: false,
                    message: "Group not found or you are not a member"
                });
            }
        } else {
            conversation = await Conversation.findOne({
                participants:{$all:[senderId,receiverId]},
                isGroup: false
            }).populate({
                path: "messages",
                populate: {
                    path: "senderId",
                    select: "name username profilePhoto"
                }
            });
        }

        return res.status(200).json(conversation?.messages || []);

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching messages"
        });
    }
}