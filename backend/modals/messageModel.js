import mongoose from "mongoose"

const messageModel= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:false
    },
    message:{
        type:String,
        required:true
    },
    messageType:{
        type:String,
        enum:["text","image","file"],
        default:"text"
    }
},{timestamps:true});
export const Message= mongoose.model("Message",messageModel);