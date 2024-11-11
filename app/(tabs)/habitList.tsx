import { View, Text, StyleSheet, Button,  Modal, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { useAuth, API_URL } from '../context/AuthContext';
import { useState } from 'react';
import { CreateHabit } from '@/components/CreateHabit';
import SumIcon from 'react-native-vector-icons/Entypo';


export default function HabitList() {
  const [modalVisible, setModalVisible] = useState(false);

  const [ title, setTitle ] = useState('');
  const [ points, setPoints ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ days, setDays ] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
      <View style={styles.container}>
        
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>Habits</Text>
            <TouchableOpacity onPress={openModal}>
              <SumIcon name="circle-with-plus" size={50}></SumIcon>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal} 
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} activeOpacity={1}>
              <CreateHabit onDelete={setModalVisible} 
                          title={title}
                          setTitle={setTitle}
                          points={points}
                          setPoints={setPoints}
                          days={days}
                          setDays={setDays}
                          description={description}
                          setDescription={setDescription} />
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
    titleBox: {
      flexDirection: 'row',
    },
    titleText: {
      fontSize: 60,
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