// lib/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://candelapi.ddnsking.com", // Không cần đặt trong dấu nháy
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/Authen/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default apiClient;
