import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import { router } from 'expo-router';
import { useAuth, API_URL } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from '../../components/CustomButton';


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
      router.push("/(tabs)/home")
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
        <SafeAreaView style={styles.areaView}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Enter your credentials.</Text>

          <View style={styles.form}>
            <TextInput style={styles.input}
                      placeholder='First name' 
                        />
            <TextInput style={styles.input}
                      placeholder='Last name' 
                      />
            <TextInput style={styles.input}
                      placeholder='Username' 
                      />
            <TextInput style={styles.input}
                      placeholder='Email' 
                      onChangeText={(text: string) => setEmail(text)}
                      value={email} />
            <TextInput style={styles.input} 
                      placeholder='Password' 
                      secureTextEntry={true}
                      onChangeText={(text: string) => setPassword(text)} 
                      value={password} />
            <TextInput style={styles.input}
                      placeholder='Confirm password' 
                                />
          </View>

          <View style={styles.linkBox}>
              <Text style={styles.text}>
                Already have an account? Click{' '}
                <Text style={styles.link} onPress={() => router.push("/register/login")} >here</Text>.
              </Text>
          </View>

          <View style={styles.buttonBox}>
              <CustomButton
                      onPress={login}
                      title='Submit'
                      style={styles.button}
                      textStyle={styles.buttonText} />
          </View>

        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF9EF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  linkBox: {
    gap: 5,
  },
  areaView: {
    justifyContent: 'center',
    width: '80%',
    padding: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 15,
  },
  text: {
    color: '#00000',
  },
  form: {
    gap: 15,
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  link: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonBox: {
    alignItems: 'flex-end',
  },
  button: {
    padding: 15,
    marginTop: '12%',
    borderRadius: 30,
    backgroundColor: '#FF865E',
    height: 50,
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});



