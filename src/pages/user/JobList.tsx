import React, { useEffect, useState } from 'react';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import { IPost, IUser } from '../../utils/interface/interface';


const JobList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobList, setJobList] = useState<IPost[]>([])
    const baseUrl = 'http://localhost:4002/api/post';
    const postUrl = 'http://localhost:4001/api/post';


    const navigate = useNavigate()
    console.log('hereee');


    // if(!searchQuery && !location && !filteredJobs){
    useEffect(() => {
        axios.get(`${baseUrl}/list-jobs`, { withCredentials: true })
            .then((res) => {
                console.log(res.data.postDatas);
                setJobList(res?.data?.postDatas)
                // console.log('jobList');
                // console.log(jobList);

            })
    }, [])
    // }


    const handleSearch = () => {
    };

    const handleFilterSort = () => {
    };

    const handleJobDetails=(id:string | undefined,e:React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.preventDefault()
        
        if(id){
            console.log(id);
            
            axios.get(`${postUrl}/job-details/${id}`,{withCredentials:true})
            .then((res:any)=> {
                console.log(res.data);
                if(res?.data?.status){
                    const dataToSend ={data:res?.data?.jobData}
                    navigate('/job-details', { state: { data: dataToSend } });


                    // navigate(`job-details/${encodeURIComponent(JSON.stringify(dataToSend))}`,)
                }
                
            })

        }

    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-10 ">
                <div className="flex  flex-row  justify-center items-center mb-4 text-center w-full ">
                    {/* <div className="relative border-gray-300 bg-white rounded-full focus:outline-none focus:border-blue-500 px-3 border"> */}
                    <input
                        type="text"
                        placeholder="Search for jobs"
                        className="ml-2 px-7 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 w-[350px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
                    {/* </div> */}
                    <input
                        type="text"
                        placeholder="Location"
                        className="ml-2 px-7 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 w-[200px]"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className='flex flex-row mx-auto justify-between mt-10 w-10/12  items-center bg-white  px-14 rounded-2xl'>
                    <div className='w-7/12 border border-none my-7  '>
                        {jobList.map((job, index) => (
                            <div key={index} onClick={(e)=>handleJobDetails(job?._id,e)} className="cursor-pointer flex flex-row justify-between px-8  bg-white p-4 border my-6 rounded-xl  ">
                                <div className='h-3/6'>
                                    <p className="text-gray-600 mb-2">{job?.company}</p>
                                    <h2 className="text-lg font-semibold mb-2">{job?.postName}</h2>
                                    <p className="text-gray-700 font-bold">{job?.recruitingPlace}</p>
                                </div>
                                <div className='px-5'>
                                    <p className="text-gray-600">{job?.employmentType}</p>
                                    <p className="text-gray-600">{job?.createdAt?.slice(0, 10)}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='bg-slate-100 rounded-2xl border border-gray-300  w-4/12  h-[460px]'>
                        <form >

                            <div className='flex flex-col justify-center items-center text-center gap-4  py-6 '>
                                <div className='w-[300px]'>
                                    <h3 className='font-semibold'>Job Preferences</h3>
                                    <select name="workArrangementType" className="w-3/4 my-3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="office">Office</option>
                                    </select>
                                </div>
                                <div className='w-[300px]'>
                                <h3 className='font-semibold'>Employment Type</h3>
                                    <select name="employmentType" className="w-3/4 my-3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required>
                                        <option value="fulltime">Full-Time</option>
                                        <option value="parttime">Part-Time</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                                <div className='w-[300px]'>
                                <h3 className='font-semibold mb-2'>Preferences</h3>
                                <input type="text" name="skills" placeholder='skills' className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 my-2 focus:outline-none focus:border-blue-400" required />
                                <input type="text" name="qualification" placeholder='qualification' className="w-3/4 border border-gray-300 rounded-lg py-2 my-2 px-4 focus:outline-none focus:border-blue-400" required />

                                </div>
                                <button
                                    className="px-4 py-2 mb-2  bg-gray-900 text-white rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                    onClick={handleFilterSort}
                                >
                                    Filter & Sort
                                </button>
                            </div>

                        </form>


                    </div>
                </div>

            </div>
        </>
    );
};

export default JobList;
