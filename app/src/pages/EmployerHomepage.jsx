import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerHomepage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic (e.g., clear tokens, state)
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Employer Dashboard</h1>
                <p className="mb-4 text-center">Manage your volunteer listings, view applications, and more!</p>
                
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => navigate('/create-listing')} // Navigate to create listing page
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create Job Listing
                    </button>
                    <button
                        onClick={() => navigate('/view-applications')} // Navigate to view applications page
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        View Applications
                    </button>
                    <button
                        onClick={handleLogout} // Handle logout
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployerHomepage;
