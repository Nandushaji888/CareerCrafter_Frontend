import { Route, Routes } from 'react-router-dom'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import OtpVerification from '../pages/user/OtpVerification'
import UserHome from '../pages/user/UserHome'
import ForgotPassword from '../pages/user/ForgotPassword'
import NewPassword from '../pages/user/NewPassword'
import JobList from '../pages/user/JobList'
import JobDetails from '../pages/user/JobDetails'
import UserProfile from '../pages/user/UserProfile'
import UserPrivateRoute from '../components/UserPrivateRoute'
import { ChatComponent } from '../components/chatComponent/ChatComponent'

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserPrivateRoute />}>
        <Route path='/user-profile' element={<UserProfile />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-otp' element={<OtpVerification />} />
      <Route path='/' element={<UserHome />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/new-password' element={<NewPassword />} />
      <Route path='/list-jobs' element={<JobList />} />
      <Route path='/job-details/:id' element={<JobDetails />} />
      <Route path='/messages/:id' element={<ChatComponent/>} />

    </Routes>
  )
}

export default UserRouter
