import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import usegetRealTimeMessage from '../hooks/usegetRealTimeMessage';
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

function Messages() {
  useGetMessages();
  usegetRealTimeMessage();
  const { messages } = useSelector(store => store.message);
  if (!messages) return null;

  return (
    <div className="chat-messages scrollbar-thin flex-1">
      {messages?.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <HiOutlineChatBubbleOvalLeft className="h-7 w-7" />
          </div>
          <p className="text-sm font-medium text-slate-600">No messages yet</p>
          <p className="text-xs text-slate-400">Say hello to start the conversation</p>
        </div>
      ) : (
        <div className="space-y-1">
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
