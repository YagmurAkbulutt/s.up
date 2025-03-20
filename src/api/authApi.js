import axios from "axios";

const API_URL = "https://your-api.com/api/auth";

const login = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

const forgotPassword = async (email) => {
  return axios.post('/auth/forgot-password', { email }); 
};


export default { login, register, forgotPassword };
