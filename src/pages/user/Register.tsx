import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../assets/ZKZg.gif';
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../../helper/Validate'
import '../../assets/css/Auth.css'
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios/axiosInstance';
import axios from 'axios';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

interface LocationSuggestion {
    id: string;
    place_name: string;
    // Include other properties as needed
}
const MAPBOX_API_KEY = import.meta.env.VITE_MAP_BOX_ACCESS_KEY as string;




const Register = () => {
    const [loading, setLoading] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
    const navigate = useNavigate();

    const user = useSelector((state: any) => state.persisted.user.userData);
    useEffect(() => {

        if (user._id) {
            navigate('/');
        }
    }, [navigate, user]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            location: '',
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
                axiosInstance.post(`${AUTH_BASE_URL}/user/signup`, { values })
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

    const fetchLocationSuggestions = async (searchText: string) => {
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${MAPBOX_API_KEY}&country=IN`);
            setLocationSuggestions(response.data.features);
        } catch (error) {
            console.error('Failed to fetch location suggestions:', error);
        }
    };
    return (
        <div className="bg-container container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className="bg-slate-100 pt-10 pb-10 px-10 rounded-3xl h-[750px] md:h-auto md:max-w-xs lg:max-w-sm xl:max-w-md">
                    <div className="title flex flex-col items-center">
                        <h3 className="text-4xl pb-3 font-bold text-blue-800">CareerCrafter</h3>
                        <h6 className="text-2xl pb-3 font-bold text-gray-600">User Signup</h6>

                        <span className="pt-4 pb-6 text-xl w-full text-center text-gray-500">
                            Explore more by connecting with us
                        </span>
                    </div>
                    <form className="py-2" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps('name')}
                                type="text"
                                placeholder="Name"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white"
                            />
                            <input
                                {...formik.getFieldProps('email')}
                                type="text"
                                placeholder="Email"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white"
                            />
                            <input
                                {...formik.getFieldProps('phone')}
                                type="text"
                                placeholder="Phone Number"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white"
                            />
                            {/* <input
                                {...formik.getFieldProps('location')}
                                type="text"
                                placeholder="Your current location"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white"
                            /> */}
                            <input
                                {...formik.getFieldProps('location')}
                                type="text"
                                placeholder="Your current location"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white"
                                onChange={(e) => {
                                    formik.setFieldValue('location', e.target.value);
                                    if (e.target.value.length > 2) {
                                        fetchLocationSuggestions(e.target.value);
                                    }
                                }}
                            />
                            {/*
                             {locationSuggestions.map(suggestion => (
                                <div key={suggestion.id} onClick={() => {
                                    formik.setFieldValue('location', suggestion.place_name);
                                    setLocationSuggestions([]);
                                }}>
                                    {suggestion.place_name}
                                </div>
                            ))}
                             */}

                            <div className="suggestions-container" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                {locationSuggestions.slice(0, 4).map(suggestion => (
                                    <div key={suggestion.id} onClick={() => {
                                        formik.setFieldValue('location', suggestion.place_name);
                                        setLocationSuggestions([]);
                                    }}>
                                        {suggestion.place_name}
                                    </div>
                                ))}
                            </div>

                            <input
                                {...formik.getFieldProps('password')}
                                type="password"
                                placeholder="Password"
                                className="border-0 px-5 py-3 rounded-xl w-full max-w-md shadow-sm text-lg focus:outline-none bg-white"
                            />

                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-800 my-4 py-3 px-5 rounded-2xl w-full max-w-md text-white" style={{ position: 'relative', minHeight: '50px' }}>
                                {loading ?
                                    <img src={Loading} alt="loading" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }} />
                                    : 'Sign up'
                                }
                            </button>
                        </div>
                        <div className="text-center py-4">
                            <span>
                                Already a Member{' '}
                                <Link to="/login" className="text-blue-600 hover:text-blue-400">
                                    Login now
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
