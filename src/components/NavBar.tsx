import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, FileText, Bookmark, Send, Settings, Bell, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../utils/redux/slices/userSlice';



const Navbar: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const baseurl = "http://localhost:4000/api/auth/user";


    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    const handleLogout = () => {
        console.log('hereeeeee');

        axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
            .then((res) => {
                localStorage.removeItem('user-jwtToken');
                dispatch(clearUser())
                setIsDropdownVisible(false);
                navigate('/login')
            })
    }
    return (
        <nav className="bg-gray-900 py-4" style={{ zIndex: 9999 }}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div>
                    <span className="text-white font-semibold text-lg mx-6">Careercrafter</span>
                    <Link to="/home" className="text-white ms-10 hover:text-gray-300">Home</Link>
                    <Link to="/home" className="text-white ms-10 hover:text-gray-300">Contact</Link>
                    <Link to="/home" className="text-white ms-10 hover:text-gray-300">About us</Link>

                </div>
                <div>
                    <div className='flex'>

                        <button className="text-white ms-10 hover:text-gray-300 relative">
                            <Bell className='relative' />
                            <span className="absolute right-0 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full" style={{ top: '-8px', marginRight: '-8px' }}>2</span>
                        </button>
                        <button onClick={toggleDropdown} className="text-white ms-10 hover:text-gray-300"><UserRound /></button>
                        {isDropdownVisible && (
                            <div className="absolute right-0  w-60 bg-white rounded-md shadow-lg py-2 flex flex-col gap-2 justify-center items-start mt-8 z-10">
                                <h4 className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100" >{userData?.email}</h4>
                                <Link to="/user-profile" className=" px-4 py-2 text-sm  text-gray-700 flex gap-1" onClick={() => setIsDropdownVisible(false)}><FileText size={18} />See & Update Profile</Link>
                                <Link to="/saved-jobs" className=" px-4 py-2 text-sm text-gray-700 flex gap-1" onClick={() => setIsDropdownVisible(false)}><Bookmark size={18} />Saved Jobs</Link>
                                <Link to="/applied-jobs" className=" px-4 py-2 text-sm text-gray-700  flex gap-1" onClick={() => setIsDropdownVisible(false)}><Send size={18} />Applied Jobs</Link>
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
