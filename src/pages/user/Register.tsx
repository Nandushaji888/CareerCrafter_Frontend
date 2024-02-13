import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../assets/ZKZg.gif';
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../../helper/Validate'
import axios from 'axios'



const Register = () => {
    const [loading, setLoading] = useState(false)
    const baseurl = "http://localhost:4000/api/auth/user";

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',  
            password: '',
            // confirm_pwd: ''
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setLoading(true);
            // Check if the form is valid
            console.log('formik.isValid');
            console.log(formik.isValid);
            
            if (formik.isValid) {
                axios
                    .post(`${baseurl}/signup`, { values }, { withCredentials: true })
                    .then((res) => {
                        if (res.data.status) {
                            console.log(res.data);
                            
                            navigate('/verify-otp');
                        } else {
                            toast.error(res?.data?.message);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        toast.error('An error occurred.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false); // Reset loading state

            }
        }
    }
    )
    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className="glass bg-slate-100 py-10 px-10 rounded-3xl w-1/3">
                    <div className="title flex flex-col items-center">
                        <h3 className="text-5xl pb-4 font-bold text-blue-800">CareerCrafter</h3>
                        <h6 className="text-2xl pb-4 font-bold underline text-gray-600">Register</h6>

                        <span className="pt-4 pb-8 text-xl w-5/6 text-center text-gray-500">
                            Explore more by connecting with us
                        </span>
                    </div>
                    <form className="py-2" onSubmit={formik.handleSubmit}>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps('name')}
                                type="text"
                                placeholder="Name"
                                className="border-0 px-5 py-4 rounded-xl w-11/12 max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            <input
                                {...formik.getFieldProps('email')}
                                type="text"
                                placeholder="Email"
                                className="border-0 px-5 py-4 rounded-xl w-11/12 max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            <input
                                {...formik.getFieldProps('phone')}
                                type="text"
                                placeholder="Phone Number"
                                className="border-0 px-5 py-4 rounded-xl w-11/12 max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            <input
                                {...formik.getFieldProps('password')}
                                type="password"
                                placeholder="Password"
                                className="border-0 px-5 py-4 rounded-xl w-11/12 max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            {/* <input
                                {...formik.getFieldProps('confirm_pwd')}
                                type="password"
                                placeholder="Confirm password"
                                className="border-0 px-5 py-4 rounded-xl w-11/12 max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            /> */}
                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-800 py-3 px-5 rounded-2xl w-11/12 max-w-md text-white" style={{ position: 'relative', minHeight: '50px' }}>
                                {loading ?
                                    <img src={Loading} alt="loading" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }} />
                                    : 'Sign up'
                                }
                            </button>


                        </div>
                        <div className="text-center py-4">
                            <span>
                                Already Registered{' '}
                                <Link to="/login" className="text-blue-600 hover:text-blue-400 ">
                                    Sign in now
                                </Link>{' '}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
