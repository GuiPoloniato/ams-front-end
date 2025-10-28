import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXBlbCI6ImFkbWluIiwiaWF0IjoxNzYxNjYzNjU4LCJleHAiOjE3NjE3NTAwNTh9.rJ6rh7TRVO4QLxa32mG1nD-BCtvlT-Ir1w_-yJLknmM"
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})