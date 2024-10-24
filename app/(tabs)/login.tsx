import { View, StyleSheet, Button, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useAuth, API_URL } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    if (!onLogin) {
      alert("Login function is not defined");
      return;
    }

    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      router.push("/home")
    }
  };

  const register = async () => {
    if (!onRegister) {
      alert("Register function is not defined");
      return;
    }

    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput style={styles.input}
                    placeholder='Email' 
                    onChangeText={(text: string) => {
                      setEmail(text);
                      console.log(email) }
                    } 
                    value={email} />
          <TextInput style={styles.input} 
                    placeholder='password' 
                    secureTextEntry={true}
                    onChangeText={(text: string) => {
                      setPassword(text);
                      console.log(password) }
                    } 
                    value={password} />
          <Button onPress={login} title='Sign up'></Button>
          <Button onPress={register} title='Create Account'></Button>
        </View>

        <Button
            onPress={() => router.push("/") }
            title="Go back"
            color="#fff"
        />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    text: {
      color: '#fff',
    },
    form: {
      gap: 10,
      width: '60%',
    },
    input: {
      height: 44,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#fff',
    }
  });
