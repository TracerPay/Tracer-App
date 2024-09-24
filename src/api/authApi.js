import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL; // Make sure this is correctly set

export const signup = async (user) => {
  try {
    console.log(`Calling sign up route ${API_BASE_URL}/auth/signup`);
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, user);
    console.log('response', response);
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw the error message from the response
  }
}

export const login = async (username, password) => {
  try {
    console.log(`Calling login route ${API_BASE_URL}/auth/login`);
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    console.log('response', response);
    // Axios automatically returns the data in the response
    return { token: response.data.token };
  } catch (error) {
    // Throw the error from the response
    throw error.response.data;
  }
};
