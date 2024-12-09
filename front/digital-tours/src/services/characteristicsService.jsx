import axios from "axios";

const API_URL = "http://34.229.166.90:8080/digitaltours/api/v1/features";

// Obtener todas las características
export const getCharacteristics = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener las características:", error);
    throw error;
  }
};

// Crear una nueva característica
export const createCharacteristic = async (characteristicData) => {
  try {
    const response = await axios.post(API_URL, characteristicData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la característica:", error);
    throw error;
  }
};

// Actualizar una característica existente
export const updateCharacteristic = async (id, updatedCharacteristic) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedCharacteristic);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la característica con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una característica
export const deleteCharacteristic = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la característica con ID ${id}:`, error);
    throw error;
  }
};
