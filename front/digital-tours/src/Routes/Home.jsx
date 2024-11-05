import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";
import Pagination from "../Components/Pagination/Pagination";
import data from "../assets/data.json";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadToursToLocalStorage = () => {
      const storedTours = JSON.parse(localStorage.getItem("tours"));
      if (!storedTours || storedTours.length === 0) {
        localStorage.setItem("tours", JSON.stringify(data.tours));
      }
    };

    loadToursToLocalStorage();
    const storedTours = JSON.parse(localStorage.getItem("tours")) || [];
    const sortedTours = storedTours.sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
    setTours(sortedTours);
  }, []);

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <Link to="/login" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="/login" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="/login" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
        <Link to="/login" className={styles.cat_link}>
          <p className={styles.cat_btn}>Categoria</p>
        </Link>
      </div>
      <div className={styles.home_body}>
        {currentTours.length > 0 ? (
          currentTours.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>No hay tours registrados.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
