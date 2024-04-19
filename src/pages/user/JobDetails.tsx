import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/NavBar';
import { addUser, clearUser } from '../../utils/redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationAnswerModal from '../../components/ApplicationAnswerModal';
import { IApplication, RootState } from '../../utils/interface/interface';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import UserJobDetailsButtons from './components/UserJobDetailsButtons';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axios/axiosInstance';
import { ApplicationType } from '../../utils/interface/enums';
const USER_BASE_URL = import.meta.env.VITE_USER_BASE_URL
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL
const APPLICATION_BASE_URL = import.meta.env.VITE_APPLICATION_BASE_URL
// import JobDetailsComponent from '../../components/JobDetailsComponent';

const JobDetails = () => {
    const userData = useSelector((state: RootState) => state.persisted.user.userData);
    const location = useLocation();
    const receivedData = location.state?.data;
    const [data, setData] = useState(receivedData?.data)
    const [resume, setResume] = useState<File>()



    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [applicationData, setApplicationData] = useState<IApplication>()
    // const [user, setUser] = useState<IUser>()
    const [applied, setApplied] = useState(false)
    const [saved, setSaved] = useState(false)
    const navigate = useNavigate()

    const { id } = useParams();



    const isApplied = () => {

        if (userData._id) {
            axiosInstance.get(`${USER_BASE_URL}/${userData._id}`)
                .then((res) => {


                    if (res?.data?.status) {
                        // setUser(res?.data?.user)
                        dispatch(clearUser())
                        dispatch(addUser(res?.data?.user))
                        if (res?.data?.user?.appliedJobs.includes(id)) {
                            console.log('before ture');

                            setApplied(true)
                        }
                        if (res?.data?.user?.savedJobs.includes(id)) {
                            setSaved(true)
                        }
                    } else {
                        navigate("/error")

                    }


                }).catch((err) => {
                    console.log(err);
                    setApplied(false)
                    setSaved(false)


                    // navigate("/error")
                })
        }
    }
    useEffect(() => {

        if (userData?._id) {
            isApplied()
        }
    }, [userData?._id])

    useEffect(() => {
        const fetchData = async () => {

            // isApplied();
            axiosInstance.get(`${POST_BASE_URL}/job-details/${id}`)
                .then((response) => {

                    if (response?.data?.status) {
                        setData(response?.data?.jobData);
                    }
                })
                .catch((error) => {
                    if (error && error.response.status === 401) {
                        navigate("/login");
                        return

                    }
                    if (error && error?.response?.status === 404) {
                        navigate("/error");
                        return
                    }
                    console.error("Error fetching data:", error);
                    navigate("/error");
                })

        }
        fetchData();
        window.scrollTo(0, 0);
    }
        , [POST_BASE_URL, id, navigate]);



    useEffect(() => {
        const fetchResume = async () => {
            try {

                await axiosInstance.get(`${USER_BASE_URL}/${userData?._id}`)
                    .then((res) => {
                        if (res?.data?.status) {
                            const resume = res?.data?.user?.resume
                            setResume(resume)
                            dispatch(addUser(res?.data?.user))

                        }
                    })
            } catch (error) {
                console.error('Error fetching resume:', error);
                // toast.error("Error in fetching")
            }
        };
        if (!userData.resume) {

            fetchResume();
        } else {
            setResume(userData.resume);
        }
    }, [USER_BASE_URL, dispatch, userData?._id, userData.resume]);



    const handleAppliation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        isApplied()

        if (!userData?._id) {
            navigate('/login')
            return
        }
        if (!resume) {
            toast.error('Please upload your resume')
            return
        }

        const formData: IApplication = {
            userId: userData?._id,
            jobPostId: data?._id,
            postName: data?.postName,
            company: data?.company,
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

                axiosInstance.get(`${USER_BASE_URL}/${userData._id}`)
                    .then((res: any) => {
                        if (!res.data?.status) {
                            navigate('/login')
                        } else {
                            axiosInstance.post(`${APPLICATION_BASE_URL}/create-application`, formData)
                                .then((res) => {
                                    setApplied(true)
                                    console.log('set applied true');
                                    toast.success(res?.data?.message)

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
                <JobDetailsComponent data={data} buttons={<UserJobDetailsButtons handleAppliation={handleAppliation} applied={applied} isApplied={isApplied} userId={userData?._id || ''} jobPostId={data?._id}
                    saved={saved} setSaved={setSaved}

                />} />
                {
                    showModal && applicationData &&
                    <ApplicationAnswerModal onClose={() => setShowModal(false)} questions={data?.questions || []} applicationData={applicationData} setApplied={setApplied} />
                }
            </div>
            <Footer />

        </>
    )
}

export default JobDetails
