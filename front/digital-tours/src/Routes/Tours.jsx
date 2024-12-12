import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/tours.module.css";
import CardList from "../Components/CardList/CardList";
import Spinner from "../Components/Spinner/Spinner";
import { updateProduct, deleteProduct, getProducts } from "../services/productService";

const Tours = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories] = useState([
    { id: 1, name: "Aventura" },
    { id: 2, name: "Cultura" },
    { id: 3, name: "Naturaleza" },
    { id: 4, name: "Gastronomía" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenDeleteModal = (tour) => {
    setSelectedTour(tour);
    setShowDeleteModal(true);
  };

  const handleOpenEditModal = (tour) => {
    setSelectedTour(tour);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedTour.id);
      setProducts(products.filter((product) => product.id !== selectedTour.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar el tour:", error);
    }
  };

  // const handleEdit = async (updatedTour) => {
  //   try {
  //     await updateProduct(updatedTour.id, updatedTour);
  //     setProducts(products.map((product) =>
  //       product.id === updatedTour.id ? updatedTour : product
  //     ));
  //     setShowEditModal(false);
  //   } catch (error) {
  //     console.error("Error al actualizar el tour:", error);
  //   }
  // };

  const handleEdit = async (updatedFields) => {
    try {
      // Combina el objeto existente con los campos actualizados
      const updatedTour = {
        ...selectedTour,
        ...updatedFields,
        category: {
          ...selectedTour.category,
          ...updatedFields.category,
        }
      };

      await updateProduct(updatedTour.id, updatedTour);

      // Actualiza la lista de productos
      setProducts(products.map((product) =>
        product.id === updatedTour.id ? updatedTour : product
      ));

      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar el tour:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.dashboard}>
        {!isLoading && (
          <div className={styles.reg_btn}>
            <Link to="/registerTour" className={styles.cat_link}>
              <p className={styles.registerTour_btn}>Registrar Tour</p>
            </Link>
          </div>
        )}

        <div className={styles.home_body}>
          {isLoading ? (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            <>
              <h1 className={styles.cta_text}>Tours</h1>
              {products.length > 0 ? (
                products.map((item) => (
                  <CardList
                    key={item.id}
                    item={item}
                    onDelete={handleOpenDeleteModal}
                    onEdit={handleOpenEditModal}
                  />
                ))
              ) : (
                <p>No hay tours registrados.</p>
              )}
            </>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>¿Estás seguro de que deseas eliminar este tour?</h2>
            <button onClick={handleDelete} className={styles.confirmButton}>Eliminar</button>
            <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancelar</button>
          </div>
        </div>
      )}

      {showEditModal && selectedTour && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Tour</h2>
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit({
                  id: selectedTour.id,
                  name: e.target.name.value,
                  description: e.target.description.value,
                  category: {
                    id: parseInt(e.target.category.value),
                    name: e.target.category.options[e.target.category.selectedIndex].text,
                  },
                  price: parseFloat(e.target.price.value),
                  image: selectedTour.image,
                });
              }}
            > */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit({
                  name: e.target.name.value || selectedTour.name,
                  description: e.target.description.value || selectedTour.description,
                  category: {
                    id: parseInt(e.target.category.value) || selectedTour.category.id,
                    name: e.target.category.options[e.target.category.selectedIndex].text || selectedTour.category.name,
                  },
                  price: parseFloat(e.target.price.value) || selectedTour.price,
                });
              }}
            >
              <input
                type="text"
                name="name"
                defaultValue={selectedTour.name}
                required
              />
              <select name="category" defaultValue={selectedTour.category.id} required>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                defaultValue={selectedTour.description}
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={selectedTour.price}
                required
              />
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;