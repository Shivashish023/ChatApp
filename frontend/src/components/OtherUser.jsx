import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlicer';
function OtherUser({user}) {
    const dispatch=useDispatch();
    const {selectedUser,onlineUsers,authUser}=useSelector(store=>store.user); 
        const isOnline=onlineUsers.includes(user._id)
    
    const selectedUserHandler=(user)=>{ 
        dispatch(setSelectedUser(user));
    }
    const isSelected= selectedUser && selectedUser._id===user._id;
  return (
    <>
        <div onClick={ () => selectedUserHandler(user)} className={`flex items-center  hover:bg-gray-700 ${isSelected?`bg-gray-700`:``} p-3  cursor-pointer`}>
    <div className={`avatar ${isOnline?` online`:``} mr-2`}>
        <div className='w-12 rounded-full'>
            <img src={user.profilePhoto} alt="User  Avatar" />
        </div>
    </div>
    <div>
     {user.name}
    </div>
</div>
    
    </>
  )
}

export default OtherUser