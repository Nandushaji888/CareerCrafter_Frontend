import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { IUser } from '../interface/interface'

const useGetConversations = () => {
    const [loading,setLoading] = useState(false)
    const [conversation,setConversation]=useState<IUser[]>()
    const messageUrl = 'http://localhost:4005/api/messages';
    const messenger = useSelector((state:any) => {
        const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
        return userData;
       });
useEffect(()=> {
    console.log('get conversations');
    
    const getConverstions = async()=> {
        setLoading(true)
        try {
            console.log(`${messageUrl}/users/${messenger?._id}`);
            
            await axios.get(`${messageUrl}/users/${messenger?._id}`)
            .then((res)=> {
                console.log('res?.data?.messagedUsers');
                console.log(res?.data?.messagedUsers);
                
                setConversation(res?.data?.messagedUsers)
            })
            
        } catch (error) {
            // toast.error(error)
            console.log(error);
            
        } 
        finally{
            setLoading(false)
        }
    }
    getConverstions()
},[])
return {loading,conversation,setConversation}
}

export default useGetConversations
