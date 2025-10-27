import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXBlbCI6ImFkbWluIiwiaWF0IjoxNzYxNTc2NzA1LCJleHAiOjE3NjE2NjMxMDV9.gL15i41jmyXyKbxWjvxY7jvOT1DqRH0VI-KCqbbZlGE"
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})