import {Route,Routes} from 'react-router-dom'
import Login from '../pages/recruiter/Login'
import Register from '../pages/recruiter/Register'
import OtpVerification from '../pages/recruiter/OtpVerification'
import RecruiterHome from '../pages/recruiter/RecruiterHome'
import PostJobs from '../pages/recruiter/PostJobs'
import AskQuestions from '../pages/recruiter/AskQuestions'
import RecruiterListJobs from '../pages/recruiter/RecruiterListJobs'
import RecruiterJobDetails from '../pages/recruiter/RecruiterJobDetails'
import RecruiterApplicationList from '../pages/recruiter/RecruiterApplicationList'
import RecruiterApplicationDetails from '../pages/recruiter/RecruiterApplicationDetails'


const RecruiterRouter = () => {
  return (
    <Routes>
   
    
    <Route path='/login' element={<Login/>} /> 
    <Route path='/register' element={<Register/>} />
    <Route path='/verify-otp' element={<OtpVerification/>} />
    <Route path='/home' element={<RecruiterHome/>} />
    <Route path='/post-job' element={<PostJobs/>} />
    <Route path='/post-job-ask-questions' element={<AskQuestions/>} />
    <Route path='/list-jobs' element={<RecruiterListJobs/>} />
    <Route path='/job-details/:id' element={<RecruiterJobDetails/>} />
    <Route path='/all-applications/:id' element={<RecruiterApplicationList/>} />
    <Route path='/application-details/:id' element={<RecruiterApplicationDetails/>} />

</Routes>
  )
}

export default RecruiterRouter
