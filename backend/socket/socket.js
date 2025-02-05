import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
const app = express();
const server = createServer(app); 

const io = new Server(server, {
    cors: {
        origin: ['https://chat-app-zeta-self.vercel.app'], 
        methods: ['GET', 'POST'],
    },
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap={};

io.on('connection', (socket) => {
    
     const userId= socket.handshake.query.userId;
     if(userId){
        userSocketMap[userId]=socket.id;
     }

     io.emit("getOnlineUsers",Object.keys(userSocketMap));

     socket.on("disconnect",()=>{
       delete userSocketMap[userId];
       io.emit("getOnlineUsers",Object.keys(userSocketMap));
     })
    });
    
    export {app,io,server}
