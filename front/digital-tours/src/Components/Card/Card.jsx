import { Link } from "react-router-dom";
import styles from "./card.module.css";
import {
  faMountainSun,
  faUtensils,
  faTree,
  faPersonSwimming,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from "../../services/authContext";
import { useEffect, useState } from "react";
import { getIdFromToken } from "../../services/authService";
import axios from "axios";

const Card = ({ item, isFavorited: initialFavorited, onRemove, shouldUnmountFav = false }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(initialFavorited || false);
  const defaultImage = "../assets/RioDeJaneiro.png";

  const iconos = [
    {
      icon: faMountainSun,
      topic: "Cultura",
      color: "#964B00",
    },
    {
      icon: faUtensils,
      topic: "Gastronomía",
      color: "#808080",
    },
    {
      icon: faTree,
      topic: "Naturaleza",
      color: "#008000",
    },
    {
      icon: faPersonSwimming,
      topic: "Aventura",
      color: "#0000FF",
    },
  ];

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  const toggleFavorite = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace
    e.stopPropagation(); // Detiene la propagación hacia el contenedor padre

    const token = localStorage.getItem("token");
    const userId = parseInt(getIdFromToken(token));
    const tourId = item.id;

    const body = {
      id:0,
      userId: userId,
      tourId: tourId,
      addedDate: new Date().toISOString().split("T")[0],
    };

    try {
      if (!isFavorited) {
        await axios.post(`http://localhost:8080/digitaltours/api/v1/favorites`, body);
        setIsFavorited(true);
      } else {
        await axios.delete(`http://localhost:8080/digitaltours/api/v1/favorites/${userId}/${tourId}`);
        setIsFavorited(false);

        if (shouldUnmountFav && onRemove) {
          onRemove(item.id);
        }
      }
    } catch (error) {
      console.error("Error al agregar o eliminar de favoritos:", error);
    }
};

  return (
    <div className={styles.container}>
      <Link to={`/products/${item.id.toString()}`} className={styles.card_link}>
        <div className={styles.card}>
          <div className={styles.card_img_container}>
            <img
              src={item.imageUrls[0]}
              alt="Imagen del tour"
              className={styles.card_img}
              onError={handleImageError}
            />
            {iconos.map((icono, index) => {
              if (item.category.name === icono.topic) {
                return (
                  <div
                    className={styles.card_icon_container}
                    key={index}
                    style={{ borderColor: icono.color }}
                  >
                    <FontAwesomeIcon
                      icon={icono.icon}
                      className={styles.card_icon}
                      color={icono.color}
                    />
                  </div>
                );
              }
              return null;
            })}
            {isAuthenticated && (
              <div className={styles.favButtonContainer}>
                <div
                  className={styles.favButton}
                  onClick={toggleFavorite}
                >
                  <FontAwesomeIcon
                    icon={isFavorited ? faHeartSolid : faHeartRegular}
                    className={styles.favIcon}
                  />
                </div>
              </div>
            )}
          </div>
          {iconos.map((icono, index) => {
            if (item.category.name === icono.topic) {
              return (
                <p
                  className={styles.product_type}
                  style={{ color: icono.color }}
                  key={index}
                >
                  {item.category.name}
                </p>
              );
            } else {
              return null;
            }
          })}
          <div className={styles.cardContent}>
            <h3 className={styles.product_name}>{item.name}</h3>
            <p className={styles.product_description}>{item.description}</p>
          </div >
          <div className={styles.cardPrice}>
          <h3 className={styles.product_price}>{item.price} USD</h3>
          </div>
          </div>
        <button className={styles.book_button}>Reservar</button>
      </Link>
    </div>
  );
};

export default Card;