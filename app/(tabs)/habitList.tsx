import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { useAuth, API_URL } from '../context/AuthContext';
import { useEffect } from 'react';
import { CreateHabit } from '@/components/CreateHabit';


export default function HabitList() {

  return (
      <View style={styles.container}>
          <CreateHabit></CreateHabit>
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
    text: {
      color: '#fff',
    },
  });