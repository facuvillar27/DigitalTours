import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/myReserves.module.css";
import Spinner from "../Components/Spinner/Spinner";
import { getIdFromToken } from "../services/authService";
import { set } from "react-hook-form";


const MyReserves = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservationData = async () => {
            const token = localStorage.getItem("token");
            const userId = getIdFromToken(token);
        
            try {
            const reservesResponse = await axios.get(`http://34.229.166.90:8080/digitaltours/api/v1/reservations/user/${userId}`); 
            console.log('Reservas:', reservesResponse.data);
            const reservesData = reservesResponse.data.data;

            const detailedReservation = await Promise.all(
                reservesData.map(async (reservation) => {
                    const { id, dateId, numberOfPeople, confirmationNumber } = reservation;

                    const dateResponse = await axios.get(`http://34.229.166.90:8080/digitaltours/api/v1/dates/${dateId}/product`);
                    console.log('Fecha:', dateResponse.data);
                    const tourId = dateResponse.data.data.productId;
                    const reservationDate = dateResponse.data.data.date;

                    const tourResponse = await axios.get(`http://34.229.166.90:8080/digitaltours/api/v1/products/${tourId}`);
                    const tourName = tourResponse.data.data.name;

                    return {
                        id_reservation: id,
                        numberOfPeople,
                        reservationDate,
                        confirmationNumber,
                        tourName,
                    };
                })
            );

            setReservations(detailedReservation);
            } catch (error) {
                console.error("Error al obtener los detalles de la reserva:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservationData();
    }, []);

    const handleCancelReservation = async (id_reservation) => {
        try {
            await axios.delete(`http://34.229.166.90:8080/digitaltours/api/v1/reservation/${id_reservation}`);
            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id_reservation !== id_reservation));
            alert('Reserva cancelada exitosamente');
        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
            alert('Error al cancelar la reserva');
        }
    }


    if (loading) {
        return (
            <div className={styles.container}>
                <Spinner />
            </div>
        ); 
    }

    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Mis Reservas</h1>
          {reservations.length === 0 ? (
            <p className={styles.message}>No tienes reservas.</p>
          ) : (
            reservations.map((reservation, index) => (
              <div key={index} className={styles.reservationDetails}>
                <p className={styles.text}>Tour reservado: {reservation.tourName}</p>
                <p className={styles.text}>Número de personas: {reservation.numberOfPeople}</p>
                <p className={styles.text}>Fecha reservada: {new Date(reservation.reservationDate).toLocaleDateString()}</p>
                <p className={styles.text}>Código de confirmación: {reservation.confirmationNumber}</p>
                <button
                    className={styles.cancelButton} 
                    onClick={() => handleCancelReservation(reservation.id_reservation)}
                >
                    Cancelar Reserva
                </button>
              </div>
            ))
          )}
        </div>
      );
    };
    
    export default MyReserves;