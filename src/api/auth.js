import axios from '../config/axiosConfig';

export const loginUser = async (formData) => {
  const response = await axios.post('/auth/login', formData);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post('/auth/register', formData);
  return response.data;
};
