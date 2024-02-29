import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, clearJobPost } from '../../utils/redux/slices/jobPostSlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: any) => state.persisted.postData.jobData);
    const [formData, setFormData] = useState(userData);
    const baseurl = "http://localhost:4001/api/post/recruiter";

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');



    const handleNext = () => {
        if (question === "") {
            toast.error('Question required...!!!');
            return false;
        } else if (answer === "") {
            toast.error('Answer required...!!!');
            return false;
        }
        dispatch(addQuestion({ question, answer }));
        const updatedFormData = { ...formData, questions: [...formData.questions, { question, answer }] };
        // console.log('question dispatcheddddddddddddddddddddddddddddddddd');
        setFormData(updatedFormData);


        setQuestion('');
        setAnswer('');
        // console.log('formData');
        // console.log('updatedFormData');
        // console.log(updatedFormData);
        // console.log(formData);

        return updatedFormData;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = handleNext();
        // console.log(res);

        if (data) {
            // console.log(question, answer);
            // console.log('hereee');
            // console.log(res);


            axios.post(`${baseurl}/create-job-post`, { data }, { withCredentials: true })
                .then((response) => {
                    if (response.data.status) {
                        console.log(response.data);
                        dispatch(clearJobPost());
                        navigate('/recruiter/post-job');
                    } else {
                        toast.error(response?.data?.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('An error occurred.');
                });
        }
    };

    return (
        <div className="container mx-auto px-8">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <form className="max-w-5xl mx-auto mt-8 p-12  bg-gray-100 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold mb-4">Add Question</h2>
                <p>Question {formData.questions.length + 1}</p>
                <div>
                    <input
                        type="text"
                        placeholder="Type your question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-6 px-4 focus:outline-none focus:border-blue-400"
                        required
                    />
                </div>

                <h6 className='mt-4 font-bold'>Required Answer</h6>
                <div className="flex items-center mt-4">
                    <label className="inline-flex items-center mr-6 cursor-pointer">
                        <input
                            type="radio"
                            name="answer"
                            value="yes"
                            checked={answer === 'yes'}
                            onChange={() => setAnswer('yes')}
                            className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="answer"
                            value="no"
                            checked={answer === 'no'}
                            onChange={() => setAnswer('no')}
                            className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4">Submit</button>
                    <button type="button" onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Add another question</button>
                </div>
            </form>
        </div>
    );
};

export default AddQuestionForm;
