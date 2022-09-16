import axios from "axios";

export const API_URL = "http://localhost:4900/user";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

// Interceptor for request: adds token from localStorage to the request header
$api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    }
);

export default $api;
