import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
function Message({message}) {
  const scroll=useRef();
  const {authUser,selectedUser}=useSelector(store=>store.user);
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
    const messageTime = format(new Date(message.createdAt), 'hh:mm a');
  return (
    <div ref={scroll} className={`chat p-2 ${authUser?._id===message?.senderId ?`chat-end `:` chat-start `}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full"> 
      <img
        alt="Tailwind CSS chat bubble component"
        src={message.senderId===authUser?._id ? authUser?.profilePhoto:selectedUser?.profilePhoto} />
    </div>
  </div>
  <div className="chat-header">
   
    <time className="text-xs opacity-50">{messageTime}</time>
  </div>
  <div className={`chat-bubble  ${authUser ?._id === message?.senderId ? '  bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>{message?.message}</div>
  
</div>
  )
}

export default Message