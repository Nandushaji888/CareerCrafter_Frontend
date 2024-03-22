import React from 'react';
import { XCircle } from 'lucide-react';



interface RejectReasonModalProps {
  setRejectedReason?: any;
  onClose?: () => void;
  jobRejecthandeler:any
  jobId:string
  setReasonModal:any
}

const RejectReasonModal: React.FC<RejectReasonModalProps> = ({ onClose, setRejectedReason,jobRejecthandeler,jobId,setReasonModal }) => {
  const submitHanler = async(e: any) => {
    e.preventDefault()
    await jobRejecthandeler(jobId,e)
    setReasonModal(false)
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto'>
      <div className='bg-white rounded-lg overflow-hidden w-2/6'>
        <div className='flex justify-between items-center bg-gray-800 text-white px-6 py-4'>
          <h1 className='text-xl font-bold'>Reason for Rejection</h1>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-200'><XCircle size={24} /></button>
        </div>
        <div className='p-6'>
          <form className='space-y-4' onSubmit={submitHanler}>
            <div className='flex flex-col'>
              <label htmlFor='reason' className='text-sm font-semibold text-gray-700 mb-1'>Reason</label>
              <textarea id='rejectedReason' onChange={(e:any)=>setRejectedReason(e.target.value)} name='rejectedReason' className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400 resize-none' required></textarea>
            </div>
            <div className='flex justify-end'>
              <button   type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default RejectReasonModal;
