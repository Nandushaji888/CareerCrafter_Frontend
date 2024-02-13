import {Route,Routes} from 'react-router-dom'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import OtpVerification from '../pages/user/OtpVerification'
import UserHome from '../pages/user/UserHome'

const UserRouter = () => {
  return (
    <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} /> 
    <Route path='/verify-otp' element={<OtpVerification/>} />
    <Route path='/home' element={<UserHome/>} />

</Routes>
  )
}

export default UserRouter
