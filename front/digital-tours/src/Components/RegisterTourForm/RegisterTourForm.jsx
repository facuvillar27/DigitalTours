import { useState, useEffect } from "react";
import { registerProduct, getProducts } from "../../services/authService";
import styles from "./RegisterTourForm.module.css";

const RegisterProductForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "", // Modificado para manejar un enlace de imagen
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para almacenar mensajes de error
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [imagePreview, setImagePreview] = useState(""); // Para la vista previa de la imagen

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsList = await getProducts(); // Llamamos al API para obtener los productos
        setProducts(productsList);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el nombre del producto ya existe
    const isDuplicate = products.some((product) => product.name.toLowerCase() === formData.name.toLowerCase());
    if (isDuplicate) {
      setErrorMessage("El nombre del producto ya existe."); // Mostrar mensaje de error
      setConfirmationMessage(""); // Limpiar el mensaje de confirmación
      return; // No continuar con el registro si el nombre es duplicado
    } else {
      setErrorMessage(""); // Limpiar el mensaje de error si no es duplicado
    }

    const newProduct = {
      id: 0, // Asumimos que el backend asignará un ID automáticamente
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      image: formData.image || "https://example.com/default.jpg", // Usar el enlace de imagen o una imagen por defecto
    };

    try {
      // Llamada al API para registrar el nuevo producto
      await registerProduct(newProduct);

      setConfirmationMessage("¡Producto registrado exitosamente!");
      setErrorMessage(""); // Limpiar mensaje de error si el producto se registró correctamente
      setIsFormVisible(false); // Ocultar el formulario

      setTimeout(() => {
        setConfirmationMessage("");
        setIsFormVisible(true);
        setFormData({
          name: "",
          category: "",
          description: "",
          price: "",
          image: "", // Reiniciar el campo de imagen
        });
        setImagePreview(""); // Reiniciar la vista previa
      }, 3000);
    } catch (error) {
      alert("Error al registrar el producto");
      console.error(error);
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
            <input
              className={styles.input}
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
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
            Precio:
            <input
              className={styles.input}
              type="text"
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

export default RegisterProductForm;