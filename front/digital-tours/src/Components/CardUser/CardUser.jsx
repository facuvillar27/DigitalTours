import styles from "./cardUser.module.css";
import ProfileImage from "../ProfileImage/ProfileImage";

const CardUser = ({ item, onDelete, onEdit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.profileImage}>
            <ProfileImage name={item.username} />
          </div>
          <div className={styles.userDetails}>
            <h3 className={styles.user_name}>{item.username}</h3>
            <p className={styles.user_email}>{item.email}</p>
            <p className={styles.user_role}>{item.role.name}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => onEdit(item)} className={styles.editButton}>Editar</button>
          <button onClick={() => onDelete(item)} className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CardUser;