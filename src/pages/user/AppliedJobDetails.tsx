import React, { useEffect, useState } from 'react'
import Navbar from './components/NavBar'
import toast, { Toaster } from 'react-hot-toast'
import { IPost, IUser } from '../../utils/interface/interface'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import JobDetailsComponent from '../../components/JobDetailsComponent'
import { useSelector } from 'react-redux'
import useConversation from '../../utils/zustand/userConversation'

const AppliedJobDetails = () => {
    const [data, setData] = useState<IPost>()
    const postUrl = 'http://localhost:4001/api/post';
    const applicationUrl = 'http://localhost:4004/api/application';
    const messageUrl = 'http://localhost:4005/api/messages';
    const { setSelectedConversation } = useConversation()

    const userData = useSelector((state: any) => state.persisted.user.userData);
    console.log(userData._id);
    const navigate = useNavigate()


    const { id } = useParams();
    const [applicationStatus, setApplicationStatus] = useState('pending')

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
    }, [id, userData, navigate]);



    const handleStartConversation = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()

        console.log(data?.recruiterId);
        console.log(userData?._id);
        const ids = {
            receiverId: data?.recruiterId,
            senderId: userData?._id
        }


        await axios.post(`${messageUrl}/create-conversation`, { ids }, { withCredentials: true })
            .then((res) => {
                if (res?.data?.status) {
                    if (res?.data?.conversationExists) {
                        console.log(res?.data?.conversationExists);
                        const selectedCon = res?.data?.conversationExists?.participants.filter((el: IUser) => el?._id === data?.recruiterId)
                        console.log(selectedCon);

                        setSelectedConversation(selectedCon[0])
                        navigate(`/messages/${data?.recruiterId}`)
                    }
                }

            })
            .catch((err) => {
                console.log(err);

            })


    }



    return (
        <>
            <Navbar />
            <div className='mx-20 mt-5'>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <JobDetailsComponent data={data} buttons={<ApplicationStatus applicationStatus={applicationStatus} handleStartConversation={handleStartConversation} />} />

            </div>

        </>
    )
}

export default AppliedJobDetails


interface IApplicationStatus {
    applicationStatus: string
    handleStartConversation: any
}

export const ApplicationStatus: React.FC<IApplicationStatus> = ({ applicationStatus, handleStartConversation }) => {




    return (
        <div className='flex flex-col gap-8'>
            <h3 className='text-xl font-bold mt-5 ms-10'>Your Application status : <span className='text-blue-800'>{applicationStatus}</span></h3>
            <h4 className='ms-8'>Haven't heard from the recruiter? <span onClick={handleStartConversation} className='bg-green-700 px-4 py-1 rounded-2xl text-white ms-1 cursor-pointer hover:bg-green-400'>Message</span></h4>
        </div>

    )
}

