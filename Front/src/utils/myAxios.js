import axios from "axios";

import { url } from "./constants.js";

export const myAxios = axios.create({
    baseURL: url,
    withCredentials: true
})

// Request interceptor
myAxios.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})

// Response interceptor
myAxios.interceptors.response.use((config) => {
    return config.data;
}, (err) => {
    console.log(err)
    if (err.response){
        const data = err.response.data;
        return {error: data.message};
    }
    return Promise.reject(err);
})