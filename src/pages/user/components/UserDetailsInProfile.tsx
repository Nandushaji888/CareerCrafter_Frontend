import React from 'react'
import { IUser } from '../../../utils/interface/interface';
interface IUserDetailsInProfile{
    handleSubmit:any;
    userData:IUser;
    formData:any;
    handleChange:any;
    setFile:any


}

const UserDetailsInProfile:React.FC<IUserDetailsInProfile> = ({handleSubmit,userData,formData,handleChange,setFile}) => {
  return (
    <form className="py-2" onSubmit={handleSubmit}>
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
                    readOnly={!!formData?.phone}
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
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                About You
            </label>
            <textarea
                className="shadow appearance-none border rounded w-full h-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border h-24 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Skills"
                name='skills'
                value={formData?.skills}
                onChange={handleChange}
            ></textarea>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Qualifications
            </label>
            <textarea
                className="shadow appearance-none border h-20 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Qualifications"
                name='qualification'
                value={formData?.qualification}
                onChange={handleChange}
            ></textarea>

        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Resume
            </label>
            <input
                type="file"
                name='file'
                // value={formData?.resume}
                className="custom-file-input"
                onChange={(e: any) => setFile(e.target.files[0])}
                accept="application/pdf"
            />
        </div>


        <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit" // Change type to "submit"
            >
                Update
            </button>
        </div>
    </div>

</form>
  )
}

export default UserDetailsInProfile
