import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export const addReport = async (organizationID, reportData, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const response = await axios.post(`${API_BASE_URL}/reports/organizations/${organizationID}`, reportData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error adding report:", error);
    throw error.response?.data || error.message;
  }
};

export const getReports = async (organizationID, type, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const response = await axios.get(`${API_BASE_URL}/reports/organizations/${organizationID}/${type}`, { headers });
    console.log("Reports:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error.response?.data || error.message;
  }
};

export const getReportById = async ( reportID, authToken) => {
  try {
      const headers = {
          Authorization: `Bearer ${authToken}`,
      };
      const response = await axios.get(`${API_BASE_URL}/reports/${reportID}`, { headers });
      return response.data;
  } catch (error) {
      console.error("Error fetching report:", error);
      throw error.response?.data || error.message;
  }
};

export const deleteReport = async (reportID, authToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`
    }
    const response = await axios.delete(`${API_BASE_URL}/reports/${reportID}`, { headers });
    return response.data;
    } catch (error) {
      console.error("Error deleting report:", error);
      throw error.response?.data || error.message;
    }
};