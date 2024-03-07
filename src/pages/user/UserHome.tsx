import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../utils/redux/slices/userSlice';
import Navbar from '../../components/NavBar';
import { IPost } from '../../utils/interface/interface';


const UserHome = () => {
  const baseurl = "http://localhost:4000/api/auth/user";
  const navigate = useNavigate()
  // const userData = useSelector((state: any) => state.persisted.user.userData);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobList, setJobList] = useState<IPost[]>([]);
  const [page, setPage] = useState();
  const [limit, setLimit] = useState(''); // Adjust limit as needed
  const [totalPages, setTotalPages] = useState('');
  const postUrl = 'http://localhost:4001/api/post';

  const dispatch = useDispatch()


  useEffect(() => {
    fetchJobs();
  }, [page]); // Fetch jobs when the page change

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${postUrl}/list-jobs`, {
        params: {
          search: searchQuery,
          page: page,
          limit: limit
        },
        withCredentials: true
      });
      console.log(response.data);

      setJobList(response.data.postDatas);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setPage(1); // Reset to the first page on new search
  //   fetchJobs();
  // };

  // const handleFilterSort = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setPage(1); // Reset to the first page on new filter/sort
  //   fetchJobs();
  // };


  useEffect(() => {
    const jwtToken = localStorage.getItem('user-jwtToken');
    if (!jwtToken) {
      navigate('/login');
    }
  }, [navigate]);


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
  return (

    <>
      <div className='flex flex-col'>

        <Navbar  />

        <div className='container flex flex-col min-h-screen'>
          <div className='bg-transparent flex justify-center items-center w-full relative' style={{ backgroundImage: 'url("—Pngtree—simple jobs to sum up_934887.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '550px' }}>
            {/* <div className="absolute bottom-16 left-20 mb-8 ml-8 text-center text-white bg-black bg-opacity-70 p-5 py-10 rounded-2xl"> */}
            <div className='absolute bottom-32 left-56 '>
              <h2 className="text-4xl font-extrabold mb-4">"Your Dream Job Awaits"</h2>
              <p className="text-xl  ps-2 max-w-96">Discover opportunities that ignite your passion and fuel your ambition.</p>
              <Link to='/list-jobs'>
                <button className="bg-black hover:bg-white border border-transparent hover:text-black hover:border-black text-white font-bold py-2 px-4 mt-6 rounded">
                  Explore Now
                </button>
              </Link>            </div>
          </div>


          <div className='jobs w-full flex flex-col justify-center items-center bg-white pt-10' >
            <div className='w-8/12 border border-none my-7 flex flex-col mt-4'>
              <h1 className='text-4xl font-extrabold my-2'>Featured Jobs</h1>

              {jobList.slice(0, 4).map((job, index) => (
                <div key={index} onClick={(e) => handleJobDetails(job?._id, e)} className="cursor-pointer flex flex-row justify-between px-8 bg-white shadow-xl border-gray-300 p-4 border my-6 h-44 rounded-xl">
                  <div className='h-3/6 flex flex-col gap-1'>
                    <p className="text-gray-600 mb-2 ">{job?.company}</p>
                    <h2 className="text-lg font-semibold mb-2 max-w-sm">{job?.postName}</h2>
                    <p className="text-gray-700 font-bold">{job?.recruitingPlace}</p>
                    <p className="text-gray-700 font-bold pt-2">{job?.workArrangementType}</p>
                  </div>
                  <div className=''>
                    <p className="text-gray-600">{job?.employmentType}</p>
                    <p className="text-gray-600">{job?.createdAt?.slice(0, 10)}</p>
                  </div>
                </div>
              ))}
              <div className='flex  justify-end '>

                <Link to='/list-jobs' className=' bg-black text-white mt-5 px-4 py-2 rounded-3xl text-end'>See more</Link >
              </div>
            </div>

          </div>
          <div className='categories'>
            sasfdsfd
          </div>
        </div>
      </div>


    </>


  )
}

export default UserHome
