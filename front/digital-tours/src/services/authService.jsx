import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/digitaltours/api";
const errorLogin = "Incorrect username or password";

// Función para manejar respuestas y errores comunes
const handleApiResponse = (response, errorMessage) => {
  if (response.data && response.data.data !== errorLogin) {
    return response.data.data;
  } else {
    throw new Error(errorMessage);
  }
};

// Iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/login`, { username, password });
    return handleApiResponse(response, "Error al iniciar sesión");
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

// Registrar usuario
export const register = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/signup`, { username, password, email });
    console.log("respuesta del register",response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem("token");
};

// Función genérica para decodificar el token
export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

// Obtener el rol del usuario desde el token
export function getUserRol() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded ? decoded.roles : null;
}

// Obtener la información del usuario desde el token
export function getUserInfo() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded ? { user: decoded.sub, roles: decoded.roles } : null;
}

// Obtener el ID del usuario desde el token
export function getIdFromToken(token) {
  const decoded = decodeToken(token);
  return decoded ? decoded.id : null;
}

// Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/v1/users/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener usuario por ID");
  }
};