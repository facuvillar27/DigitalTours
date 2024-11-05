import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";

import data from "../assets/data.json";

const Home = () => {
  const [tours, setTours] = useState([]);

  // Función para mezclar el arreglo aleatoriamente
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Carga los tours de data.json y combínalos con los de localStorage
    const storedTours = JSON.parse(localStorage.getItem("tours")) || [];
    const combinedTours = [...storedTours, ...data.tours];

    // Mezcla los tours combinados y guárdalos en el localStorage
    const shuffledTours = shuffleArray(combinedTours);
    localStorage.setItem("tours", JSON.stringify(shuffledTours));

    // Actualiza el estado con los tours mezclados
    setTours(shuffledTours);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.cta}>
        <div className={styles.cta_box}>
          <h1 className={styles.cta_text}>
            Recuerdos de viajes que nunca olvidaras
          </h1>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Encuentra Destinos Ideales"
          />
        </div>
      </div>
      <div className={styles.cat_menu}>
        <Link to="/login" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
      </div>
      <div className={styles.home_body}>
        {tours.length > 0 ? (
          tours.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>No hay tours registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Home;