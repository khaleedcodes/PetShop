import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7181/api',  // Use your actual API URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
