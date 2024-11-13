import { Link } from "react-router-dom";
import styles from "./cardUser.module.css";
import ProfileImage from "../ProfileImage/ProfileImage";

const CardUser = ({ item, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      onDelete(item.id);
    }
  };

  const handleEdit = () => {
    const username = prompt("Ingresa el nuevo nombre:", item.username);  // Cambié nombre por username
    const email = prompt("Ingresa el nuevo email:", item.email);
    const role = prompt("Ingresa el nuevo rol:", item.role);  // Cambié rol por role

    if (username && email && role) {
      const updatedUser = {
        ...item,
        username,  // Cambié nombre por username
        email,
        role,  // Cambié rol por role
      };
      onEdit(updatedUser);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Link to={`/users/${item.id}`} className={styles.cardList_link}>
          <ProfileImage name={item.username} />
            <div>
              <h3 className={styles.user_name}>{item.username}</h3>  {/* Cambié nombre por username */}
              <p className={styles.user_email}>{item.email}</p>
              <p className={styles.user_role}>{item.role}</p>  {/* Cambié rol por role */}
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

export default CardUser;