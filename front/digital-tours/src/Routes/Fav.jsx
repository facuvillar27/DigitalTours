import Card from "../Components/Card/Card"
import { useState, useEffect } from "react";
import styles from "../styles/fav.module.css";
import axios from "axios";
const Fav = () => {
    const [favs, setFavs] = useState([]);
    useEffect(() => {
        // Realiza la solicitud HTTP para obtener los favoritos del usuario
        axios
          .get('http://localhost:8080/digitaltours/api/v1/favorites')
          .then(response => {
            setFavs(response.data.data);
          })
          .catch(error => {
            console.error('Error al obtener los favoritos:', error);
          });
      }, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Favoritos</h1>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
            {favs.length > 0 ? (
            favs.map(fav => (
              <Card key={fav.id} item={fav} />
            ))
            ) : (
            <p className={styles.noFavorites}>No hay favoritos disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Fav