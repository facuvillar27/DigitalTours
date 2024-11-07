import axios from "axios";

const API_URL = "http://localhost:8080/digitaltours/api"; // Cambia a tu URL de API

// Iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/login`, { username, password });
    if (response.data.token) {
      return response.data.token;  // Devuelve el token recibido de la API
    } else {
      throw new Error("No token found in response");
    }
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

// Registrar usuario
export const register = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/signup`, { username, password, email });
    return response.data;  // Devuelve la respuesta tal cual, sin manipularla
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
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
