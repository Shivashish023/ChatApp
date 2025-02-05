import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

function SendInput() {
  const[message,setMessage]=useState("")
  const dispatch=useDispatch();
  const {selectedUser}=useSelector(store=>store.user)
  const {messages}=useSelector(store=>store.message);

  
  const submitHandler=async(e)=>{
    e.preventDefault();
    if (!selectedUser ) {
      console.error("No user selected");
      return; // Exit the function if no user is selected
    }
   try{
    const res=await axios.post(`http://localhost:3000/api/message/send/${selectedUser?._id}`,{message},
      {
        withCredentials:true,
      });
      console.log(res);
      dispatch(setMessages([...messages,res?.data?.newMessage]))
    
   }
   catch(error){
    console.log(error);
   }
   setMessage("");
  }
  return (
    <div className="mt-4 bg-gray-800 p-4 pr-10 shadow-lg">
      <form className="flex" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type a message..."
          className="text-[17px] w-full p-2 border bg-white rounded-l-lg focus:outline-none text-black"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-white p-2 rounded-r-lg flex items-center transition-colors duration-300"
        >
          <IoSend className='text-gray-600 hover:scale-125 transition-transform duration-300' />
        </button>
      </form>
    </div>
  );
}

export default SendInput;