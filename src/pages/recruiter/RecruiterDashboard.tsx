import { useNavigate } from 'react-router-dom';
import RecruiterSideBar from './components/RecruiterSideBar';
import axiosInstance from '../../utils/axios/axiosInstance';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL


const RecruiterDashboard = () => {
  const navigate = useNavigate()


  const handleLogout = () => {
    axiosInstance.post(`${AUTH_BASE_URL}/recruiter/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate('/recruiter/login')
      }).catch((err) => {
        console.log(err);

      })
  }
  return (
    <div className='flex'>
      <RecruiterSideBar />
      <div className='w-full bg-gray-100'>
        <div className='flex justify-center items-center h-full'>
          <div style={{ textAlign: 'center' }}>
            <h2>Recruiter Home</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RecruiterDashboard
