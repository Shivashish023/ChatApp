import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup } from 'react-icons/hi2';

function OtherUsers() {
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user)
  if (!otherUsers) return null;

  if (otherUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-slate-400">
          <HiOutlineUserGroup className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-300">No users found</p>
      </div>
    );
  }

  return (
    <div className="py-1">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  )
}

export default OtherUsers
