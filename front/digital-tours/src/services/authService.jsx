import axios from "axios";

const API_URL = "http://localhost:8080/digitaltours/api"; // Cambia a tu URL de API

// Iniciar sesión
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/v1/auth/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Registrar usuario
export const register = async (username, password, email) => {
  const response = await axios.post(`${API_URL}/v1/auth/signup`, { username, password, email });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem("token");
};

// Configurar token en axios
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
