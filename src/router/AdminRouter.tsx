import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../pages/admin/Login'
import AdminHome from '../pages/admin/AdminHome'


const AdminRouter = () => {
  return (
    <Routes>
   
    
    <Route path='/login' element={<Login/>} /> 
    <Route path='/home' element={<AdminHome/>} />
</Routes>
  )
}

export default AdminRouter
