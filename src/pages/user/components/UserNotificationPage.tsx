import React, { useEffect } from 'react'
import Navbar from './NavBar'
import NotificationPage from '../../../components/NotificationPage'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserNotificationPage = () => {

    const messenger = useSelector((state: any) => state.persisted.user.userData);
const navigate = useNavigate()
    useEffect(()=>{
        if(!messenger?._id){
            navigate('/login')
        }
    },[])

  return (
    <>
    <Navbar/>
    <NotificationPage messenger= {messenger} />
    </>
  )
}

export default UserNotificationPage
