import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import { useEffect } from 'react';

function usegetRealTimeMessage() {
  const {socket}=useSelector(store=>store.socket);
  const {messages}=useSelector(store=>store.message);
  const {selectedUser, selectedGroup, chatType}=useSelector(store=>store.user);
  const dispatch=useDispatch();
  
  useEffect(() => {
    const handleNewMessage=(newMessage)=>{
      // Check if message is for current chat
      if(chatType==="group" && newMessage.conversationId === selectedGroup?._id){
        dispatch(setMessages([...messages,newMessage]));
      } else if(chatType==="user" && (newMessage.receiverId === selectedUser?._id || newMessage.senderId === selectedUser?._id)){
        dispatch(setMessages([...messages,newMessage]));
      }
    }
    
    socket?.on("newMessage",handleNewMessage);
    
    return ()=>{
      socket?.off("newMessage",handleNewMessage);
    }
  }, [socket, messages, selectedUser, selectedGroup, chatType, dispatch]);
  
}

export default usegetRealTimeMessage