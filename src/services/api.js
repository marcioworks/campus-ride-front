import axios from 'axios';

const API_URL = process.env.REACT_APP_API_HOST_URL;

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export default api;
