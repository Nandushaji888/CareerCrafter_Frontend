import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../pages/admin/Login'
import AdminHome from '../pages/admin/AdminHome'
import UserList from '../pages/admin/UserList'
import UserDetails from '../pages/admin/UserDetails'
import PendingJobLists from '../pages/admin/PendingJobLists'
import AdminJobDetails from '../pages/admin/AdminJobDetails'


const AdminRouter = () => {
  return (
    <Routes>
   
    
    <Route path='/login' element={<Login/>} /> 
    <Route path='/home' element={<AdminHome/>} />
    <Route path='/users-list' element={<UserList/>} />
    <Route path='/user/:id' element={<UserDetails/>}/>
    <Route path='/pending-job-posts' element={<PendingJobLists/>}/>
    <Route path='/job-details/:id' element={<AdminJobDetails/>}/>
</Routes>
  )
}

export default AdminRouter
