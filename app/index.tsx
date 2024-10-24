import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from './context/AuthContext';

const App = () => {
    return(
        <AuthProvider>
            <AppLayout></AppLayout>
        </AuthProvider>
    )
};

export const AppLayout = () => {
    const { authState, onLogout } = useAuth();
    const router = useRouter();

    return(
        <View style={styles.container}>
            <Button
                onPress={() => {authState?.authenticated ? router.push("/home") : router.push("/login")} }
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