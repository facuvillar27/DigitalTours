import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import styles from "./availabilityCalendar.module.css";
import "react-calendar/dist/Calendar.css";
import ReserveForm from "../ReserveForm/ReserveForm";

const AvailabilityCalendar = ({ productId }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/digitaltours/api/v1/dates/${productId}`
      );
      const dates = response.data.data;
      // Filtrar y mapear fechas
      setAvailableDates(
        dates
          .filter((d) => d.available_space > 0)
          .map((d) => ({
            date: parseLocalDate(d.date),
            id: d.id,
          }))
      );
      setReservedDates(
        dates
          .filter((d) => d.available_space === 0)
          .map((d) => parseLocalDate(d.date))
      );
      setError(null);
    } catch (error) {
      console.error(
        "No se pudo cargar la información de disponibilidad.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDates();
  }, [productId]);

  const handleRetry = () => {
    setError(null);
    fetchDates();
  };

  const parseLocalDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const tileClassName = ({ date }) => {
    const reserved = reservedDates.some((d) => isSameDay(d, date));
    const available = availableDates.some((d) => isSameDay(d.date, date));

    if (reserved) return styles.reserved;
    if (available) return styles.available;
    return null;
  };
  
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const handleDateClick = (date) => {
    const selected = availableDates.find((d) => isSameDay(d.date, date));
    if (selected) {
      setSelectedDate(date);
      setSelectedDateId(selected.id);
    }
  }

  if (loading) {
    return <p>Cargando disponibilidad...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleRetry}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Disponibilidad del producto</h3>
      <Calendar 
        tileClassName={tileClassName}
        onClickDay={handleDateClick}
      />
      {selectedDate && (
        <ReserveForm date={selectedDate} id={selectedDateId} productId={productId} />
      )}
    </div>
  );
};

export default AvailabilityCalendar;
