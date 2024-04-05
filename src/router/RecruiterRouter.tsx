import { Route, Routes } from 'react-router-dom'
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
import RecruiterProtectedRoutes from '../components/RecruiterProtectedRoutes'
import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard'
import { EmptyChatComponent } from '../components/chatComponent/EmptyChatComponent'
import { ChatComponent } from '../components/chatComponent/ChatComponent'
import RecruiterNotification from '../pages/recruiter/components/RecruiterNotification'
import RecruiterMessageContainer from '../pages/recruiter/RecruiterMessageContainer'
import RecruiterEmptyMessageContainer from '../pages/recruiter/RecruiterEmptyMessageContainer'


const RecruiterRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-otp' element={<OtpVerification />} />


      <Route element={<RecruiterProtectedRoutes />}>
        <Route path='/' element={<RecruiterHome />} />
        <Route path='/dashboard' element={<RecruiterDashboard />} />
        <Route path='/post-job' element={<PostJobs />} />
        <Route path='/post-job-ask-questions' element={<AskQuestions />} />
        <Route path='/list-jobs' element={<RecruiterListJobs />} />
        <Route path='/job-details/:id' element={<RecruiterJobDetails />} />
        <Route path='/all-applications/:id' element={<RecruiterApplicationList />} />
        <Route path='/application-details/:id' element={<RecruiterApplicationDetails />} />
        <Route path='/notifications' element={<RecruiterNotification />} />
        <Route path='/messages' element={<RecruiterEmptyMessageContainer />} />
        <Route path='/messages/:id' element={<RecruiterMessageContainer />} />
      </Route>

    </Routes>
  )
}

export default RecruiterRouter
