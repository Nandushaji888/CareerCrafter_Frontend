import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../utils/redux/slices/userSlice';


const UserHome = () => {
    const baseurl = "http://localhost:4000/api/auth/user";
    const navigate = useNavigate()
    const userData = useSelector((state: any) => state.persisted.user.userData);
    // console.log('userData');
    // console.log(userData);
    const dispatch = useDispatch()
    
    useEffect(() => {
        const jwtToken = localStorage.getItem('user-jwtToken');
        if (!jwtToken) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
        .then((res) => {
            localStorage.removeItem('user-jwtToken');
            dispatch(clearUser())
            navigate('/login')
        })
    }
    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className='text-4xl mb-6'>User Home</h1>
          <h2>User Info</h2>
            {/* <p>ID: {userData.id}</p> */}
            <p>Name: {userData?.name}</p>
            <p>Email: {userData?.email}</p>
            <p>Id: {userData?._id}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    )
}

export default UserHome
