import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const RecruiterProtectedRoutes = () => {
    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData)
    return(
        recruiterData?._id ? <Outlet/> : <Navigate to="/recruiter/login"/>
    )
}

export default RecruiterProtectedRoutes