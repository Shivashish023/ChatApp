import { User } from "../modals/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export  const register= async(req,res)=>{
    try{
        const {name,username,password,gender}=req.body;
        if(!name || !username ||!password || !gender){
            res.status(401).json({message:"All fields are required"});
        }
       
        const user= await User.findOne({username});
        if(user){
            return res.status(401).json({success:false,message:"Username already exists,Try a different one"});
         }
         const hashedPassword=await bcrypt.hash(password,10);
const maleAvatar=`https://avatar.iran.liara.run/public/boy?username=${username}`;
const femaleAvatar=`https://avatar.iran.liara.run/public/girl?username=${username}`
         await User.create({
            name,
            username,
            password:hashedPassword,
            profilePhoto:gender === "male" ? maleAvatar:femaleAvatar,
            gender
         }) 
         return res.status(201).json({ success:true,message: "User  registered successfully" });
    }
    catch(error){
        console.log(error);
    }
}

export const login= async(req,res)=>{
   try{
    const {username,password}=req.body;
    if(!username || !password){
        res.status(401).json({message:"All fields required"});
    }
    const user=await User.findOne({username});
  if(!user){
    return res.status(401).json({
        message:"Username not registered",
        success:false
    });
  }
 const isPassCorrect= await bcrypt.compare(password,user.password);
 if(!isPassCorrect){
    return res.status(401).json({
        message:"Incorrect Password",
        success:false
    });
 }
 const tokenData={
    userId:user._id
 }
 const token= jwt.sign(tokenData,process.env.JWT_SECRETKEY,{expiresIn:'1d'});
 return res.status(201).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict' }).json({
     _id:user._id,
    username:user.username,
    name:user.name,
    profilePhoto:user.profilePhoto ,
  success:true
 })
   }
   catch(error){
    console.log(error);
   }
}

export const logout= (req,res)=>{
    try{
        return res.status(201).cookie("token","",{maxAge:0}).json({
            message:"User logged  out succesfully"
        })
    }
    catch(error){
        console.log(error);
    }
};

export const getOtherUsers=async(req,res)=>{
    try{
        const loggedInUserId=req.id;
        const otherUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }catch(error){
        console.log(error);
    }
}