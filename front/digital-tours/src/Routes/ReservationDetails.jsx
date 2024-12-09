import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/reservationDetails.module.css";
import Spinner from "../Components/Spinner/Spinner";
import { useLocation } from "react-router-dom";

const ReservationDetails = () => {
  const [reservationData, setReservationData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const {
          numberOfPeople,
          date,
          tourId,
          successMessage,
          productId,
          confirmationCode,
        } = location.state || {};
        const response = await axios.get(
          `http://34.229.166.90:8080/digitaltours/api/v1/products/${productId}`
        );
        if (numberOfPeople && date && tourId && successMessage) {
          setReservationData({
            numberOfPeople,
            date,
            tourId,
            confirmationCode,
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
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.reservationDetails}>
        <h1 className={styles.title}>Detalles de tu Reserva</h1>
        <p className={styles.message}>{reservationData.successMessage}</p>

        <div className={styles.details}>
          <p className={styles.text}>Tour reservado: {reservationData.name}</p>
          <p className={styles.text}>
            Número de personas: {reservationData.numberOfPeople}
          </p>
          <p className={styles.text}>
            Fecha reservada:{" "}
            {new Date(reservationData.date).toLocaleDateString()}
          </p>
          <p className={styles.text}>
            Código de confirmación: {reservationData.confirmationCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
