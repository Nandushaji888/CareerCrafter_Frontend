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
        
        if (userData._id) {            
            axios.get(`${baseUrl}/${userData._id}`, { withCredentials: true })
                .then((res: any) => {


                    if (res?.data?.status) {
                        setUser(res?.data?.user)
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
    useEffect(()=> {
        
        if(userData?._id){
            isApplied()
        }
    },[])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // isApplied();
                const response = await axios.get(`${postUrl}/job-details/${id}`, { withCredentials: true });
                if (response?.data?.status) {
                    setData(response?.data?.jobData);
                }
            } catch (error: any) {
                console.log('error');
                console.log(error);

                if (error && error?.response?.status === 401) {
                    navigate("/login");
                    return

                }
                if (error && error?.response?.status === 404) {
                    navigate("/error");
                    return
                }
                console.error("Error fetching data:", error);
                navigate("/error");
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);



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
            // toast.error("Error in fetching")
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
            postName:data?.postName,
            company:data?.company,
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
                        if (!res.data?.status) {
                            navigate('/login')
                        } else {
                            axios.post(`${applicationUrl}/create-application`, formData, { withCredentials: true })
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
                <JobDetailsComponent data={data} buttons={<UserJobDetailsButtons handleAppliation={handleAppliation} applied={applied} isApplied={isApplied} userId={userData?._id} jobPostId={data?._id}
                    saved={saved} setSaved={setSaved}

                />} />
                {
                    showModal && applicationData &&
                    <ApplicationAnswerModal onClose={() => setShowModal(false)} questions={data?.questions || []} applicationData={applicationData} setApplied={setApplied}/>
                }
            </div>
            <Footer />

        </>
    )
}

export default JobDetails
