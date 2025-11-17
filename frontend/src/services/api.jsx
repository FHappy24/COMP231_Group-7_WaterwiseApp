import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/api/auth/register', userData);
export const login = (credentials) => api.post('/api/auth/login', credentials);
export const getLeaderboard = () => api.get('/api/auth/leaderboard');
export const getUser = (userId) => api.get(`/api/auth/user/${userId}`);

// Location APIs
export const getLocations = () => api.get('/api/locations');
export const getAllLocations = () => api.get('/api/locations/all');
export const createLocation = (data) => api.post('/api/locations', data);
export const updateLocationCapacity = (id, data) => api.put(`/api/locations/${id}`, data);

// Image APIs
export const uploadImage = (formData) => api.post('/api/images', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMyImages = () => api.get('/api/images/my-images');
export const getAllImages = () => api.get('/api/images');
export const updateImageStatus = (id, data) => api.put(`/api/images/${id}`, data);


export default api;