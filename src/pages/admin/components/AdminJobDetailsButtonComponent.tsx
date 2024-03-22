import React from 'react'
import RejectReasonModal from '../../../components/RejectReasonModal';

interface AdminJobDetailsButtonComponent {
    jobDetails: any;
    setShowModal: any;
    jobAcceptHandler: any;
    jobRejecthandeler: any;
    isRejected: any;
    setReasonModal:any
    setRejectedReason:any
    reasonModal:any
    
}

const AdminJobDetailsButtonComponent: React.FC<AdminJobDetailsButtonComponent> = ({ jobDetails, setShowModal, jobAcceptHandler, jobRejecthandeler, isRejected,setReasonModal,reasonModal,setRejectedReason }) => {

    const handleReject = async(e:React.FormEvent)=> {
        e.preventDefault()

    }
    return (
        <div>
            {
                jobDetails?.questions && jobDetails.questions.length > 0 &&
                <button onClick={() => setShowModal(true)} className='bg-black text-white py-2 mb-5 mt-10 ms-28 rounded-3xl px-5'>See Questions</button>
            }
            {jobDetails && !jobDetails?.isRejected && (
                <div className='ms-7 mt-5 flex'>{jobDetails?.isListed}
                    {!jobDetails?.isListed ? (
                        <>
                            <button onClick={(e: React.FormEvent) => jobDetails?._id && jobAcceptHandler(jobDetails?._id, e)} className='bg-green-800 text-white py-2 mb-5 mx-5 mt-3 rounded-3xl px-5'>Accept post</button>
                            <button onClick={(e: React.FormEvent) => {
                                
                                jobDetails?._id &&  setReasonModal(true)}}  className='bg-red-700 text-white py-2 mb-5 mt-3 rounded-3xl px-5'>Reject post</button>
                        </>
                    ) : (
                        <button className='bg-black  text-white py-2 mb-5 ms-24 mt-3 rounded-3xl px-5'>Disable post</button>
                    )}

                </div>
            )}
            {
                jobDetails?.isRejected &&
                <button onClick={(e: React.FormEvent) => jobDetails?._id && jobAcceptHandler(jobDetails?._id, e)} className='bg-blue-800 text-white py-2 mb-5 ms-24 mt-3 rounded-3xl px-5'>Re-approve post</button>

            }
             {reasonModal && <RejectReasonModal onClose={() => setReasonModal(false)} setRejectedReason={setRejectedReason} 
                    jobRejecthandeler={jobRejecthandeler} jobId={jobDetails._id} setReasonModal={setReasonModal}

                />}
            </div>
            )
        }
        
        export default AdminJobDetailsButtonComponent
        
        // jobRejecthandeler(jobDetails?._id, e)}