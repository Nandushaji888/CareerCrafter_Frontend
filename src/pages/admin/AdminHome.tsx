// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Sidebar from './SideBar';
// import { Toaster } from 'react-hot-toast';
// import SideBar from './SideBar';
// import Header from '../../components/Header';

// const AdminHome = () => {
//   const baseurl = "http://localhost:4000/api/auth/admin";
//   const navigate = useNavigate()

//   useEffect(() => {
//  axios.get
//   }, []);


//   const [jobPostsCount,setJobPostsCount] = useState('');
//   const [usersCount,setUsersCount] = useState();
//   const [recruitersCount,setRecruitersCount] = useState();
//   const [applicationsCount,setApplicationCount] = useState();

  
//   const baseUrl = 'http://localhost:4002/api/admin';
//   const recruiterCountUrl = "http://localhost:4000/api/auth/admin";


//   useEffect(() => {
//       const fetchUsers = async () => {
//           try {
//               const response = await axios.get(`${baseUrl}/get-all-users`, { withCredentials: true });
//               setUsersCount(response?.data?.users);
//           } catch (error) {
//               console.error('Error fetching users:', error);
//           }
//       };
//       const fetchRecruiters = async () => {
//         try {
//             const response = await axios.get(`${recruiterCountUrl}/recruiters-list`, { withCredentials: true });
//             setRecruitersCount(response?.data?.recruiters);
//         } catch (error) {
            
//             console.error('Error fetching recruiters:', error);
//             if (axios.isAxiosError(error) && error?.response?.status === 401) {
//                 console.log('Unauthorized error occurred');
//                 navigate('/admin/login')
//             }
//         }
//     };

//     fetchRecruiters();
//       fetchUsers();
//   }, []);

//   return (
//     <div className='flex flex-row'>
//       <Toaster position='top-center' reverseOrder={false}></Toaster>


//       <div className='w-52'>
//         <SideBar />
//       </div>
//       <div className="container ms-56 p-4 ">
//         <div className=''>

//           <Header category="Page" title="Admin Dashboard" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
//           <div className="bg-gray-200 w-56 p-4 rounded-lg shadow-xl">
//             <h2 className="text-lg font-semibold mb-2">Job Posts</h2>
//             <p className="text-3xl font-bold">{jobPostsCount}</p>
//           </div>
//           <div className="bg-gray-200 w-56 p-4 rounded-lg shadow-xl">
//             <h2 className="text-lg font-semibold mb-2">Users</h2>
//             <p className="text-3xl font-bold">{usersCount}</p>
//           </div>
//           <div className="bg-gray-200 w-56 p-4 rounded-lg shadow-xl">
//             <h2 className="text-lg font-semibold mb-2">Recruiters</h2>
//             <p className="text-3xl font-bold">{recruitersCount}</p>
//           </div>
//           <div className="bg-gray-200 w-56 p-4 rounded-lg shadow-xl">
//             <h2 className="text-lg font-semibold mb-2">Applications</h2>
//             <p className="text-3xl font-bold">{applicationsCount}</p>
//           </div>
         
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminHome
