import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { validate } from '../../helper/jobPostValidation'
import { useDispatch, useSelector } from 'react-redux';
import { jobPost } from '../../utils/redux/slices/jobPostSlice';
import RecruiterNavbar from './components/RecruiterNavbar';
import axiosInstance from '../../utils/axios/axiosInstance';
import { WorkArrangementType, employmentType } from '../../utils/interface/enums';
import { LocationSuggestion } from '../../utils/interface/interface';
import axios from 'axios';
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL
const MAPBOX_API_KEY = import.meta.env.VITE_MAP_BOX_ACCESS_KEY as string;


const JobPostForm = () => {
  const recruiterData = useSelector((state: any) => state.persisted.recruiter.recruiterData);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);

  const [locationSelected,setLocationSelected] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
    recruitingPlace: { locationName: '', type: '', coordinates: [] },
    location: '',
    closingDate: '',
    workArrangementType: WorkArrangementType.Office,
    employmentType: employmentType.Fulltime,
    recruiterId: recruiterData._id,

    // isPremium: false,
    // isListed: true,
    createdAt: '',
  });


  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;

  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = (e: any) => {

    e.preventDefault();

    const validationResult = validate(formData);
    if (!validationResult.isValid) {
      toast.error(validationResult.errorMessage);
      return;
    }
    // const data = {...formData,recruiterId:recruiterData?._id}

    // setFormData(data)

    axiosInstance.post(`${POST_BASE_URL}/recruiter/create-job-post`, { formData })
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


  const fetchLocationSuggestions = async (searchText: string) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${MAPBOX_API_KEY}&country=IN`
      );
      setLocationSuggestions(response.data.features);
      if (!response.data.features.length && searchText) {
        setLocationSuggestions([{ id: '1111', place_name: 'No result found' }]);

      }
    } catch (error) {
      console.error('Failed to fetch location suggestions:', error);
    }
  };

  useEffect(() => {
    // if (formData.location) {

    if(locationSelected){
      setLocationSuggestions([])
      return
    }
    fetchLocationSuggestions(formData.location);
    // }
  }, [formData.location, locationSelected]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    if (name === 'location' && value.length > 2) {
      fetchLocationSuggestions(value);
      console.log('11111');

    }
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
            {/* <div className='mt-2'>
              <label className="block text-gray-700 mb-2">Recruiting Place<span className="text-red-500">*</span></label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div> */}
            <div className='mt-2'>



              <label className="block text-gray-700 mb-2">Recruiting Place<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400"
                required
              />
              <div className="absolute z-10 mt-2 w-[350px] px-6 bg-white shadow-md rounded-md overflow-hidden border-r-black border-r-6 ">
                {locationSuggestions.slice(0, 6).map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => {
                      setFormData({ ...formData, location: suggestion.place_name });
                      setLocationSelected(true)
                      setLocationSuggestions([]);
                    }}
                  >
                    {suggestion.place_name}
                  </div>
                ))}
              </div>

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
