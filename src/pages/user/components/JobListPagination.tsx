import React, { useEffect } from 'react'

interface IJobListPagination{
    handlePrevPage:any; 
    page:number;
    totalPages:number;
    setPage:any;
    handleNextPage:any;
    fetchJobs:any
}

const JobListPagination: React.FC<IJobListPagination> = ({handlePrevPage,page,totalPages,setPage,handleNextPage,fetchJobs}) => {

  useEffect(() => {
    fetchJobs();
}, [page]);
  return (
    <div className="flex justify-center mt-4 absolute bottom-5 left-80">
    <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
    {Array.from({ length: totalPages }, (_, index) => (
        <button key={index} onClick={() => setPage(index + 1)} className={page === index + 1 ? 'bg-blue-900 text-white rounded-full px-2 mx-1' : 'px-1 mx-1'}>
            {index + 1}
        </button>
    ))}
    <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
</div>
  )
}

export default JobListPagination
