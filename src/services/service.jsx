import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEyM0BlbWFpbC5jb20iLCJpYXQiOjE3NjE1MzE5ODYsImV4cCI6MTc2MTYxODM4Nn0.xPRSXO1MGUgisWNO4kxApJtVuYWS6AdD_ZpmekUx6Jk"
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})