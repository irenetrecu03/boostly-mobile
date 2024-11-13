import axios from 'axios';
import Constants from 'expo-constants';


const API_URL = Constants.expoConfig?.extra?.apiUrl;

export const createHabitRequest = async (name: string, description: string, days: Record<string, number>, points: number) => {
    try {
        const result = await axios.post(`${API_URL}/user/habits/`, 
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
        const result = await axios.get(`${API_URL}/user/habits/`);

        return result.data;
    } catch (e) {
        console.error("Could not retrieve habits: ", e)
        throw e;
    }
}

export const modifyHabitRequest = async (habitId: number, name: string, description: string, days: Record<string, number>, points: number) => {
    try {
        const result = await axios.put(`${API_URL}/user/habits/update/${habitId}/`, 
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
        const result = await axios.delete(`${API_URL}/user/habits/delete/${habitId}/`);
        return result.data;
    } catch (e) {
        console.error("Could not delete habit: ", e);
        throw e;
    }
}