import { useState, useEffect } from "react";
import { Calendar } from "react-date-range";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AvailabilityCalendar = ({ productId }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/digitaltours/api/v1/dates/${productId}`
      );
      const dates = response.data.data;
      console.log(dates);
      // Filtrar y mapear fechas
      setAvailableDates(
        dates.filter((d) => d.available_space > 0).map((d) => d.date)
      );
      setReservedDates(
        dates.filter((d) => d.available_space === 0).map((d) => d.date)
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

  const isDateReserved = (date) =>
    reservedDates.includes(date.toISOString().split("T")[0]);

  const isDateAvailable = (date) =>
    availableDates.includes(date.toISOString().split("T")[0]);

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
        date={new Date()}
        color="green"
        disabledDates={reservedDates.map((date) => new Date(date))}
        renderDayContent={(date) => {
          const isReserved = isDateReserved(date);
          const isAvailable = isDateAvailable(date);

          return (
            <div
              style={{
                padding: "10px",
                backgroundColor: isReserved
                  ? "#ffcccc" // Rojo para reservadas
                  : isAvailable
                  ? "#ccffcc" // Verde para disponibles
                  : "white",
              }}
            >
              {date.getDate()}
            </div>
          );
        }}
      />
    </div>
  );
};

export default AvailabilityCalendar;
