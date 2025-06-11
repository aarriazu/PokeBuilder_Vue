import axios from 'axios';

export const API_BASE_URL = 'https://desktop-6lecrfo'; 

const API = axios.create({
  //baseURL: 'http://localhost:3000/api',
  baseURL: `${API_BASE_URL}:3000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('session');
  if (!config.headers) {
    config.headers = {};
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
