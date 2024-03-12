import React from 'react'

interface UserJobDetailsButtonsComponent {
    resume: any;
    handleAppliation: any;


}

const UserJobDetailsButtons: React.FC<UserJobDetailsButtonsComponent> = ({ resume, handleAppliation, }) => {
    return (
        <div className='flex  flex-col justify-center items-center ms-20'>


            {resume &&

                <div className='mt-10' >

                    <button className='bg-blue-800 text-white buttony-2 mb-5  py-2 rounded-3xl px-5'>View your resume</button>

                </div>
            }

            <button onClick={handleAppliation} className='bg-black text-white py-2 mb-5 mt-3 rounded-3xl px-5'>Apply</button>

        </div>
    )
}

export default UserJobDetailsButtons
