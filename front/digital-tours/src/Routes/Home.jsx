import { useEffect, useState, useRef } from "react";
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
  faSearch,
  faCalendar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Components/Spinner/Spinner";
import { DayPicker } from "react-day-picker";
import calendarStyles from "../styles/calendarStyle.module.css";
import { es } from "react-day-picker/locale";
import { Button, Overlay, Popover } from "react-bootstrap";
import { searchToursByDate, searchToursByOneDate } from "../services/searchService";
import {getProductById} from "../services/productService";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedRange, setSelectedRange] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const target = useRef(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://34.229.166.90:8080/digitaltours/api/v1/products"
      );
      const shuffledTours = shuffleTours(response.data.data);
      setTours(shuffledTours);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false);
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

  const handleSearchClick = async () => {
    if (!selectedRange) {
      alert("Por favor, elige un rango de fechas.");
      return;
    } else {
      setIsSearching(true);
      setShowCalendar(false);
  
      const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      const formattedFrom = formatDate(selectedRange.from);
      const formattedTo = selectedRange.to ? formatDate(selectedRange.to) : null;
  
      try {
        let response;
        if (formattedTo) {
          response = await searchToursByDate(formattedFrom, formattedTo);
          console.log("Response searchtourbydate",response);
        } else {
          response = await searchToursByOneDate(formattedFrom);
          console.log(response);
        }
  
        const uniqueProductIds = [...new Set(response.data.map(item => item.productId))];
        const tourPromises = uniqueProductIds.map(productId => getProductById(productId));
  
        const tourResponses = await Promise.all(tourPromises);
        console.log("Tour responses",tourResponses);
        const tours = tourResponses.map(tourResponse => tourResponse.data);
  
        setFilteredTours(tours);
        console.log(filteredTours);
  
        if (tours.length === 0) {
          alert("No hay tours disponibles para esa fecha.");
        }
  
      } catch (error) {
        console.error("Error al buscar tours por fecha:", error);
      }
    }
  };  

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className={styles.main}>
      <div className={styles.cta}>
        <div className={styles.cta_box}>
          <h1 className={styles.cta_text}>
            Recuerdos de viajes que nunca olvidarás
          </h1>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <span className={styles.search_text}>Encuentra Destinos Ideales</span>
        <div className={styles.search}>
          <form className={styles.form}>
            <div className={styles.form_group} ref={target} style={{ position: 'relative' }}>
              <Button variant="light" onClick={handleShowCalendar}>
                Elige una fecha
                <FontAwesomeIcon
                  icon={faCalendar}
                  className={styles.calendar_icon}
                />
              </Button>
              <Overlay
                show={showCalendar}
                target={target.current}
                placement="bottom"
                containerPadding={20}
              >
                <Popover id="popover-contained" style={{ width: 'auto', maxWidth: 'fit-content' }}>
                  <Popover.Body className="custom-popover-body">
                    <DayPicker
                      max={14}
                      min={1}
                      mode="range"
                      selected={selectedRange}
                      onSelect={setSelectedRange}
                      locale={es}
                      timeZone="America/Montevideo"
                      classNames={calendarStyles}
                    />
                  </Popover.Body>
                </Popover>
              </Overlay>
            </div>
            <div className={styles.form_group_right} onClick={handleSearchClick}>
              <button className={styles.searchButton} type="button">
                <FontAwesomeIcon
                  icon={faSearch}
                  className={styles.search_icon}
                />
              </button>
            </div>
          </form>
        </div>
        {isSearching && (
        <Button className={styles.button} onClick={() => {
          setIsSearching(false);
          setSelectedRange(); 
          setFilteredTours([]);
          }}>
          Limpiar Filtros
        </Button>
      )}
      </div>
      <div className={styles.cat_menu}>
        <Link to="/categories?category=Cultura" className={styles.cat_link}>
          <FontAwesomeIcon
            icon={faMountainSun}
            className={styles.cat_icon}
            color="#964B00"
          />
          <span className={styles.culturalSpan}>Cultural</span>
        </Link>
        <Link
          to="/categories?category=Gastronomía"
          className={styles.cat_link}
        >
          <FontAwesomeIcon
            icon={faUtensils}
            className={styles.cat_icon}
            color="#808080"
          />
          <span className={styles.gastronomiaSpan}>Gastronomía</span>
        </Link>
        <Link to="/categories?category=Naturaleza" className={styles.cat_link}>
          <FontAwesomeIcon
            icon={faTree}
            className={styles.cat_icon}
            color="#008000"
          />
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
          isSearching ? (
            <>
              <h4 className={styles.searchTitle}>Resultados de la búsqueda</h4>
              {filteredTours.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </>
          ) : (
            currentTours.map((item) => <Card key={item.id} item={item} />)
          )
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