import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../utils/redux/slices/userSlice';
import { clearRecruiter } from '../utils/redux/slices/recruiterSlice';
import { INotification } from '../utils/interface/interface';

const NotificationPage: React.FC<{ messenger: any }> = ({ messenger }) => {
  const [latestNotifications, setLatestNotifications] = useState<INotification[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:4005/api/notifications';

  const fetchNotificationCount = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${messenger?._id}`, { withCredentials: true });
      const { notifications } = res.data;
      setLatestNotifications(notifications.slice(0, 10));

      const unreadNotifications = notifications.filter((notification: INotification) => !notification.readStatus);
      if (unreadNotifications.length > 0) {
        markNotificationsAsRead(unreadNotifications.map((notification: INotification) => notification._id));
      }
    } catch (err:any) {
      console.error(err);
      if (err?.response?.status === 401) {
        dispatch(messenger?.worksAt ? clearRecruiter() : clearUser());
        navigate(messenger?.worksAt ? '/recruiter/login' : '/login');
      }
    }
  };

  useEffect(() => {
    fetchNotificationCount();
  }, [messenger?._id]);

  const markNotificationsAsRead = async (notificationIds: string[]) => {
    try {
      const res = await axios.put(`${baseUrl}/mark-read`, { notificationIds }, { withCredentials: true });
      console.log("Notifications marked as read:", res.data);
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  const handleViewDetails = (jobPostId: string) => {
    navigate(messenger?.worksAt ? `/recruiter/job-details/${jobPostId}` : `/job-details/${jobPostId}`);
  };

  return (
    <div className="min-h-screen mt-14 px-48 w-full bg-white border-l border-gray-300 z-50">
      <h1 className='text-3xl font-bold pt-10 mb-10'>Notifications</h1>
      <div className="p-4">
        {latestNotifications.map(notification => (
          <div key={notification._id} className={`border border-gray-300 p-8 mb-2 rounded-lg shadow-md ${notification.readStatus ? 'bg-white' : 'bg-blue-100'}`} >
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold pb-2 ${notification.applicationStatus === 'accepted' || notification.postStatus === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                {notification.message}
              </h3>
              <button onClick={() => handleViewDetails(notification.jobPostId)} className="text-blue-500 underline focus:outline-none ms-5">Job Details</button>
            </div>
            {notification.applicationStatus === 'accepted' && <p>Our HR will contact you shortly...</p>}
            {notification.applicationStatus === 'rejected' && <p>Unfortunately, we have decided not to move forward with your application...</p>}
            {notification.postStatus === 'accepted' && <p>Your post has successfully posted </p>}
            {notification.rejectedReason && notification?.rejectedReason !== null && <p>Reason for rejection : <span className='text-lg'>{notification.rejectedReason}</span></p>}
            <p className="text-sm text-gray-600 mt-1">{notification.createdAt?.toString()?.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
