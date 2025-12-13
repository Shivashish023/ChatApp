import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import usegetRealTimeMessage from '../hooks/usegetRealTimeMessage';

function Messages() {
  useGetMessages();
usegetRealTimeMessage();
  const {messages}=useSelector(store=>store.message); 
  if(!messages) return;
  console.log(messages);
  return (
    <div className='flex flex-col p-2 sm:p-4 bg-white border border-gray-300 rounded-lg h-full overflow-y-auto'>
      {messages?.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm sm:text-base">
          No messages yet. Start a conversation!
        </div>
      ) : (
        messages?.map((message) => {
          return (
            <Message key={message._id} message={message}/>
          )
        })
      )}
    </div>
  );
}

export default Messages;