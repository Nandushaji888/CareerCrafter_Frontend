import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
interface IRecruiterJobListing {
    setJobList: any;
    columns: any;
    filteredJobs: any;
    handleSearch: any;
}

const RecruiterJobListing: React.FC<IRecruiterJobListing> = ({ setJobList, columns, filteredJobs, handleSearch }) => {

    const postUrl = 'http://localhost:4001/api/post/recruiter';

    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);

    useEffect(() => {
        axios.get(`${postUrl}/list-jobs/${recruiterData._id}`, { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setJobList(res?.data?.jobList)
            })
    }, []);



    return (



        <div className='m-2 ps-8 bg-gray-100 rounded-xl p-5'>
            <input
                type="text"
                placeholder="Search"
                className="ml-2 px-7 py-2 border mb-5 border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 w-[300px] text-sm font-thin"
                onChange={handleSearch}
            />

            <div className="flex flex-col px-3 rounded-2xl justify-center">
                <DataTable
                    columns={columns}
                    data={filteredJobs}
                    fixedHeader
                    pagination
                />
            </div>
        </div>


    )
}

export default RecruiterJobListing
