/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { IPost } from '../../utils/interface/interface';
import SideBar from './SideBar';
import PostQuestionsModal from '../../components/PostQuestionsModal';
import JobDetailsComponent from '../../components/JobDetailsComponent';
import AdminJobDetailsButtonComponent from './components/AdminJobDetailsButtonComponent';
import axiosInstance from '../../utils/axios/axiosInstance';
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL

const AdminJobDetails: React.FC = () => {
    const [jobDetails, setJobDetails] = useState<IPost>();
    const [showModal, setShowModal] = useState(false);
    const [reasonModal, setReasonModal] = useState(false);
    const [isRejected, setIsRejected] = useState(jobDetails?.isRejected)
    const [rejectedReason, setRejectedReason] = useState('')
    const { id } = useParams();

    useEffect(() => {
        fetchPostDetails(id);
    }, [id]);

    const fetchPostDetails = (id: string | undefined) => {
        axiosInstance.get(`${POST_BASE_URL}/admin/job-details/${id}`)
            .then((res: any) => {
                setJobDetails(res?.data?.jobData);
            })
            .catch((err: any) => {
                console.error(err?.response?.data?.message);
                toast.error(err?.response?.data?.message);
            });
    };

    const jobStatusHandler = (id: string, status: string) => {

        
        const formData = { id, status,rejectedReason };

        axiosInstance.post(`${POST_BASE_URL}/admin/job-post-status-change`, { formData })
            .then((res) => {
                if (res.data.status) {
                    if (res.data.message) {
                        toast.success(res.data.message);
                    }
                    fetchPostDetails(id);
                    setRejectedReason('')
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

    const jobRejecthandeler = (id: string,e: React.FormEvent) => {
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
                                    isRejected={isRejected}
                                    setReasonModal={setReasonModal}
                                    setRejectedReason={setRejectedReason}
                                    reasonModal={reasonModal}
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
