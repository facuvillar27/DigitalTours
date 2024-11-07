import React from 'react';
import styles from "./Characteristics.module.css";

const Characteristics = ({ caracteristicas }) => {
  return (
    <div className={styles.caracteristicas_container}>
      <h2>Características</h2>
      <ul className={styles.caracteristicas_list}>
        {caracteristicas.map((caracteristica) => (
          <li key={caracteristica.id} className={styles.caracteristica_item}>
            <span className={styles.icono}>{caracteristica.icono}</span>
            <span className={styles.nombre}>{caracteristica.nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characteristics;
