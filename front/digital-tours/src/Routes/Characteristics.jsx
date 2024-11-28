import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/characteristics.module.css";
import CardCharacteristic from "../Components/CardCharacteristics/CardCharacteristics";
import { getCharacteristics, createCharacteristic, updateCharacteristic, deleteCharacteristic } from "../services/characteristicsService";

const Characteristics = () => {
  const [characteristics, setCharacteristics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const response = await getCharacteristics();
        setCharacteristics(response);
      } catch (error) {
        console.error("Error al cargar las características:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacteristics();
  }, []);

  const handleOpenDeleteModal = (characteristic) => {
    setSelectedCharacteristic(characteristic);
    setShowDeleteModal(true);
  };

  const handleOpenEditModal = (characteristic) => {
    setSelectedCharacteristic(characteristic);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCharacteristic(selectedCharacteristic.id);
      setCharacteristics(characteristics.filter((c) => c.id !== selectedCharacteristic.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar la característica:", error);
    }
  };

  const handleEdit = async (updatedCharacteristic) => {
    try {
      await updateCharacteristic(updatedCharacteristic.id, updatedCharacteristic);
      setCharacteristics(characteristics.map((c) =>
        c.id === updatedCharacteristic.id ? updatedCharacteristic : c
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar la característica:", error);
    }
  };

  const handleAdd = async (newCharacteristic) => {
    try {
      const response = await createCharacteristic(newCharacteristic);
      setCharacteristics([...characteristics, response]);
    } catch (error) {
      console.error("Error al añadir la característica:", error);
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Administrar Características</h1>
      <div className={styles.addButtonContainer}>
        <button onClick={() => setShowEditModal(true)} className={styles.addButton}>
          Añadir Nueva
        </button>
      </div>

      {isLoading ? (
        <div className={styles.spinnerContainer}>Cargando...</div>
      ) : (
        <div className={styles.home_body}>
        {characteristics.length > 0 ? (
          characteristics.map((item) => (
            <CardCharacteristic
              key={item.id}
              item={item}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))
        ) : (
            <p>No hay características registradas.</p>
          )}
        </div>

      )}

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>¿Estás seguro de que deseas eliminar esta característica?</h2>
            <button onClick={handleDelete} className={styles.confirmButton}>Eliminar</button>
            <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancelar</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedCharacteristic ? "Editar Característica" : "Añadir Característica"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newCharacteristic = {
                  id: selectedCharacteristic?.id || null,
                  name: e.target.name.value,
                  icon: e.target.icon.value,
                };
                selectedCharacteristic ? handleEdit(newCharacteristic) : handleAdd(newCharacteristic);
              }}
            >
              <input type="text" name="name" defaultValue={selectedCharacteristic?.name || ""} required placeholder="Nombre" />
              <input type="text" name="icon" defaultValue={selectedCharacteristic?.icon || ""} required placeholder="Ícono" />
              <button type="submit">{selectedCharacteristic ? "Guardar cambios" : "Añadir"}</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characteristics;
