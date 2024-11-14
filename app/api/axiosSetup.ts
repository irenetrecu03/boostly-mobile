import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';


const API_URL = Constants.expoConfig?.extra?.apiUrl;
const REFRESH_KEY = Constants.expoConfig?.extra?.refreshKey;

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add Axios Interceptor
api.interceptors.response.use(
    response => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is 401 and that we haven't already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark request as retried to avoid loops

            // Refresh the token
            const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
            if (refreshToken) {
                try {
                    const refreshResult = await axios.post(`${API_URL}/user/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    // Save the new access token
                    const newAccessToken = refreshResult.data.access;
                    await SecureStore.setItemAsync('accessToken', newAccessToken);

                    // Set the new token in the headers and retry the original request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest); // Retry the request with the new token

                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
