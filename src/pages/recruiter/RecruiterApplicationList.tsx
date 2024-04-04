import React, { useEffect, useState } from 'react'
// import SideBar from './SideBar'
import Header from '../../components/Header'
import axios from 'axios'
import { ApplicationType, IApplication, IPost } from '../../utils/interface/interface'
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import RecruiterNavbar from './components/RecruiterNavbar';
const RecruiterApplicationList = () => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);
    const [applications, setApplications] = useState<IApplication[]>([])

    const baseUrl = 'http://localhost:4004/api/application/recruiter';

    

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/get-all-applications/${id}`, { withCredentials: true })
            .then((res) => {
                // console.log(res?.data);
                // console.log(res?.data?.applicationList);
                setApplications(res?.data?.applicationList)

            })
    }, [])

    const columns: TableColumn<IApplication>[] = [
        {
            name: 'Applicant Name',
            selector: row => row.name,
            sortable: true,
            width: '200px',
            style: {
                fontWeight: 'bold',
                paddingLeft: '20px',
                justifyContent: 'start'
            }
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '200px',
            style: {
                textAlign: 'left',

            }
        },
        {
            name: 'Application Status',
            selector: (row: IApplication) => row.status,
            cell: row => (
                <div style={{ textAlign: 'center' }}>
                    {row.status === ApplicationType.Pending && (
                        <button style={{ color: 'brown', fontSize: '15px', fontWeight: 'bold', marginLeft: '15px' }}>Pending</button>
                    )}
                    {row.status === ApplicationType.Rejected && (
                        <button style={{ color: 'red', fontSize: '15px', fontWeight: 'bold', marginLeft: '15px' }}>Rejected</button>

                    )}
                    {row.status === ApplicationType.Accepted && (
                        <button style={{ color: 'green', fontSize: '15px', fontWeight: 'bold', marginLeft: '15px' }}>Accepted</button>

                    )}
                </div>
            ),
            width: '200px',
        },


        {
            name: 'Application Date',
            selector: row => row.createdOn.toString().slice(0, 10),
            width: '200px',
            style: {
                textAlign: 'center'
            }
        },

        {
            name: 'Application Details',
            cell: (row: IApplication) => (
                <Link className='px-4 bg-blue-800 text-white rounded-2xl py-1 hover:bg-blue-400 font-semibold' to={`/recruiter/application-details/${row._id}`}>Details</Link>
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

    const filteredJobs = applications.filter(application =>
        application.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
              <RecruiterNavbar />

        <div className='mx-40 mt-28 ps-8 bg-gray-100 rounded-xl p-5'>
            <h2 className='text-3xl py-6 font-bold'>Job Applications</h2>
            <h2 className='text-lg pb-3 font-light'>Review and Select</h2>
            <input
                type="text"
                placeholder="Search"
                className="ml-2 px-7 py-2 border mb-5 border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 w-[300px] text-sm font-thin"
                onChange={handleSearch}
            />
            <div className="flex flex-col px-3 rounded-2xl justify-center">
                <DataTable
                    columns={columns}
                    data={filteredJobs.reverse()}
                    fixedHeader
                    pagination
                />
            </div>
        </div>
        </>
    )
}

export default RecruiterApplicationList
