import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { FaUser, FaUserTie, FaClipboardCheck, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';


const SideBar = () => {

    const postUrl = 'http://localhost:4001/api/post/admin';
    const [count, setCount] = useState('')

    useEffect(() => {
        axios.get(`${postUrl}/pending-post-count`, { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setCount(res?.data?.count?.length)
            })
    }, [])

    return (
        <div className='bg-gray-800 w-80 h-screen fixed flex flex-col'>
        <div className='flex items-center justify-between p-4'>
            <Link to="/" className='flex items-center gap-3 text-white text-xl font-extrabold'>
                <SiShopware />
                <span>CareerCrafter</span>
            </Link>
            {/* <button onClick={()=> {}} className='text-white'>
                <MdOutlineCancel />
            </button> */}
        </div>
        <div className=' overflow-y-auto flex flex-col items-center mt-10 '>
            <ul className='space-y-6'>
                <div className='overflow-y-auto flex flex-col items-center mt-16'>
                    <ul className='space-y-6'>
                        <li className='text-white'>
                            <FaUser className="inline mr-2 mb-1" /><NavLink to='/admin/users-list'>Users</NavLink>
                        </li>
                        <li className='text-white'>
                            <FaUserTie className="inline mr-2 mb-1" /> <NavLink to='/admin/recruiters'>Recruiters</NavLink>
                        </li>
                        <li className='text-white'>
                            <FaClipboardCheck className="inline mr-2 mb-1" /><NavLink to='/admin/active-job-posts'> Active Job Posts</NavLink>
                        </li>
                        <li className='text-white'>
                            <FaClipboardList className="inline mr-2 mb-1" /> <NavLink to='/admin/pending-job-posts'> Pending Job Posts <a className="inline-block bg-red-500  text-white font-bold px-2 rounded-full">
                                {count}
                            </a>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    </div>
    
    )
}

export default SideBar
