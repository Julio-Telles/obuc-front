import axios from 'axios';

export const api = axios.create({
    //baseURL: import.meta.env.VITE_HOSTNAME_BACKEND,
    baseURL: "http://localhost:3333",
});