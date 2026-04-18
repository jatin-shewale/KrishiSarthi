import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: apiBaseUrl,
});

export default api;
