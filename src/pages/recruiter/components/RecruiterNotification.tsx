import  { useEffect } from 'react'
import RecruiterNavbar from './RecruiterNavbar'
import NotificationPage from '../../../components/NotificationPage'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RecruiterNotification = () => {
    const messenger = useSelector((state: any) => state.persisted.recruiter.recruiterData);
    const navigate = useNavigate()
    useEffect(()=>{        
        if(!messenger?._id){
            console.log('no recruiter');
            
            navigate('/recruiter/login')
        }
    },[messenger?._id, navigate])
  return (

  <>
  <RecruiterNavbar/>
  <NotificationPage messenger= {messenger} />
  </>
  )
}

export default RecruiterNotification
