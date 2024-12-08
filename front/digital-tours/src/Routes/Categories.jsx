import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/categories.module.css";
import Card from "../Components/Card/Card";
import Spinner from "../Components/Spinner/Spinner";

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/digitaltours/api/v1/products"
      );
      const tours = response.data.data;
      setTours(tours);
      console.log("Tours cat: ", tours);
      setFilteredTours(tours);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false); // Cambia a `false` cuando los datos se hayan cargado
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) {
      const newFilteredTours = tours.filter(
        (tour) => tour.category === category
      );
      setFilteredTours(newFilteredTours);
      setSelectedCategories([category]);
    } else {
      setFilteredTours(tours);
    }
  }, [location.search, tours]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;

    console.log(category);
    console.log(isChecked);

    let newSelectedCategories = [...selectedCategories];

    if (isChecked) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories = newSelectedCategories.filter(
        (cat) => cat !== category
      );
    }

    setSelectedCategories(newSelectedCategories);
    console.log(newSelectedCategories);

    if (newSelectedCategories.length === 0) {
      setFilteredTours(tours);
    } else {
      const newFilteredTours = tours.filter((tour) =>
        newSelectedCategories.includes(tour.category)
      );
      setFilteredTours(newFilteredTours);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setFilteredTours(tours);
  };

  const uniqueCategories = [
    ...new Set(tours.map((tour) => tour.category)),
  ];

  return (
    <div
      className={
        filteredTours.length === 0 ? styles.container_empty : styles.container
      }
    >
      <div
        className={
          isLoading ? styles.cat_container_loading : styles.cat_container
        }
      >
        <h2>Tours</h2>
        <div className={styles.filters}>
          <h3>Filtros</h3>
          {uniqueCategories.map((cat) => (
            <div key={cat} className={styles.filter_cat}>
              <input
                type="checkbox"
                id={cat.id}
                value={cat}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(cat)}
              />
              <label>{cat}</label>
            </div>
          ))}
          <button
            className={styles.clear_filter_btn}
            onClick={handleClearFilters}
          >
            Limpiar Filtros
          </button>
        </div>
        <div className={styles.filter_container}>
          <p>
            Mostrando {filteredTours.length} de {tours.length} productos
          </p>
          <div
            className={isLoading ? styles.cat_cards_loading : styles.cat_cards}
          >
            {isLoading ? (
              <Spinner className={styles.spinner} />
            ) : filteredTours.length > 0 ? (
              filteredTours.map((item) => <Card key={item.id} item={item} />)
            ) : (
              <p className={styles.no_tours}>No hay tours.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
