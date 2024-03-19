import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const UserPrivateRoute = () => {
    const user = useSelector((state: any) => state.persisted.user.userData);

    console.log('user');
    console.log(user);
    

    return(
        user?._id ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default UserPrivateRoute