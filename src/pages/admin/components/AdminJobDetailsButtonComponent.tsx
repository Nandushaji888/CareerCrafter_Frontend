import React from 'react'

interface AdminJobDetailsButtonComponent {
    jobDetails: any; 
    setShowModal: any; 
    jobAcceptHandler: any; 
    jobRejecthandeler: any; 
}

const AdminJobDetailsButtonComponent:React.FC<AdminJobDetailsButtonComponent> = ({jobDetails,setShowModal,jobAcceptHandler,jobRejecthandeler}) => {
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
                            <button onClick={(e: React.FormEvent) => jobDetails?._id && jobRejecthandeler(jobDetails?._id, e)} className='bg-red-700 text-white py-2 mb-5 mt-3 rounded-3xl px-5'>Reject post</button>
                        </>
                    ) : (
                        <button className='bg-black  text-white py-2 mb-5 ms-24 mt-3 rounded-3xl px-5'>Disable post</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminJobDetailsButtonComponent