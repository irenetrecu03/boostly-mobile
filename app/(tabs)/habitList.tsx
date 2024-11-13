import { View, Text, StyleSheet, Button,  Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { CreateHabit } from '@/components/habitList/CreateHabit';
import SumIcon from 'react-native-vector-icons/Entypo';
import { createHabitRequest, getHabitsRequest } from '../api/apiRequests';
import Toast from 'react-native-toast-message'
import { HabitItem } from '@/components/habitList/HabitItem';
import { HabitModel, parseDaysToList, daysSummaryGenerator } from '@/models/HabitModel';


export default function HabitList() {
  const [modalVisible, setModalVisible] = useState(false);

  const [ habits, setHabits ] = useState<HabitModel[]>([]);
  const [ habitListUpdated, setHabitListUpdated ] = useState(false);

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

  const getAllHabits = () => {
    getHabitsRequest().then(response => {
      const newHabits = response
        .map((habit: { id: number; name: string; points: number; description: string; days: Record<string, number>; }) => ({
          id: habit.id,
          name: habit.name,
          points: habit.points.toString(),
          description: habit.description,
          days: parseDaysToList(habit.days),
        }));

      console.log(newHabits)

      setHabits(newHabits);
    })
  }

  useEffect(() => {
    getAllHabits();
  }, [habitListUpdated])

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
                        failToast={showFailToast}
                        habitListUpdated={habitListUpdated}
                        setHabitListUpdated={setHabitListUpdated} />
          </Modal>

          <SafeAreaView style={styles.listContainer}>
            <ScrollView style={styles.listScroll}>
              <View style={{ height: 20 }} />
              {habits.map((habit, index) => (
                <HabitItem
                  key={habit.id}
                  habitID={habit.id}
                  title={habit.name}
                  points={habit.points}
                  description={habit.description}
                  days={habit.days}
                  daysSummary={daysSummaryGenerator(habit.days)}
                  habitListUpdated={habitListUpdated}
                  setHabitListUpdated={setHabitListUpdated}
                />
              ))}
            </ScrollView>
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
    titleBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    listContainer: {
      marginTop: 10,
      height: '60%',
      width: '80%',
      alignContent: 'center',
    },
    listScroll: {
      padding: 5,
    }
  });