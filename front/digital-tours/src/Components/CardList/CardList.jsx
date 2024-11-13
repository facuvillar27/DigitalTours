import { Link } from "react-router-dom";
import styles from "./cardList.module.css";

const CardList = ({ item, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este tour?")) {
      onDelete(item.id);
    }
  };

  const handleEdit = () => {
    const name = prompt("Ingresa el nuevo nombre:", item.name);
    const category = prompt("Ingresa la nueva categoría:", item.category);
    const description = prompt("Ingresa la nueva descripción:", item.description);
    const price = prompt("Ingresa el nuevo precio:", item.price);

    if (name && category && description && price) {
      const updatedTour = {
        ...item,
        name,
        category,
        description,
        price: parseFloat(price),
      };
      onEdit(updatedTour);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Link to={`/products/${item.id}`} className={styles.cardList_link}>
            <img src={item.image} alt={item.name} className={styles.cardImage} />
            <div>
              <p className={styles.product_type}>{item.category.name}</p>
              <h3 className={styles.product_name}>{item.name}</h3>
              <p className={styles.product_description}>{item.description}</p>
              <h3 className={styles.product_price}>{item.price}</h3>
            </div>
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleEdit} className={styles.editButton}>Editar</button>
          <button onClick={handleDelete} className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CardList;