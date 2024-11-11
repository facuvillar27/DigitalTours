import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);

  // const handleCategoryChange = (event) => {
  //   const category = event.target.value;
  //   const isChecked = event.target.checked;

  //   let newSelectedCategories = [...selectedCategories];

  //   if (isChecked) {
  //     newSelectedCategories.push(category);
  //   } else {
  //     newSelectedCategories = newSelectedCategories.filter(
  //       (cat) => cat !== category
  //     );
  //   }

  //   setSelectedCategories(newSelectedCategories);

  //   if (newSelectedCategories.length === 0) {
  //     setFilteredTours(data.tours);
  //   } else {
  //     const newFilteredTours = data.tours.filter((tour) =>
  //       newSelectedCategories.includes(tour.categoria)
  //     );
  //     setFilteredTours(newFilteredTours);
  //   }
  // };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/digitaltours/api/v1/products"
      );
      const tours = response.data;
      setFilteredTours(tours);
      console.log(filteredTours);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setFilteredTours(data.tours);
  };

  return (
    <div>
      <h1>Tours</h1>
      <div>
        <h2>Filtros</h2>
        {filteredTours.category.map((cat) => (
          <div key={cat.id}>
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
        <button onClick={handleClearFilters}>Limpiar Filtros</button>
      </div>
      <div>
        <p>
          Mostrando {filteredTours.length} de {data.tours.length} productos
        </p>
        <ul>
          {filteredTours.map((tour) => (
            <li key={tour.id}>
              <h2>{tour.nombre}</h2> <p>{tour.descripcion}</p>
              <h3>{tour.precio}</h3>
            </li>
          ))}
        </ul>
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
