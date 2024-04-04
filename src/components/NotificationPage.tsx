import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INotification } from '../utils/interface/interface';
import { clearUser } from '../utils/redux/slices/userSlice';
import { clearRecruiter } from '../utils/redux/slices/recruiterSlice';
interface NotificationProps {
  messenger:any
}

const NotificationPage:React.FC<NotificationProps> = ({messenger}) => {
  const [latestNotifications, setLatestNotifications] = useState<[INotification]>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = 'http://localhost:4005/api/notifications';


  useEffect(() => {
    console.log(messenger);
    
    axios.get(`${baseUrl}/${messenger?._id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const { notifications } = res?.data;
        setLatestNotifications(notifications.slice(0, 10));
        const unreadNotifications = notifications?.filter((notification: INotification) => !notification.readStatus);
        if (unreadNotifications.length > 0) {
          markNotificationsAsRead(unreadNotifications?.map((notification: INotification) => notification._id));
        }

      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          console.log(messenger);
          
          console.log(messenger?.worksAt);
          
          if (messenger?.worksAt) {
            console.log('recruiter');
            
            dispatch(clearRecruiter())
            navigate('/recruiter/login')
          } else {
            console.log('user');
            
            dispatch(clearUser());
            navigate('/login');

          }
        }
      });
  }, []);

  const markNotificationsAsRead = (notificationIds: string[]) => {
    // console.log('notificationIds');
    // console.log(notificationIds);

    axios.put(`${baseUrl}/mark-read`, { notificationIds }, { withCredentials: true })
      .then((res) => {
        console.log("Notifications marked as read:", res.data);
      })
      .catch((err) => {
        console.error("Error marking notifications as read:", err);
      });
  };

  const handleViewDetails = (jobPostId: string) => {
    if(messenger?.worksAt){

      navigate(`/recruiter/job-details/${jobPostId}`);
    }else{
      navigate(`/job-details/${jobPostId}`);

    }
  };

  return (
    <>
      <div className="min-h-screen mt-14 px-48 w-full bg-white border-l border-gray-300 z-50">
        <h1 className='text-3xl font-bold pt-10 mb-10'>Notifications</h1>
        <div className="p-4">
          {latestNotifications?.map(notification => (

            <div key={notification._id} className={`border border-gray-300 p-8 mb-2 rounded-lg shadow-md ${notification?.readStatus ? 'bg-white' : 'bg-blue-100'}`} >
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-semibold pb-2 ${notification?.applicationStatus === 'accepted' || notification?.postStatus==='accepted' ? 'text-green-600' : 'text-red-600'}`}>
                  {notification?.message}</h3>
                <button
                  onClick={() => handleViewDetails(notification?.jobPostId)}
                  className="text-blue-500 underline focus:outline-none ms-5"
                >
                  Job Details
                </button>
              </div>
              {notification?.applicationStatus === 'accepted' && <p>Our HR will contact you shortly...</p>}
              {notification?.applicationStatus === 'rejected' && <p>Unfortunately, we have decided not to move forward with your application...</p>}
              {notification?.postStatus === 'accepted' && <p>Your post has successfully posted </p>}
              {notification?.rejectedReason !== null  && <p>Reason for rejection : <span className='text-lg'>{notification?.rejectedReason}</span></p>}
              <p className="text-sm text-gray-600 mt-1">{notification?.createdAt?.toString()?.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
