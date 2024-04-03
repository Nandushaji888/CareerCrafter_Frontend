import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INotification } from '../../../utils/interface/interface';
import Navbar from './NavBar';

const NotificationPage = () => {
  const [latestNotifications, setLatestNotifications] = useState<[INotification]>();
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:4005/api/notifications';
  const messenger = useSelector((state: any) => {
    const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
    return userData;
  });

  useEffect(() => {
    axios.get(`${baseUrl}/${messenger?._id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        // if(res)
        const { notifications } = res?.data;
        setLatestNotifications(notifications.slice(0, 10));
      })
      .catch((err) => {
        console.log(err);
        if(err.response?.status===401){
          navigate('/login')
        }
      });
  }, []);

  const handleViewDetails = (jobPostId: string) => {
    navigate(`/job-details/${jobPostId}`)
  };

  return (
    <>
    <Navbar/>
    <div className=" min-h-screen mt-14  px-48  w-full bg-white border-l border-gray-300 z-50">
      <h1 className='text-3xl font-bold pt-10 mb-10' >Notifications</h1>
      <div className="p-4">
        {latestNotifications?.map(notification => (
          
          <div key={notification._id} className="bg-white border border-gray-300 p-8  mb-2 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
            <h3 className={`text-lg font-semibold pb-2 ${notification?.applicationStatus === 'accepted'|| notification?.postStatus ? 'text-green-600' : 'text-red-600'}`}>
                {notification?.message}</h3>
              <button
                onClick={() => handleViewDetails(notification?.jobPostId)}
                className="text-blue-500 underline focus:outline-none ms-5"
              >
                Job Details
              </button>
            </div>
            {notification?.applicationStatus === 'accepted' && <p>Our HR will contact you shortly...</p>}
            {notification?.applicationStatus === 'rejected' && <p>We are decided to not to forward your application...</p>}
            <p className="text-sm text-gray-600 mt-1">{notification?.createdAt?.toString()?.slice(0,10)}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default NotificationPage;
