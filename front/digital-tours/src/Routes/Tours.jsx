import { Link } from "react-router-dom";
import styles from "../styles/tours.module.css";
import CardList from "../Components/CardList/CardList";
import useProducts from "../hooks/useProducts"; // Importa el hook

const Tours = () => {
  const { products, updateProducts } = useProducts(); // Usa el hook

  const deleteTour = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    updateProducts(updatedProducts); // Actualiza usando el hook
  };

  const editTour = (updatedProduct) => {
    const updatedProducts = products.map((product) => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    updateProducts(updatedProducts); // Actualiza usando el hook
  };

  return (
    <div className={styles.main}>
      <div className={styles.dashboard}>
        <div className={styles.reg_btn}>
          <Link to="/registerTour" className={styles.cat_link}>
            <p className={styles.registerTour_btn}>Registrar Tour</p>
          </Link>
        </div>
        <div className={styles.home_body}>
          <h1 className={styles.cta_text}>Tours</h1>
          {products.length > 0 ? (
            products.map((item) => (
              <CardList 
                key={item.id} 
                item={item} 
                onDelete={deleteTour} 
                onEdit={editTour}
              />
            ))
          ) : (
            <p>No hay tours registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tours;