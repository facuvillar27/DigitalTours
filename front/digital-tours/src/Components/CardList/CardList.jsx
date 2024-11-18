import { Link } from "react-router-dom";
import styles from "./cardList.module.css";

const CardList = ({ item, onDelete, onEdit }) => {
  if (!item) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to={`/products/${item.id}`} className={styles.cardList_link}>
          <div className={styles.cardContent}>
            <img src={item.image} alt={item.name} className={styles.cardImage} />
            <div>
              <p className={styles.product_type}>{item.category.name}</p>
              <h3 className={styles.product_name}>{item.name}</h3>
              <p className={styles.product_description}>{item.description}</p>
              <h3 className={styles.product_price}>{item.price} USD</h3>
            </div>
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <button onClick={() => onEdit(item)} className={styles.editButton}>Editar</button>
          <button onClick={() => onDelete(item)} className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CardList;