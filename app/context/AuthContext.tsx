import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my_jwt';
export const API_URL = 'https://7c03-145-94-139-233.ngrok-free.app'; //'http://172.30.224.1:8000'
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
            // Check if token is set when application loads
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({token: token, authenticated: true});
            }
        };

        loadToken();
    }, [])
    
    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/user/register/`, { email, password });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
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

            return result;

        } catch (e) {
            console.error("Login error:", e); // Log the error
            return { error: true, msg: (e as any).response?.data?.msg || 'An error occurred' };
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

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
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}