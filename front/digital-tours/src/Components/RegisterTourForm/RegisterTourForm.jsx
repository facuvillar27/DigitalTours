import { useState, useEffect } from "react";
import { createProduct, getProducts } from "../../services/productService"; // Asegúrate de que la ruta sea correcta
import styles from "./RegisterTourForm.module.css";

const categories = [
  { id: 1, name: "Gastronomía" },
  { id: 2, name: "Aventura" },
  { id: 3, name: "Cultura" },
  { id: 4, name: "Naturaleza" },
];

const RegisterTourForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: categories[0].id, // Set initial category
    description: "",
    price: "",
    image: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Cargar productos desde el servicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Llamamos a la función del productService
        setProducts(response); // Asumiendo que el API devuelve productos bajo 'data'
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación de producto duplicado
      const isDuplicate = products.some(
        (product) => product.name.toLowerCase() === formData.name.toLowerCase()
      );

      if (isDuplicate) {
        setErrorMessage("El nombre del producto ya existe.");
        setConfirmationMessage("");
        return;
      } else {
        setErrorMessage("");
      }

      // Validar categoría seleccionada
      const selectedCategory = categories.find(cat => cat.id === Number(formData.category));

      if (!selectedCategory) {
        setErrorMessage("La categoría seleccionada no es válida.");
        return;
      }

      // Crear el nuevo producto
      const newProduct = {
        id: 0, // Suponiendo que el backend asignará el ID
        name: formData.name,
        description: formData.description,
        category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
        },
        price: Number(formData.price),
        image: formData.image || "https://example.com/default.jpg",
      };

      // Crear el producto usando la función createProduct del servicio
      await createProduct(newProduct);

      setConfirmationMessage("¡Producto registrado exitosamente!");
      setErrorMessage("");
      setIsFormVisible(false);

      // Restablecer el formulario después de 3 segundos
      setTimeout(() => {
        setConfirmationMessage("");
        setIsFormVisible(true);
        setFormData({
          name: "",
          category: categories[0].id,
          description: "",
          price: "",
          image: "",
        });
      }, 3000);

    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert("Error al registrar el producto");
    }
  };

  return (
    <div className={styles.container}>
      {isFormVisible ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.product_name}>
            Nombre del Producto:
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className={styles.product_name}>
            Categoría:
            <select
              className={styles.input}
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className={styles.product_name}>
            Descripción:
            <textarea
              className={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className={styles.product_name}>
            Precio (USD):
            <input
              className={styles.input}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className={styles.product_name}>
            Imagen (URL):
            <input
              className={styles.input}
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Ingresa la URL de la imagen"
              required
            />
          </label>
          <br />
          {formData.image && (
            <div>
              <h4>Vista Previa de la Imagen:</h4>
              <img src={formData.image} alt="Vista previa" style={{ width: "100px", height: "100px" }} />
            </div>
          )}
          {(errorMessage || confirmationMessage) && (
            <div className={styles.message}>
              {confirmationMessage && <div className={styles.success}>{confirmationMessage}</div>}
              {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            </div>
          )}
          <button className={styles.button} type="submit">Registrar Producto</button>
        </form>
      ) : (
        <div className={styles.confirmation}>
          {confirmationMessage && <div>{confirmationMessage}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      )}
    </div>
  );
};

export default RegisterTourForm;