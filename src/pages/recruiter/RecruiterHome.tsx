import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRecruiter } from '../../utils/redux/slices/recruiterSlice';
import toast from 'react-hot-toast';
import { IPost } from '../../utils/interface/interface';
import RecruiterNavbar from './components/RecruiterNavbar';
import Footer from '../../components/Footer';

const RecruiterHome = () => {
  const baseurl = "http://localhost:4000/api/auth/recruiter";
  const postUrl = "http://localhost:4001/api/post/recruiter"
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);
  const [jobList, setJobList] = useState<IPost[]>([])

  useEffect(() => {
    try {
      axios.get(`${postUrl}/list-jobs/${recruiterData._id}`, { withCredentials: true })
        .then((res) => {
          setJobList(res?.data?.jobList)


        })
    } catch (error: any) {
      toast.error(error)
    }
  }, [])

  const handleJobDetails = (id: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (id) {
      axios.get(`${postUrl}/job-details/${id}`, { withCredentials: true })
        .then((res) => {
          if (res?.data?.status) {
            const dataToSend = { data: res?.data?.jobData };
            navigate(`/job-details/${id}`, { state: { data: dataToSend } });
          }
        });
    }
  };



  const handleLogout = () => {
    axios.post(`${baseurl}/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        dispatch(clearRecruiter())
        navigate('/recruiter/login')
      })
  }
  return (

    <>
      <RecruiterNavbar />
      <div className='flex flex-col mt-14'>


        <div className='container flex flex-col min-h-screen '>
          <div className='bg-transparent flex justify-center items-center w-full relative' style={{ backgroundImage: 'url("recruitment websites design_32023-Apr-21-2023-07-35-01-4945-PM.webp")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '550px' }}>
            <div className='absolute bottom-32 right-56 top-28  '>

            </div>
          </div>
          <div className='bg-transparent flex justify-center items-center w-full relative ' style={{ backgroundImage: 'url("recruitment-opportunity-employment-career-people-background-1568213-pxhere.com.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '550px' }}>
            <div className='absolute  right-48 bottom-10  bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-5'>
              <h2 className="text-4xl font-extrabold mb-4">"Your Next Star Employee is Here"</h2>
              <p className="text-xl  ps-2 max-w-96">Dive into a pool of skilled professionals ready to drive your company's success.

              </p>
              <Link to='/recruiter/post-job'>
                <button className="bg-white hover:bg-gray-900 border border-transparent hover:text-white hover:border-black text-black font-bold py-2 px-4 mt-6 rounded">
                  Post a Job
                </button>
              </Link>
            </div>
          </div>


          <div className='jobs w-full flex flex-col justify-center items-center bg-white pt-10' >
            <div className='w-8/12 border border-none my-7 flex flex-col mt-4'>
              <h1 className='text-4xl font-extrabold my-2'>Your Jobs</h1>


              {jobList.slice(0, 4).map((job, index) => (
                <div key={index} onClick={(e) => handleJobDetails(job?._id, e)} className="cursor-pointer flex flex-row justify-between px-8 bg-white shadow-xl border-gray-300 p-4 border my-6 h-44 rounded-xl">
                  <div className='h-3/6 flex flex-col gap-1'>
                    <p className="text-gray-600 mb-2 ">{job?.company}</p>
                    <h2 className="text-lg font-semibold mb-2 max-w-sm">{job?.postName}</h2>
                    <p className="text-gray-700 font-bold">{job?.recruitingPlace?.locationName}</p>
                    <p className="text-gray-700 font-bold pt-2">{job?.workArrangementType}</p>
                  </div>
                  <div className=''>
                    <p className="text-gray-600">{job?.employmentType}</p>
                    <p className="text-gray-600">{job?.createdAt?.slice(0, 10)}</p>
                  </div>
                </div>
              ))}
              <div className='flex  justify-end '>

                <Link to='/recruiter/list-jobs' className=' bg-black text-white mt-5 px-4 py-2 rounded-3xl text-end'>See more</Link >
              </div>
            </div>

          </div>
          <div className="relative bg-center h-[450px]  bg-white flex  mb-20 ">
            <div className="absolute inset-0 top-0 bg-blue-950 flex ">
              <img
                src="/5052521.jpg"
                alt="Your Image"
                className="w-full h-auto object-contain "
                style={{ marginTop: '-60px', marginBottom: '-60px' }} // Adjust as needed
              />
              <div className="w-1/2 h-full flex items-center justify-center">
                <div className="relative z-10 text-start text-white " style={{ marginLeft: '-80px' }}>
                  <p className="text-lg md:text-xl lg:text-2xl italic mb-10">
                    “If we wait for the moment when everything, absolutely everything is ready, we shall never begin.”
                  </p>
                  <p>- Ivan Turgenev</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer/>


    </>
  )
}

export default RecruiterHome
