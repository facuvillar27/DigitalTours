import Card from "../Components/Card/Card"
import { useState, useEffect } from "react";
import styles from "../styles/fav.module.css";
import axios from "axios";
import { getIdFromToken } from "../services/authService";
import { set } from "react-hook-form";

const Fav = () => {
    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Realiza la solicitud HTTP para obtener los favoritos del usuario

        const token = localStorage.getItem("token");
        const userId = getIdFromToken(token);

        axios
          .get(`http://localhost:8080/digitaltours/api/v1/favorites/${userId}`)
          .then(async response => {
            const favoriteTours = response.data.data;
            const tourDetailsRequests = favoriteTours.map(fav => 
              axios.get(`http://localhost:8080/digitaltours/api/v1/products/${fav.tourId}`)
            );

            const tourDetailsResponses = await Promise.all(tourDetailsRequests);

            const favsWithDetails = favoriteTours.map((fav, index) => ({
              ...fav,
              tour: tourDetailsResponses[index].data
            }));
            console.log('Favoritos con detalles:', favsWithDetails);
            setFavs(favsWithDetails);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error al obtener los favoritos:', error);
            setLoading(false);
          });
      }, []);

      const removeFavorite = (tourId) => {
        setFavs((prevFavs) => prevFavs.filter(fav => fav.tourId !== tourId));
      }

      if (loading) {
        return <p>Cargando...</p>;
      }
      console.log('Favoritos:', favs);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Favoritos</h1>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
            {favs.length > 0 ? (
            favs.map(fav => (
              <Card 
                key={fav.tourId} 
                item={fav.tour.data} 
                isFavorited={true}
                onRemove={removeFavorite}
                shouldUnmountFav={true}
              />
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