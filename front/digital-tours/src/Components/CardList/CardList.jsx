import { Link } from "react-router-dom";
import styles from "./cardList.module.css";

const Card = ({ item, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este tour?")) {
      onDelete(item.id);
    }
  };

  const handleEdit = () => {
    const nombre = prompt("Ingresa el nuevo nombre:", item.nombre);
    const categoria = prompt("Ingresa la nueva categoría:", item.categoria);
    const descripcion = prompt("Ingresa la nueva descripción:", item.descripcion);
    const precio = prompt("Ingresa el nuevo precio:", item.precio);

    // Verificar que se haya ingresado un nombre y que no sea vacío
    if (nombre && categoria && descripcion && precio) {
      const updatedTour = {
        ...item,
        nombre,
        categoria,
        descripcion,
        precio: parseFloat(precio),
      };
      onEdit(updatedTour);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Link to={`/products/${item.id}`} className={styles.cardList_link}>
            <img src={item.image} alt={item.nombre} className={styles.cardImage} />
            <div>
              <p className={styles.product_type}>{item.categoria}</p>
              <h3 className={styles.product_name}>{item.nombre}</h3>
              <p className={styles.product_description}>{item.descripcion}</p>
              <h3 className={styles.product_price}>{item.precio}</h3>
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

export default Card;