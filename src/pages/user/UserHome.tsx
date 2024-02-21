import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const UserHome = () => {
    const baseurl = "http://localhost:4000/api/auth/user";
    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = localStorage.getItem('user-jwtToken');
        if (!jwtToken) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            localStorage.removeItem('user-jwtToken');
            navigate('/login')
        })
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className='text-4xl mb-6'>User Home</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    )
}

export default UserHome
