import React, { useEffect } from 'react';
import SendInput from './sendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlicer';
import { IoArrowBackSharp } from "react-icons/io5";

function MessageContainer() {
  const {selectedUser, authUser, onlineUsers} = useSelector(store => store.user) 
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);
 
  const isOnline = onlineUsers?.includes(selectedUser?._id);
  
  const handleBack = () => {
    dispatch(setSelectedUser(null));
  };

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col h-screen bg-gray-200 w-full">
          {/* Header with back button for mobile */}
          <div className="flex p-2 sm:p-3 items-center bg-white shadow-sm">
            <button 
              onClick={handleBack}
              className="md:hidden mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Back to users"
            >
              <IoArrowBackSharp className="text-2xl text-gray-700" />
            </button>
            <div className={`avatar ${isOnline ? `online` : ``}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                <img 
                  src={selectedUser?.profilePhoto} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="ml-2 sm:ml-4">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">
                {selectedUser?.name}
              </h2>
              {isOnline && (
                <p className="text-xs sm:text-sm text-green-600">Online</p>
              )}
            </div>
          </div>
 
          <div className="flex-grow overflow-hidden px-2 sm:px-4 py-2">
            <Messages />
          </div>
 
          <SendInput />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center h-screen bg-gray-800 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            Hi, {authUser?.name}
          </h1>
          <p className="text-gray-400 text-xl sm:text-2xl md:text-3xl mt-2 text-center">
            Welcome back!
          </p>
        </div>
      )}
    </>
  );
}

export default MessageContainer;