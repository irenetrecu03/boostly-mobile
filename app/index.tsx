import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { CustomButton } from '../components/CustomButton';
import { AppScreen } from '../components/AppScreen';
import { SafeAreaView } from "react-native-safe-area-context";


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
            <SafeAreaView style={styles.welcome} >

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

            </SafeAreaView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DBD6CC'
    },
    welcome: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#FEF9EF',
      height: 180,
      width: 220,
      borderRadius: 15,
    },
    text: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 32,
      marginBottom: 5,
    },
    buttonDev: {
      flexDirection: 'row',
      height: 100,
      alignItems: 'center'
    },
    button: {
      padding: 15,
      margin: 5,
      borderRadius: 30,
      backgroundColor: '#FF865E',
      height: 50,
      textAlign: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });


  // backgroundColor: '#25292e',
  //   alignItems: 'center',
  //     justifyContent: 'center',

export default App;