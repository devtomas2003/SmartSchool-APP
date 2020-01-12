import axios from 'axios';

const api = axios.create({
    baseURL: 'http://frangoimm.ddns.net:8080'
});

export default api;