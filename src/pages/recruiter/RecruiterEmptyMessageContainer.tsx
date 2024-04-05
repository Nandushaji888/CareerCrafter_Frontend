import React from 'react'
import RecruiterNavbar from './components/RecruiterNavbar'
import { EmptyChatComponent } from '../../components/chatComponent/EmptyChatComponent'

const RecruiterEmptyMessageContainer = () => {
  return (
   <>
   <RecruiterNavbar/>
   <EmptyChatComponent  />
   </>
  )
}

export default RecruiterEmptyMessageContainer
