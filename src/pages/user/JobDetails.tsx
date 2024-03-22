import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/NavBar';
import axios from 'axios';
import { addUser, clearUser } from '../../utils/redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationAnswerModal from '../../components/ApplicationAnswerModal';
import { ApplicationType, IApplication, IUser } from '../../utils/interface/interface';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import UserJobDetailsButtons from './components/UserJobDetailsButtons';
import Footer from '../../components/Footer';
// import JobDetailsComponent from '../../components/JobDetailsComponent';

const JobDetails = () => {
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const location = useLocation();
    const receivedData = location.state?.data;
    const [data, setData] = useState(receivedData?.data)
    const [resume, setResume] = useState('');
    const baseUrl = 'http://localhost:4002/api/user';
    const applicationUrl = 'http://localhost:4004/api/application';
    const postUrl = 'http://localhost:4001/api/post';

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [applicationData, setApplicationData] = useState<IApplication>()
    const [user, setUser] = useState<IUser>()
    const [applied, setApplied] = useState(false)
    const [saved, setSaved] = useState(false)
    const navigate = useNavigate()

        const { id } = useParams();



    const isApplied = () => {
        if (userData._id && data?._id) {
            axios.get(`${baseUrl}/${userData._id}`, { withCredentials: true })
                .then((res: any) => {
                    if (res?.data?.status) {
                        // console.log('in application job details');
                        // console.log(res?.data?.user?.appliedJobs);
                        setUser(res?.data?.user)
                        dispatch(clearUser())
                        dispatch(addUser(res?.data?.user))
                        if (res?.data?.user?.appliedJobs.includes(data?._id)) {
                            setApplied(true)
                        }
                        if (res?.data?.user?.savedJobs.includes(data?._id)) {
                            setSaved(true)
                        }
                    } else {
                        navigate('/login')
                    }


                }).catch(() => {

                })
        }
    }

    useEffect(() => {
        isApplied()
        axios.get(`${postUrl}/job-details/${id}`, { withCredentials: true })
            .then((res) => {
                if (res?.data?.status) {
                    setData(res?.data?.jobData)
                }
            });
        window.scrollTo(0, 0);

    }, [])


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
        isApplied()

        if (!userData?._id) {
            navigate('/login')
            return
        }
        if (resume === '') {
            toast.error('Please upload your resume')
            return
        }

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
                                    setApplied(true)
                                    // isApplied()
                                }).catch((err) => {
                                    toast.error(err?.response?.data?.message)
                                })
                        }


                    }).catch((err) => {
                        toast.error(err?.response?.data?.message)
                        navigate('/login')
                    })


            } catch (err) {
                toast.error('Internal server error')
                navigate('/login')
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
                <JobDetailsComponent data={data} buttons={<UserJobDetailsButtons handleAppliation={handleAppliation} applied={applied} isApplied={isApplied} userId={userData?._id} jobPostId={data?._id}
                    saved={saved} setSaved={setSaved}

                />} />
                {
                    showModal && applicationData &&
                    <ApplicationAnswerModal onClose={() => setShowModal(false)} questions={data?.questions || []} applicationData={applicationData} />
                }
            </div>
            <Footer/>

        </>
    )
}

export default JobDetails
