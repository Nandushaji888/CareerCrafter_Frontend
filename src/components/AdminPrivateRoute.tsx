import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../utils/interface/interface';

const AdminPrivateRoute = () => {
    const admin = useSelector((state: RootState) => state.persisted.admin.adminData);

    console.log('admin');
    console.log(admin);
    

    return(
        admin?._id ? <Outlet/> : <Navigate to="/admin/login"/>
    )
}

export default AdminPrivateRoute