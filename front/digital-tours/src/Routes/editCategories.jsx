import { useState, useEffect } from 'react';
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
  const [updatedProductIds, setUpdatedProductIds] = useState([]);
  const [loadingProductIds, setLoadingProductIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        const initialCategoryState = {};
        data.forEach((product) => {
          initialCategoryState[product.id] = product.category.id;
        });
        setSelectedCategory(initialCategoryState);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = async (productId, newCategoryId) => {
    try {
      setLoadingProductIds((prevIds) => [...prevIds, productId]);

      const product = await getProductById(productId);
      console.log(product);

      const { id, name, description, price, image } = product.data;
      const category = categories.find((c) => c.id === newCategoryId);

      const updatedProduct = {
        id,
        name,
        description,
        category: { id: category.id, name: category.name },
        price,
        image,
      };
      console.log(updatedProduct);

      await updateProduct(productId, updatedProduct);

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, category: updatedProduct.category } : p
        )
      );

      setSelectedCategory((prevState) => ({
        ...prevState,
        [productId]: newCategoryId,
      }));

      setUpdatedProductIds((prevIds) => [...prevIds, productId]);

      setTimeout(() => {
        setUpdatedProductIds((prevIds) => prevIds.filter((id) => id !== productId));
        setLoadingProductIds((prevIds) => prevIds.filter((id) => id !== productId));
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      setLoadingProductIds((prevIds) => prevIds.filter((id) => id !== productId));
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
            <span>Categoría:</span>
            <select
              className={styles.selectCategory}
              value={selectedCategory[product.id] || product.category.id}
              onChange={(e) => handleDropdownChange(product.id, parseInt(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {!loadingProductIds.includes(product.id) && (
              <button
                className={styles.updateButton}
                onClick={() => handleCategoryChange(product.id, selectedCategory[product.id])}
              >
                Actualizar Categoría
              </button>
            )}

            {loadingProductIds.includes(product.id) && (
              <span className={styles.loading}>Cargando...</span>
            )}

            {updatedProductIds.includes(product.id) && <Tick className={styles.tick} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditCategories;
