import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import avatar from '../../../public/userProfilePic/User-Profile-PNG-Download-Image.png'
import { useParams } from 'react-router-dom'
import { IUser } from '../../utils/interface/interface';


const UserDetails: React.FC = () => {
    const dispatch = useDispatch();
    // const userData = useSelector((state: any) => state.persisted.user.userData);
    const [file, setFile] = useState<File | null>(null);
    const [user,setUser] = useState<IUser>()
    const navigate = useNavigate()

    const baseUrl = 'http://localhost:4002/api/admin';



    const { id } = useParams();
    useEffect(() => {
        console.log(id);

        axios.get(`${baseUrl}/user/${id}`, { withCredentials: true })
        .then((res:any)=>{
            console.log('res.data');
            console.log(res.data);
            setUser(res?.data?.user)
        })
    },[])






    return (
        <>
            {/* <Navbar /> */}
            
            <div className="max-w-4xl mx-auto py-8">
                <Toaster position='top-center' reverseOrder={false}></Toaster>

                <form className="py-2" >
                    <div className="bg-white shadow-md  px-10 pt-6 pb-8 mb-4 rounded-3xl ">
                        <h1 className="text-3xl font-bold my-4 text-center">User Profile</h1>
                        <div className="mb-4 flex items-center justify-center ">
                            <div className="profile flex justify-center py-2 pb-6 flex-col items-center">
                                {/* Show original image if available */}
                                {/* {userData.profilePic && ( */}
                                <img
                                    src={avatar}
                                    // src={`userProfilePic/User-Profile-PNG-Download-Image.png`}
                                    alt="avatar"
                                    width="200px"
                                    height="105px"
                                    className="profile_img border-4 border-gray-100  object-cover shadow-lg hover:border-gray-200 rounded-3xl"
                                />
                                {/* )} */}
                                {/* Show image preview if available */}
                                {/* {image ? (
                                <img
                                    alt="Profile pic"
                                    width="80px"
                                    height="60px"
                                    className='mt-6'
                                    src={image ? URL.createObjectURL(image) : ""}
                                ></img>
                            ) : (
                                ""
                            )} */}
                                {/* <input
                                type="file"
                                className="custom-file-input mt-10"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={(e: any) => setImage(e.target.files[0])}
                                accept="image/*"
                            /> */}
                            </div>
                        </div>


                        <div className='flex text-2xl font-semibold text-center-center justify-center my-5 pb-5'>
                            {user?.name}
                        </div>
                        <div className="mb-4 flex items-center gap-20">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="email"
                                    readOnly
                                value={user?.email}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="tel"
                                    readOnly
                                value={user?.phone}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="date"
                                    name="dateOfBirth"
                                value={user?.dateOfBirth}
                                />



                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                About You
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                // placeholder="aboutYou"
                                name='aboutYou'
                            value={user?.aboutYou}
                            ></textarea>

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Skills
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                // placeholder="Skills"
                                name='skills'
                            value={user?.skills}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Qualifications
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                // placeholder="Qualifications"
                                name='qualification'
                            value={user?.qualification}

                            ></textarea>

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Resume
                            </label>
                            <h3>{user?.resume}</h3>
                            {/* <input
                                type="file"
                                name='file'
                                // value={user?.resume}
                                className="custom-file-input"
                                // onChange={(e: any) => setFile(e.target.files[0])}
                                accept="application/pdf"
                                required
                            /> */}
                        </div>


                        {/* <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" // Change type to "submit"
                            >
                                Update
                            </button>
                        </div> */}
                    </div>

                </form>

            </div>
        </>
    );
};

export default UserDetails;
