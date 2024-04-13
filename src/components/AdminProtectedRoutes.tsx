import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../utils/interface/interface';

const AdminProtectedRoutes = () => {
    const adminData = useSelector((state: RootState) => state.persisted.admin.adminData)
    console.log('adminData');
    console.log(adminData);
    
    return(
        adminData?._id ? <Outlet/> : <Navigate to="/admin/login"/>
    )
}

export default AdminProtectedRoutes