import { useState, useEffect } from "react";
import styles from "./RegisterTourForm.module.css";

const RegisterTourForm = () => {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    image: null, // Agregamos un campo para la imagen
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [imagePreview, setImagePreview] = useState(""); // Para la vista previa de la imagen

  useEffect(() => {
    const storedTours = JSON.parse(localStorage.getItem("tours")) || [];
    setTours(storedTours);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
        }));
        setImagePreview(reader.result); // Establecer la vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = tours.some((tour) => tour.nombre === formData.nombre);
    if (isDuplicate) {
      alert("El nombre del tour ya existe.");
      return;
    }

    const newId = tours.length ? tours[tours.length - 1].id + 1 : 1;

    const newTour = {
      id: newId,
      ...formData,
      image: imagePreview || "https://example.com/default.jpg", // Usar la vista previa o una imagen por defecto
    };

    const updatedTours = [...tours, newTour];
    setTours(updatedTours);
    localStorage.setItem("tours", JSON.stringify(updatedTours));

    setConfirmationMessage("¡Tour registrado exitosamente!");
    setIsFormVisible(false);

    setTimeout(() => {
      setConfirmationMessage("");
      setIsFormVisible(true);
      setFormData({
        nombre: "",
        categoria: "",
        descripcion: "",
        precio: "",
        image: null,
      });
      setImagePreview(""); // Reiniciar la vista previa
    }, 3000);
  };

  return (
    <div className={styles.container}>
      {isFormVisible ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.product_name}>
            Nombre del Tour:
            <input
              className={styles.input}
              type="text"
              name="nombre"
              value={formData.nombre}
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
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className={styles.product_name}>
            Descripción:
            <textarea
              className={styles.textarea}
              name="descripcion"
              value={formData.descripcion}
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
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className={styles.product_name}>
            Imagen:
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <br />
          {imagePreview && (
            <div>
              <h4>Vista Previa de la Imagen:</h4>
              <img src={imagePreview} alt="Vista previa" style={{ width: "100px", height: "100px" }} />
            </div>
          )}
          <button className={styles.button} type="submit">Registrar Tour</button>
        </form>
      ) : (
        <div className={styles.confirmation}>
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default RegisterTourForm;
