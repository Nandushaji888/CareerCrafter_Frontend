import React from 'react';

import DateComponent from './DateFormatComponent';

interface JobDetailsProps {
    data: any; 
    buttons:any
}

const JobDetailsComponent: React.FC<JobDetailsProps> = ({ data,buttons }) => {
  

    return (
        <>
            <div className='container mx-auto p-10 min-h-screen '>
                <div className='flex flex-col ms-8 my-4 rounded-3xl pt-10 min-h-screen bg-white'>
                    <div className='heading ps-16 ms-2 mb-10 '>
                        <h2 className='text-3xl font-semibold'>{data?.postName}</h2>
                        <h4 className='text-lg ps-10 pt-3 font-semibold'>{data?.company}</h4>
                        <h4 className='text-lg ps-10 pb-3 font-semibold'>{data?.recruitingPlace} , {data?.employmentType}</h4>
                    </div>

                    <div className='flex flex-row w-full mx-auto px-14 justify-between'>
                        <div className='w-3/5 border border-gray-300 p-5 rounded-lg bg-slate-100 mb-10'>
                            <div className='ps-2 w-5/6'>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Job Description</h4>
                                <p>{data?.jobDescription}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Responsibilities</h4>
                                <p>{data?.responsibilities}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Skills Required</h4>
                                <p>{data?.skills}</p>
                                <h4 className='text-lg pt-3 mb-3 font-semibold'>Qualification</h4>
                                <p>{data?.qualification}</p>
                            </div>
                        </div>

                        <div className='px-6 w-2/5 '>
                            <div className='flex flex-col w-full justify-center items-center ms-10 px-10 border border-gray-300 bg-stone-200 rounded-lg'>
                                {data?.salary && <h4 className='pt-5'>Salary: {data.salary}</h4>}
                                <p className='pt-5 font-semibold'>Contact Email</p>
                                <p>{data?.recruiterEmail}</p>
                    
                                <p className='pt-5 font-semibold'>Work Arrangement Type</p>
                                <p >{data?.workArrangementType}</p>
                                <p className='pt-5 font-semibold'>Closing Date</p>
                                <DateComponent mongoDate={data?.closingDate} />
                            
                            </div>
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetailsComponent;
