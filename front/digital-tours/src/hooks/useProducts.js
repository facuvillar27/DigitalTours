import { useState, useEffect } from "react";
import { getProducts } from "../services/authService";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar productos desde el localStorage y el servidor en el inicio
    const storedProducts = JSON.parse(localStorage.getItem("tours")) || [];
    setProducts(storedProducts);

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        localStorage.setItem("tours", JSON.stringify(fetchedProducts));
      } catch (error) {
        console.error("Error al cargar tours desde el servidor:", error);
      }
    };
    fetchProducts();
  }, []);

  // Función para actualizar productos en el estado y en el localStorage
  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("tours", JSON.stringify(updatedProducts));
  };

  return { products, updateProducts };
};

export default useProducts;