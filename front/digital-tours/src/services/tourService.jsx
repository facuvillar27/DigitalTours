import axios from "axios";
import { getIdFromToken } from "../services/authService";


const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    const userId = getIdFromToken(token);

    return userId;
}


export const reserve = async (numberOfPeople, id) => {
    const userId = getUserIdFromToken();
    const reservationDate = new Date().toISOString().split("T")[0];
    
    const reservationData = {
        id: 0,
        numberOfPeople: numberOfPeople,
        reservationDate,
        userId,
        dateId: id,
        confirmationNumber: "string"
    }

    try {
        const response = await axios.post("http://localhost:8080/digitaltours/api/v1/reservation", reservationData); 

        if (response.data.meta.statusCode === 200) {
        const reservationInfo = {
            message: "Reserva exitosa",
            confirmationNumber: response.data.data.confirmationNumber,
        }
        return reservationInfo;
        }
    } catch (error) {
        throw new Error("Error al reservar el tour");
    }
};
