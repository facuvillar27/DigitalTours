import React from "react";
import styles from "./CardCharacteristics.module.css";

const CardCharacteristic = ({ item, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <img src={item.urlImg} alt={`Icono de ${item.name}`} className={styles.image} />
      <p className={styles.name}>{item.name}</p>
      <div className={styles.actions}>
        <button onClick={() => onEdit(item)} className={styles.editButton}>Editar</button>
        <button onClick={() => onDelete(item)} className={styles.deleteButton}>Eliminar</button>
      </div>
    </div>
  );
};

export default CardCharacteristic;
