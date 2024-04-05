import React from 'react'
import Navbar from './components/NavBar'
import { EmptyChatComponent } from '../../components/chatComponent/EmptyChatComponent'

const UserEmptyMessageContainer = () => {
  return (
    <>
    <Navbar/>   
    <EmptyChatComponent/>
    </>
  )
}

export default UserEmptyMessageContainer
