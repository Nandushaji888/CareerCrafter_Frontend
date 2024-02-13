import {Route,Routes} from 'react-router-dom'
import Login from '../pages/recruiter/Login'
import Register from '../pages/recruiter/Register'
import OtpVerification from '../pages/recruiter/OtpVerification'
import RecruiterHome from '../pages/recruiter/RecruiterHome'


const RecruiterRouter = () => {
  return (
    <Routes>
   
    
    <Route path='/login' element={<Login/>} /> 
    <Route path='/register' element={<Register/>} />
    <Route path='/verify-otp' element={<OtpVerification/>} />
    <Route path='/home' element={<RecruiterHome/>} />
</Routes>
  )
}

export default RecruiterRouter
