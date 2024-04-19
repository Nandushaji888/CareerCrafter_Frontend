import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../utils/interface/interface';

const UserPrivateRoute = () => {
    const user = useSelector((state: RootState) => state.persisted.user.userData);

    console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    console.log(user);
    

    return(
        user?._id ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default UserPrivateRoute