import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js"; 

dotenv.config();

const corsOptions = {
    origin: ['https://chat-app-zeta-self.vercel.app'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000; 


app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

app.get("/",(req,res)=>{
  res.json("Server is running");
})
server.listen(port, () => {
    connectDB(); 
    console.log(`Server listening on port ${port} ...`);
});