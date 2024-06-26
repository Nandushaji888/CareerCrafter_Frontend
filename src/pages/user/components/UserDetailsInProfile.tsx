import React from 'react'
import { IUser } from '../../../utils/interface/interface';
interface IUserDetailsInProfile {
    handleSubmit: any;
    userData: IUser;
    formData: any;
    handleChange: any;
    setFile: any

}

const UserDetailsInProfile: React.FC<IUserDetailsInProfile> = ({ handleSubmit, userData, formData, handleChange, setFile }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    };






    return (
        <form className="py-2"  >
            <div className="bg-white shadow-md  px-16 pt-6 pb-8 mb-4 rounded-3xl ">
                <div className="mb-4 flex justify-start gap-16  ">


                    <div className="profile flex justify-center py-2 pb-3">
                        <img
                            src='profile.png'
                            alt="avatar"
                            className="profile_img border-4 border-gray-100 w-32 rounded-full shadow-lg  hover:border-gray-200"
                        />
                    </div>
                    <div className='flex flex-col justify-center'>

                        <h1 className="text-3xl font-bold my-2 text-start items-start">  {userData?.name}</h1>
                        <h1 className="text-lg font-bold my-2 text-start items-start">  {userData?.email}</h1>
                    </div>



                </div>



                <div className="mb-4 flex items-center gap-20">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="tel"
                            placeholder="Phone Number"
                            name='phone'
                            readOnly={formData?.phone ? true : false}
                            onChange={handleChange}
                            value={formData?.phone}
                        />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date of Birth
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            name="dateOfBirth" // Add name attribute here
                            onChange={handleChange}
                            value={formData?.dateOfBirth}
                        />



                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Location
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="location"
                            onChange={handleChange}
                            value={formData?.location}
                        />



                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        About You
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="aboutYou"
                        name='aboutYou'
                        value={formData?.aboutYou}
                        onChange={handleChange}
                    ></textarea>

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Skills
                    </label>
                    <textarea
                        className="shadow appearance-none border h-20 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Skills"
                        name='skills'
                        value={formData?.skills}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Secondary Skills
                    </label>
                    <textarea
                        className="shadow appearance-none border h-16 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Secondary Skills"
                        name='secondarySkills'
                        value={formData?.secondarySkills}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Experience
                    </label>
                    <textarea
                        className="shadow appearance-none border h-24 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="your experience"
                        name='experience'
                        value={formData?.experience}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Qualifications
                    </label>
                    <textarea
                        className="shadow appearance-none border h-16 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Qualifications"
                        name='qualification'
                        value={formData?.qualification}
                        onChange={handleChange}
                    ></textarea>

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Upload New Resume
                    </label>
                    <input
                        type="file"
                        name='file'
                        className="custom-file-input appearance-none bg-white border border-gray-400 rounded py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
                        onChange={handleFileChange}
                        accept="application/pdf"
                    />
                </div>
                {userData?.resume && (
                    <div className='flex my-3'>
                        <button
                            className="bg-slate-300 hover:bg-gray-800 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={!userData.resume}
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(typeof userData.resume, userData.resume);
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const url:any = userData?.resume
                                window.open(url, '_blank');
                            }}
                        >
                            View current resume
                        </button>
                    </div>
                )}







                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>

        </form>
    )
}

export default UserDetailsInProfile