/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import { IPost, RootState } from '../../utils/interface/interface';
import JobListSearchComponent from './components/JobListSearchComponent';
const LazyJobListingComponent = lazy(() => import('./components/JobListingComponent'));
import JobListFilterComponent from './components/JobListFilterComponent';
import JobListPagination from './components/JobListPagination';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios/axiosInstance';
import { WorkArrangementType, employmentType } from '../../utils/interface/enums';
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL

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

    const userData = useSelector((state: RootState) => state.persisted.user.userData);


    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {

            setNoData(false)


            const response = await axiosInstance.get(`${POST_BASE_URL}/list-jobs`, {
                params: {
                    search: searchQuery,
                    page: page,
                    limit: limit,
                    skills,
                    qualification,
                    employmentType: emplType,
                    location,
                    workArrangementType,
                    userId: userData?._id ? userData?._id : undefined

                },
            });

            if (response?.data?.postDatas.length === 0) {
                setNoData(true)
            }
            console.log(response.data);

            setJobList(response.data.postDatas);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [page]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



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
            axiosInstance.get(`${POST_BASE_URL}/job-details/${id}`)
                .then((res) => {
                    if (res?.data?.status) {
                        const dataToSend = { data: res?.data?.jobData };
                        navigate(`/job-details/${id}`, { state: { data: dataToSend } });
                    }
                })
                .catch((err) => {
                    console.log(err);

                })
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
