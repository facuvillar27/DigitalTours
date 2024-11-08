import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";
import Pagination from "../Components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun, faUtensils, faTree, faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Components/Spinner/Spinner";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const shuffleTours = (toursArray) => {
    return toursArray.sort(() => Math.random() - 0.5);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/digitaltours/api/v1/products");
      const shuffledTours = shuffleTours(response.data.data);
      setTours(shuffledTours);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false); // Cambia a `false` cuando los datos se hayan cargado
    }
  };

  useEffect(() => {
    fetchProducts();
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
          <h1 className={styles.cta_text}>Recuerdos de viajes que nunca olvidarás</h1>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Encuentra Destinos Ideales"
          />
        </div>
      </div>
      <div className={styles.cat_menu}>
        <Link to="#" className={styles.cat_link}>
          <FontAwesomeIcon icon={faMountainSun} className={styles.cat_icon}/>
          <span>Cultura</span>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <FontAwesomeIcon icon={faUtensils} className={styles.cat_icon}/>
          <span>Gastronomía</span>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <FontAwesomeIcon icon={faTree} className={styles.cat_icon}/>
          <span>Naturaleza</span>
        </Link>
        <Link to="#" className={styles.cat_link}>
          <FontAwesomeIcon icon={faPersonSwimming} className={styles.cat_icon}/>
          <span>Deporte</span>
        </Link>
      </div>
      <div className={styles.home_body}>
        {isLoading ? (
          <Spinner />
        ) : currentTours.length > 0 ? (
          currentTours.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p className={styles.no_tours}>No hay tours registrados.</p>
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