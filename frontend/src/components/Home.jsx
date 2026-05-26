import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'

function Home() {
  const { selectedUser, selectedGroup } = useSelector(store => store.user);
  const hasSelection = selectedUser !== null || selectedGroup !== null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <div
        className={`w-full border-r border-slate-800/50 md:w-[320px] lg:w-[360px] ${
          hasSelection ? "hidden md:flex md:flex-col" : "flex flex-col"
        }`}
      >
        <Sidebar />
      </div>
      <div className={`min-w-0 flex-1 ${hasSelection ? "flex flex-col" : "hidden md:flex md:flex-col"}`}>
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home
