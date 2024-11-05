import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/tours.module.css";
import CardList from "../Components/CardList/CardList";
import data from "../assets/data.json";

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const loadToursToLocalStorage = () => {
      const storedTours = JSON.parse(localStorage.getItem("tours"));
      if (!storedTours || storedTours.length === 0) {
        localStorage.setItem("tours", JSON.stringify(data.tours));
      }
    };
    loadToursToLocalStorage();
    const storedTours = JSON.parse(localStorage.getItem("tours")) || [];
    // const sortedTours = storedTours.sort((a, b) => a.nombre.localeCompare(b.nombre));  ORDENA RANDOM LOS STORED TOURS
    setTours(storedTours);
  }, []);

  const deleteTour = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
    localStorage.setItem("tours", JSON.stringify(updatedTours));
  };

  const editTour = (updatedTour) => {
    const updatedTours = tours.map((tour) => 
      tour.id === updatedTour.id ? updatedTour : tour
    );
    setTours(updatedTours);
    localStorage.setItem("tours", JSON.stringify(updatedTours));
  };

  return (
    <div className={styles.main}>
      <h1>Lista de Productos</h1>
      <div className={styles.dashboard}>
        <div className={styles.reg_btn}>
          <Link to="/registerTour" className={styles.cat_link}>
            <p className={styles.registerTour_btn}>Registrar Tour</p>
          </Link>
        </div>
        <div className={styles.home_body}>
          <h1 className={styles.cta_text}>Tours</h1>
          {tours.length > 0 ? (
            tours.map((item) => (
              <CardList 
                key={item.id} 
                item={item} 
                onDelete={deleteTour} 
                onEdit={editTour}
              />
            ))
          ) : (
            <p>No hay tours registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tours;
