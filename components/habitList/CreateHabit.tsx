import React, { FC } from 'react';
import { Alert, StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { SelectDays } from './habitComponents/SelectDays';
import { HabitTitle } from './habitComponents/HabitTitle';
import { HabitPoints } from './habitComponents/HabitPoints';
import { HabitDescription } from './habitComponents/HabitDescription';
import { HabitSaveDelete } from './habitComponents/HabitSaveDelete';


export interface HabitProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    points: string;
    setPoints: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    days: number[];
    setDays: React.Dispatch<React.SetStateAction<number[]>>;

    onDelete: React.Dispatch<React.SetStateAction<boolean>>;
    successToast?: () => void;
    failToast?: () => void;

    createHabit?: (name: string, description: string, days: Record<string, number>, points: number) => Promise<any>;
}


export const CreateHabit: FC<HabitProps> = ({ title, setTitle, points, setPoints, description, setDescription,
    days, setDays, onDelete, createHabit, successToast, failToast }) => {

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const toggleDay = (index: number) => {
        setDays(prevDays => {
            const newDays = [...prevDays];
            if (newDays[index] === 0) {
                newDays[index] = 1;
            } else {
                newDays[index] = 0;
            }
            return newDays; 
        });
    };

    const handleDiscard = () => {
        Alert.alert(
            "Discard Changes?",
            "Are you sure you want to discard your changes?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                {
                    text: "Yes",
                    onPress: () => {
                        onDelete(false);
                        setTitle('');
                        setPoints('');
                        setDescription('');
                        setDays([0, 0, 0, 0, 0, 0, 0]);
                    }
                }
            ]
        );
    }

    const handleSave = () => {
        if (createHabit) {
            // Map `days` array to JSON object
            const daysObject = dayNames.reduce((acc, day, index) => {
                acc[day] = days[index];
                return acc;
            }, {} as Record<string, number>);

            createHabit(title, description, daysObject, Number(points))
                .then(response => {
                    if (successToast) successToast(); else console.log("Habit created successfully:", response);
                    onDelete(false);

                    setTitle('');
                    setPoints('');
                    setDescription('');
                    setDays([0, 0, 0, 0, 0, 0, 0]);
                })
                .catch(error => {
                    if (failToast) failToast(); else console.error("Could not create habit:", error);
                })
        }
    };

    return (
        <TouchableOpacity style={styles.modalOverlay} onPress={() => onDelete(false)} activeOpacity={1}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <HabitTitle
                        title={title}
                        setTitle={setTitle}
                    />

                    <View>
                        <SelectDays 
                            days={days}
                            toggleDay={toggleDay}
                        />

                        <HabitPoints
                            points={points}
                            setPoints={setPoints}
                        />

                        <HabitDescription 
                            description={description}
                            setDescription={setDescription}
                        />

                        <HabitSaveDelete 
                            handleDelete={handleDiscard}
                            handleSave={handleSave}
                            hasStats={false}
                        />

                    </View>

                </View>

            </TouchableWithoutFeedback>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEF9EF',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

