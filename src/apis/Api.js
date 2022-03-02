import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT
});

Api.interceptors.request.use((config) => {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if(!config.headers.Authorization && token)
        config.headers.Authorization = 'Bearer ' + token;
    return config;
},  (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default Api;