import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { IPost } from '../../utils/interface/interface';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import RecruiterJobDetailsButtonsComponent from './components/RecruiterJobDetailsButtonsComponent';
import RecruiterNavbar from './components/RecruiterNavbar';
import axiosInstance from '../../utils/axios/axiosInstance';
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL


const RecruiterJobDetails = () => {
    const [jobDetails, setjobDetails] = useState<IPost>()


    const navigate = useNavigate()


    const fetchPostDetails = (id: string | undefined) => {
        axiosInstance.get(`${POST_BASE_URL}/recruiter/job-details/${id}`,)
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
    }, [id])

    const handleAllApplications = async () => {
        const newRoute = `/recruiter/all-applications/${jobDetails?._id}`;
        navigate(newRoute);
    }



    return (
        <>
            <RecruiterNavbar />
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='mx-20 mt-10'>

                <JobDetailsComponent data={jobDetails} buttons={<RecruiterJobDetailsButtonsComponent handleAllApplications={handleAllApplications} />
                } />
            </div>



        </>
    )
}

export default RecruiterJobDetails
