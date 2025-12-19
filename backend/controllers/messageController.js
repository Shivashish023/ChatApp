import { Message } from "../modals/messageModel.js";
import { Conversation } from "../modals/roomModel.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

// Send message (supports both 1-to-1 and group)
export const sendMessage= async(req,res)=>{
    try{
       let senderId=req.id;
       let receiverId=req.params.id;
       const {message, conversationId} =req.body;
       
       let gotConversation;
       let newMessage;

       // Check if it's a group message (conversationId provided) or 1-to-1 (receiverId)
       if (conversationId) {
           // Group message
           gotConversation = await Conversation.findById(conversationId);
           
           if (!gotConversation || !gotConversation.isGroup) {
               return res.status(404).json({
                   success: false,
                   message: "Group not found"
               });
           }

           // Verify sender is a participant
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
           // 1-to-1 message (existing logic)
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

       // Populate sender for response
       await newMessage.populate("senderId", "name username profilePhoto");

       // Emit Socket.IO event
       if (conversationId) {
           // Group message - emit to all participants
           gotConversation.participants.forEach(participantId => {
               const socketId = getReceiverSocketId(participantId.toString());
               if (socketId) {
                   io.to(socketId).emit("newMessage", newMessage);
               }
           });
       } else {
           // 1-to-1 message - emit to receiver only
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

// Get messages (supports both 1-to-1 and group)
export const getMessage= async (req,res)=>{
    try{
        const senderId=req.id;
        const receiverId=req.params.id; // Can be userId or conversationId
        const { type } = req.query; // "user" or "group"

        let conversation;

        if (type === "group") {
            // Group messages
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
            // 1-to-1 messages (existing logic)
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