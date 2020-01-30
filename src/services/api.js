import axios from 'axios';

const api = axios.create({
    baseURL: 'https://smartschoolest.herokuapp.com'
});

export default api;