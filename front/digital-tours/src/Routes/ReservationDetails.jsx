import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/reservationDetails.module.css";
import Spinner from "../Components/Spinner/Spinner";
import { useLocation } from "react-router-dom";

const ReservationDetails = () => {
  const [reservationData, setReservationData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Recuperar la información pasada por la navegación
    const fetchReservationData = async () => {
      try {
        // Recuperamos la información del estado de la navegación
        const { numberOfPeople, date, tourId, successMessage, productId, confirmationCode } = location.state || {};
        const response = await axios.get(`http://localhost:8080/digitaltours/api/v1/products/${productId}`); 
        if (numberOfPeople && date && tourId && successMessage) {
          // Aquí puedes hacer la solicitud a la API para obtener más detalles si es necesario
          setReservationData({
            numberOfPeople,
            date,
            tourId,
            confirmationCode, // Puedes obtener este dato de la respuesta del servidor
            successMessage,
            name: response.data.data.name,
          });
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la reserva:", error);
      }
    };

    fetchReservationData();
  }, [location.state]);

  if (!reservationData) {
    return <div className={styles.container}><Spinner /></div>; 
  }

  return (
    <div className={styles.container}>
      <div className={styles.reservationDetails}>
        <h1 className={styles.title}>Detalles de tu Reserva</h1>
        <p className={styles.message}>{reservationData.successMessage}</p>

        <div className={styles.details}>
          <p className={styles.text}>Tour reservado: {reservationData.name}</p>
          <p className={styles.text}>Número de personas: {reservationData.numberOfPeople}</p>
          <p className={styles.text}>Fecha reservada: {new Date(reservationData.date).toLocaleDateString()}</p>
          <p className={styles.text}>Código de confirmación: {reservationData.confirmationCode}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;