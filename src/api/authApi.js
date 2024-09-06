import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL; // Make sure this is correctly set

export const signup = async (user) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, user);
        return response.data;
    } catch (error) {
        throw error.response.data; // Throw the error message from the response
    }
}

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    
    // Axios automatically returns the data in the response
    return { token: response.data.token };
  } catch (error) {
    // Throw the error from the response
    throw error.response.data;
  }
};
