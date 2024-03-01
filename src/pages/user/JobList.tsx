import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import { IPost } from '../../utils/interface/interface';

const JobList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobList, setJobList] = useState<IPost[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5); // Adjust limit as needed
    const [totalPages, setTotalPages] = useState(0);
    const postUrl = 'http://localhost:4001/api/post';

    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, [page]); // Fetch jobs when the page changes
    // Fetch jobs on initial load and when searchQuery or location changes

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${postUrl}/list-jobs`, {
                params: {
                    search: searchQuery,
                    location: location,
                    page: page,
                    limit: limit
                },
                withCredentials: true
            });
            setJobList(response.data.postDatas);
            setTotalPages(Math.ceil(response.data.totalJobs / limit));
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to the first page on new search
        fetchJobs();
    };

    const handleFilterSort = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to the first page on new filter/sort
        fetchJobs();
    };

    const handleJobDetails = (id: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (id) {
            axios.get(`${postUrl}/job-details/${id}`, { withCredentials: true })
                .then((res) => {
                    if (res?.data?.status) {
                        const dataToSend = { data: res?.data?.jobData };
                        navigate('/job-details', { state: { data: dataToSend } });
                    }
                });
        }
    };

    // Pagination controls
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
            navigate(`?page=${page - 1}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`); // Update URL to reflect the new page
        }
    };
    
    const handleNextPage = () => {
        
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1); // Increment the page by 1
            console.log(page);
            
            navigate(`?page=${page + 1}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`); // Update URL to reflect the new page
        }
    };
    
// useEffect(() => {
//     console.log('page updated', page);
//     navigate(`./${page}`); // Update URL to reflect the new page
// }, [page]); // This effect will run whenever `page` changes



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
                <div className='flex flex-row mx-auto justify-between mt-10 w-10/12 items-start bg-white px-14 rounded-2xl'>
                    <div className='w-7/12 border border-none my-7  mt-4'>
                        {jobList.map((job, index) => (
                            <div key={index} onClick={(e) => handleJobDetails(job?._id, e)} className="cursor-pointer flex flex-row justify-between px-8  bg-white p-4 border my-6 rounded-xl  ">
                                <div className='h-3/6'>
                                    <p className="text-gray-600 mb-2 ">{job?.company}</p>
                                    <h2 className="text-lg font-semibold mb-2 max-w-sm">{job?.postName}</h2>
                                    <p className="text-gray-700 font-bold">{job?.recruitingPlace}</p>
                                </div>
                                <div className=''>
                                    <p className="text-gray-600">{job?.employmentType}</p>
                                    <p className="text-gray-600">{job?.createdAt?.slice(0, 10)}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='bg-slate-100 rounded-2xl border mt-16 border-gray-300 w-4/12 h-[460px]'>
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
                <div className="flex justify-center mt-4">
                    <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => setPage(index + 1)} className={page === index + 1 ? 'bg-blue-500' : ''}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                </div>

            </div>
        </>
    );
};

export default JobList;
