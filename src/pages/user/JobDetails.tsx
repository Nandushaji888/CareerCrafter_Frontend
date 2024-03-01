import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import axios from 'axios';
import { addUser } from '../../utils/redux/slices/userSlice';

const JobDetails = () => {
    const location = useLocation();
    const receivedData = location.state?.data;
    const [data, setData] = useState(receivedData?.data)
    const [resume, setResume] = useState('');
    const baseUrl = 'http://localhost:4002/api/user';
    const dispatch = useDispatch()

    const userData = useSelector((state: any) => state.persisted.user.userData);

    console.log('userData');
    console.log(userData);

    // console.log('receivedData');
    // console.log(receivedData);

    useEffect(() => {
        if (!userData.resume) {

            fetchResume();
        } else {
            setResume(userData?.resume);
        }
    }, [userData.resume]);

    const fetchResume = async () => {
        try {

            await axios.get(`${baseUrl}/${userData?._id}`)
                .then((res: any) => {
                    if (res?.data?.status) {
                        const resume = res?.data?.user?.resume
                        // console.log('resume');
                        // console.log(resume);

                        setResume(resume)
                        dispatch(addUser(res?.data?.user))

                    }
                })
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container mx-auto p-10   h-screen'>
                <div className='flex flex-col mx-10 my-5 rounded-3xl pt-10 min-h-screen bg-white'>
                    <div className='heading ps-16 ms-2 mb-10 '>
                        <h2 className='text-3xl font-semibold'>{data?.postName}</h2>
                        <h4 className='text-lg ps-10 pt-3 font-semibold'>{data?.company}</h4>
                        <h4 className='text-lg ps-10 pb-3 font-semibold'>{data?.recruitingPlace}  , {data?.employmentType}</h4>
                    </div>

                    <div className='flex flex-row w-full mx-auto px-20 justify-between'>

                        <div className='w-3/5 border border-gray-300 p-5 rounded-lg bg-slate-100 mb-10'>

                            <div className='ps-2 w-5/6'>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Job Description</h4>
                                <p>{data?.jobDescription}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Responsibilities</h4>
                                <p>{data?.responsibilities}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Skills Required</h4>
                                <p>{data?.skills}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Qualification</h4>
                                <p>{data?.qualification}</p>
                            </div>

                        </div>

                        <div className='px-6 w-2/5 '>
                            <div className='flex flex-col w-4/5 justify-center items-center ms-10 px-10 border border-gray-300 bg-stone-200 rounded-lg'>
                                {data?.salary && <h4>Salary: {data.salary}</h4>}
                                <p className='pt-5 font-semibold'>Contact Email</p>
                                <p>{data?.recruiterEmail}</p>
                                <p className='pt-5 font-semibold'>Application Closing date</p>
                                <p>{data?.recruiterEmail}</p>
                                <p className='pt-5 font-semibold'>Work Arrangement Type</p>
                                <p>{data?.workArrangementType}</p>
                                {resume &&
                                    <p className='pt-5 font-semibold'>Your Resume</p>
                                }

                                {resume &&

                                    <div className='border bg-stone-300 w-full h-20 rounded-lg  my-3 border-gray-300 p-3'>

                                        <p className='pb-10 w-full'>{resume}</p>

                                    </div>
                                }

                                <button className='bg-black text-white py-2 mb-5 mt-3 rounded-3xl px-5'>Apply</button>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </>
    )
}

export default JobDetails
