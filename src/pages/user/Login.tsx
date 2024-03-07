import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../assets/profile.png';
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { signinValidation } from '../../helper/Validate'
import axios from 'axios';
import { useEffect } from 'react';
import { auth } from '../../utils/firebase/config'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/redux/slices/userSlice';
import '../../assets/css/Auth.css'
import { IUser } from '../../utils/interface/interface';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const jwtToken = localStorage.getItem('user-jwtToken');
        if (jwtToken) {
            navigate('/home');
        }
    }, [navigate]);




    const baseurl = "http://localhost:4000/api/auth/user";


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: signinValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values);


            axios
                .post(`${baseurl}/login`, { values }, { withCredentials: true })
                .then((res) => {
                    if (res.data.status) {
                        console.log('res.data');
                        console.log(res.data);
                        const data: IUser = {
                            _id: res?.data?.user?._id || "",
                            name: res?.data?.user?.name || "",
                            email: res?.data?.user?.email || "",
                            phone: res?.data?.user?.phone || "",
                            isGoogle: res?.data?.user?.isGoogle ? true : false,
                            type: res?.data?.user?.type || "",
                            status: res?.data?.user?.status || "",
                            aboutYou: res?.data?.user?.aboutYou || "",
                            dateOfBirth: res?.data?.user?.dateOfBirth || "",
                            appliedJobs: res?.data?.user?.appliedJobs || [],
                            savedJobs: res?.data?.user?.savedJobs || [],
                            createdOn: res?.data?.user?.createdOn || Date.now(),
                            editedOn: res?.data?.user?.createdOn || Date.now(),
                            resume: res?.data?.user?.resume || "",
                            qualification: res?.data?.user?.qualification || '',
                            skills: res?.data?.user?.skills || '',
                            profilePic: res?.data?.user?.profilePic || "User-Profile-PNG-Download-Image.png"
                        }
                        dispatch(addUser(data))
                        localStorage.setItem('user-jwtToken', res.data.accessToken);

                        navigate('/home');
                    } else {
                        toast.error(res?.data?.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('An error occurred.');
                })



        }
    })

    // const googleAuthhandler = async () => {
    //     signInWithPopup(auth, provider).then((data: any) => {
    //         setUser(data.user);
    //     });
    // };

    // // useEffect to log `user` whenever it changes
    // useEffect(() => {
    //     console.log(user);
    // }, [user]); 

    const GoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const googleAuth = signInWithPopup(auth, provider);
            return googleAuth;
        } catch (error) {
            console.log("Error in the the gogle auth firebase", error);
        }
    };


    const googleAuthhandler = async (e: any) => {
        e.preventDefault();
        await GoogleAuth().then(async (data: any) => {
            const userData = {
                email: data.user.email,
                name: data.user.displayName,
                isGoogle: true,
            };
            dispatch(addUser(userData))
            console.log(userData);
            axios
                .post(`${baseurl}/google-auth`, { userData }, { withCredentials: true })
                .then((res) => {

                    if (res.data.status) {
                        ;
                        console.log('res.data');
                        console.log(res.data);
                        localStorage.setItem('user-jwtToken', res.data.user_accessToekn);
                        if (res?.data?.googleSignup) {
                            console.log('to user-profile');

                            navigate('/user-profile')
                        } else {

                            navigate('/home');
                        }

                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error(error.response?.data?.message);
                })


        })
    };










    return (
        <div className="bg-container container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className=" bg-slate-100 py-10   px-10 rounded-3xl h-[750px]">
                    <div className="title flex flex-col items-center">
                        <h3 className="text-4xl pb-3 font-bold text-blue-800">CareerCrafter</h3>    
                        <h6 className="text-2xl pb-3 font-bold  text-gray-600">User Login</h6>

                        <span className="pt-4 pb-4 text-xl w-full text-center text-gray-500">
                            Explore more by connecting with us
                        </span>
                    </div>
                    <form className="py-2" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-2 pb-6">
                            <img
                                src='profile.png'
                                alt="avatar"
                                className="profile_img border-4 border-gray-100 w-32 rounded-full shadow-lg  hover:border-gray-200"
                            />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps('email')}
                                type="text"
                                placeholder="Email"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            <input
                                {...formik.getFieldProps('password')}
                                type="password"
                                placeholder="Password"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            <div className="text-center ">
                                <span>
                                    Forgot Password?{' '}
                                    <Link to="/forgot-password" className="text-blue-600 hover:text-blue-400 ">
                                        Click here
                                    </Link>{' '}
                                </span>
                            </div>


                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-800   py-3 px-5 rounded-2xl w-full max-w-md text-white">
                                Let's Go
                            </button>

                        </div>
                    </form>
                    <button onClick={googleAuthhandler} className="btn bg-blue-600 hover:bg-blue-800 py-2 px-5 mt-1  rounded-2xl w-full max-w-md text-white flex items-center justify-center">
                        <img className='rounded-3xl mr-2' src='google image.png' alt="Google Logo" width={30} />
                        Sign in With Google
                    </button>

                    <div className="text-center py-2 mt-3">
                        <span>
                            Not a Member{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-400 ">
                                Register now
                            </Link>{' '}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
