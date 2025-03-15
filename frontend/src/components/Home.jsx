import React from 'react'
import Sidebar from './Sidebar'
import { IoArrowBackSharp } from "react-icons/io5";
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
function Home() {
  const {selectedUser}=useSelector(store=>store.user);
  return (
    
    <div className="flex sm:flex-col md:flex-row h-screen">
      
    <div className={`w-full md:w-1/4 lg:w-1/5 bg-gray-800 text-white ${selectedUser? "hidden sm:block":'block'}`}>
        <Sidebar />
    </div>
    <div className={`flex-grow bg-gray-200  ${selectedUser? "block":'hidden sm:block'}`}>
        <MessageContainer />
    </div>
</div>
   
   
  )
}

export default Home