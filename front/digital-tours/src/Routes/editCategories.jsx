import React, { useState, useEffect } from 'react';
import styles from '../styles/editCategories.module.css';
import { getProducts, updateProduct, getProductById } from '../services/productService';
import Tick from '../Components/Tick/Tick';

const categories = [
  { id: 1, name: 'Gastronomía' },
  { id: 2, name: 'Aventura' },
  { id: 3, name: 'Cultura' },
  { id: 4, name: 'Naturaleza' },
];

const EditCategories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [updatedProductIds, setUpdatedProductIds] = useState([]); // Para almacenar los productos que fueron actualizados
  const [loadingProductIds, setLoadingProductIds] = useState([]); // Para gestionar el estado de carga del botón

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      const initialCategoryState = {};
      data.forEach((product) => {
        initialCategoryState[product.id] = product.category.id;
      });
      setSelectedCategory(initialCategoryState);
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = async (productId, newCategoryId) => {
    try {
      // Marcar el producto como "cargando"
      setLoadingProductIds((prevIds) => [...prevIds, productId]);

      // Obtener el producto completo por ID
      const product = await getProductById(productId);
  
      // Buscar la categoría correspondiente por ID
      const category = categories.find((category) => category.id === newCategoryId);
  
      // Crear el objeto actualizado con la categoría completa
      const updatedProduct = {
        ...product,
        category: {
          id: category.id,
          name: category.name,
        },
      };
  
      // Enviar el producto actualizado al backend
      await updateProduct(productId, updatedProduct);
  
      // Actualizar el estado de los productos para reflejar el cambio
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, category: { id: category.id, name: category.name } } : product
        )
      );
  
      // Actualizar el estado local de la categoría seleccionada
      setSelectedCategory((prevState) => ({
        ...prevState,
        [productId]: newCategoryId,
      }));
  
      // Marcar el producto como actualizado para mostrar la animación
      setUpdatedProductIds((prevIds) => [...prevIds, productId]);
  
      // Limpiar el estado de "actualización" después de unos segundos (3 segundos)
      setTimeout(() => {
        setUpdatedProductIds((prevIds) => prevIds.filter((id) => id !== productId));
        // Quitar el producto de la lista de "cargando" después de la animación
        setLoadingProductIds((prevIds) => prevIds.filter((id) => id !== productId));
      }, 3000);

    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  };

  const handleDropdownChange = (productId, newCategoryId) => {
    setSelectedCategory((prevState) => ({
      ...prevState,
      [productId]: newCategoryId,
    }));
  };

  return (
    <div className={styles.adminCategories}>
      <h2>Asignar Categorías a Productos</h2>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <span>ID: {product.id}</span>
            <span className={styles.productName}>{product.name}</span>
            <span>Categoría: </span>
            <select
              className={styles.selectCategory}
              value={selectedCategory[product.id] || product.category.id} // Asegurarse de que el valor corresponda al ID de la categoría
              onChange={(e) => handleDropdownChange(product.id, parseInt(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {/* Mostrar el Tick y ocultar el botón de actualización */}
            {!loadingProductIds.includes(product.id) && (
              <button
                className={styles.updateButton}
                onClick={() => handleCategoryChange(product.id, selectedCategory[product.id])}
              >
                Actualizar Categoría
              </button>
            )}

            {updatedProductIds.includes(product.id) && <Tick className={styles.tick} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditCategories;