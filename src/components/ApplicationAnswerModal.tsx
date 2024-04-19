import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
import { IApplication } from '../utils/interface/interface';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axios/axiosInstance';
const APPLICATION_BASE_URL = import.meta.env.VITE_APPLICATION_BASE_URL

interface Question {
  question: string;
  requiredAnswer: string;
  givenAnswer?: string; 
}

interface ApplicationAnswerModalProps {
  questions: Question[];
  onClose: () => void;
  applicationData: IApplication | undefined;
  setApplied:any

}

const ApplicationAnswerModal: React.FC<ApplicationAnswerModalProps> = ({ questions, onClose, applicationData, setApplied}) => {
  const [questionAnswer, setquestionAnswer] = useState<Question[]>(questions.map(q => ({ ...q })));

  const handleAnswerChange = (index: number, answer: string) => {
    const updatedQuestion = { ...questionAnswer[index], givenAnswer: answer };
    const questionAnswerCopy = [...questionAnswer];
    questionAnswerCopy[index] = updatedQuestion;
    setquestionAnswer(questionAnswerCopy);
  };

  const handleAppliation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Access questionAnswer here, each question object will have a givenAnswer field
    // console.log('Updated Questions:', questionAnswer);

    await axiosInstance.post(`${APPLICATION_BASE_URL}/create-application`, { ...applicationData, questionAnswer }, { withCredentials: true })
      .then((res) => {
        toast.success(res?.data?.message)
        setApplied(true)
      })
      .catch((error) => {

        toast.error(error?.response?.data?.message)
      })
      .finally(() => {
        onClose()
      })

  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-y-auto'>
      <div className='mt-26 flex flex-col gap-5 text-white '>
        <button onClick={onClose} className='place-self-end'><XCircle color='white' size={30} /></button>
        <div className='bg-slate-800 rounded-xl px-10 py-10 flex flex-col gap-5 items-center mx-4'>
          <h1 className='text-3xl font-extrabold'>Answer the questions</h1>
          {questionAnswer.map((question, index) => (
            <div key={index} className='w-full'>
              <h5 className='text-xl font-bold max-w-[900px] whitespace-normal break-all'>{index + 1}. {question.question}</h5>
              <h6 className='mt-4 font-bold'>Your Answer</h6>
              <div className="flex items-center mt-2">
                <label className="inline-flex items-center mr-6 cursor-pointer">
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="yes"
                    checked={question.givenAnswer === 'yes'}
                    onChange={() => handleAnswerChange(index, 'yes')}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2 text-white">Yes</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="no"
                    checked={question.givenAnswer === 'no'}
                    onChange={() => handleAnswerChange(index, 'no')}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2 text-white">No</span>
                </label>
              </div>
            </div>
          ))}
          <button onClick={handleAppliation} className='bg-blue-900 text-white font-bold py-2 mb-5 mt-2 rounded-3xl px-5'>Submit & Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAnswerModal;
