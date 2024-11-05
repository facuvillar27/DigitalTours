import axios from "axios";

const api = axios.create({
  baseURL: "https://tu-api.com/api", // URL base de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

// Configuración de interceptores (si los necesitas)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
