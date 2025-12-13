import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
function Home() {
  const {selectedUser}=useSelector(store=>store.user);
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile when user is selected, visible on desktop */}
      <div className={`w-full md:w-1/4 lg:w-1/5 bg-gray-800 text-white ${selectedUser ? "hidden md:block" : "block"}`}>
        <Sidebar />
      </div>
      {/* Message Container - Full width on mobile, flex-grow on desktop */}
      <div className={`flex-grow bg-gray-200 ${selectedUser ? "block" : "hidden md:block"}`}>
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home