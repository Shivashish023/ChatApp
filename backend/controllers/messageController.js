import { Message } from "../modals/messageModel.js";
import { Conversation } from "../modals/roomModel.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const sendMessage= async(req,res)=>{
    try{
       let senderId=req.id;
       let  receiverId=req.params.id;
        const {message} =req.body;
        let gotConversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        });
        if(!gotConversation){
            gotConversation= await Conversation.create({
                participants:[senderId,receiverId]
             })
        };
        const newMessage=await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        }
        await Promise.all([gotConversation.save(),newMessage.save()]);


        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        return res.status(201).json({
            newMessage
        });
    }
    catch(error){
        console.log(error);
    }
}

export const getMessage= async (req,res)=>{
    try{
        const senderId=req.id;
        const receiverId=req.params.id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages");
        return res.status(200).json(conversation?.messages);

    }
    catch(error){
        console.log(error);
    }
}