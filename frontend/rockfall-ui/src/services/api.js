import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rockfall-backend-0mqf.onrender.com/api'
});

export const loginUser = (data) => API.post('/auth/login', data);
export const getSensors = () => API.get('/sensors');
export const addSensor = (data) => API.post('/sensors', data);
export const deleteSensor = (id) => API.delete(`/sensors/${id}`);
export const getAlerts = () => API.get('/alerts');
export const getActiveAlerts = () => API.get('/alerts/active');
export const saveAlert = (data) => API.post('/alerts', data);
export const getDashboardStats = () => API.get('/dashboard/stats');
export const predictRisk = (data) => API.post('/predict', data);