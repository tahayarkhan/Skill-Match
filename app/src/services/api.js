import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Change this if deployed

// Function to login a user
export const loginVolunteer = async (credentials) => {
    const response = await axios.post(`${API_URL}/login/volunteer/`, credentials);
    return response.data;
};

export const loginEmployer = async (credentials) => {
    const response = await axios.post(`${API_URL}/login/employer/`, credentials);
    return response.data;
};

export const createOpportunity = async (opportunity) => {
    const response = await axios.post(`${API_URL}/opportunities/`, opportunity);
    return response.data;
};

export const getOpportunities = async () => {
    const response = await axios.get(`${API_URL}/opportunities/`);
    return response.data;
};

export const applyForOpportunity = async (application) => {
    const response = await axios.post(`${API_URL}/applications/`, application);
    return response.data;
};

export const signUpUser = async (formData) => {
    const response = await axios.post(`${API_URL}/signup/`, formData); // Adjust URL as needed
    return response.data; // Handle the response as necessary
};

