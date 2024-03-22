import React, { useEffect, useState } from 'react'
import Navbar from './components/NavBar'
import toast, { Toaster } from 'react-hot-toast'
import {IPost} from '../../utils/interface/interface'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import JobDetailsComponent from '../../components/JobDetailsComponent'
import { useSelector } from 'react-redux'

const AppliedJobDetails = () => {
    const [data, setData] = useState<IPost>()
    const postUrl = 'http://localhost:4001/api/post';
    const applicationUrl = 'http://localhost:4004/api/application';
    const userData = useSelector((state: any) => state.persisted.user.userData);
    console.log(userData._id);
    const navigate = useNavigate()
    

    const { id } = useParams();
    const [applicationStatus,setApplicationStatus] = useState('pending')
    
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await axios.get(`${postUrl}/job-details/${id}`, { withCredentials: true });
                if (res?.data?.status) {
                    setData(res?.data?.jobData);
                } else {
                    toast.error(res?.data?.message);
                }
            } catch (error) {
                toast.error('Internal server error');
                console.log(error);
            }
        };
    
        const checkApplicationStatus = async () => {
            if (userData?._id) {
                try {
                    const res = await axios.post(`${applicationUrl}/get-application-status`, { userData, id }, { withCredentials: true });
                    console.log(res.data);
                    setApplicationStatus(res?.data?.application?.status)
                } catch (error) {
                    toast.error('Error checking application status');
                    console.log(error);
                }
            }
        };
    
        fetchJobDetails();
        checkApplicationStatus();
        window.scrollTo(0, 0);
    }, [id, userData,navigate]); // Include dependencies if needed
    



    return (
        <>
            <Navbar />
            <div className='mx-20 mt-5'>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <JobDetailsComponent data={data} buttons={<ApplicationStatus applicationStatus={applicationStatus} />} />

            </div>

        </>
    )
}

export default AppliedJobDetails


interface IApplicationStatus{
    applicationStatus:string
}

export const ApplicationStatus:React.FC<IApplicationStatus> = ({applicationStatus})=> {
    return (
        <h3 className='text-xl font-bold mt-5 ms-10'>Your Application status : <span className='text-blue-800'>{applicationStatus}</span></h3>
    )
}

