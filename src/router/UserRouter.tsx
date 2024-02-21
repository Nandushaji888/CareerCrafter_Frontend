import {Route,Routes} from 'react-router-dom'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import OtpVerification from '../pages/user/OtpVerification'
import UserHome from '../pages/user/UserHome'
import ForgotPassword from '../pages/user/ForgotPassword'
import NewPassword from '../pages/user/NewPassword'

const UserRouter = () => {
  return (
    <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} /> 
    <Route path='/verify-otp' element={<OtpVerification/>} />
    <Route path='/home' element={<UserHome/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>} />
    <Route path='/new-password' element={<NewPassword/>} />

</Routes>
  )
}

export default UserRouter
