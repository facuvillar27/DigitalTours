import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/home.module.css";
import Card from "../Components/Card/Card";
import Pagination from "../Components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountainSun,
  faUtensils,
  faTree,
  faPersonSwimming,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Components/Spinner/Spinner";
import { DayPicker } from "react-day-picker";
import calendarStyles from "../styles/calendarStyle.module.css"
import { es } from "react-day-picker/locale";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selected, setSelected] = useState();
  const [isSearching, setIsSearching] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/digitaltours/api/v1/products"
      );
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

  const shuffleTours = (toursArray) => {
    return toursArray.sort(() => Math.random() - 0.5);
  };

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const currentTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchClick = () => {
    setIsSearching(true);
  }

  return (
    <div className={styles.main}>
      <div className={styles.cta}>
        <div className={styles.cta_box}>
          <h1 className={styles.cta_text}>
            Recuerdos de viajes que nunca olvidarás
          </h1>
          <div className={styles.search} onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faSearch} className={styles.search_icon} />
            <span className={styles.search_text}>Encuentra Destinos Ideales</span>
          </div>
          {/* <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            classNames={calendarStyles}
            locale={es}
            footer={
              selected ? `Selected: ${selected.toLocaleDateString()}` : "Elige un dia."
            }
          /> */}
        </div>
      </div>
      <div className={styles.cat_menu}>
        <Link to="/categories?category=Cultura" className={styles.cat_link}>
          <FontAwesomeIcon icon={faMountainSun} className={styles.cat_icon} color="#964B00" />
          <span className={styles.culturalSpan}>Cultural</span>
        </Link>
        <Link to="/categories?category=Gastronomía" className={styles.cat_link}>
          <FontAwesomeIcon icon={faUtensils} className={styles.cat_icon} color="#808080" />
          <span className={styles.gastronomiaSpan}>Gastronomía</span>
        </Link>
        <Link to="/categories?category=Naturaleza" className={styles.cat_link}>
          <FontAwesomeIcon icon={faTree} className={styles.cat_icon} color="#008000" />
          <span className={styles.naturalezaSpan}>Naturaleza</span>
        </Link>
        <Link to="/categories?category=Aventura" className={styles.cat_link}>
          <FontAwesomeIcon
            icon={faPersonSwimming}
            className={styles.cat_icon}
            color="#0000FF"
          />
          <span className={styles.aventuraSpan}>Aventura</span>
        </Link>
      </div>
      <div className={styles.home_body}>
        {isLoading ? (
          <div className={styles.loader}>
          <Spinner />
          </div>
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
