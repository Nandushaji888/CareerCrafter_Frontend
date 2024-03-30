import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import RecruiterSideBar from './components/RecruiterSideBar';

const RecruiterDashboard = () => {
    const baseurl = "http://localhost:4000/api/auth/recruiter";
    const navigate = useNavigate()

  
    const handleLogout = () => {
      axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem('admin-jwtToken');
          navigate('/recruiter/login')
        }).catch((err)=> {
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
