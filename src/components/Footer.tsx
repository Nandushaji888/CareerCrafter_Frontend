import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-8 pb-12">
            <div className="container mx-auto pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 ms-32">
                    <div className="mb-8 lg:mb-0">
                        <h4 className="text-xl font-semibold mb-4">About CareerCrafter</h4>
                        <p className="text-sm">Your go-to platform for finding the perfect career opportunity tailored to your skills and aspirations.</p>
                    </div>
                    <div className="mb-8 ms-16 lg:mb-0 ">
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="text-sm flex flex-col gap-2">
                            <li><Link to={'/'} className="hover:text-white">Home</Link></li>
                            <li><Link to={'/list-jobs'} className="hover:text-white">Jobs</Link></li>
                            <li><Link to={'/'} className="hover:text-white">Admin</Link></li>
                            <li><Link to={'/'} className="hover:text-white">Recruiter</Link></li>
                          
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                        <p className="text-sm">Email: <a href="mailto:info@careercrafter.com" className="text-white hover:underline">info@careercrafter.com</a><br />Phone: +1 (555) 123-4567</p>
                        <p className="text-sm">123 Main Street<br />City, State, Zip</p>
                    </div>
                </div>
                <hr className="border-gray-600 my-8" />
                <div className="text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} CareerCrafter. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
