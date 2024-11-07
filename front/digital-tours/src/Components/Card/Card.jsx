import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ item }) => {
  const defaultImage = "../assets/RioDeJaneiro.png"; // Ruta de la imagen por defecto


  const handleImageError = (e) => {
    e.target.onerror = null; // Evita bucles en caso de que la imagen por defecto también falle
    e.target.src = defaultImage; // Establece la imagen por defecto si la imagen original no se carga
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to={`/products/${item.product_id}`} className={styles.card_link}>
          <img
            src={item.image} // Usa la imagen proporcionada por la API
            alt="imageTest"
            className={styles.card_img}
            onError={handleImageError} // Maneja el error si la imagen no se carga
          />
          <p className={styles.product_type}>{item.category}</p>
          <h3 className={styles.product_name}>{item.name}</h3>
          <p className={styles.product_description}>{item.description}</p>
          <h3 className={styles.product_price}>{item.price} USD</h3>
        </Link>
      </div>
    </div>
  );
};

export default Card;