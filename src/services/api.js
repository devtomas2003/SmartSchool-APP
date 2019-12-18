import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.1.1.165:8080'
});

export default api;