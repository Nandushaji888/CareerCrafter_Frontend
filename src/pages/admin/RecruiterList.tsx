import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import SideBar from './SideBar'
import Header from '../../components/Header'
import { IRecruiter } from '../../utils/interface/interface'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'

const RecruiterList = () => {
    const [recruiters, setRecruiters] = useState<IRecruiter[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const baseUrl = "http://localhost:4000/api/auth/admin";


    const filteredRecruiters = recruiters.filter(recruiter =>
        recruiter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const columns: TableColumn<IRecruiter>[] = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            style: {
                fontWeight: 'bold'
            },
            width:'180px'
            
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width:'250px'
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            width:'200px'
        },
        {
            name: 'WorksAt',
            selector: row => row.worksAt,
            width:'180px'
        },
        {
            name: 'Status',
            cell: (row: IRecruiter) => (
                row.status ? (
                    <button className='px-4 bg-red-800 text-white rounded-3xl py-1 hover:bg-red-400 font-semibold' onClick={(e: React.FormEvent) => blockRecruiter(row._id, e)}>Block</button>
                ) : (
                    <button className='px-4 bg-blue-800 text-white rounded-3xl py-1 hover:bg-blue-400 font-semibold' onClick={(e: React.FormEvent) => unblockRecruiter(row._id, e)}>Unblock</button>
                )
            ),
            width:'150px'
        },
        {
            name: 'Details',
            cell: (row: IRecruiter) => (
                <Link className='px-4 bg-blue-800 text-white rounded-2xl py-1 hover:bg-blue-400 font-semibold' to={`/admin/recruiter/${row._id}`}>Details</Link>
            ),
        },
    ];


    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axios.get(`${baseUrl}/recruiters-list`, { withCredentials: true });
                setRecruiters(response?.data?.recruiters);
            } catch (error) {
                console.error('Error fetching recruiters:', error);
            }
        };

        fetchRecruiters();
    }, []);


    const changeStatus = (id: string | undefined, status: string) => {
        const formData = {
            id,
            status
        }
        console.log('change status');
        console.log(formData);

        axios.post(`${baseUrl}/change-recruiter-status`, { formData }, { withCredentials: true })
            .then((res) => {
                console.log('res.data');
                console.log(res.data);
                if(res?.data?.status){

                    setRecruiters(res?.data?.recruiters)
                    toast?.success(res?.data?.message)
                }

            })
            .catch((err:any)=> {
                toast.error(err?.respose?.data?.message)
            })


    }
    const unblockRecruiter = (id: string | undefined, e: any) => {
        e.preventDefault()
        const status = "InActive"
        confirmAlert({
            title: 'Confirm',
            message: 'Do you want to change the recruiter status?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => changeStatus(id, status)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }
    const blockRecruiter = (id: string | undefined, e: any) => {
        e.preventDefault()
        const status = "Active"
        confirmAlert({
            title: 'Confirm',
            message: 'Do you want to change the recruiter status?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => changeStatus(id, status)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }

    return (
        <div className='flex flex-row'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>


            <div className='w-80'>
                <SideBar />
            </div>
            <div className='flex flex-col flex-grow'>
                <div className=''>

                    <Header category="Page" title="Recruiters" />
                </div>
                <div className='m-2 p-2 bg-gray-100 h-screen '>
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-2 px-7 py-2 border mb-5 border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 w-[300px] text-sm font-thin"
                        onChange={handleSearch}
                    />

                    <DataTable
                        className='ms-10'

                        columns={columns}
                        data={filteredRecruiters}
                        // selectableRows
                        fixedHeader
                        pagination
                    />
                </div>
            </div>

        </div>
    )
}

export default RecruiterList
