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
  const {selectedUser}=useSelector(store=>store.user)
  const {messages}=useSelector(store=>store.message);

  
  const submitHandler=async(e)=>{
    e.preventDefault();
    if (!selectedUser ) {
      console.error("No user selected");
      return; // Exit the function if no user is selected
    }
   try{
    const res=await axios.post(`${BASE_URL}/api/message/send/${selectedUser?._id}`,{message},
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
    <div className="mt-4 bg-gray-800 p-4 shadow-lg">
    <form className="flex" onSubmit={submitHandler}>
    <label className="bg-white p-2 rounded-l-lg flex items-center transition-colors duration-300 cursor-pointer">
      <MdAttachFile className='text-gray-600 hover:scale-125 transition-transform duration-300 size-5' />
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" // Hide the default file input
        onChange={(e) => {
          // Handle file selection
          const file = e.target.files[0];
          if (file) {
            console.log(file); // You can handle the file as needed
          }
        }} 
      />
    </label>
          
        <input
            type="text"
            placeholder="Type a message..."
            className="text-[17px] flex-grow p-2 border bg-white rounded-r-lg focus:outline-none text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button 
            type="submit" 
            className="bg-gray-800 p-2 rounded-r-lg flex items-center transition-colors duration-300"
        >
            <IoSend className='text-white hover:scale-125 transition-transform duration-300' />
        </button>
    </form>
</div>
  );
}

export default SendInput;