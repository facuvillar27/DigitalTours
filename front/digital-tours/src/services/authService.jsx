import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/digitaltours/api"; 
const errorLogin = "Incorrect username or password"

// Iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/login`, { username, password });

    if (response.data.data !== errorLogin && response.data.data) {
      return response.data.data;  
    } else{      
      throw new Error;
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

// Decodificar token y obtener información del usuario
export function getUserInfo() {
  let token;
  try {
    token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token); // Ahora se usa jwt_decode correctamente
    const { sub: user, roles } = decoded; 
    return { user, roles };
  } catch (error) {
    console.error("Error al obtener el token o token inválido:", error);
    return null;
  }
}

export function getUserRol() {
  const userInfo = getUserInfo();
  return userInfo ? userInfo.roles : null;
}

// Obtener productos
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/v1/products`);
    return response.data.data; // Ajustado al formato de respuesta esperado
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
};

// Registrar nuevo producto
export const registerProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/v1/products`, productData);
    return response.data;
  } catch (error) {
    throw new Error("Error al registrar producto");
  }
};

// Obtener un producto específico por ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/v1/products/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Error al obtener producto por ID");
  }
};