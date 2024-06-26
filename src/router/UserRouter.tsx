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
import ContactPage from '../components/ContactPage'
import AboutUsPage from '../components/AboutUsPage'
import AppliedJobList from '../pages/user/AppliedJobsList'
import AppliedJobDetails from '../pages/user/AppliedJobDetails'
import SavedJobList from '../pages/user/SavedJobList'
import NotFound from '../components/NotFound'
import JistyVedioCall from '../components/jitsiVideoCallComponent'
import UserNotificationPage from '../pages/user/components/UserNotificationPage'
import UserMessageContainer from '../pages/user/UserMessageContainer'
import UserEmptyMessageContainer from '../pages/user/UserEmptyMessageContainer'

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserPrivateRoute />}>
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/messages' element={<UserEmptyMessageContainer />} />
        <Route path='/messages/:id' element={<UserMessageContainer />} />
        <Route path='/applied-jobs/:id' element={<AppliedJobList />} />
        <Route path='/saved-jobs/:id' element={<SavedJobList />} />
        <Route path='/applied-jobs/details/:id' element={<AppliedJobDetails />} />
        <Route path='/notifications' element={<UserNotificationPage />} />
        <Route path='/video-call/:id' element={<JistyVedioCall />} />


      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-otp' element={<OtpVerification />} />
      <Route path='/' element={<UserHome />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/new-password' element={<NewPassword />} />
      <Route path='/list-jobs' element={<JobList />} />
      <Route path='/job-details/:id' element={<JobDetails />} />
      <Route path='/contact-us' element={<ContactPage />} />
      <Route path='/about-us' element={<AboutUsPage />} />
      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default UserRouter
