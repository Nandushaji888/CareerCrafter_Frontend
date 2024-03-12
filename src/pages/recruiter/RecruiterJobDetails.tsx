import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import Navbar from '../../components/NavBar';
import axios from 'axios';
import { addUser } from '../../utils/redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationAnswerModal from '../../components/ApplicationAnswerModal';
import { IApplication, IPost } from '../../utils/interface/interface';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import RecruiterJobDetailsButtonsComponent from './components/RecruiterJobDetailsButtonsComponent';
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

    const handleAllApplications = async () => {
        const newRoute = `/recruiter/all-applications/${jobDetails?._id}`;
        navigate(newRoute);
    }



    return (
        <>
            {/* <Navbar /> */}
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='mx-20'>

                <JobDetailsComponent data={jobDetails} buttons={<RecruiterJobDetailsButtonsComponent handleAllApplications={handleAllApplications} />
                } />
            </div>



        </>
    )
}

export default RecruiterJobDetails
