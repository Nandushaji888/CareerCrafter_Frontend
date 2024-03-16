import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const RecruiterProtectedRoutes = () => {
    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);

    console.log("recruiterData");
    console.log(recruiterData);
    

    return(
        recruiterData?._id ? <Outlet/> : <Navigate to="/recruiter/login"/>
    )
}

export default RecruiterProtectedRoutes