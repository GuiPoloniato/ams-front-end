import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXBlbCI6ImFkbWluIiwiaWF0IjoxNzYxODMzNDM1LCJleHAiOjE3NjE5MTk4MzV9.JMosjcgFmwk72mV5OgeM0_M8JZ4V-5h1yZqOXZZWshU"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})