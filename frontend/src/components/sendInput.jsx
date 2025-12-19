import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';
import { MdAttachFile } from "react-icons/md";
function SendInput() {
  const[message,setMessage]=useState("")
  const dispatch=useDispatch();
  const {selectedUser, selectedGroup, chatType}=useSelector(store=>store.user)
  const {messages}=useSelector(store=>store.message);

  
  const submitHandler=async(e)=>{
    e.preventDefault();
    if (!selectedUser && !selectedGroup) {
      console.error("No user or group selected");
      return;
    }
    if (!message.trim()) {
      return;
    }
   try{
    let res;
    if(chatType === "group"){
      // Send group message
      res = await axios.post(
        `${BASE_URL}/api/message/send/${selectedGroup?._id}`,
        {message, conversationId: selectedGroup?._id},
        { withCredentials: true }
      );
    } else {
      // Send 1-to-1 message
      res = await axios.post(
        `${BASE_URL}/api/message/send/${selectedUser?._id}`,
        {message},
        { withCredentials: true }
      );
    }
      console.log(res);
      if(res?.data?.success && res?.data?.newMessage){
        dispatch(setMessages([...messages,res.data.newMessage]))
      }
   }
   catch(error){
    console.log(error);
   }
   setMessage("");
  }
  return (
    <div className="bg-gray-800 p-2 sm:p-4 shadow-lg">
      <form className="flex gap-1 sm:gap-0" onSubmit={submitHandler}>
        <label className="bg-white p-2 sm:p-2.5 rounded-l-lg flex items-center transition-colors duration-300 cursor-pointer active:bg-gray-50 flex-shrink-0">
          <MdAttachFile className='text-gray-600 hover:scale-125 active:scale-100 transition-transform duration-300 size-4 sm:size-5' />
          <input 
            type="file" 
            accept="image/*" 
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                console.log(file);
              }
            }} 
          />
        </label>
              
        <input
          type="text"
          placeholder="Type a message..."
          className="text-sm sm:text-base flex-grow p-2 sm:p-2.5 border bg-white focus:outline-none text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-gray-800 p-2 sm:p-2.5 rounded-r-lg flex items-center justify-center transition-colors duration-300 active:bg-gray-700 flex-shrink-0 min-w-[44px] sm:min-w-[48px]"
          aria-label="Send message"
        >
          <IoSend className='text-white hover:scale-125 active:scale-100 transition-transform duration-300 size-5 sm:size-6' />
        </button>
      </form>
    </div>
  );
}

export default SendInput;