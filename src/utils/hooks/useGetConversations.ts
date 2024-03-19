import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const useGetConversations = () => {
    const [loading,setLoading] = useState(false)
    const [conversation,setConversation]=useState([])
    const messageUrl = 'http://localhost:4005/api/messages';
    const messenger = useSelector((state:any) => {
        const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
        return userData;
       });
useEffect(()=> {
    const getConverstions = async()=> {
        setLoading(true)
        try {
            await axios.get(`${messageUrl}/users/${messenger?._id}`)
            .then((res)=> {
                setConversation(res?.data?.messagedUsers)
            })
            
        } catch (error) {
            // toast.error(error)
            console.log(error);
            
        }
    }
})
}

export default useGetConversations
