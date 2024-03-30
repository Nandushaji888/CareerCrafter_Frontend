import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, FileText, Bookmark, Send, Settings, Bell, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../../utils/redux/slices/userSlice';
import { SiShopware } from 'react-icons/si'
import { Mail } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { clearRecruiter } from '../../../utils/redux/slices/recruiterSlice';


const RecruiterNavbar = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const baseurl = "http://localhost:4000/api/auth/recruiter";


    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    const handleLogout = () => {
        axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            dispatch(clearRecruiter())
            navigate('/recruiter/login')
          }).catch((err)=> {
              console.log(err);
              
          })
      }
    return (
        <nav className="bg-gray-900 py-4 fixed top-0 right-0 left-0 mb-5" style={{ zIndex: 9999 }} >
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div className='flex'>
                    <Link to="/recruiter" className='flex items-center gap-3 text-white text-xl font-extrabold'>
                        <SiShopware />
                        <span>CareerCrafter</span>
                    </Link>

                    <Link to={'/recruiter'} aria-label="Our product" title="Our product" className="relative ms-24 font-medium tracking-wide text-white inline-block group transition duration-300 ease-in-out hover:text-blue-400" >
                        Home
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 origin-left transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                    <Link to={'/recruiter/list-jobs'} aria-label="Our product" title="Our product" className="relative ms-10 font-medium tracking-wide text-white inline-block group transition duration-300 ease-in-out hover:text-blue-400" >
                        Your Jobs
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 origin-left transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                    <Link to={'/recruiter/post-job'} aria-label="Our product" title="Our product" className="relative ms-10 font-medium tracking-wide text-white inline-block group transition duration-300 ease-in-out hover:text-blue-400" >
                        Post Jobs
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 origin-left transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>

                    <Link to={'/contact-us'} aria-label="Our product" title="Our product" className="relative ms-10 font-medium tracking-wide text-white inline-block group transition duration-300 ease-in-out hover:text-blue-400" >
                        Contact
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 origin-left transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                    <Link to={'/about-us'} aria-label="Our product" title="Our product" className="relative ms-10 font-medium tracking-wide text-white inline-block group transition duration-300 ease-in-out hover:text-blue-400" >
                        About us
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 origin-left transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                </div>
                <div>
                    <div className='flex'>
                        <button className="px-4 py-2 text-sm text-white flex gap-1" onClick={() => handleLogout()}>
                            <LogOut  size={18} />Sign out
                        </button>

                    
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default RecruiterNavbar
