import React from 'react'
import GroupItem from './GroupItem'
import useGetGroups from '../hooks/useGetGroups'
import { useSelector } from 'react-redux';

function GroupList() {
  useGetGroups();
  const {userGroups}=useSelector(store=>store.user)
  if(!userGroups || userGroups.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 text-sm">
        No groups yet. Create one to get started!
      </div>
    );
  }
  return (
    <div>
      {userGroups?.map((group)=>{
        return (
          <GroupItem key={group._id} group={group}/>
        )
      })}
    </div>
  )
}

export default GroupList

