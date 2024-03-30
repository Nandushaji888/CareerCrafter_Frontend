import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { FaUser, FaUserTie, FaClipboardCheck, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';


const SideBar = () => {

    const postUrl = 'http://localhost:4001/api/post/admin';
    const [count, setCount] = useState('')

    // useEffect(() => {
    //     axios.get(`${postUrl}/pending-post-count`, { withCredentials: true })
    //         .then((res) => {
    //             // console.log(res.data);
    //             setCount(res?.data?.count?.length)
    //         })
    // }, [count])

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
                        </ul>
                    </div>
                </ul>
            </div>
        </div>

    )
}

export default SideBar
