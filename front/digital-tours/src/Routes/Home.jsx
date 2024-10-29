import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";
import { Link } from "react-router-dom";

const Home = () => {
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
        <Link to="/#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="/#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="/#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="/#" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
      </div>
      <div className={styles.home_body}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
