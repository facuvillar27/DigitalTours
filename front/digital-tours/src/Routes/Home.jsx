import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.categories_menu}>
        <div className={styles.categories_container}>
          <p>categories</p>
        </div>
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
