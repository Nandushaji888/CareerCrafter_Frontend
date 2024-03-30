import React, { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import { IPost, WorkArrangementType, employmentType } from '../../utils/interface/interface';
import JobListSearchComponent from './components/JobListSearchComponent';
const LazyJobListingComponent = lazy(() => import('./components/JobListingComponent'));
import JobListFilterComponent from './components/JobListFilterComponent';
import JobListPagination from './components/JobListPagination';
import { useSelector } from 'react-redux';

const JobList: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobList, setJobList] = useState<IPost[]>([]);
    const [workArrangementType, setWorkArrangementType] = useState<WorkArrangementType>(WorkArrangementType.Office)
    const [emplType, setEmplType] = useState<employmentType>(employmentType.Fulltime)
    const [skills, setSkills] = useState('')
    const [qualification, setQualification] = useState('')
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3); // Adjust limit as needed
    const [totalPages, setTotalPages] = useState(0);
    const [noData, setNoData] = useState(false)
    const postUrl = 'http://localhost:4001/api/post';
    const userData = useSelector((state: any) => state.persisted.user.userData);


    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, [page]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const fetchJobs = async () => {
        try {

            setNoData(false)

            
            const response = await axios.get(`${postUrl}/list-jobs`, {
                params: {
                    search: searchQuery,
                    page: page,
                    limit: limit,
                    skills,
                    qualification,
                    employmentType: emplType,
                    location,
                    workArrangementType,
                    userId:userData?._id?userData?._id:undefined

                },
                withCredentials: true
            });

            if (response?.data?.postDatas.length===0) {
                setNoData(true)
            }
            console.log(response.data);

            setJobList(response.data.postDatas);
            setTotalPages(response.data.totalPages);
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
                        navigate(`/job-details/${id}`, { state: { data: dataToSend } });
                    }
                });
        }
    };
    const handleNextPage = () => {
        if (page < totalPages) {
            console.log(page);

            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-10 mt-14 ">
                <JobListSearchComponent setSearchQuery={setSearchQuery} searchQuery={searchQuery} location={location} setLocation={setLocation} handleSearch={handleSearch} />
                <div className='mx-auto justify-between mt-10 w-10/12 items-start bg-white h-[700px] px-14 rounded-2xl shadow-lg pt-6 relative'>
                    <div className='flex flex-row px-14 gap-14'>

                    <Suspense fallback={<div className='flex w-7/12 justify-center items-center text-2xl '>Loading...</div>}>
                            <LazyJobListingComponent noData={noData} jobList={jobList} handleJobDetails={handleJobDetails} />
                        </Suspense>

                        <JobListFilterComponent
                            workArrangementType={workArrangementType}
                            setWorkArrangementType={setWorkArrangementType}
                            emplType={emplType}
                            setEmplType={setEmplType}
                            qualification={qualification}
                            setQualification={setQualification}
                            handleFilterSort={handleFilterSort}
                            skills={skills}
                            setSkills={setSkills}

                        />
                    </div>
                    <JobListPagination handlePrevPage={handlePrevPage} page={page} totalPages={totalPages} setPage={setPage} handleNextPage={handleNextPage} />
                </div>

            </div>
        </>
    );
};

export default JobList;
