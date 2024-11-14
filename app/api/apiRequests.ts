import axios from 'axios';
import Constants from 'expo-constants';
import api from './axiosSetup';


const API_URL = Constants.expoConfig?.extra?.apiUrl;

export const createHabitRequest = async (name: string, description: string, days: Record<string, number>, points: number) => {
    try {
        const result = await api.post(`${API_URL}/user/habits/`, 
            { name, description, days, points },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return result.data;

    } catch (e) {
        console.error("Could not create habit: ", e);
        throw e;
    }
}

export const getHabitsRequest = async () => {
    try {
        const result = await api.get(`${API_URL}/user/habits/`);

        return result.data;
    } catch (e) {
        console.error("Could not retrieve habits: ", e)
        throw e;
    }
}

export const modifyHabitRequest = async (habitId: number, name: string, description: string, days: Record<string, number>, points: number) => {
    try {
        const result = await api.put(`${API_URL}/user/habits/update/${habitId}/`, 
            { name, description, days, points },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return result.data;

    } catch (e) {
        console.error("Could not modify habit: ", e);
        throw e;
    }
}

export const deleteHabitRequest = async(habitId: number) => {
    try {
        const result = await api.delete(`${API_URL}/user/habits/delete/${habitId}/`);
        return result.data;
    } catch (e) {
        console.error("Could not delete habit: ", e);
        throw e;
    }
}