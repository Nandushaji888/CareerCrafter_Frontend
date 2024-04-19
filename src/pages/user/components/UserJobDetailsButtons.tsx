import { AxiosError } from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axios/axiosInstance';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL



interface UserJobDetailsButtonsComponent {
    handleAppliation: any;
    applied: boolean
    userId:string;
    jobPostId:string;
    isApplied:any;
    saved:boolean,
    setSaved:any;
    
}
interface ErrorResponse{
    message:string
}

const UserJobDetailsButtons: React.FC<UserJobDetailsButtonsComponent> = ({ handleAppliation, applied,userId,jobPostId,isApplied,saved,setSaved }) => {
    const navigate = useNavigate()

    const handleSave = async (e: any) => {
        e.preventDefault()
        isApplied()
        const data = {userId,jobPostId}

        axiosInstance.post(`${AUTH_BASE_URL}/save-post`,data,)
        .then((res)=> {
            if(res?.data?.status){
                setSaved(true)
                toast.success('Job saved successfully')
            }else{
                toast.error('Internal server error')
            }
        })
        .catch((error:AxiosError)=> {
            if (error.response && error.response.status === 401) {
                navigate('/login')
            }else{
                console.log(error?.response?.data);
                
                toast.error((error?.response?.data as ErrorResponse)?.message||'Internal server error occured')
                console.log('Error',error);
                
            }

        })

    }

    return (
        <div className='flex  flex-row gap-4 justify-center items-center mt-10 ms-20'>


            {/* {resume &&

                <div className='mt-10' >

                    <button className='bg-blue-800 text-white buttony-2 mb-5  py-2 rounded-3xl px-5'>View your resume</button>

                </div>
            } */}

            {
                applied ? (

                    <button className='bg-gray-500 text-white py-2 mb-5 disabled:  rounded-3xl px-5'>Applied</button>
                ) : (

                    <button onClick={handleAppliation} className='bg-black text-white py-2 mb-5  rounded-3xl px-5'>Apply</button>
                )
            }

            {
                saved ? (

                    <button className='bg-green-300 text-white py-2 mb-5 disabled:  rounded-3xl px-5'>Saved</button>
                    ):(
                        
                        <button onClick={handleSave} className='bg-green-800 text-white py-2 mb-5  rounded-3xl px-5'>Save</button>
                )
            }

        </div>
    )
}

export default UserJobDetailsButtons
