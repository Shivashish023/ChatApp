import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
function Message({message}) {
  const scroll=useRef();
  const {authUser,selectedUser,chatType}=useSelector(store=>store.user);
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
    const messageTime = format(new Date(message.createdAt), 'hh:mm a');
    const isSentByMe = authUser?._id === message?.senderId?._id || authUser?._id === message?.senderId;
    const senderName = message?.senderId?.name || (isSentByMe ? authUser?.name : selectedUser?.name);
    const senderPhoto = message?.senderId?.profilePhoto || (isSentByMe ? authUser?.profilePhoto : selectedUser?.profilePhoto);
    
  return (
    <div ref={scroll} className={`chat p-1 sm:p-2 ${isSentByMe ?`chat-end `:` chat-start `}`}>
      <div className="chat-image avatar">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"> 
          <img
            alt="User avatar"
            src={senderPhoto}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="chat-header">
        {chatType === "group" && !isSentByMe && (
          <span className="text-xs font-semibold mr-2">{senderName}</span>
        )}
        <time className="text-xs opacity-50">{messageTime}</time>
      </div>
      <div className={`chat-bubble text-sm sm:text-base break-words max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${isSentByMe ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
        {message?.message}
      </div>
    </div>
  )
}

export default Message