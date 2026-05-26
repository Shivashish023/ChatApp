import React from 'react'
import GroupItem from './GroupItem'
import useGetGroups from '../hooks/useGetGroups'
import { useSelector } from 'react-redux';
import { IoPeopleOutline } from 'react-icons/io5';

function GroupList() {
  useGetGroups();
  const { userGroups } = useSelector(store => store.user)

  if (!userGroups || userGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-slate-400">
          <IoPeopleOutline className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-300">No groups yet</p>
        <p className="text-xs text-slate-500">Create one to chat with multiple people</p>
      </div>
    );
  }

  return (
    <div className="py-1">
      {userGroups.map((group) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </div>
  )
}

export default GroupList
