import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import { signUpUser } from '../services/api';

const SignUp = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        skills: '',
        phone: '',
        userType: 'volunteer'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            await signUpUser(formData);
            setSuccessMessage('Sign up successful! Please check your email for confirmation.');
            // Redirect to employer homepage if userType is employer
            if (formData.userType === 'employer') {
                navigate('/employer-home'); // Change this to your employer homepage route
            }
        } catch (err) {
            setError('Failed to sign up. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {formData.userType === 'volunteer' && (
                    <div className="mb-4">
                        <textarea
                            name="skills"
                            placeholder="Your Skills/Interests"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                        />
                    </div>
                )}

                {formData.userType === 'employer' && (
                    <div className="mb-4">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label>
                        <input 
                            type="radio" 
                            name="userType" 
                            value="volunteer" 
                            checked={formData.userType === 'volunteer'}
                            onChange={handleChange} 
                        />
                        Volunteer
                    </label>
                    <label className="ml-4">
                        <input 
                            type="radio" 
                            name="userType" 
                            value="employer" 
                            checked={formData.userType === 'employer'}
                            onChange={handleChange} 
                        />
                        Employer
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
