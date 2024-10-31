import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useAuth, API_URL } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from '../../components/CustomButton';

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isEmail, setIsEmail ] = useState(true);
  const [ isPassword, setIsPassword ] = useState(true);
  const [ passwordError, setPasswordError] = useState('Enter a valid password.');
  const [ emailError, setEmailError ] = useState('Enter a valid email.');
  const { onLogin } = useAuth();

  const validateEmail = () => {
    // Basic email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    // Check for password rules (minimum 8 characters, includes a number and special character)
    const minLength = 8;
    const containsNumber = /\d/; // RegEx to check if it contains a number
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // RegEx to check if it contains a special character

    if (password.length < minLength) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    } else if (!containsNumber.test(password)) {
      setPasswordError('Password must contain at least one number.');
      return false;
    } else if (!containsSpecialChar.test(password)) {
      setPasswordError('Password must contain at least one special character.');
      return false;
    }

    setPasswordError(''); 
    return true;
  };

  const login = async () => {
    setIsEmail(validateEmail());
    setIsPassword(validatePassword());

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    if (!onLogin) {
      alert("Login function is not defined");
      return;
    }

    const result = await onLogin!(email, password);
    if (result && result.error) {
      setEmailError('Invalid login or password.');
      setIsEmail(false);
      setIsPassword(false);
    } else {
      router.push("/(tabs)/home")
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
          <SafeAreaView style={styles.areaView}>
            <Text style={styles.title}>Log In</Text>
            <Text style={styles.subtitle}>Enter your login credentials.</Text>

            <View style={styles.form}>
              {(!isEmail && emailError.length > 0) && <Text style={styles.errorText}>{emailError}</Text>}
              <TextInput style={isEmail ? styles.input : styles.inputInvalid}
                        placeholder='Email' 
                        onChangeText={(text: string) => {
                          setEmail(text);
                          setIsEmail(true);
                        }}
                        value={email} />
              {(!isPassword && passwordError.length > 0) && <Text style={styles.errorText}>{passwordError}</Text>}
              <TextInput style={isPassword ? styles.input : styles.inputInvalid} 
                        placeholder='Password' 
                        secureTextEntry={true}
                        onChangeText={(text: string) => {
                          setPassword(text);
                          setIsPassword(true);
                        }} 
                        value={password} />
            </View>

            <View style={styles.linkBox}>
                <Text style={styles.text}>
                  Forgot your password? Click{' '}
                  <Text style={styles.link} >here</Text>.
                </Text>
                <Text style={styles.text}>
                  Not registered yet? Click{' '}
                  <Text style={styles.link} onPress={() => router.push("/register/signup")} >here</Text>.
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
    </TouchableWithoutFeedback>
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
      height: '45%',
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
    inputInvalid: {
      height: 44,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#fff',
      width: '100%',
      borderColor: '#EC524B',
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
    errorText: {
      fontSize: 14,
      color: '#EC524B',
    }
  });
