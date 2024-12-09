import axios from "axios";

const API_URL = "http://34.229.166.90:8080/digitaltours/api/v1/users"; 

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Devuelve los datos de los usuarios
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Actualizar un usuario (con rol)
export const updateUser = async (updatedUser) => {
  console.log(updatedUser);
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
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data; // Devuelve los datos del usuario
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// getLoggedUser = async () => {
//   try {
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching logged user:", error);
//     throw error;
//   }
// };