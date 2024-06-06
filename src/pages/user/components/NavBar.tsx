import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, FileText, Bookmark, Send, Settings, Bell, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../utils/redux/slices/userSlice';
import { SiShopware } from 'react-icons/si'
import { Mail } from 'lucide-react';
import { useSocketContext } from '../../../utils/context/SocketContext';
import axiosInstance from '../../../utils/axios/axiosInstance';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL
const NOTIFICATION_BASE_URL = import.meta.env.VITE_NOTIFICATION_BASE_URL




const Navbar: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const dispatch = useDispatch()
    const { socket } = useSocketContext()
    const navigate = useNavigate();
    const [notificationsCount, setNotificationCount] = useState('')
    const [messagesCount, setMessageCount] = useState('')



    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    const handleLogout = () => {
        // console.log('hereeeeee');

        axiosInstance.post(`${AUTH_BASE_URL}/user/logout`, {})
            .then(() => {
                // localStorage.removeItem('user-jwtToken');
                dispatch(clearUser())
                setIsDropdownVisible(false);
                navigate('/login')
            })
    }

    const fetchNotificationCounts = async()=> {
        axiosInstance.get(`${NOTIFICATION_BASE_URL}/count/${userData?._id}`, )
        .then((res) => {
            // console.log(res?.data);
            if (res?.data?.status) {
                const { notificationCount, messageCount } = res.data

                if (Number(notificationCount) > 0) {

                    setNotificationCount(res?.data?.notificationCount)
                }
                if (Number(messageCount) > 0) {

                    setMessageCount(res?.data?.messageCount)
                }
            }

        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
      fetchNotificationCounts()
    }, [])
    useEffect(() => {
      fetchNotificationCounts()
    }, [socket])

    return (
        <nav className="bg-gray-900 py-4 fixed top-0 right-0 left-0 mb-5" style={{ zIndex: 9999 }} >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div className='flex'>
                    <Link to="/" className='flex items-center gap-3 text-white text-xl font-extrabold'>
                        <SiShopware />
                        <span>CareerCrafter</span>
                    </Link>

                    <Link to={'/'} aria-label="Our product" title="Our product" className="relative ms-24 font-medium tracking-wide text-white inline-block group transition duration-300 ease-in-out hover:text-blue-400" >
                        Home
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

                        <button className="text-white ms-10 hover:text-gray-300 relative" onClick={() => navigate("/notifications")} >
                            <Bell className='relative' />
                            {notificationsCount && (
                                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full -mt-1 -mr-1">{notificationsCount}</span>
                            )}
                        </button>
                        <button className="text-white ms-10 hover:text-gray-300 relative" onClick={() => navigate("/messages")} >
                            <Mail className='relative' />
                            {
                                messagesCount &&

                                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full -mt-1 -mr-1">{messagesCount}</span>
                            }
                        </button>

                        {
                            userData?._id &&
                            <button onClick={toggleDropdown} className="text-white ms-10 hover:text-gray-300"><UserRound /></button>
                        }
                        {
                            !userData?._id &&
                            <Link className='text-white ps-10' to='/login'>Sign in / Sign up</Link>
                        }


                        {isDropdownVisible && (
                            <div className="absolute right-0  w-60 bg-white rounded-md shadow-lg py-2 flex flex-col gap-2 justify-center items-start mt-8 z-10">
                                {
                                    userData?._id &&
                                    <h4 className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100" >{userData?.email}</h4>
                                }
                                <Link to="/user-profile" className=" px-4 py-2 text-sm  text-gray-700 flex gap-1" onClick={() => setIsDropdownVisible(false)}><FileText size={18} />View & Update Profile</Link>
                                <Link to={`/saved-jobs/${userData?._id}`} className=" px-4 py-2 text-sm text-gray-700 flex gap-1" onClick={() => setIsDropdownVisible(false)}><Bookmark size={18} />Saved Jobs</Link>
                                <Link to={`/applied-jobs/${userData?._id}`} className=" px-4 py-2 text-sm text-gray-700  flex gap-1" onClick={() => setIsDropdownVisible(false)}><Send size={18} />Applied Jobs</Link>
                                <Link to="/settings" className=" px-4 py-2 text-sm text-gray-700 flex gap-1" onClick={() => setIsDropdownVisible(false)}><Settings size={18} />Settings</Link>
                                <button className="px-4 py-2 text-sm text-gray-700 flex gap-1" onClick={() => handleLogout()}>
                                    <LogOut size={18} />Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
