import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/NavBar';
import axios from 'axios';
import { addUser } from '../../utils/redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationAnswerModal from '../../components/ApplicationAnswerModal';
import { ApplicationType, IApplication } from '../../utils/interface/interface';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import UserJobDetailsButtons from './components/UserJobDetailsButtons';
// import JobDetailsComponent from '../../components/JobDetailsComponent';

const JobDetails = () => {
    const location = useLocation();
    const receivedData = location.state?.data;
    const [data, setData] = useState(receivedData?.data)
    const [resume, setResume] = useState('');
    const baseUrl = 'http://localhost:4002/api/user';
    const applicationUrl = 'http://localhost:4004/api/application';
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [applicationData, setApplicationData] = useState<IApplication>()
    const navigate = useNavigate()



    const userData = useSelector((state: any) => state.persisted.user.userData);


    useEffect(() => {
        if (!userData.resume) {

            fetchResume();
        } else {
            setResume(userData?.resume);
        }
    }, [userData.resume]);

    const fetchResume = async () => {
        try {

            await axios.get(`${baseUrl}/${userData?._id}`, { withCredentials: true })
                .then((res: any) => {
                    if (res?.data?.status) {
                        const resume = res?.data?.user?.resume
                        setResume(resume)
                        dispatch(addUser(res?.data?.user))

                    }
                })
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    const handleAppliation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {



        e.preventDefault()

        const formData = {
            userId: userData?._id,
            jobPostId: data?._id,
            name: userData?.name,
            email: userData?.email,
            phone: userData?.phone,
            resume: resume,
            createdOn: '',
            status: ApplicationType.Pending
        }
        setApplicationData(formData)
        if (!data?.questions?.length) {
            try {

                axios.get(`${baseUrl}/${userData._id}`, { withCredentials: true })
                    .then((res: any) => {
                        if (!res.status) {
                            navigate('/login')
                        } else {
                            axios.post(`${applicationUrl}/create-application`, formData, { withCredentials: true })
                                .then((res) => {
                                    toast.success(res?.data?.message)
                                }).catch((err)=> {
                                    toast.error(err?.response?.data?.message)
                                })
                        }


                    }).catch((err) => {
                        toast.error(err?.response?.data?.message)
                        navigate('/login')
                    })


            } catch (err) {

            }




        } else {
            setShowModal(true)

        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />

            <div className='mx-20 mt-5'>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <JobDetailsComponent data={data} buttons={<UserJobDetailsButtons  handleAppliation={handleAppliation} />} />
                {
                    showModal && applicationData &&
                    <ApplicationAnswerModal onClose={() => setShowModal(false)} questions={data?.questions || []} applicationData={applicationData} />
                }
            </div>

        </>
    )
}

export default JobDetails
