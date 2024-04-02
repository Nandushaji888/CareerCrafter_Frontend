import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationType, IApplication } from '../../utils/interface/interface';
import toast, { Toaster } from 'react-hot-toast';
import RecruiterNavbar from './components/RecruiterNavbar';

const RecruiterApplicationDetails = () => {
  const [appDetails, setAppDetails] = useState<IApplication>();
  const [status, setStatus] = useState<ApplicationType>(ApplicationType.Pending); 
  const baseUrl = 'http://localhost:4004/api/application/recruiter';

  const fetchApplication = (appId: string | undefined) => {
    axios.get(`${baseUrl}/application-details/${appId}`, { withCredentials: true })
      .then((res: any) => {
        // console.log(res.data);
        setAppDetails(res?.data?.application);
        setStatus(res?.data?.application?.status)
      });
  };

  const { id } = useParams();

  useEffect(() => {
    fetchApplication(id);
  }, [id]);

  const viewResume = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as ApplicationType);
  };

  const changeStatusHandler = async()=> {
    const data = {
      id,
      status
    }

    console.log('data');
    console.log(data);
    
    axios.post(`${baseUrl}/change-application-status`,data,{withCredentials:true})
    .then((res)=> {
      console.log(res.data);
      if(res?.data?.status){
        toast.success(res?.data?.message)
        fetchApplication(id);

      }
      
    })
    .catch((err:any)=> {
      toast.error(err.response?.data?.message)
    })
  }

  return (
    <>
    <RecruiterNavbar/>
    <div className="max-w-4xl mx-auto py-8 mt-16">
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="bg-white shadow-md px-10 pt-6 pb-8 mb-4 rounded-3xl ">
        <h1 className="text-3xl font-bold my-4 text-center">Application Details</h1>

        <div className="mb-4 flex items-center gap-20 mt-8 w-fill justify-between mx-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Applicant Name
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {appDetails?.name}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {appDetails?.email}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {appDetails?.phone}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-20 mt-8 w-fill justify-between mx-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Resume
            </label>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => viewResume(e)} className='bg-black text-white py-2 mb-5 mt-3 rounded-3xl px-5'>View resume</button>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={status}
              onChange={handleStatusChange}
            >
              <option value={ApplicationType.Pending}>Pending</option>
              <option value={ApplicationType.Accepted}>Accepted</option>
              <option value={ApplicationType.Rejected}>Rejected</option>
            </select>
            <div className="pointer-events-none absolute mt-7 inset-y-0 right-0 flex items-center pr-3 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z" />
              </svg>
            </div>
          </div>


          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">Application Date</label>
            {appDetails?.createdOn && (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="dateOfBirth"
                readOnly
                value={appDetails.createdOn.toString().slice(0, 10)}
              />
            )}
          </div>
        </div>

        <div className='flex justify-center'>
          <button onClick={changeStatusHandler} className='bg-black text-white py-2 mb-5 mt-3 rounded-3xl px-5' >Update</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RecruiterApplicationDetails;
