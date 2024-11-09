import React, { useState } from "react";

const Categories = () => {
  const [categories] = useState([
    "Cultura",
    "Gastronomía",
    "Naturaleza",
    "Deportes",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleCategorySubmit = () => {
    alert(`Categoría seleccionada: ${newCategory}`);
  };

  return (
    <div>
      <h1>Gestión de Categorías</h1>
      <select>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newCategory}
        onChange={handleCategoryChange}
        placeholder="Seleccionar o agregar categoría"
      />
      <button onClick={handleCategorySubmit}>Agregar Categoría</button>
    </div>
  );
};

export default Categories;