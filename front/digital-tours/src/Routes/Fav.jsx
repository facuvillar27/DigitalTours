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
    if (favs.length > 0) {
        return (
            <div className={styles.container}>
                {favs.map(fav => (
                    <Card key={fav.id} item={fav} />
                ))}
            </div>
        );
    }
  return (
    <div className={styles.container}>
      <p>No hay favoritos</p>
    </div>
  )
}

export default Fav