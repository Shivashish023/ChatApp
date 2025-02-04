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
    <div className='flex flex-col mt-3 mr-3 p-4 bg-white border border-gray-300 rounded-lg h-full max-h-[calc(100vh-180px)] overflow-y-auto'>
    {messages?.map((message)=>{
      return (
        <Message key={message._id} message={message}/>
      )
    })}
  </div>
  );
}

export default Messages;