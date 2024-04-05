import React from 'react'
import Sidebar from './sidebar/Sidebar'
import MessageContainer from './messages/MessageContainer'
import Navbar from '../../pages/user/components/NavBar'

export const ChatComponent = () => {
  
  return (
    <>
      <Navbar/>
    <div className='flex items-center justify-center h-screen'>

      <div className=" flex text-white mt-16  sm:h-[450px] md:h-[700px] w-2/3 rounded-lg overflow-hidden bg-slate-700 bg-clip-padding">
        <Sidebar />
        <MessageContainer />
      </div>

    </div>
    </>
  )
}

