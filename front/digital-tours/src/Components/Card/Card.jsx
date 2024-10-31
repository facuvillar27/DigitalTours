import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to={`/products/${item.id}`} className={styles.card_link}>
          <img src={item.image} alt="imageTest" className={styles.card_img} />
          <p className={styles.product_type}>{item.categoria}</p>
          <h3 className={styles.product_name}>{item.nombre}</h3>
          <p className={styles.product_description}>{item.descripcion}</p>
          <h3 className={styles.product_price}>{item.precio}</h3>
        </Link>
      </div>
    </div>
  );
};

export default Card;
