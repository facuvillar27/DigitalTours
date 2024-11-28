import { Link } from "react-router-dom";
import styles from "./cardList.module.css";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const CardList = ({ item, onDelete, onEdit }) => {

  if (!item) {
    return <p>No hay productos disponibles</p>;
  }

  const [featuresList, setFeaturesList] = useState([]);
  const [updatedItem, setUpdatedItem] = useState(item);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:8080/digitaltours/api/v1/features");
        const data = await response.json();
        console.log("Características:", data.data);
        setFeaturesList(data.data);
      } catch (error) {
        console.error("Error al cargar las características:", error);
      }
    };
    fetchFeatures();
  }, []);

  const handleFeatureClick = async (featureId) => {
    const isFeaturePresent = updatedItem.features.some((f) => f.id === featureId);
    const tourId = updatedItem.id;

    try {
      if (isFeaturePresent) {
        const response = await fetch(`http://localhost:8080/digitaltours/api/v1/tours/${tourId}/features/${featureId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUpdatedItem(prevState => ({
            ...prevState,
            features: prevState.features.filter(f => f.id !== featureId),
          }));
        } else {
          console.error("Error al eliminar la característica");
        }
      } else {
        const response = await fetch(`http://localhost:8080/digitaltours/api/v1/tours/${tourId}/features/${featureId}`, {
          method: "POST",
        });

        if (response.ok) {
          const featureToAdd = featuresList.find(f => f.id === featureId);
          setUpdatedItem(prevState => ({
            ...prevState,
            features: [...prevState.features, featureToAdd],
          }));
        } else {
          console.error("Error al agregar la característica");
        }
      }
    } catch (error) {
      console.error("Error al actualizar la característica:", error);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.card}>
      
          <div className={styles.cardContent}>
            <img src={item.imageUrls[0]} alt={item.name} className={styles.cardImage} />
            <div>
              <p className={styles.product_type}>{item.category.name}</p>
              <h3 className={styles.product_name}>{item.name}</h3>
              <p className={styles.product_description}>{item.description}</p>
              <div className={styles.product_characteristics}>
                {featuresList.map((feature) => {
                  const hasFeature = updatedItem.features.some(f => f.id === feature.id);
                  return (
                    <div key={feature.id} className={styles.feature}>
                      <img
                        src={feature.urlImg}
                        alt={feature.name}
                        className={`${styles.featureImage} ${hasFeature ? "" : styles.grayscale}`}
                        onClick={() => handleFeatureClick(feature.id)}
                      />
                    </div>
                  );
                })}
              </div>
              <h3 className={styles.product_price}>{item.price} USD</h3>
            </div>
          </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => onEdit(item)} className={styles.editButton}>Editar</button>
          <button onClick={() => onDelete(item)} className={styles.deleteButton}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CardList;