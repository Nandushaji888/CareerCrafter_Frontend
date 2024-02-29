import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './SideBar';

const AdminHome = () => {
  const baseurl = "http://localhost:4000/api/auth/admin";
  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = localStorage.getItem('admin-jwtToken');
    if (!jwtToken) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem('admin-jwtToken');
        navigate('/admin/login')
      })
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full bg-gray-100'>
        <div className='flex justify-center items-center h-full'>
          <div style={{ textAlign: 'center' }}>
            <h2>Admin Home</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminHome
