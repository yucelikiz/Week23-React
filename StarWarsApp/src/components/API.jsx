import axios from "axios";

const baseURL = 'https://swapi.dev/api/';

const api = axios.create({ baseURL });

export const getStarships = async () => {
    try {
        const response = await api.get('starships/');
        return response.data;
    } catch (error) {
        console.error('Error fetching starships:', error);
        throw error;
    }
};

export const searchStarships = async (query) => {
    try {
        const response = await api.get(`starships/?search=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching starships:', error);
        throw error;
    }
};

export const getStarshipDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching starship details:', error);
        throw error;
    }
};

export default { getStarships, searchStarships, getStarshipDetails };
