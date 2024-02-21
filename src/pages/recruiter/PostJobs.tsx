import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const JobPostForm = () => {
  const baseurl = "http://localhost:4001/api/post/recruiter";
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    postName: '',
    company: '',
    responsabilities: '',
    jobDescription: '',
    skillsRequired: '',
    qualification: '',
    salary: '',
    // category: '',
    // questions: [],
    recruiterEmail: '',
    recruitingPlace: '',
    closingDate: '',
    workArrangementType: '',
    employmentType: '',
    // isPremium: false,
    // isListed: true,
    // createdAt: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(`${baseurl}/create-job-post`, { formData }, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
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

  return (
    <div className="container mx-auto px-8">
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto mt-8 p-12 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Job Title<span className="text-red-500">*</span></label>
            <input type="text" name="postName" value={formData.postName} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>
          <div>
            <label className="block mb-2">Company<span className="text-red-500">*</span></label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>
          <div>
            <label className="block mb-2">Responsibilities<span className="text-red-500">*</span></label>
            <input type="text" name="responsabilities" value={formData.responsabilities} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>
          <div>
            <label className="block mb-2">Job Description<span className="text-red-500">*</span></label>
            <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required></textarea>
          </div>
          <div>
            <label className="block mb-2">Skill Required</label>
            <input type="text" name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>

          <div>
            <label className="block mb-2">Qualification Required</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>
          <div>
            <label className="block mb-2">Expected Salary</label>
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>

          <div>
            <label className="block mb-2">Contact Email<span className="text-red-500">*</span></label>
            <input type="email" name="recruiterEmail" value={formData.recruiterEmail} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>

          <div>
            <label className="block mb-2">Recruiting Place<span className="text-red-500">*</span></label>
            <input type="text" name="recruitingPlace" value={formData.recruitingPlace} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>

          <div>
            <label className="block mb-2">Job Closing Date</label>
            <input type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} className="w-3/4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div>

          {/* <div>
            <label className="block mb-2">Recruiting Place<span className="text-red-500">*</span></label>
            <input type="text" name="recruitingPlace" value={formData.responsibilities} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
          </div> */}
          <div>
            <label className="block mb-2">Work Arrangement Type<span className="text-red-500">*</span></label>
            <select name="workArrangementType" value={formData.workArrangementType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required>
              <option value="">Select Work Arrangement Type</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="office">Office</option>
            </select>
            {/* {formData.workArrangementType && <p className="text-gray-500 mt-2">Selected: {formData.workArrangementType}</p>} */}
          </div>
          <div>
            <label className="block mb-2">Employment Type<span className="text-red-500">*</span></label>
            <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required>
              <option value="">Select Employment Type</option>
              <option value="fulltime">Full-Time</option>
              <option value="parttime">Part-Time</option>
              <option value="internship">Internship</option>
            </select>
            {/* {formData.employmentType && <p className="text-gray-500 mt-2">Selected: {formData.employmentType}</p>} */}
          </div>

          {/* Add more fields for other details */}
        </div>
        <button type="submit" className="mt-14 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostForm;
