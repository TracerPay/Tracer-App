import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1'; // Update this to your API's base URL

// Fetch user details by organizationID and username
export const getUsers = async (organizationID, authToken) => {
    try {
        const headers = {
            Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.get(`${API_BASE_URL}/users/organizations/${organizationID}`, { headers });
        console.log('Users:', response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error.response?.data || error.message;
    };
}

export const getUser = async (organizationID, username, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const response = await axios.get(`${API_BASE_URL}/users/organizations/${organizationID}/${username}`, { headers });
    console.log("User Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error.response?.data || error.message;
  }
};

// Create a new user
export const createUser = async (organizationID, userData, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const response = await axios.post(`${API_BASE_URL}/users/organizations/${organizationID}`, userData, { headers });
    console.log("User Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error.response?.data || error.message;
  }
};

// Update an existing user by organizationID and username
export const updateUser = async (organizationID, username, userData, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const response = await axios.put(`${API_BASE_URL}/users/organizations/${organizationID}/${username}`, userData, { headers });
    console.log("User Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error.response?.data || error.message;
  }
};

// Delete a user by organizationID and username
export const deleteUser = async (organizationID, username, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const response = await axios.delete(`${API_BASE_URL}/users/organizations/${organizationID}/${username}`, { headers });
    console.log("User Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error.response?.data || error.message;
  }
};
