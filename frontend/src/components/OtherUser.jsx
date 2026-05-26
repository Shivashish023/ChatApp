import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlicer';

function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers.includes(user._id)
  const [avatarBroken, setAvatarBroken] = useState(false);

  useEffect(() => {
    setAvatarBroken(false);
  }, [user?._id]);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  }
  const isSelected = selectedUser && selectedUser._id === user._id;
  const senderInitial = (user?.name?.charAt(0) || "U").toUpperCase();

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`list-item m-1 ${isSelected ? "list-item-selected" : ""}`}
    >
      <div className="relative shrink-0">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-700">
          {user?.profilePhoto && !avatarBroken ? (
            <img
              src={user.profilePhoto}
              alt=""
              className="h-full w-full object-cover"
              onError={() => setAvatarBroken(true)}
            />
          ) : (
            <span className="text-sm font-bold text-white">{senderInitial}</span>
          )}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{user.name}</p>
        <p className="text-xs text-slate-400">{isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  )
}

export default OtherUser
