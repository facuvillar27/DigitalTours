import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/reservationDetails.module.css";
import Spinner from "../Components/Spinner/Spinner";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useLocation, useNavigate } from "react-router-dom";
import { reserve } from "../services/tourService";
import { getIdFromToken } from "../services/authService";

const ReservationDetails = () => {
  const [reservationData, setReservationData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationData = async () => {

      const token = localStorage.getItem("token");
      const userId = getIdFromToken(token);

      if (!location.state) {
        return;
      }
  
      const {
        numberOfPeople,
        date,
        tourId,
        productId,
      } = location.state;
  
      if (!numberOfPeople || !date || !tourId || !productId) {
        return;
      }
  
      try {
        const productResponse = await axios.get(
          `http://34.229.166.90:8080/digitaltours/api/v1/products/${productId}`
        );
        const userResponse = await axios.get(
          `http://34.229.166.90:8080/digitaltours/api/v1/users/${userId}`
        );

        if (productResponse.data.data && userResponse.data.data) {
          const productData = productResponse.data.data;
          setReservationData({
            numberOfPeople,
            date,
            tourId,
            city: productData.city.name,
            name: productData.name,
            imageUrls: productData.imageUrls.map((url) => ({
              original: url,
              thumbnail: url,
            })),
            description: productData.description,
            start_time: productData.startTime,
            duration: productData.duration,
            userName: userResponse.data.data.name,
            userLastName: userResponse.data.data.last_name,
            userEmail: userResponse.data.data.email
          })
        }
      } catch (error) {
        console.error("Error al obtener la información de la reserva:", error);
        setError("Error al obtener la información de la reserva");
      }
    };
  
    fetchReservationData();
  }, [location.state]);

  const handleConfirmReservation = async () => {
    try {
      const reservationInfo = await reserve(
        reservationData.numberOfPeople,
        reservationData.tourId
      );
      setReservationData((prevData) => ({
        ...prevData,
        confirmationCode: reservationInfo.confirmationNumber,
      }));
      setError(null);
      if (reservationInfo.message === "Reserva exitosa") {
        navigate(`/reserves`, );
      }
    } catch (error) {
      setError(error.message);
      setReservationData(null);
    }
  };

  if (!reservationData) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.detailBox}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Volver
        </button>
        <div className={styles.galleryContainer}>
          <ImageGallery
            items={reservationData.imageUrls}
            showThumbnails={true}
            showFullscreenButton={true}
            showPlayButton={false}
          />
        </div>
        <div className={styles.detailInfo}>
          <h2>{reservationData.name}</h2>
          <p>{reservationData.description}</p>
          <p><strong>Ciudad:</strong> {reservationData.city}</p>
          <p><strong>Fecha:</strong> {new Date(reservationData.date).toLocaleDateString()}</p>
          <p><strong>Hora de inicio:</strong> {reservationData.start_time}</p>
          <p><strong>Duración:</strong> {reservationData.duration} horas</p>
          <p><strong>Personas:</strong> {reservationData.numberOfPeople}</p>
          <h3>Información del Usuario</h3>
          <p>{reservationData.userName} {reservationData.userLastName}</p>
          <p>{reservationData.userEmail}</p>
        </div>
        <button onClick={handleConfirmReservation} className={styles.confirmButton}>
          Confirmar Reserva
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default ReservationDetails;
