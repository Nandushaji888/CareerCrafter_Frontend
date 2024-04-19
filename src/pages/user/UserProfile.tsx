import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from '../../helper/userValidate';
import toast, { Toaster } from 'react-hot-toast';
import { addUser, clearUser } from '../../utils/redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import { IUser, RootState } from '../../utils/interface/interface';
import axiosInstance from '../../utils/axios/axiosInstance';
const USER_BASE_URL = import.meta.env.VITE_USER_BASE_URL




// Define interface for form data
interface FormData {
    name: string;
    email: string;
    phone: string;
    aboutYou: string;
    dateOfBirth: string;
    resume: File | null;
    qualification: string;
    skills: string;
    profilePic: string;
    location: string;
    secondarySkills: string;
    experience: string;
    status: boolean | undefined
}

const LazyUserDetailsInProfile = lazy(() => import('./components/UserDetailsInProfile'));

const UserProfile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.persisted.user.userData);
    const [userData, setUserData] = useState<IUser | null>(user);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        // axios.get(`${baseUrl}/${user._id}`, { withCredentials: true })
        axiosInstance.get(`${USER_BASE_URL}/${user?._id}`)
            .then((res) => {
                console.log('response in userprofile');
                console.log(res.data);
                
                
                if (!res?.data?.status) {
                    console.log('nothing is there');
                    
                    navigate('/login');
                }
                setUserData(res?.data?.user);
                setFile(res?.data?.user?.resume);
            })
            .catch((error) => {
                console.log('in catch of first');
                
                console.error('Error fetching user data:', error);
                dispatch(clearUser());
                navigate('/login');
            });
    }, [dispatch, navigate, user._id]);

    const [formData, setFormData] = useState<FormData>({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        aboutYou: userData?.aboutYou || '',
        dateOfBirth: userData?.dateOfBirth || '',
        resume: userData?.resume || null,
        qualification: userData?.qualification || '',
        skills: userData?.skills || '',
        profilePic: userData?.profilePic || '',
        location: userData?.location?.locationName || '',
        secondarySkills: userData?.secondarySkills || '',
        experience: userData?.experience || '',
        status: userData?.status,
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                aboutYou: userData.aboutYou || '',
                dateOfBirth: userData.dateOfBirth || '',
                resume: userData.resume || null,
                qualification: userData.qualification || '',
                skills: userData.skills || '',
                profilePic: userData.profilePic || '',
                location: userData.location?.locationName || '',
                secondarySkills: userData.secondarySkills || '',
                experience: userData.experience || '',
                status: userData.status,
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            resume: file ? file : null
        }));
    }, [file]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResult = validate(formData);
        if (!validationResult.isValid) {
            toast.error(validationResult.errorMessage);
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'resume' && value) {
                formDataToSend.append(key, value as File);
            } else {
                formDataToSend.append(key, value);
            }
        });

        axiosInstance.post(`${USER_BASE_URL}/update-user`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then((res) => {
                dispatch(addUser(res.data?.user));
                toast.success(res.data.message);
                navigate('/user-profile');
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 py-8">
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                {
                    userData &&
                    <Suspense fallback={<div className='flex w-7/12 justify-center items-center text-2xl '>Loading...</div>} >
                        <LazyUserDetailsInProfile handleSubmit={handleSubmit} userData={userData} formData={formData} handleChange={handleChange} setFile={setFile} />
                    </Suspense>
                }
            </div>
        </>
    );
};

export default UserProfile;
