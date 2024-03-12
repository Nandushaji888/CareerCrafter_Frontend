import React from 'react'

const RecruiterJobDetailsButtonsComponent:React.FC<any> = ({handleAllApplications}) => {
    return (
        <div className=' flex flex-col justify-center text-center items-center ms-24 '>

            <button onClick={handleAllApplications} className=' bg-black text-white py-3  mb-5 mt-10 rounded-3xl px-7 '>See All applications</button>
            <button className=' bg-red-800 text-white py-2 mb-5 mt-5 rounded-3xl px-5 '>Delete Post</button>
        </div>
    )
}

export default RecruiterJobDetailsButtonsComponent
