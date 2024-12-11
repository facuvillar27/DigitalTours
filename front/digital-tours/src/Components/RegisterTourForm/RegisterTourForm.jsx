import { useState, useEffect } from "react";
import { createProduct, getProducts } from "../../services/productService";
import styles from "./RegisterTourForm.module.css";

const categories = [
  { id: 1, name: "Gastronomía" },
  { id: 2, name: "Aventura" },
  { id: 3, name: "Cultura" },
  { id: 4, name: "Naturaleza" },
];

const cities = [
  { id: 1, name: "Bogotá" },
  { id: 2, name: "Ciudad de México" },
  { id: 3, name: "Montevideo" },
];

const RegisterTourForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: categories[0].id,
    // characteristics: "",
    description: "",
    price: "",
    image: "",
    duration: "",
    city: cities[0].id,
    startTime: "",
    endTime: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Cargar productos desde el servicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    fetchProducts();
  }, []);

  // Validar formato hh:mm:ss
  const validarHora = (valor) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(valor);
  };

  // Calcular la duración en horas
  const calcularDuracion = (inicio, fin) => {
    if (!validarHora(inicio) || !validarHora(fin)) return "";

    const [hInicio, mInicio, sInicio] = inicio.split(":").map(Number);
    const [hFin, mFin, sFin] = fin.split(":").map(Number);

    const inicioTotalSegundos = hInicio * 3600 + mInicio * 60 + sInicio;
    const finTotalSegundos = hFin * 3600 + mFin * 60 + sFin;

    let diferenciaSegundos = finTotalSegundos - inicioTotalSegundos;

    if (diferenciaSegundos < 0) {
      diferenciaSegundos += 24 * 3600; // Ajuste para tours que cruzan la medianoche
    }

    return Math.floor(diferenciaSegundos / 3600);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "city") {
        const selectedCity = cities.find((city) => city.id === parseInt(value));
        return {
          ...prevData,
          city: selectedCity.id, // Almacena solo el ID de la ciudad
        };
      }
      return {
        ...prevData,
        [name]: value, // Actualiza otros campos normalmente
      };
    });

    // Calcular duración automáticamente al actualizar inicio o fin
    if (name === "startTime" || name === "endTime") {
      const duracion = calcularDuracion(
        name === "startTime" ? value : formData.startTime,
        name === "endTime" ? value : formData.endTime
      );
      setFormData((prevData) => ({
        ...prevData,
        duration: duracion || "",
      }));
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      const selectedCategory = categories.find(
        (cat) => cat.id === Number(formData.category)
      );

      if (!selectedCategory) {
        setErrorMessage("La categoría seleccionada no es válida.");
        return;
      }

      const newProduct = {
        id: 0,
        name: formData.name,
        description: formData.description,
        category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
        },
        price: Number(formData.price),
        duration: Number(formData.duration),
        city: {
          id: cities.find((city) => city.id === Number(formData.city))?.id || 0,
          name:
            cities.find((city) => city.id === Number(formData.city))?.name ||
            "",
        },
        imageUrls: [formData.image || "https://example.com/default.jpg"],
        startTime: formData.startTime,
        endTime: formData.endTime,
        features: [],
      };

      // Crear el producto usando la función createProduct del servicio
      console.log("Nuevo pruducto", newProduct);
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
          duration: "",
          city: cities[0].id,
          startTime: "",
          endTime: "",
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
              className={styles.select} /* Solo esta clase */
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
            Inicio del Tour:
            <input
              className={styles.input}
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              placeholder="hh:mm:ss"
              required
            />
          </label>
          <label className={styles.product_name}>
            Final del Tour:
            <input
              className={styles.input}
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              placeholder="hh:mm:ss"
              required
            />
          </label>
          <label className={styles.product_name}>
            Duracion (hrs):
            <input
              className={styles.input}
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              readOnly
              required
            />
          </label>
          <label className={styles.product_name}>
            Ciudad:
            <select
              className={styles.select}
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una ciudad
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
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
              <img
                src={formData.image}
                alt="Vista previa"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}
          {(errorMessage || confirmationMessage) && (
            <div className={styles.message}>
              {confirmationMessage && (
                <div className={styles.success}>{confirmationMessage}</div>
              )}
              {errorMessage && (
                <div className={styles.error}>{errorMessage}</div>
              )}
            </div>
          )}
          <button className={styles.button} type="submit">
            Registrar Producto
          </button>
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
