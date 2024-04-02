import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const NotificationPage = () => {
    const [latestNotifications, setLatestNotifications] = useState([]);
    const navigate = useNavigate()
    const baseUrl = 'http://localhost:4005/api/notifications';
    // const { id } = useParams()
    const messenger = useSelector((state: any) => {
        const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
        return userData;
    });

    useEffect(() => {
        axios.get(`${baseUrl}/${messenger?._id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                // if(res)
                const { notifications } = res?.data
                setLatestNotifications(notifications.slice(0, 10));
            })
            .catch((err) => {

            })
    }, []);

    const handleViewDetails = (jobPostId: string) => {
        // navigate('/')
    };
    return (
        <div className="absolute top-0 right-0 m-4">
            {latestNotifications.map(notification => (
            <div className="bg-white border border-gray-300 p-4 mb-2 rounded-lg w-full shadow-md">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{notification?.message}</h3>
                    <button
                        // onClick={() => handleViewDetails(notification.jobPostId)}
                        className="text-blue-500 underline focus:outline-none ms-5"
                    >
                        View Details
                    </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification?.createdAt}</p>
            </div>
            ))} 
        </div>
    )
}

export default NotificationPage
