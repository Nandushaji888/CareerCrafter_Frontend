import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../pages/admin/Login'
// import AdminHome from '../pages/admin/AdminHome'
import UserList from '../pages/admin/UserList'
import UserDetails from '../pages/admin/UserDetails'
import PendingJobLists from '../pages/admin/PendingJobLists'
import AdminJobDetails from '../pages/admin/AdminJobDetails'
import AdminErrorPage from '../pages/admin/components/AdminErrorPage'
import AllPostList from '../pages/admin/AllPostList'
import RecruiterList from '../pages/admin/RecruiterList'
import RecruiterDetails from '../pages/admin/RecruiterDetails'
import AdminProtectedRoutes from '../components/AdminProtectedRoutes'


const AdminRouter = () => {
  return (
    <Routes>
   
    
    <Route path='/login' element={<Login/>} /> 
    <Route element={<AdminProtectedRoutes/>}>
    {/* <Route path='/home' element={<AdminHome/>} /> */}
    <Route path='/users-list' element={<UserList/>} />
    <Route path='/recruiters-list' element={<RecruiterList/>} />
    <Route path='/user/:id' element={<UserDetails/>}/>
    <Route path='/recruiter/:id' element={<RecruiterDetails/>}/>
    <Route path='/pending-job-posts' element={<PendingJobLists/>}/>
    <Route path='/all-post-list' element={<AllPostList/>}/>
    <Route path='/job-details/:id' element={<AdminJobDetails/>}/>
    </Route>
    <Route path='/error' element={<AdminErrorPage/>}/>

</Routes>
  )
}

export default AdminRouter
