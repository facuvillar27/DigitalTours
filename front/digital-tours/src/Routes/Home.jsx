import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";

import data from "../assets/data.json";

const getRandomItems = (arr, num) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Home = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    setTours(getRandomItems(data.tours, 10));
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.cta}>
        <div className={styles.cta_box}>
          <h1 className={styles.cta_text}>
            Recuerdos de viajes que nunca olvidaras
          </h1>
          <input type="search" />
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
        {tours.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
