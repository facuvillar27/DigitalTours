// src/services/userService.jsx
import axios from "axios";

const API_URL = "http://localhost:8080/digitaltours/api"; 

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/v1/users`);
    console.log(response.data.data);
    return response.data.data; // Devuelve los datos de los usuarios
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
};

// Eliminar un usuario -- PENDIENTE DE ENDPOINT
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; 
  }
};

// Actualizar un usuario -- PENDIENTE DE ENDPOINT
export const updateUser = async (updatedUser) => {
  try {
    await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; 
  }
};

// Obtener un usuario por su ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/v1/users/${id}`);
    return response.data.data; // Devuelve los datos del usuario
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Obtener el rol de un usuario por su ID
export const getUserRoleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/v1/users/role/${id}`);
    return response.data.role; // Devuelve el rol del usuario
  } catch (error) {
    console.error("Error fetching user role by ID:", error);
    throw error; 
  }
};