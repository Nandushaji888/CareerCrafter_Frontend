import React,{useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Avatar from '../../assets/profile.png';
import { Toaster,toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import {signinValidation} from '../../helper/Validate'
import axios from 'axios';


const Login = () => {

    const baseurl = "http://localhost:4000/api/auth/admin";

    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = localStorage.getItem('admin-jwtToken');
        if (jwtToken) {
            // console.log('find token',jwtToken);
            
            navigate('/admin/home');
        }
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate:signinValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values);
            
            
                axios
                    .post(`${baseurl}/login`, { values }, { withCredentials: true })
                    .then((res) => {
                        if (res.data.status) {
                            console.log(res.data);
                            localStorage.setItem('admin-jwtToken', res.data.accessToken);
                            // console.log('created token');
                            
                            navigate('/admin/home');
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
    return (
        <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
            <div className=" bg-slate-100 pt-14 pb-10  px-10 rounded-3xl h-[600px] w-3/12">
                <div className="title flex flex-col items-center">
                        <h3 className="text-4xl pb-3 font-bold text-blue-800">CareerCrafter</h3>
                        <h6 className="text-2xl pb-3 font-bold  text-gray-600">Admin Login</h6>

                        {/* <span className="pt-4 pb-4 text-xl w-full text-center text-gray-500">
                            Explore more by connecting with us
                        </span> */}
                    </div>
                    <form className="py-2" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-2 pb-6">
                            <img
                                src={Avatar}
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

                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-800  my-5 py-3 px-5 rounded-2xl w-full max-w-md text-white">
                                Let's Go
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
