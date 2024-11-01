import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, TextInput, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth, API_URL } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from '../../components/CustomButton';


export default function Login() {
  const [ name, setName ] = useState('');
  const [ surname, setSurname ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repassword, setRepassword ] = useState('');

  const [ isName, setIsName ] = useState(true);
  const [ isSurname, setIsSurname ] = useState(true);
  const [ isUsername, setIsUsername ] = useState(true);
  const [ isEmail, setIsEmail ] = useState(true);
  const [ isPassword, setIsPassword ] = useState(true);
  const [ isRepassword, setIsRepassword ] = useState(true);

  const [ passwordError, setPasswordError] = useState('Enter a valid password.');
  const [ emailError, setEmailError ] = useState('Enter a valid email.');
  const { onLogin, onRegister } = useAuth();


  const validateName = () => {
    if (name.length == 0) {
      return false;
    }
    return true;
  }

  const validateSurname = () => {
    if (surname.length == 0) {
      return false;
    }
    return true;
  }

  const validateUsername = () => {
    if (username.length == 0) {
      return false;
    }
    return true;
  }

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

  const confirmPassword = () => {
    if (repassword != password) {
      return false;
    }
    return true;
  }

  const login = async () => {
    if (!onLogin) {
      alert("Login function is not defined");
      return;
    }

    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      router.push("/(tabs)/today")
    }
  };

  const register = async () => {
    setIsName(validateName());
    setIsSurname(validateSurname());
    setIsUsername(validateUsername());
    setIsEmail(validateEmail());
    setIsPassword(validatePassword());
    setIsRepassword(confirmPassword());

    if (!validateEmail() || !validatePassword() || !validateName() || !validateSurname() || 
        !validateUsername() || !confirmPassword()) {
      return;
    }

    if (!onRegister) {
      alert("Register function is not defined");
      return;
    }

    const result = await onRegister!(name, surname, username, email, password);
    if (result && result.error) {
      if (result.email && result.email.length > 0) {
        setEmailError(result.email.charAt(0).toUpperCase() + result.email.slice(1));
        setIsEmail(false);
      }
      alert(result);
    } else {
      login();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={styles.areaView}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Enter your credentials.</Text>

          <ScrollView>
            <View style={styles.form}>
              {(!isName) && <Text style={styles.errorText}>Enter a valid name.</Text>}
              <TextInput style={isName ? styles.input : styles.inputInvalid}
                        placeholder='First name'
                        onChangeText={(text: string) => {
                          setName(text);
                        }}
                        value={name} />
              {(!isSurname) && <Text style={styles.errorText}>Enter a valid name.</Text>}
              <TextInput style={isSurname ? styles.input : styles.inputInvalid}
                        placeholder='Last name'
                        onChangeText={(text: string) => {
                          setSurname(text);
                        }}
                        value={surname} />
              {(!isUsername) && <Text style={styles.errorText}>Enter a valid username.</Text>}
              <TextInput style={isUsername ? styles.input : styles.inputInvalid}
                        placeholder='Username'
                        onChangeText={(text: string) => {
                          setUsername(text);
                        }}
                        value={username} />

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

              {(!isRepassword) && <Text style={styles.errorText}>Passwords do not match.</Text>}
              <TextInput style={isRepassword ? styles.input : styles.inputInvalid}
                        placeholder='Confirm password'
                        secureTextEntry={true}
                        onChangeText={(text: string) => {
                          setRepassword(text);
                        }}
                        value={repassword} />
            </View>
          </ScrollView>

          <View style={styles.linkBox}>
              <Text style={styles.text}>
                Already have an account? Click{' '}
                <Text style={styles.link} onPress={() => router.push("/register/login")} >here</Text>.
              </Text>
          </View>

          <View style={styles.buttonBox}>
              <CustomButton
                      onPress={register}
                      title='Submit'
                      style={styles.button}
                      textStyle={styles.buttonText}
                      pressedStyle={styles.button} />
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
    marginTop: 30,
  },
  areaView: {
    justifyContent: 'center',
    width: '80%',
    padding: 10,
    maxHeight: '90%',
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



