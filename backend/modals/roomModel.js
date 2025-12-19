import mongoose from "mongoose";

const roomModel= new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }],
    isGroup:{
        type:Boolean,
        default:false
    },
    groupName:{
        type:String,
        default:""
    },
    groupDescription:{
        type:String,
        default:""
    },
    groupPhoto:{
        type:String,
        default:""
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});
export const Conversation=mongoose.model("Conversation",roomModel);