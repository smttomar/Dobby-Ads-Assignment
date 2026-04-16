import axios from "axios";

const API = axios.create({
    baseURL: "https://dobby-ads-assignment-1pry.onrender.com/api",
    // baseURL: "http://localhost:8000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;
