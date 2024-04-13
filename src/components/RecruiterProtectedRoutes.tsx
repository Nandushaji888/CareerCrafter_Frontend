import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../utils/interface/interface';

const RecruiterProtectedRoutes = () => {
    const recruiterData = useSelector((state: RootState) => state.persisted.recruiter.recruiterData)
    console.log('recruiterData');
    console.log(recruiterData);
    
    return(
        recruiterData?._id ? <Outlet/> : <Navigate to="/recruiter/login"/>
    )
}

export default RecruiterProtectedRoutes