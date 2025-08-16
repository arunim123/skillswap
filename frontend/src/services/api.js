import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

export const skills = {
  getAll: () => api.get('/skills'),
  getById: (id) => api.get(`/skills/${id}`),
  create: (skillData) => api.post('/skills', skillData),
  update: (id, skillData) => api.put(`/skills/${id}`, skillData),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const mentors = {
  getAll: () => api.get('/mentors'),
  getById: (id) => api.get(`/mentors/${id}`),
  update: (id, mentorData) => api.put(`/mentors/${id}`, mentorData),
};

export default api; 