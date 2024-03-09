import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRecruiter } from '../../utils/redux/slices/recruiterSlice';

const RecruiterHome = () => {
  const baseurl = "http://localhost:4000/api/auth/recruiter";
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);

  console.log('recruiterData');
  console.log(recruiterData);
  

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
        dispatch(clearRecruiter())
        navigate('/recruiter/login')
      })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-4xl mb-6'>Recruiter Home</h1>
        <h1 className='text-4xl mb-6'>{recruiterData.name}</h1>
        <h1 className='text-4xl mb-6'>{recruiterData.email}</h1>
        <h1 className='text-4xl mb-6'>{recruiterData.status}</h1>
        <h1 className='text-4xl mb-6'>{recruiterData.phone}</h1>
     


        <button onClick={handleLogout}>Logout</button><br />
        <div className='flex flex-col'>

        <Link to="/recruiter/post-job" className="text-blue-600 hover:text-blue-400 ">
          Post jobs
        </Link>

        <Link to="/recruiter/list-jobs" className="text-blue-600 hover:text-blue-400 ">
          List jobs
        </Link>
        </div>
      </div>
    </div>
  )
}

export default RecruiterHome
