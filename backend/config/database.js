import mongoose from "mongoose";

const connectDB= async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000, 
        socketTimeoutMS: 20000, 
    }).then(()=>{
        console.log("database connected");
    }).catch((error)=>{
        console.error(error);
    })
};
export default connectDB;