import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';

const App = () => {
    const { authState, onLogout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (authState?.authenticated) {
            router.push("/home");
        } 
    }, [authState]);

    return(
        <View style={styles.container}>
            <Button
                onPress={() => {authState?.authenticated ? router.push("/home") : router.push("/register/login")} }
                title="Welcome"
                color="#fff"
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
    },
  });

export default App;