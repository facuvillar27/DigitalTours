import { Link } from "react-router-dom";
import styles from "./cardUser.module.css";

const Card = ({ item, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      onDelete(item.id);
    }
  };

  const handleEdit = () => {
    const nombre = prompt("Ingresa el nuevo nombre:", item.nombre);
    const email = prompt("Ingresa el nuevo email:", item.email);
    const rol = prompt("Ingresa el nuevo rol:", item.rol);

    if (nombre && email && rol) {
      const updatedUser = {
        ...item,
        nombre,
        email,
        rol,
      };
      onEdit(updatedUser);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Link to={`/users/${item.id}`} className={styles.cardList_link}>
            <div>
              <h3 className={styles.user_name}>{item.nombre}</h3>
              <p className={styles.user_email}>{item.email}</p>
              <p className={styles.user_role}>{item.rol}</p>
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
