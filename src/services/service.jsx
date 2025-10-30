import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJwYXBlbCI6ImFkbWluIiwiaWF0IjoxNzYxNzkwOTk0LCJleHAiOjE3NjE4NzczOTR9.iqbr8xAjb3_-9-MjBDqIMGnShpp2JotP_lv-O5Jl1wo"
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})