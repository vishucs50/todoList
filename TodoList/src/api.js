
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://todo-list-38fe.vercel.app/"
    : "http://localhost:3000"
});

export default api;
