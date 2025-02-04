import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import { useEffect } from 'react';

function usegetRealTimeMessage() {
  const {socket}=useSelector(store=>store.socket);
  const {messages}=useSelector(store=>store.message);
  const dispatch=useDispatch();
  useEffect(() => {
    socket?.on("newMessage",(newMessage)=>{
        dispatch(setMessages([...messages,newMessage]))
    })
  }, [socket,setMessages,messages]);
  
}

export default usegetRealTimeMessage