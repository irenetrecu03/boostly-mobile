import { View, Text, StyleSheet, Button,  Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { CreateHabit } from '@/components/CreateHabit';
import SumIcon from 'react-native-vector-icons/Entypo';
import { createHabitRequest } from '../api/apiRequests';
import Toast from 'react-native-toast-message'


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

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'New habit created!',
      visibilityTime: 3000,
      position: 'bottom',
      bottomOffset: 30,
    });
  };

  const showFailToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Could not create habit, try again later!',
      visibilityTime: 3000,
      position: 'bottom',
      bottomOffset: 30,
    });
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
                          setDescription={setDescription}
                          createHabit={createHabitRequest}
                          successToast={showSuccessToast}
                          failToast={showFailToast} />
            </TouchableOpacity>
          </Modal>

          <Toast />

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