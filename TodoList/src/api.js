
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://your-backend.onrender.com"
    : "http://localhost:3000"
});

export default api;
