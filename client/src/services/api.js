import axios from "axios";



const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Use the API URL from the .env file, with a fallback to localhost

//USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS
//Function to login a user

export const signUpUser = async (formData) => {
  const response = await axios.post(`${API_URL}/signup/`, formData); // Adjust URL as needed
  return response.data; // Handle the response as necessary
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login/`, credentials);
  return response.data;
};

//OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES

export const createOpportunity = async (opportunity) => {
  const response = await axios.post(`${API_URL}/opportunities/`, opportunity);
  return response.data;
};

export const deleteOpportunity = async (opportunityId) => {
  const response = await axios.delete(
    `${API_URL}/opportunities/${opportunityId}`
  );
  return response.data;
};

//Fetch all opportunities for non-volunteer users
export const getOpportunities = async () => {
  const response = await axios.get(`${API_URL}/opportunities/`);
  return response.data;
};

//Fetch all opportunities organization has created
export const getCreatedOpportunities = async (id) => {
  const response = await axios.get(`${API_URL}/opportunities/created/`, {
    params: { id },
  });
  return response.data;
};

export const getOpenOpportunities = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/open/`, {
      params: { id },
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

export const getStartedOpportunities = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/started/`, {
      params: { id },
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

export const getFinishedOpportunities = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/finished/`, {
      params: { id },
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

//Fetch all opportunities for logged in volunteer users
export const getRankedOpportunities = async (body) => {
  const response = await axios.post(`${API_URL}/opportunities/ranked/`, body);
  return response.data;
};

//Fetch all opportunities user has applied to
export const getAppliedOpportunities = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/applied/${id}`);
    return response.data;
  } catch (err) {
    return [];
  }
};

export const getAcceptedOpportunities = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/accepted/${id}`);
    return response.data;
  } catch (err) {
    return [];
  }
};

export const getCompletedOpportunities = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/opportunities/completed/${id}`
    );
    return response.data;
  } catch (err) {
    return [];
  }
};

//APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS

export const applyForOpportunity = async (application) => {
  const response = await axios.post(`${API_URL}/applications/`, application);
  return response.data;
};

export const getApplications = async (jobId) => {
  const response = await axios.get(`${API_URL}/applications/${jobId}`);
  return response.data;
};

export const getOpenApplications = async (jobId) => {
  const response = await axios.get(`${API_URL}/applications/open/${jobId}`);
  return response.data;
};

export const getAcceptedApplications = async (jobId) => {
  const response = await axios.get(`${API_URL}/applications/accepted/${jobId}`);
  return response.data;
};

export const getFinishedApplications = async (jobId) => {
  const response = await axios.get(`${API_URL}/applications/finished/${jobId}`);
  return response.data;
};

// IMPLEMENT IN BACKEND
export const acceptApplication = async (id) => {
  const response = await axios.post(`${API_URL}/applications/accept/${id}`);
  return response.data;
};

export const completeApplication = async (id) => {
  const response = await axios.post(`${API_URL}/applications/complete/${id}`);
  return response.data;
};

export const deleteApplication = async (applicationId) => {
  const response = await axios.delete(
    `${API_URL}/applications/${applicationId}`
  );
  return response.data;
};

//ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS

export const createAlert = async (alert) => {
  const response = await axios.post(`${API_URL}/alerts/`, alert);
  return response.data;
};

export const getAlerts = async (userId) => {
  const response = await axios.get(`${API_URL}/alerts/${userId}`);
  return response.data;
};

export const deleteAlert = async (alertId) => {
  const response = await axios.delete(`${API_URL}/alerts/${alertId}`);
  return response.data;
};

//OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER

//Enhance the application text
export const enhanceApplication = async (text) => {
  const response = await axios.post(`${API_URL}/enhance_application/`, text);
  return response.data;
};

export const enhanceBio = async (text) => {
  const response = await axios.post(`${API_URL}/enhance_bio/`, text);
  return response.data;
};

export const completeOpportunity = async (id) => {
  const response = await axios.post(`${API_URL}/opportunities/complete/${id}`);
  return response.data;
};

export const startOpportunity = async (id) => {
  const response = await axios.post(`${API_URL}/opportunities/start/${id}`);
  return response.data;
};

export const getTraits = async () => {
  const response = await axios.get(`${API_URL}/traits/`);
  return response.data;
};

export const getFilteredRankedOpportunities = async (body) => {
  const response = await axios.post(
    `${API_URL}/opportunities/filtered_ranked/`,
    body
  );
  return response.data;
};

export const createFeedback = async (feedback) => {
  const response = await axios.post(`${API_URL}/feedback/`, feedback);
  return response.data;
};
