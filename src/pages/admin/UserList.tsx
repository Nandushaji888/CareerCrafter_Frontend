import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Header from '../../components/Header';
import { IUser } from '../../utils/interface/interface';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';



const UserList: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    // const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate()




    const columns: TableColumn<IUser>[] = [
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
            name: 'Status',
            cell: (row: IUser) => (
                row.status ? (
                    <button className='px-4 bg-red-800 text-white rounded-lg py-1 hover:bg-red-400 font-semibold' onClick={(e: React.FormEvent) => blockUser(row._id, e)}>Block</button>
                ) : (
                    <button className='px-2 bg-blue-800 text-white rounded-lg py-1 hover:bg-blue-400 font-semibold' onClick={(e: React.FormEvent) => unblockUser(row._id, e)}>Unblock</button>
                )
            ),
            width:'200px'
        },
        {
            name: 'User Details',
            cell: (row: IUser) => (
                <Link className='px-4 bg-blue-800 text-white rounded-2xl py-1 hover:bg-blue-400 font-semibold' to={`/admin/user/${row._id}`}>Details</Link>
            ),
        },
    ];



    const baseUrl = 'http://localhost:4002/api/admin';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/get-all-users`, { withCredentials: true });
                setUsers(response?.data?.users);
            } catch (error) {
                console.error('Error fetching users:', error);
                if (axios.isAxiosError(error) && error?.response?.status === 401) {
                    console.log('Unauthorized error occurred');
                    navigate('/admin/login')
                }
            }
        };

        fetchUsers();
    }, []);


    const changeStatus = (id: string | undefined, status: string) => {
        const formData = {
            id,
            status
        }
        console.log('change status');
        console.log(formData);

        axios.post(`${baseUrl}/user/change-user-status`, { formData }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if(res?.data?.status){

                    setUsers(res?.data?.users)
                    toast?.success(res?.data?.message)
                }

            })
            .catch((err)=> {
                console.log(err);
                
                toast.error(err?.respose?.data?.message)
            })


    }
    const unblockUser = (id: string | undefined, e: React.FormEvent<Element>) => {
        e.preventDefault()
        const status = "InActive"
        confirmAlert({
            title: 'Confirm',
            message: 'Do you want to change the user\'s status?',
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
    const blockUser = (id: string | undefined, e: React.FormEvent<Element>) => {
        e.preventDefault()
        const status = "Active"
        confirmAlert({
            title: 'Confirm',
            message: 'Do you want to change the user\'s status?',
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className='flex flex-row'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>


            <div className='w-80'>
                <SideBar />
            </div>
            <div className='flex flex-col flex-grow'>
                <div className=''>

                    <Header category="Page" title="Users" />
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
                        data={filteredUsers}
                        // selectableRows
                        fixedHeader
                        pagination
                    />
                </div>
            </div>
            
        </div>



    );
};

export default UserList;
