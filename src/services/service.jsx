import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXBlbCI6ImFkbWluIiwiaWF0IjoxNzYxNzM5MDk5LCJleHAiOjE3NjE4MjU0OTl9.LzoYcdjxPRF5SjbH-umhaFKHTmQED_C3mJ3B11iRPRE"
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})