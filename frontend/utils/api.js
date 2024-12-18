import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,  // 10 second timeout
});

// Add a request interceptor to log details
api.interceptors.request.use((config) => {
  console.log('Request URL:', config.url);
  console.log('Request Method:', config.method);
  console.log('Request Data:', config.data);
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Add a response interceptor to log responses
api.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
}, (error) => {
  console.error('Full Error Object:', error);
  console.error('Error Details:', {
    message: error.message,
    code: error.code,
    config: error.config
  });
  return Promise.reject(error);
});

export default api;