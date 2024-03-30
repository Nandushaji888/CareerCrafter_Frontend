import React from 'react'
import JobListComponent from './components/JobListComponent'

const AllPostList = () => {
const endPoint = 'all-post-list'
    return (
        <>
            <JobListComponent endPoint={endPoint} />
        </>
    )
}

export default AllPostList
