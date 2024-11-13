import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/categories.module.css";
import Card from "../Components/Card/Card";
import Spinner from "../Components/Spinner/Spinner";

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;

    let newSelectedCategories = [...selectedCategories];

    if (isChecked) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories = newSelectedCategories.filter(
        (cat) => cat !== category
      );
    }

    setSelectedCategories(newSelectedCategories);

    if (newSelectedCategories.length === 0) {
      setFilteredTours(tours);
    } else {
      const newFilteredTours = tours.filter((tour) =>
        newSelectedCategories.includes(tour.categoria.name)
      );
      setFilteredTours(newFilteredTours);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/digitaltours/api/v1/products"
      );
      const tours = response.data.data;
      setTours(tours);
      console.log(`Tours cat: ${tours}`);
      setFilteredTours(tours);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false); // Cambia a `false` cuando los datos se hayan cargado
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setFilteredTours(tours);
  };

  const uniqueCategories = [
    ...new Set(tours.map((tour) => tour.category.name)),
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cat_container}>
        <h2>Tours</h2>
        <div className={styles.filters}>
          <h3>Filtros</h3>
          {uniqueCategories.map((cat) => (
            <div key={cat}>
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
          <div className={styles.cat_cards}>
            {isLoading ? (
              <Spinner />
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

// const Categories = () => {
//   const [categories] = useState([
//     "Cultura",
//     "Gastronomía",
//     "Naturaleza",
//     "Deportes",
//   ]);
//   const [newCategory, setNewCategory] = useState("");

//   const handleCategoryChange = (event) => {
//     setNewCategory(event.target.value);
//   };

//   const handleCategorySubmit = () => {
//     alert(`Categoría seleccionada: ${newCategory}`);
//   };

//   return (
//     <div>
//       <h1>Gestión de Categorías</h1>
//       <select>
//         {categories.map((category, index) => (
//           <option key={index} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         value={newCategory}
//         onChange={handleCategoryChange}
//         placeholder="Seleccionar o agregar categoría"
//       />
//       <button onClick={handleCategorySubmit}>Agregar Categoría</button>
//     </div>
//   );
// };

// export default Categories;