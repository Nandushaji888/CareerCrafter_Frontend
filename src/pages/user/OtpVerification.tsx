import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../../assets/ZKZg.gif';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/redux/slices/userSlice';
import '../../assets/css/Auth.css'
import { IUser } from '../../utils/interface/interface';
import axiosInstance from '../../utils/axios/axiosInstance';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL




const OtpVerification = () => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const [time, setTime] = useState(10)

    const navigate = useNavigate()


    const user = useSelector((state: any) => state.persisted.user.userData);
    useEffect(() => {

        if (user._id) {
            navigate('/');
        }
    }, [navigate, user]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (time > 0) {
                setTime(prevTime => prevTime - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);


    const submitHandler = async (e: any) => {
        e.preventDefault();
        console.log('otp is ', otp);

        if (otp === "") {
            toast.error('OTP cannot be empty...')
        } else if (otp.length !== 6) {
            toast.error('OTP Should have 6 characters')

        } else {
            axiosInstance.post(`${AUTH_BASE_URL}/user/verify-otp`, { otp })
                .then((res) => {
                    console.log('res.status',res.data);
                    
                    if (res.status === 201 && res.data.status) {

                        const data :IUser={
                            _id:res?.data?.user?._id ||"",
                            name: res?.data?.user?.name||"" ,
                            email: res?.data?.user?.email||"",
                            phone:res?.data?.user?.phone||"",
                            isGoogle:res?.data?.user?.isGoogle?true:false,
                            type:res?.data?.user?.type||"",
                            status:res?.data?.user?.status||"",
                            aboutYou:res?.data?.user?.aboutYou||"",
                            dateOfBirth:res?.data?.user?.dateOfBirth ||"",
                            appliedJobs:res?.data?.user?.appliedJobs||[],
                            savedJobs:res?.data?.user?.savedJobs||[],
                            createdOn:res?.data?.user?.createdOn||Date.now(),
                            editedOn:res?.data?.user?.createdOn||Date.now(),
                            resume:res?.data?.user?.resume||"",
                            qualification:res?.data?.user?.qualification||"",
                            skills:res?.data?.user?.skills||"",
                            profilePic:res?.data?.user?.profilePic||"User-Profile-PNG-Download-Image.png"
                        }
                        console.log('data');
                        console.log(data);
                        
                        dispatch(addUser(data))

                        // localStorage.setItem('accessToken', res.data.accessToken);
                        navigate('/user-profile');}
                    // } else if (res.status === 401 && res.data.status1) {
                    //     toast.error('Incorrect OTP provided11');
                    // } else if (res.status === 401) {
                    //     toast.error(res.data.message);
                    // } 
                    else {
                        toast.error('An error occurred while verifying OTP');
                    }
                })
                .catch(error => {
                    console.error(error);
                    toast.error(error?.response?.data?.message);
                });

        }
    }

    const resetOTPhandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance
            .get(`${AUTH_BASE_URL}/user/resend-otp`,)
            .then((res) => {
                setLoading(false)
                console.log(res.data);
                if (res.data.status) {
                    toast.success("OTP sent successfully");
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

    return (
        <div className="bg-container container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className="glass bg-slate-100 py-20 px-10 rounded-3xl w-15">
                    <div className="title flex flex-col items-center">
                        <h3 className="text-4xl pb-4 font-bold text-blue-800">CareerCrafter</h3>
                        <span className="py-4 text-xl w-4/6 text-center text-gray-500">
                            OTP has been sent to your email...
                        </span>
                    </div>
                    <form className="py-2">
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP here"
                                className="border-0 px-5 py-4 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
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
                                    {loading ?
                                        <img src={Loading} alt="loading" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }} />
                                        : 'Resend OTP'
                                    }

                                </button>
                            </div>

                            <button onClick={submitHandler} type="submit" className="btn bg-blue-600 hover:bg-blue-800 py-3 px-5 rounded-2xl w-full max-w-md text-white">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpVerification;
