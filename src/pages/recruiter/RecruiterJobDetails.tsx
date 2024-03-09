import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import Navbar from '../../components/NavBar';
import axios from 'axios';
import { addUser } from '../../utils/redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationAnswerModal from '../../components/ApplicationAnswerModal';
import { IApplication, IPost } from '../../utils/interface/interface';
// import JobDetailsComponent from '../../components/JobDetailsComponent';

const RecruiterJobDetails = () => {
    const [jobDetails, setjobDetails] = useState<IPost>()
    const dispatch = useDispatch()

    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);



    const navigate = useNavigate()
    const baseUrl = 'http://localhost:4001/api/post/recruiter';


    const fetchPostDetails = (id: string | undefined) => {
        axios.get(`${baseUrl}/job-details/${id}`, { withCredentials: true })
            .then((res: any) => {
                setjobDetails(res?.data?.jobData)
            })
            .catch((err: any) => {
                console.log(err?.response?.data?.message);

                toast.error(err?.response?.data?.message)
            })
    }
    const { id } = useParams();
    useEffect(() => {
        fetchPostDetails(id)
    }, [])

    const handleAllApplications = async()=> {
        const newRoute = `/recruiter/all-applications/${jobDetails?._id}`;
            navigate(newRoute);    }



    return (
        <>
            {/* <Navbar /> */}
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            {/* <JobDetailsComponent data={data} /> */}
            <div className='container mx-auto p-10   h-screen'>
                <div className='flex flex-col mx-10 my-5 rounded-3xl pt-10 min-h-screen bg-white'>
                    <div className='heading ps-16 ms-2 mb-10 '>
                        <h2 className='text-3xl font-semibold'>{jobDetails?.postName}</h2>
                        <h4 className='text-lg ps-10 pt-3 font-semibold'>{jobDetails?.company}</h4>
                        <h4 className='text-lg ps-10 pb-3 font-semibold'>{jobDetails?.recruitingPlace}  , {jobDetails?.employmentType}</h4>
                    </div>

                    <div className='flex flex-row w-full mx-auto px-20 justify-between'>

                        <div className='w-3/5 border border-gray-300 p-5 rounded-lg bg-slate-100 mb-10'>

                            <div className='ps-2 w-5/6'>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Job Description</h4>
                                <p>{jobDetails?.jobDescription}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Responsibilities</h4>
                                <p>{jobDetails?.responsibilities}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Skills Required</h4>
                                <p>{jobDetails?.skills}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Qualification</h4>
                                <p>{jobDetails?.qualification}</p>
                            </div>

                        </div>

                        <div className='px-6 w-2/5 '>
                            <div className='flex flex-col w-4/5 justify-center items-center ms-10 px-10 border border-gray-300 bg-stone-200 rounded-lg'>
                                {jobDetails?.salary && <h4 className='pt-5'>Salary: {jobDetails.salary}</h4>}
                                <p className='pt-5 font-semibold'>Contact Email</p>
                                <p>{jobDetails?.recruiterEmail}</p>
                                <p className='pt-5 font-semibold'>Application Closing date</p>
                                <p>{jobDetails?.recruiterEmail}</p>
                                <p className='pt-5 font-semibold'>Work Arrangement Type</p>
                                <p >{jobDetails?.workArrangementType}</p>
                                <p className='pt-5 font-semibold'>Closing Date</p>
                                <p className='pb-5'>{jobDetails?.closingDate?.slice(0, 10)}</p>
                                

                            </div>
                            <div className=' flex flex-col justify-center text-center items-center '>

                                 <button onClick={handleAllApplications} className=' bg-black text-white py-3  mb-5 mt-10 rounded-3xl px-7 '>See All applications</button>
                                 <button  className=' bg-red-800 text-white py-2 mb-5 mt-10 rounded-3xl px-5 '>Delete Post</button>
                            </div>
                            
                        </div>

                    </div>

                </div>



            </div>
        </>
    )
}

export default RecruiterJobDetails
