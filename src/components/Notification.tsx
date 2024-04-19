// // Notification.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Notification {
//   _id: string;
//   senderId: string;
//   receiverId: string;
//   content: string;
//   time: string;
//   type: string;
// }

// const Notification: React.FC = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     // Fetch notifications when the component mounts
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('/api/notifications'); // Update with your API endpoint
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Notifications</h1>
//       <ul className="divide-y divide-gray-300">
//         {/* {notifications.map(notification => ( */}
//           <li  className="py-4">
//             <div className="text-lg font-medium mb-2">notification.content</div>
//             <div className="text-sm text-gray-500">notification.time</div>
//           </li>
//         {/* ))} */}
//       </ul>
//     </div>
//   );
// };

// export default Notification;
