import React from 'react';
import { XCircle } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
}

interface PostQuestionsModalProps {
  questions: Question[];
  onClose: () => void; 
}

const PostQuestionsModal: React.FC<PostQuestionsModalProps> = ({ questions,onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
    <div className='mt-10 flex flex-col gap-5 text-white'>
      <button onClick={onClose} className='place-self-end'><XCircle color='black' size={30} /></button>
      <div className='bg-slate-700 rounded-xl px-10 py-10 flex flex-col gap-5 items-center mx-4'>
        <h1 className='text-3xl font-extrabold'>Question and Answers</h1>
        {questions.map((question, index) => (
          <div key={index} className='w-full'>
              <h5 className='text-xl font-bold'><span className='text-white'>{index + 1}.  </span>{question.question}</h5>
            <h6 className='mt-4 font-bold'>Required Answer</h6>
            <div className="flex items-center mt-2">
              <label className="inline-flex items-center mr-6 cursor-pointer">
                <input
                  type="radio"
                  name={`answer-${index}`}
                  value="yes"
                  readOnly
                  checked={question.answer === 'yes'}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2 text-white">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`answer-${index}`}
                  value="no"
                  readOnly
                  checked={question.answer === 'no'}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2 text-white">No</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default PostQuestionsModal;
