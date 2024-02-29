import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div>
                    <span className="text-white font-semibold text-lg mx-6">Careercrafter</span>
                    <Link to="/home" className="text-white  ms-10 hover:text-gray-300">Home</Link>
                </div>
              
            </div>
        </nav>
    );
};

export default Navbar;
