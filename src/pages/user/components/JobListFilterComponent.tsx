import React from 'react'
import { WorkArrangementType, employmentType } from '../../../utils/interface/interface'

interface IJobListFilterComponent {
    workArrangementType: WorkArrangementType;
    setWorkArrangementType: any;
    emplType: employmentType;
    setEmplType: any;
    qualification: string;
    setQualification: any;
    handleFilterSort: any;
    skills: string,
    setSkills: any


}

const JobListFilterComponent: React.FC<IJobListFilterComponent> = ({ workArrangementType, setWorkArrangementType, emplType, setEmplType, skills, setSkills,
    qualification, setQualification, handleFilterSort
}) => {
    return (
        <div className='bg-slate-100 rounded-2xl border mt-16 mb-10 border-gray-300 w-4/12 h-[460px]'>
            <form >

                <div className='flex flex-col justify-center items-center text-center gap-4   py-6 '>
                    <div className='w-[300px]'>
                        <h3 className='font-semibold'>Job Preferences</h3>
                        <select name="workArrangementType" className="w-3/4 my-3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400"
                            value={workArrangementType}
                            onChange={(e: any) => setWorkArrangementType(e.target.value)}
                            required>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="office">Office</option>
                        </select>
                    </div>
                    <div className='w-[300px]'>
                        <h3 className='font-semibold'>Employment Type</h3>
                        <select name="employmentType" className="w-3/4 my-3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400"
                            value={emplType}
                            onChange={(e: any) => setEmplType(e.target.value)}
                            required>
                            <option value="fulltime">Full-Time</option>
                            <option value="parttime">Part-Time</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div className='w-[300px]'>
                        <h3 className='font-semibold mb-2'>Preferences</h3>
                        <input type="text" name="skills" placeholder='skills' value={skills} onChange={(e: any) => setSkills(e.target.value)} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 my-2 focus:outline-none focus:border-blue-400" required />
                        <input type="text" name="qualification" placeholder='qualification' value={qualification} onChange={(e: any) => setQualification(e.target.value)} className="w-3/4 border border-gray-300 rounded-lg py-2 my-2 px-4 focus:outline-none focus:border-blue-400" required />

                    </div>
                    <button
                        className="px-4 py-2 mb-2  bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                        onClick={handleFilterSort}
                    >
                        Filter & Sort
                    </button>
                </div>

            </form>


        </div>
    )
}

export default JobListFilterComponent
