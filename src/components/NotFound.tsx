// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
