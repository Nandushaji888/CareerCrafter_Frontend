import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RecruiterHome = () => {
  const baseurl = "http://localhost:4000/api/auth/recruiter";
  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = localStorage.getItem('recruiter-jwtToken');
    if (!jwtToken) {
      navigate('/recruiter/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem('recruiter-jwtToken');
        navigate('/recruiter/login')
      })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-4xl mb-6'>Recruiter Home</h1>

        <button onClick={handleLogout}>Logout</button><br />
        <Link to="/recruiter/post-job" className="text-blue-600 hover:text-blue-400 ">
          Post jobs
        </Link>{' '}
      </div>
    </div>
  )
}

export default RecruiterHome
