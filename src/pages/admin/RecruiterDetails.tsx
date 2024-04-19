import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
import { IRecruiter } from '../../utils/interface/interface';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';
import { Toaster } from 'react-hot-toast';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

const RecruiterDetails = () => {

    // const dispatch = useDispatch();


    const [recruiter, setRecruiter] = useState<IRecruiter>()
    const navigate = useNavigate()




    const { id } = useParams();
    useEffect(() => {
        console.log(id);

        axios.get(`${AUTH_BASE_URL}/admin/recruiter/${id}`, { withCredentials: true })
            .then((res: any) => {
                console.log('res.data');
                console.log(res.data);
                setRecruiter(res?.data?.recruiter)
            }).catch(() => {
                navigate("/admin/error")
            })
    }, [id, navigate])


    return (
        <>
            {/* <Navbar /> */}
            <div className='flex flex-row'>
                <div className='w-80'>
                    <SideBar />
                </div>

                <div className="max-w-4xl mx-auto py-8">
                    <Toaster position='top-center' reverseOrder={false}></Toaster>

                    <form className="py-2" >
                        <div className="bg-white shadow-md  px-10 pt-6 pb-8 mb-4 rounded-3xl ">
                            <h1 className="text-3xl font-bold my-4 text-center">recruiter Profile</h1>



                            <div className='flex text-2xl font-semibold text-center-center justify-center my-5 pb-5'>
                                {recruiter?.name}
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
                                        value={recruiter?.email}
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
                                        value={recruiter?.phone}
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
                                        value={recruiter?.worksAt}
                                    />
                                </div>

                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default RecruiterDetails
