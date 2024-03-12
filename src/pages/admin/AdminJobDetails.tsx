import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { IPost } from '../../utils/interface/interface';
import SideBar from './SideBar';
import PostQuestionsModal from '../../components/PostQuestionsModal';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import AdminJobDetailsButtonComponent from './components/AdminJobDetailsButtonComponent';

const AdminJobDetails: React.FC = () => {
    const [jobDetails, setJobDetails] = useState<IPost>();
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchPostDetails(id);
    }, [id]);

    const fetchPostDetails = (id: string | undefined) => {
        const baseUrl = 'http://localhost:4001/api/post/admin';
        axios.get(`${baseUrl}/job-details/${id}`, { withCredentials: true })
            .then((res: any) => {
                setJobDetails(res?.data?.jobData);
            })
            .catch((err: any) => {
                console.error(err?.response?.data?.message);
                toast.error(err?.response?.data?.message);
            });
    };

    const jobStatusHandler = (id: string, status: string) => {
        const baseUrl = 'http://localhost:4001/api/post/admin';
        const formData = { id, status };
        axios.post(`${baseUrl}/job-post-status-change`, { formData }, { withCredentials: true })
            .then((res) => {
                if (res.data.status) {
                    if (res.data.message) {
                        toast.success(res.data.message);
                    }
                    fetchPostDetails(id);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err: any) => {
                toast.error(err.response?.data?.message);
            });
    };

    const jobAcceptHandler = (id: string, e: React.FormEvent) => {
        e.preventDefault();
        const status = "List";
        jobStatusHandler(id, status);
    };

    const jobRejecthandeler = (id: string, e: React.FormEvent) => {
        e.preventDefault();
        const status = "NotList";
        jobStatusHandler(id, status);
    };

    return (
        <>
            <div className='flex flex-row'>
                <Toaster position='top-center' reverseOrder={false} />
                <div className='w-80'>
                    <SideBar />
                </div>
                <div className='container mx-auto p-10 flex flex-col bg-white min-h-screen'>
                    <div className='flex flex-col'>
                        <JobDetailsComponent
                            data={jobDetails}
                            buttons={
                                <AdminJobDetailsButtonComponent
                                    jobDetails={jobDetails}
                                    setShowModal={setShowModal}
                                    jobAcceptHandler={jobAcceptHandler}
                                    jobRejecthandeler={jobRejecthandeler}
                                />
                            }
                        />
                    </div>
                </div>
                {showModal && <PostQuestionsModal onClose={() => setShowModal(false)} questions={(jobDetails?.questions || [])} />}
            </div>
        </>
    );
};

export default AdminJobDetails;
