import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext.jsx';

function usegetRealTimeMessage() {
  const socket = useSocket();
  const {messages}=useSelector(store=>store.message);
  const {selectedUser, selectedGroup, chatType}=useSelector(store=>store.user);
  const dispatch=useDispatch();
  
  useEffect(() => {
    const handleNewMessage=(newMessage)=>{
      const selectedUserId = selectedUser?._id?.toString();
      const selectedGroupId = selectedGroup?._id?.toString();

      if(chatType==="group" && newMessage?.conversationId?.toString() === selectedGroupId){
        dispatch(setMessages([...messages, newMessage]));
        return;
      }

      if(chatType==="user"){
        const senderId = newMessage?.senderId?._id ?? newMessage?.senderId;
        const senderIdStr = senderId?.toString?.() ?? senderId;
        const receiverIdStr = newMessage?.receiverId?.toString?.() ?? newMessage?.receiverId;

        if(senderIdStr === selectedUserId || receiverIdStr === selectedUserId){
          dispatch(setMessages([...messages, newMessage]));
        }
      }
    }
    
    socket?.on("newMessage",handleNewMessage);
    
    return ()=>{
      socket?.off("newMessage",handleNewMessage);
    }
  }, [socket, messages, selectedUser, selectedGroup, chatType, dispatch]);
  
}

export default usegetRealTimeMessage