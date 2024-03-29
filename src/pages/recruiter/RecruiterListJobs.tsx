
import React, { Suspense, lazy, useEffect, useState } from 'react'
// import SideBar from './SideBar'
import Header from '../../components/Header'
import axios from 'axios'
import { IPost } from '../../utils/interface/interface'
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
const LazyJobListingComponent = lazy(() => import('./components/RecruiterJobListing'))



const RecruiterListJobs = () => {
    const [jobList, setJobList] = useState<IPost[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const postUrl = 'http://localhost:4001/api/post/recruiter';

    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);
    useEffect(() => {
        console.log('hereeeeeeeeeeeeeeee');


        axios.get(`${postUrl}/list-jobs/${recruiterData._id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setJobList(res?.data?.jobList)
            })
    }, []);
    const columns: TableColumn<IPost>[] = [
        {
            name: 'Post Name',
            selector: row => row.postName,
            sortable: true,
            width: '200px',
            style: {
                fontWeight: 'bold',
                paddingLeft: '20px',
                textAlign: 'left'
            }
        },
        {
            name: 'Company',
            selector: row => row.company,
            sortable: true,
            width: '150px',
            style: {
                textAlign: 'left'
            }
        },
        {
            name: 'Company Place',
            selector: row => row.recruitingPlace,
            width: '150px',
            style: {
                textAlign: 'left'
            }
        },
        {
            name: 'Recruiter Email',
            selector: row => row.recruiterEmail,
            width: '200px',
            style: {
                textAlign: 'left'
            }
        },
        {
            name: 'Closing Date',
            selector: row => row.closingDate.slice(0, 10),
            width: '150px',
            style: {
                textAlign: 'left'
            }
        },
        {
            name: 'Post Details',
            cell: (row: IPost) => (
                <Link className='px-4 bg-blue-800 text-white rounded-2xl py-1 hover:bg-blue-400 font-semibold' to={`/recruiter/job-details/${row._id}`}>Details</Link>
            ),
            width: '150px',
            style: {
                textAlign: 'center'
            }
        },
    ];



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredJobs = jobList.filter(job =>
        job.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (

        <div className='flex flex-col flex-grow justify-center items-center'>
            <div className='mb-4 ' style={{ marginLeft: '-700px' }}>
                <Header category="" title="Your Posts" />
            </div>


            {
                jobList.length > 0 ?


                    (<Suspense fallback={<div className='flex  justify-center items-center text-2xl h-screen '>Loading...</div>}>
                        <LazyJobListingComponent setJobList={setJobList} columns={columns} filteredJobs={filteredJobs} handleSearch={handleSearch} jobList={jobList} />
                    </Suspense>) : (
                        <div className='container flex justify-center items-center h-screen text-2xl  pb-28' >
                            No Job Posted
                        </div>
                    )
            }


        </div>


    )
}

export default RecruiterListJobs
