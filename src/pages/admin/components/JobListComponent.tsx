


import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import axios from 'axios'
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { IPost } from '../../../utils/interface/interface';
import Header from '../../../components/Header';

interface JobListComponent{
    endPoint:string
}

const JobListComponent:React.FC<JobListComponent> = ({endPoint}) => {
    const [jobList, setJobList] = useState<IPost[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const postUrl = 'http://localhost:4001/api/post/admin';

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
            selector: row => row.recruitingPlace?.locationName,
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
                <Link className='px-4 bg-blue-800 text-white rounded-2xl py-1 hover:bg-blue-400 font-semibold' to={`/admin/job-details/${row._id}`}>Details</Link>
            ),
            width: '150px',
            style: {
                textAlign: 'center'
            }
        },
    ];

    useEffect(() => {
        console.log(`${postUrl}/${endPoint}`);
        axios.get(`${postUrl}/${endPoint}`, { withCredentials: true })
        
            .then((res) => {
                console.log(res.data);
                setJobList(res?.data?.posts)
            })
            .catch((err)=> {
                console.log(err);
                
            })
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredJobs = jobList.filter(job =>
        job.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-row'>
            <div className='w-80'>
                <SideBar />
            </div>
            <div className='flex flex-col flex-grow'>
                <div className=''>
                    <Header category="Page" title="Pending Job Posts" />
                </div>
                <div className='m-2  ps-8  bg-gray-100 h-screen rounded-xl p-5'>
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-2 px-7 py-2 border mb-5 border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 w-[300px] text-sm font-thin"
                        onChange={handleSearch}
                    />
                    <DataTable
                        columns={columns}
                        data={filteredJobs.reverse()}
                        fixedHeader
                        pagination
                    />
                </div>
            </div>
        </div>
    )
}

export default JobListComponent;

