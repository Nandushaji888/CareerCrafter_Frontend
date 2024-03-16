import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const UserPrivateRoute = () => {
    const user = useSelector((state: any) => state.persisted.user.userData);

    return(
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default UserPrivateRoute