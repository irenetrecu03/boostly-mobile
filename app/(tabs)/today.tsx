import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { useAuth, API_URL } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Today() {

  return (
      <View style={styles.container}>
          <Text>Today</Text>
      </View>
  );
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