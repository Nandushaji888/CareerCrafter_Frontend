import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { LogOut } from 'lucide-react';

import { FaUser, FaUserTie, FaClipboardCheck, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearAdmin } from '../../utils/redux/slices/adminSlice';


const SideBar = () => {
    const baseurl = "http://localhost:4000/api/auth/admin";
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            dispatch(clearAdmin())
            navigate('/admin/login')
          })
      }

    return (
        <div className='bg-gray-800 w-80 h-screen fixed flex flex-col'>
            <div className='flex items-center justify-between p-4'>
                <Link to="/" className='flex items-center gap-3 text-white text-xl font-extrabold'>
                    <SiShopware />
                    <span>CareerCrafter</span>
                </Link>
            </div>
            <div className=' overflow-y-auto flex flex-col items-center mt-10 '>
                <ul className='space-y-6'>
                    <div className='overflow-y-auto flex flex-col items-center mt-16'>
                        <ul className='space-y-3'>
                            <NavLink to='/admin/users-list' className='navbar-link' ><li className='text-white hover:bg-gray-400 hover:text-black px-3 py-3 rounded-lg'>
                                <FaUser className="inline  mr-3 mb-1 " />Users
                            </li>
                            </NavLink>

                       
                            <NavLink to='/admin/recruiters-list' className='navbar-link' >   <li className='text-white hover:bg-gray-400 hover:text-black px-3 py-3 rounded-lg'>
                                <FaUserTie className="inline mr-2 mb-1" /> Recruiters
                            </li></NavLink>

                            <NavLink to='/admin/all-post-list' className='navbar-link' >   <li className='text-white hover:bg-gray-400 hover:text-black px-3 py-3 rounded-lg'>
                                <FaClipboardCheck className="inline mr-2 mb-1" /> All Job Posts
                            </li></NavLink>
             
             

                            <NavLink to='/admin/pending-job-posts' className='navbar-link' ><li className='text-white hover:bg-gray-400 hover:text-black px-3 py-3 rounded-lg'>
                                <FaClipboardList className="inline  mr-3 mb-1 " />Pending Job Posts
                            </li>
                            </NavLink>
                            <div onClick={handleLogout} className='navbar-link' ><li className='text-white hover:bg-gray-400 hover:text-black px-3 py-3 rounded-lg'>
                                <LogOut size={20} className="inline  mr-3 mb-1 " />Logout
                            </li>
                            </div>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>

    )
}

export default SideBar
