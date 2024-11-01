import { View, Text, StyleSheet, Button,  Modal, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { useAuth, API_URL } from '../context/AuthContext';
import { useState } from 'react';
import { CreateHabit } from '@/components/CreateHabit';


export default function HabitList() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
      <View style={styles.container}>
          <Button title="Show Modal" onPress={openModal} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal} 
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} activeOpacity={1}>
              <CreateHabit></CreateHabit>
            </TouchableOpacity>
          </Modal>
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
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });