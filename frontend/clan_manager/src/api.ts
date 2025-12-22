import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/src/routes",
    withCredentials: true
});

export default api;
