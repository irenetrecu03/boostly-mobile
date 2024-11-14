import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import Constants from "expo-constants";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (first_name: string, last_name: string, username: string, email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    onRefresh?: () => Promise<any>;
}

const TOKEN_KEY = Constants.expoConfig?.extra?.tokenKey;
const REFRESH_KEY = Constants.expoConfig?.extra?.refreshKey;
const API_URL = Constants.expoConfig?.extra?.apiUrl;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    const refreshAccessToken = async () => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) {
            return { error: true, msg: 'Refresh token is not set' }
        }  // Prompt reauthentication
    
        try {
            const result = await axios.post(`${API_URL}/user/token/refresh/`, 
                { refresh: refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setAuthState({ token: result.data.access, authenticated: true});
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access}`;

            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(result.data.access));

            return { error: false, msg: "Token refreshed!"};

        } catch (e) {
            console.error("Error refreshing token: ", e);
            return { error: true, msg: (e as any).response?.data?.msg || 'An error occurred' };
        } // Prompt reauthentication
    }

    // Set up Axios interceptor
    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            error => {
                console.error('Axios Error:', error.response || error.message);
                return Promise.reject(error);
            }
        );

        // Cleanup function to remove the interceptor
        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({token: token, authenticated: true});
            }
        }
            
        loadToken();
    }, [])
    
    const register = async (first_name: string, last_name: string, username: string, email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/user/register/`, { first_name, last_name, username, email, password });
        } catch (e) {
            const errorMessage = (e as any)?.response?.data || { general: 'An error occurred' };
            const errorResponse: { [key: string]: any } = { error: true };

            Object.keys(errorMessage).forEach((key) => {
                errorResponse[key] = Array.isArray(errorMessage[key]) 
                    ? errorMessage[key].join(', ') 
                    : errorMessage[key];
            });

            return errorResponse;
        }
    }

    const login = async (email: string, password: string) => {
        console.log("Logging in...")

        try {
            const result = await axios.post(`${API_URL}/user/login/`, { email, password });
            console.log("Successfully logged in.")

            setAuthState({ token: result.data.access, authenticated: true});
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.access);
            await SecureStore.setItemAsync(REFRESH_KEY, result.data.refresh);

            return result;

        } catch (e) {
            console.error("Login error:", e); // Log the error
            return { error: true, msg: (e as any).response?.data?.msg || 'An error occurred' };
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onRefresh: refreshAccessToken,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}