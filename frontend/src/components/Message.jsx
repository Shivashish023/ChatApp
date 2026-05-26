import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

function Message({ message }) {
  const scroll = useRef();
  const { authUser, selectedUser, chatType } = useSelector(store => store.user);
  const [avatarBroken, setAvatarBroken] = useState(false);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  useEffect(() => {
    setAvatarBroken(false);
  }, [message?._id, message?.senderId?._id, message?.senderId]);

  const messageTime = format(new Date(message.createdAt), 'hh:mm a');
  const isSentByMe = authUser?._id === message?.senderId?._id || authUser?._id === message?.senderId;
  const senderName = message?.senderId?.name || (isSentByMe ? authUser?.name : selectedUser?.name);
  const senderPhoto = message?.senderId?.profilePhoto || (isSentByMe ? authUser?.profilePhoto : selectedUser?.profilePhoto);
  const senderInitial = (senderName?.charAt(0) || "U").toUpperCase();
  const showPhoto = senderPhoto && !avatarBroken;

  return (
    <div
      ref={scroll}
      className={`flex gap-2 py-1.5 ${isSentByMe ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 sm:h-9 sm:w-9">
        {showPhoto ? (
          <img
            alt=""
            src={senderPhoto}
            className="h-full w-full object-cover"
            onError={() => setAvatarBroken(true)}
          />
        ) : (
          <span className={`text-xs font-bold ${isSentByMe ? "text-chap-600" : "text-slate-600"}`}>
            {senderInitial}
          </span>
        )}
      </div>

      <div className={`flex max-w-[75%] flex-col sm:max-w-[65%] ${isSentByMe ? "items-end" : "items-start"}`}>
        <div className={`mb-0.5 flex items-center gap-2 ${isSentByMe ? "flex-row-reverse" : ""}`}>
          {chatType === "group" && !isSentByMe && (
            <span className="text-xs font-semibold text-chap-700">{senderName}</span>
          )}
          <time className="text-[10px] text-slate-400">{messageTime}</time>
        </div>
        <div
          className={`px-3.5 py-2 text-sm leading-relaxed sm:text-[15px] ${
            isSentByMe ? "bubble-sent" : "bubble-received"
          }`}
        >
          {message?.message}
        </div>
      </div>
    </div>
  )
}

export default Message
