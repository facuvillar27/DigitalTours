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
import { useState } from "react";

const Card = ({ item }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
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

  const toggleFavorite = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace
    e.stopPropagation(); // Detiene la propagación hacia el contenedor padre
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={styles.container}>
      <Link to={`/products/${item.id.toString()}`} className={styles.card_link}>
        <div className={styles.card}>
          <div className={styles.card_img_container}>
            <img
              src={item.image}
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
                <button
                  className={styles.favButton}
                  onClick={toggleFavorite}
                >
                  <FontAwesomeIcon
                    icon={isFavorited ? faHeartSolid : faHeartRegular}
                    className={styles.favIcon}
                  />
                </button>
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
          <h3 className={styles.product_name}>{item.name}</h3>
          <p className={styles.product_description}>{item.description}</p>
          <h3 className={styles.product_price}>{item.price} USD</h3>
          <button className={styles.book_button}>Reservar</button>
        </div>
      </Link>
    </div>
  );
};

export default Card;