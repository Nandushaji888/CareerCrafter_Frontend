import React from 'react'
import { IPost } from '../../../utils/interface/interface';

interface IJobListingComponent {
    noData:boolean;
    jobList:IPost[];
    handleJobDetails:any

}

const JobListingComponent:React.FC<IJobListingComponent> = ({noData,jobList,handleJobDetails}) => {
    return (
        <div className='w-7/12 border border-none my-7  mt-4'>
            {noData &&
                <h2 className='text-3xl text-gray-600 '>No Job Posts found</h2>
            }
            {jobList.map((job, index) => (
                <div key={index} onClick={(e) => handleJobDetails(job?._id, e)} className="cursor-pointer flex flex-row justify-between px-8 min-h-40  bg-white shadow-lg  border-gray-300 p-4 border my-6 rounded-xl  ">
                    <div className='h-3/6'>
                        <p className="text-gray-600 mb-2 ">{job?.company}</p>
                        <h2 className="text-lg font-semibold mb-2 max-w-sm">{job?.postName}</h2>
                        <p className="text-gray-700 font-bold">{job?.recruitingPlace}</p>
                    </div>
                    <div className=''>
                        <p className="text-gray-600">{job?.employmentType}</p>
                        <p className="text-gray-600">{job?.createdAt?.slice(0, 10)}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default JobListingComponent
