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
