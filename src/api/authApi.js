import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1'; // Update this to your API's base URL

export const signup = async (user) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, user);
        return response.data;
    } catch (error) {

    };
}

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
