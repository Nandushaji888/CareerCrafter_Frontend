import axios from 'axios';
import React, { useState, useEffect, lazy, Suspense } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { validate } from '../../helper/userValidate'
import toast, { Toaster } from 'react-hot-toast'
import { addUser } from '../../utils/redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/NavBar';
import { IUser } from '../../utils/interface/interface';
// import UserDetailsInProfile from './components/UserDetailsInProfile';
// import avatar from '../../../public/User-Profile-PNG-Download
const LazyUserDetailsInProfile = lazy(() => import('./components/UserDetailsInProfile'))


const UserProfile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.persisted.user.userData);
    const [userData, setUserData] = useState<any>()
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate()
    const baseUrl = 'http://localhost:4002/api/user';


    useEffect(() => {

        axios.get(`${baseUrl}/${user._id}`, { withCredentials: true })
            .then((res: any) => {

                console.log(res.data);

                if (!res?.data?.status) {

                    navigate('/login')
                }
                setUserData(res?.data?.user)

            }).catch(() => {
                console.log('hereeee');

                navigate('/login')
            })

    }, [])



    const [formData, setFormData] = useState({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        aboutYou: userData?.aboutYou || '',
        dateOfBirth: userData?.dateOfBirth || '',
        resume: userData?.resume || file,
        qualification: userData?.qualification || '',
        skills: userData?.skills || '',
        profilePic: userData?.profilePic || '',
        status: userData?.status
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                aboutYou: userData.aboutYou || '',
                dateOfBirth: userData.dateOfBirth || '',
                resume: userData.resume || file,
                qualification: userData.qualification || '',
                skills: userData.skills || '',
                profilePic: userData.profilePic || '',
                status: userData.status
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
            resume: file?.name || file || ''
        }));
    }, [file]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResult = validate(formData);
        if (!validationResult.isValid) {
            toast.error(validationResult.errorMessage);
            return;
        }

        const data = { formData, file }

        axios.post(`${baseUrl}/update-user`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
            .then((res) => {
                dispatch(addUser(res.data?.user))
                toast.success(res.data.message)
                navigate('/user-profile')
                console.log(userData);

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
