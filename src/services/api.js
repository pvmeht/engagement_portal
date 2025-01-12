// services/api.js
import axios from 'axios';

export const login = async (loginData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', loginData); // Adjust API endpoint
    return response;
  } catch (error) {
    throw error;
  }
};


export const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  };