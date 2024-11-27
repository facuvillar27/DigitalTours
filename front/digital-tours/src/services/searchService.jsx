import axios from 'axios';

const API_URL = 'http://localhost:8080/digitaltours/api';

const searchToursByDate = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/v1/dates/filter?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error('Error searching tours by date:', error);
        throw error;
    }
};

const searchToursByOneDate = async (Date) => {
    try {
        const response = await axios.get(`${API_URL}/v1/dates/filtealt?date=${Date}`);
        return response.data;
    } catch (error) {
        console.error('Error searching tours by date:', error);
        throw error;
    }
};

const searchToursByText = async (text) => {
    try {
        const response = await axios.get(`${API_URL}?q=${text}`);
        return response.data;
    } catch (error) {
        console.error('Error searching tours by text:', error);
        throw error;
    }
};

export {searchToursByDate, searchToursByOneDate};