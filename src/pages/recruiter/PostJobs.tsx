import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { validate } from '../../helper/jobPostValidation'
import { WorkArrangementType, employmentType } from '../../utils/interface/interface';
import { useDispatch, useSelector } from 'react-redux';
import { jobPost } from '../../utils/redux/slices/jobPostSlice';
import RecruiterNavbar from './components/RecruiterNavbar';


const JobPostForm = () => {
  const baseurl = "http://localhost:4001/api/post/recruiter";
  const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(()=> {
    window.scrollTo(0, 0);
  },[])

  const [formData, setFormData] = useState({
    postName: '',
    company: '',
    responsibilities: '',
    jobDescription: '',
    skills: '',
    qualification: '',
    salary: '',
    // category: '',
    questions: [],
    recruiterEmail: recruiterData?.email,
    recruitingPlace: '',
    closingDate: '',
    workArrangementType: WorkArrangementType.Office,
    employmentType: employmentType.Fulltime,
    recruiterId: recruiterData._id
    // isPremium: false,
    // isListed: true,
    // createdAt: new Date().toISOString().slice(0, 10),
  });


  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {

    e.preventDefault();

    const validationResult = validate(formData);
    if (!validationResult.isValid) {
      toast.error(validationResult.errorMessage);
      return;
    }
    // const data = {...formData,recruiterId:recruiterData?._id}

    // setFormData(data)

    axios.post(`${baseurl}/create-job-post`, { formData }, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          toast.success(res?.data?.message);

        } else {
          toast.error(res?.data?.message);

        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred.');
      })
  };

  const handleAskQuestions = (e: any) => {
    e.preventDefault();
    const validationResult = validate(formData);
    if (!validationResult.isValid) {
      toast.error(validationResult.errorMessage);
      return;
    }

    dispatch(jobPost(formData))
    console.log('reached here');
    
    navigate('/recruiter/post-job-ask-questions')
  };

  return (
    <>
      <RecruiterNavbar />
      <div className="container mx-auto px-8 mt-20 w-full">
        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <form onSubmit={handleSubmit} className="w-2/3 mx-auto mt-8 p-8 bg-white shadow-md rounded-lg ">
          <h2 className="text-3xl font-bold mb-6 text-center">Post a Job</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Job Title<span className="text-red-500">*</span></label>
              <input type="text" name="postName" value={formData.postName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Company<span className="text-red-500">*</span></label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Responsibilities<span className="text-red-500">*</span></label>
            <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400 h-32 resize-none" required></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Job Description<span className="text-red-500">*</span></label>
            <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400 h-32 resize-none" required></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Skill Required<span className="text-red-500">*</span></label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Qualification Required<span className="text-red-500">*</span></label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Salary</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" />
            </div>
            <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Contact Email<span className="text-red-500">*</span></label>
              <input type="email" name="recruiterEmail" value={formData.recruiterEmail} readOnly className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Recruiting Place<span className="text-red-500">*</span></label>
              <input type="text" name="recruitingPlace" value={formData.recruitingPlace} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
            <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Job Closing Date</label>
              <input type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Work Arrangement Type<span className="text-red-500">*</span></label>
              <select name="workArrangementType" value={formData.workArrangementType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="office">Office</option>
              </select>
            </div>
            <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Employment Type<span className="text-red-500">*</span></label>
              <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required>
                <option value="fulltime">Full-Time</option>
                <option value="parttime">Part-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">Post Job</button>
            <button type="button" onClick={handleAskQuestions} className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-6 rounded-lg">Ask Questions</button>
          </div>
        </form>
      </div>


    </>
  );
};

export default JobPostForm;
