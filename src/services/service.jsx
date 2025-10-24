import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjEyM0BlbWFpbC5jb20iLCJwYXBlbCI6ImFkbWluIiwiaWF0IjoxNzYwMzI2NjkxLCJleHAiOjE3NjA0MTMwOTF9.KTgpxOb0J3XCz0gAK9OMP3kzPV1mWxPxQoVEXuCM4ko"
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})