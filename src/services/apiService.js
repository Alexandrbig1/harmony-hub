// // export const URL = "https://harmony-hub-backend.onrender.com/api";
// // export const URL = `${process.env.APP_API_URI}/api`;
// // export const URL = "http://localhost:27017/api"
// export const URL = "http://localhost:27017/api"
// // export const URL = `${import.meta.env.APP_API_URL}/api`
// // export const URL = "https://harmonyhub-vzfi.onrender.com/api"


// apiService.js
import axios from 'axios';

// Create axios instance with correct port
const api = axios.create({
    baseURL: 'https://harmonyhub.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor with logging
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor with logging
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        console.error('API Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

// export const URL = 'http://localhost:27017/api';
export const URL = 'https://harmonyhub.onrender.com/api';
export default api;