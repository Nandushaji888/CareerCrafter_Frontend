import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { IPost, RootState} from '../../utils/interface/interface';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Navbar from './components/NavBar';
import { useSelector } from 'react-redux';




const SavedJobList: React.FC = () => {
    const baseUrl = 'http://localhost:4002/api/user';
    const user = useSelector((state: RootState) => state.persisted.user.userData);
    const navigate = useNavigate()
    const [jobList, setJobList] = useState<IPost[]>([]);
    // const [filteredJobList, setfilteredJobList] = useState<IPost[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

useEffect(()=> {
    if(!user?._id){
        navigate('/login')
        return
    }
    console.log(user);
    
axios.get(`${baseUrl}/saved-jobs/${user?._id}`,{withCredentials:true})
.then((res)=> {
    console.log('res?.data');
    console.log(res?.data);
    if(res?.data?.status){

        setJobList(res?.data?.savedJobList)
    }
    // if(res.data?.status)
}).catch((err)=> {
    console.log(err);
    
})
},[])


    const columns: TableColumn<IPost>[] = [
        {
            name: 'JobName',
            selector: row => row.postName,
            sortable: true,
            style: {
                fontWeight: 'bold'
            },
            width:'350px'
            
        },
        {
            name: 'Place',
            selector: row => row.recruitingPlace?.locationName,
            sortable: true,
            width:'250px'
        },
        {
            name: 'Company',
            selector: row => row.company,
            width:'200px'
        },
        {
            name: 'Job Type',
            selector: row => row.employmentType,
            width:'200px'
        },
        // {
        //     name: 'Closing Date',
        //     selector: row =>  row.closingDate.toString().slice(0, 10) ,
        //     width:'200px'
        // },
        {
            name: 'Details',
            width:'150px',
            cell: (row: IPost) => (
                <Link className='px-4 bg-blue-800 text-white rounded-2xl py-1 hover:bg-blue-400 font-semibold' to={`/job-details/${row._id}`}>Details</Link>
            ),
        },
    ];



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredJobList = jobList.filter(jobList =>
        jobList.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <>
        <Navbar/>
        <div className='flex flex-row mt-16'>

            <Toaster position='top-center' reverseOrder={false}></Toaster>


     
            <div className='flex flex-col flex-grow'>
                <div className=''>

                    <Header category="Page" title="Saved Jobs" />
                </div>
                <div className='m-2 p-2 bg-gray-100 h-screen '>
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-2 px-7 ms-36 py-2 border mb-5 border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 w-[300px] text-sm font-thin"
                        onChange={handleSearch}
                    />

                    <div className='px-40'>


                     <DataTable
                    columns={columns}
                    data={filteredJobList.reverse()}
                    fixedHeader
                    pagination
                    /> 
                    </div>
                </div>
            </div>
            
        </div>
        </>



    );
};

export default SavedJobList;
