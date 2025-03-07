import axios from 'axios';

const API_URL = 'https://kuberwins.com:5500/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/authenticate`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Login failed', error.response?.data);
        throw error;
    }
};

export const signup = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Signup failed', error.response?.data);
        throw error;
    }
};