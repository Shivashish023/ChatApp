import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
function Home() {
  return (
    
    <div className='flex h-screen'>
       
                <Sidebar />
                <MessageContainer />
            </div>
   
  )
}

export default Home