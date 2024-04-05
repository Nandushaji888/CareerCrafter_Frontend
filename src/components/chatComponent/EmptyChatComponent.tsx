import React, { useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import Navbar from '../../pages/user/components/NavBar'
import MessageEmptyContainer from './messages/MessageEmptyContainer'
import useConversation from '../../utils/zustand/userConversation'

export const EmptyChatComponent = () => {
  const { setSelectedConversation } = useConversation()
  useEffect(() => {
    setSelectedConversation(null)
  }, [])
  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center h-screen'>

        <div className=" flex text-white mt-16  sm:h-[450px] md:h-[700px] w-2/3 rounded-lg overflow-hidden bg-slate-700 bg-clip-padding">
          <Sidebar />
          <MessageEmptyContainer />
        </div>

      </div>
    </>
  )
}

