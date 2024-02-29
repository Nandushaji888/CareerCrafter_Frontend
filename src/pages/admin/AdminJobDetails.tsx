import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useState
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { IPost, } from '../../utils/interface/interface';
import SideBar from './SideBar';


const AdminJobDetails: React.FC = () => {
    const [jobDetails, setjobDetails] = useState<IPost>()



    const baseUrl = 'http://localhost:4001/api/post/admin';



    const { id } = useParams();
    useEffect(() => {
        console.log(id);

        axios.get(`${baseUrl}/job-details/${id}`, { withCredentials: true })
            .then((res: any) => {
                // console.log('res.jobDetails');
                console.log(res?.data?.jobData);
                setjobDetails(res?.data?.jobData)
                // if(res?.data?.jobData?.questions?.length>0){

                // }
            })
    }, [])




    return (
        <>
            <div className='flex flex-row'>
                <div className='w-80'>
                    <SideBar />
                </div>
                <div className='container mx-auto p-10 flex flex-col bg-white h-screen'>
                    <div className='heading ps-16 ms-2 mb-10 '>
                        <h2 className='text-3xl font-semibold'>{jobDetails?.postName}</h2>
                        <h4 className='text-lg ps-10 pt-3 font-semibold'>{jobDetails?.company}</h4>
                        <h4 className='text-lg ps-10 pb-3 font-semibold'>{jobDetails?.recruitingPlace}, {jobDetails?.employmentType}</h4>
                    </div>

                    <div className='flex flex-row w-full mx-auto px-20 justify-between'>

                        <div className='w-3/5 border border-gray-300 p-5 rounded-lg bg-slate-100'>

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
                                {jobDetails?.salary && <h4>Salary: {jobDetails.salary}</h4>}
                                <p className='pt-5 font-semibold'>Contact Email</p>
                                <p>{jobDetails?.recruiterEmail}</p>
                                <p className='pt-5 font-semibold'>Application Closing date</p>
                                <p>{jobDetails?.recruiterEmail}</p>
                                <p className='pt-5 font-semibold'>Work Arrangement Type</p>
                                <p className='mb-2'>{jobDetails?.workArrangementType}</p>

                                {
                                    jobDetails?.questions && jobDetails.questions.length > 0 &&
                                    <button className='bg-black text-white py-2 mb-5 mt-3 rounded-3xl px-5'>See Questions</button>
                                }


                            </div>
                            {
                            !jobDetails?.isListed &&
                            <div className='ms-6 mt-16 flex '>
                                <button className='bg-green-800 text-white py-2 mb-5 mx-5 mt-3 rounded-3xl px-5'>Accept post</button>
                                <button className='bg-red-700 text-white py-2 mb-5 mt-3 rounded-3xl px-5'>Reject post</button>

                            </div>
                        }
                        </div>
                       

                    </div>
               

                </div>
            </div>
            
        </>
    )
}

export default AdminJobDetails
