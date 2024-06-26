import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import SideBar from './SideBar'
import Header from '../../components/Header'
import { IRecruiter } from '../../utils/interface/interface'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'
import axiosInstance from '../../utils/axios/axiosInstance'
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL


const RecruiterList = () => {
    const [recruiters, setRecruiters] = useState<IRecruiter[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate()
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


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
                    <button className='px-4 bg-red-800 text-white rounded-lg py-1 hover:bg-red-400 font-semibold' onClick={(e) => blockRecruiter(row._id, e)}>Block</button>
                ) : (
                    <button className='px-2 bg-blue-800 text-white rounded-lg py-1 hover:bg-blue-400 font-semibold' onClick={(e: React.FormEvent) => unblockRecruiter(row._id, e)}>Unblock</button>
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
                const response = await axiosInstance.get(`${AUTH_BASE_URL}/admin/recruiters-list`);
                setRecruiters(response?.data?.recruiters);
            } catch (error) {
                
                console.error('Error fetching recruiters:', error);
                if (axios.isAxiosError(error) && error?.response?.status === 401) {
                    console.log('Unauthorized error occurred');
                    navigate('/admin/login')
                }
            }
        };

        fetchRecruiters();
    }, [navigate]);


    const changeStatus = (id: string | undefined, status: string) => {
        const formData = {
            id,
            status
        }
        console.log('change status');
        console.log(formData);

        axiosInstance.post(`${AUTH_BASE_URL}/admin/change-recruiter-status`, { formData }, { withCredentials: true })
            .then((res) => {
                console.log('res.data');
                console.log(res.data);
                if(res?.data?.status){

                    setRecruiters(res?.data?.recruiters)
                    toast?.success(res?.data?.message)
                }

            })
            .catch((err)=> {
                toast.error(err?.respose?.data?.message)
            })


    }
    const unblockRecruiter = (id: string | undefined, e: React.FormEvent<Element>) => {
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
    const blockRecruiter = (id: string | undefined, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
