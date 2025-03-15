import mongoose from "mongoose";

const connectDB= async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
    }).then(()=>{
        console.log("database connected");
    }).catch((error)=>{
        console.error(error);
    })
};
export default connectDB;