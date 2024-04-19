import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addRecruiter } from '../../utils/redux/slices/recruiterSlice'
import axiosInstance from '../../utils/axios/axiosInstance'
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL


const OtpVerification = () => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);
    useEffect(() => {
        if (recruiterData?._id) {
            navigate('/recruiter');
        }
    }, [navigate, recruiterData]);



    const submitHandler = async (e: any) => {
        e.preventDefault()
        if (otp === "") {
            toast.error('OTP cannot be empty...')
        } else if (otp.length !== 6) {
            toast.error('OTP Should have 6 characters')

        } else {
            axiosInstance
                .post(`${AUTH_BASE_URL}/recruiter/verify-otp`, { otp })
                .then((res) => {
                    console.log(res.data);
                    if (res.status) {

                        console.log('res?.data?.recruiter?.response');
                        console.log(res?.data?.recruiter?.response);

                        dispatch(addRecruiter(res?.data?.recruiter?.response))

                        navigate('/recruiter')

                    }
                })
        }

    }

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className="glass bg-slate-100 py-20 px-10 rounded-3xl w-15">
                    <div className="title flex flex-col items-center">
                        <h3 className="text-4xl pb-4 font-bold text-blue-800">CareerCrafter</h3>
                        <span className="py-4 text-xl w-4/6 text-center text-gray-500">
                            OTP has been send to your email...
                        </span>
                    </div>
                    <form className="py-2" onSubmit={submitHandler}>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="enter otp here"
                                className="border-0 px-5 py-4 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />


                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-800 py-3 px-5 rounded-2xl w-full max-w-md text-white">
                                Submit
                            </button>
                        </div>
                        <div className="text-center pt-4">

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpVerification
