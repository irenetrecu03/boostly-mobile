import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { CustomButton } from '../components/CustomButton';

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
            <Text style={styles.text}>Welcome</Text>

            <View style={styles.buttonDev}>
                <CustomButton
                    onPress={() => {router.push("/register/login")}}
                    title='Log In'
                    style={styles.button}
                    textStyle={styles.buttonText} />
                <CustomButton
                    onPress={() => {router.push("/register/login")}}
                    title='Sign up'
                    style={styles.button}
                    textStyle={styles.buttonText} />
            </View>
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
      fontSize: 20
    },
    buttonDev: {
      flexDirection: 'row',
      height: 100,
      alignItems: 'center'
    },
    button: {
      padding: 10,
      margin: 5,
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: '#fff',
    },
    buttonText: {
      color: '#000000',
      fontSize: 16,
    }
  });

export default App;