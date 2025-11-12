import axios from "axios";

const BACKEND_URL = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default BACKEND_URL;
