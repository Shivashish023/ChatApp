import React, { useEffect } from 'react';
import SendInput from './sendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSelectedUser } from '../redux/userSlicer';

function MessageContainer() {
  const {selectedUser,authUser,onlineUsers}=useSelector(store=>store.user) 
  const dispatch=useDispatch();
  useEffect(()=>{
    return ()=>dispatch(setSelectedUser(null));
  },[]);
 
  const isOnline=onlineUsers?.includes(selectedUser?._id);
  return (
    <>
    {selectedUser !== null ? (
      <div className="flex flex-col h-screen pl-0 pr-0 bg-gray-200 w-full">
          <div className="flex p-3 items-center">
              <div className={`avatar ${isOnline?`online`:``}`}>
              <div className="w-12 rounded-full overflow-hidden">
                  <img src={selectedUser ?.profilePhoto} alt="User  Avatar" className="w-full h-full object-cover" />
              </div>
              </div>
              <div className="pt-4 ml-4">
                  <h2 className="text-3xl font-bold mb-4 text-black">{selectedUser ?.name}</h2>
              </div>
          </div>
  
          <div className="flex-grow overflow-auto ml-4">
              <Messages />
          </div>
  
          <SendInput />
      </div>
  ) : (
    <div className="flex w-full flex-col items-center justify-center h-screen bg-gray-800">
    <h1 className="text-white text-5xl font-bold">Hi, {authUser?.name}</h1>
    <p className="text-gray-400 text-3xl mt-2">Welcome back!</p>
</div>
  )}</>
  );
}

export default MessageContainer;