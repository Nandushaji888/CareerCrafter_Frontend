import Avatar from '../../assets/profile.png';
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { passwordVerification } from '../../helper/Validate'
import '../../assets/css/Auth.css'




const NewPassword = () => {
    const baseurl = "http://localhost:4000/api/auth/user";

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd: ''
        },
        validate: passwordVerification,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const { password } = values
            console.log('values');
            console.log(password);
            axios.post(`${baseurl}/new-password`, { password }, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        toast.success(res.data.message);
                        setTimeout(() => {
                            navigate('/login'); 
                        }, 1000); 

                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(error?.response?.data?.message);
                })

            // axios
            //     .post(`${baseurl}/login`, { values }, { withCredentials: true })
            //     .then((res) => {
            //         if (res.data.status) {

            //         } else {
            //             toast.error(res?.data?.message);
            //         }
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //         toast.error('An error occurred.');
            //     })



        }
    })
    return (
        <div className='bg-container container mx-auto'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
                <div className='bg-slate-100 h-4/6 pt-14 pb-10 px-10 rounded-3xl'>
                    <div className='flex flex-col items-center'>

                        <h3 className='font-bold text-4xl text-blue-800 pb-3'>CareerCrafter</h3>
                        <h6 className='text-2xl font-bold text-gray-600 pb-3' >New Password</h6>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-2 pb-6">
                            <img
                                src={Avatar}
                                alt="avatar"
                                className="profile_img border-4 border-gray-100 w-32 rounded-full shadow-lg  hover:border-gray-200"
                            />
                        </div>
                        <div className='flex flex-col items-center gap-4'>
                            <input
                                {...formik.getFieldProps('password')}
                                type="password"
                                placeholder="Password"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                            <input
                                {...formik.getFieldProps('confirm_pwd')}
                                type="password"
                                placeholder="Confirm Password"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white "
                            />
                        </div>
                        <button type="submit" className="btn bg-blue-600 hover:bg-blue-800 my-6   py-3 px-5 rounded-2xl w-full max-w-md text-white">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewPassword
