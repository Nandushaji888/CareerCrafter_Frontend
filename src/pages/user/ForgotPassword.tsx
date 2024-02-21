import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../assets/profile.png';
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { emailValidation } from '../../helper/Validate'
import axios from 'axios';
import { useEffect } from 'react';
// import Loading from '../../assets/ZKZg.gif';



const Login = () => {
    const navigate = useNavigate()
    const [otpInput, setOtpInput] = useState(false)
    const [otp, setOtp] = useState('')
    const [time, setTime] = useState(10)
    // const [loading, setLoading] = useState(false)



    useEffect(() => {
        const interval = setInterval(() => {
            if (time > 0) {
                setTime(prevTime => prevTime - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    // useEffect(() => {

    //     const jwtToken = localStorage.getItem('user-jwtToken');
    //     if (jwtToken) {
    //         navigate('/home');
    //     }
    // }, [navigate]);
    // useEffect(() => {
    //     const accessToken = document.cookie.replace(
    //       /(?:(?:^|.*;\s*)user_accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    //       "$1"
    //     );
    //     console.log('accessToken');
    //     console.log(accessToken);

    //     if (accessToken) {
    //       // Redirect to home page if access token exists
    //       navigate('/home');
    //     }
    //   }, [navigate]);




    const baseurl = "http://localhost:4000/api/auth/user";


    const formik = useFormik({
        initialValues: {
            email: '',

        },
        validate: emailValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setTime(10)
            const { email } = values
            console.log(email);



            axios
                .post(`${baseurl}/forgot-password`, { email }, { withCredentials: true })
                .then((res) => {
                    if (res.data.status) {
                        console.log(res.data);
                        setOtpInput(true)
                        toast.success(res.data.message)



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


    const resetOTPhandler = (e: any) => {
        console.log('reached here');
        e.preventDefault()
        setTime(10)

        axios
            .get(`${baseurl}/resend-otp`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    toast.success("OTP re-sent successfully");
                    setTime(10);
                } else {
                    toast.error(res.data.message || "Failed to resend OTP");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('An error occurred while resending OTP');
            });
    }


    const otpValidation = (e:any) => {
        e.preventDefault()
        axios.post(`${baseurl}/otp-verify`,{otp},{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            if(res.data.status){
                navigate('/new-password')
            }
        })
        .catch((error)=> {
            console.error(error);
            toast.error(error?.response?.data?.message);

        })
    }

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={`bg-slate-100 pt-14 pb-10 px-10 rounded-3xl ${otpInput ? 'h-[620px]' : 'h-[510px]'}`}>
                    <div className="title flex flex-col items-center">
                        <h3 className="text-4xl pb-3 px-8 font-bold text-blue-800">CareerCrafter</h3>
                        <h6 className="text-2xl pb-3 font-bold  text-gray-600">Forgot Password</h6>


                    </div>
                    <form className="py-2" onSubmit={otpInput ? otpValidation : formik.handleSubmit}>
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

                            {
                                otpInput ? <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP here"
                                    className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                                /> :
                                    ''
                            }

                            {
                                otpInput ?
                                    <div className='flex w-full items-center justify-between '>
                                        <p>Resend OTP in:{" "}
                                            <span className='font-bold text-green-600'>
                                                {time < 10 ? `00:0${time}` : `00:${time}`}
                                            </span>
                                        </p>
                                        <button onClick={resetOTPhandler}
                                            hidden={time > 0}
                                            className='text-blue-900 font-semibold'
                                        >
                                            Resend OTP

                                        </button>
                                    </div>
                                    : ''
                            }



                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-800 my-2  py-3 px-5 rounded-2xl w-full max-w-md text-white">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
