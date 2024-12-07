import axios from "axios";

const API_URL = "http://localhost:8080/digitaltours/api/v1/products";

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Obtener un producto específico por ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    console.log("Respuesta del backend:", response);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Actualizar un producto existente por ID
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
};
