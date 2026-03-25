import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlicer';
function OtherUser({user}) {
    const dispatch=useDispatch();
    const {selectedUser,onlineUsers,authUser}=useSelector(store=>store.user); 
        const isOnline=onlineUsers.includes(user._id)
    const [avatarBroken, setAvatarBroken] = useState(false);
    
    useEffect(() => {
      setAvatarBroken(false);
    }, [user?._id]);
    
    const selectedUserHandler=(user)=>{ 
        dispatch(setSelectedUser(user));
    }
    const isSelected= selectedUser && selectedUser._id===user._id;
    const senderInitial = (user?.name?.charAt(0) || "U").toUpperCase();
  return (
    <div 
      onClick={() => selectedUserHandler(user)} 
      className={`flex items-center hover:bg-gray-700 active:bg-gray-600 ${isSelected ? `bg-gray-700` : ``} p-2 sm:p-3 cursor-pointer transition-colors duration-200`}
    >
      <div className={`avatar ${isOnline ? `online` : ``} mr-2 sm:mr-3 flex-shrink-0`}>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ${
            user?.profilePhoto && !avatarBroken ? "" : "bg-gray-600 flex items-center justify-center"
          }`}
        >
          {user?.profilePhoto && !avatarBroken ? (
            <img
              src={user.profilePhoto}
              alt={`${user.name} avatar`}
              className="w-full h-full object-cover"
              onError={() => setAvatarBroken(true)}
            />
          ) : (
            <span className="text-white text-lg sm:text-xl font-bold">{senderInitial}</span>
          )}
        </div>
      </div>
      <div className="text-sm sm:text-base truncate flex-1">
        {user.name}
      </div>
    </div>
  )
}

export default OtherUser