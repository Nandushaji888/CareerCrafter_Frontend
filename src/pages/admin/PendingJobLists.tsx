import React from 'react'
import JobListComponent from './components/JobListComponent'

const PendingJobLists = () => {
    const endPoint = 'pending-job-posts'
  return (
    <>
    <JobListComponent endPoint={endPoint} />
    </>
  )
}

export default PendingJobLists
