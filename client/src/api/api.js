import axios from "axios";

// Production API base URL (Render)
const baseURL = "https://bloomtasks.onrender.com/api";

// Local development fallback (keep for later use)
// const baseURL = "http://localhost:8800/api";

const api = axios.create({
  baseURL,
});

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
