import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { IUser } from '../interface/interface'
import { useLocation, useNavigate } from 'react-router-dom'
import { clearRecruiter } from '../redux/slices/recruiterSlice'
import { clearUser } from '../redux/slices/userSlice'

const useGetConversations = () => {
    const [loading,setLoading] = useState(false)
    const [conversation,setConversation]=useState<IUser[]>()
    const messageUrl = 'http://localhost:4005/api/messages';

    const location = useLocation();
    const currentRoute = location.pathname;
 
    const messenger = useSelector((state:any) => {
        // const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
        const userData = currentRoute==='/recruiter/messages'?state.persisted.recruiter.recruiterData:state.persisted.user.userData
        return userData;
       });

       const navigate = useNavigate()
       const dispatch = useDispatch()
useEffect(()=> {
    
    const getConverstions = async()=> {        
        setLoading(true)
        try {
       
            
            await axios.get(`${messageUrl}/users/${messenger?._id}`,{withCredentials:true})
            .then((res:any)=> {
                if(res?.data?.status){  
            
                                     
                    setConversation(res?.data?.messagedUsers.reverse())
                    
                }
            })
            
        } catch (error:any) {
            // toast.error(error)
            if(error?.response?.status){
                messenger?.worksAt ? dispatch(clearRecruiter()):dispatch(clearUser())
                messenger?.worksAt ? navigate('/recruiter/login'):navigate('/login')
            }
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
