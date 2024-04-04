import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom'
import { IUser } from '../../utils/interface/interface';
import SideBar from './SideBar';


const UserDetails: React.FC = () => {
    const [user, setUser] = useState<IUser | undefined>();
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:4002/api/admin';

    const { id } = useParams();
    useEffect(() => {
        axios.get(`${baseUrl}/user/${id}`, { withCredentials: true })
            .then((res: any) => {
                setUser(res?.data?.user);
            }).catch((err) => {
                navigate("/admin/error");
            });
    }, [id]); 

    if (!user) {
        return <div>Loading...</div>;
    }




    return (
        <>

            <div className='flex flex-row'>
                <div className='w-80'>
                    <SideBar />
                </div>

                <div className="max-w-4xl mx-auto py-8">
                    <Toaster position='top-center' reverseOrder={false}></Toaster>

                    <form className="py-2" >
                        <div className="bg-white shadow-md  px-10 pt-6 pb-8 mb-4 rounded-3xl ">
                            <h1 className="text-3xl font-bold my-4 text-center">User Profile</h1>
                            {/* <div className="mb-4 flex items-center justify-center ">
                            <div className="profile flex justify-center py-2 pb-6 flex-col items-center">
                            
                                <img
                                    src={`/${user?.profilePic}`}
                                    alt="avatar"
                                    width="200px"
                                    height="105px"
                                    className="profile_img border-4 border-gray-100  object-cover shadow-lg hover:border-gray-200 rounded-3xl"
                                />
                     
                            </div>
                        </div> */}


                            <div className='flex text-2xl  font-semibold text-center-center justify-center my-8 pb-5'>
                                {user?.name}
                            </div>
                            <div className="mb-4 flex items-center gap-20">

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        readOnly
                                        value={user?.email}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="tel"
                                        readOnly
                                        value={user?.phone}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="date"
                                        name="dateOfBirth"
                                        value={user?.dateOfBirth}
                                    />



                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    About You
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    // placeholder="aboutYou"
                                    name='aboutYou'
                                    value={user?.aboutYou}
                                ></textarea>

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Skills
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    // placeholder="Skills"
                                    name='skills'
                                    value={user?.skills}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Qualifications
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    // placeholder="Qualifications"
                                    name='qualification'
                                    value={user?.qualification}

                                ></textarea>

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Resume
                                </label>
                                {user?.resume ? (
                                    <div className='flex my-3'>
                                        <button
                                            className="bg-slate-300 hover:bg-gray-800 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            disabled={!user?.resume}
                                            
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log(typeof user?.resume, user?.resume);

                                                const url: any = user?.resume
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            View current resume
                                        </button>
                                    </div>
                                ) : (<p>No resume uploaded</p>)}
                            </div>



                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default UserDetails;
