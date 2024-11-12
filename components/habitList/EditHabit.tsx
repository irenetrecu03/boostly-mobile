import React, { FC, useState } from 'react';
import { Alert, StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
import { SelectDays } from './habitComponents/SelectDays';
import { HabitTitle } from './habitComponents/HabitTitle';
import { HabitPoints } from './habitComponents/HabitPoints';
import { HabitDescription } from './habitComponents/HabitDescription';
import { HabitSaveDelete } from './habitComponents/HabitSaveDelete';
import { HabitProps } from './CreateHabit';


export interface ExtendedHabitProps extends Omit<HabitProps, 'createHabit'> {
    habitID: number;
    modifyHabit?: (id: number, name: string, description: string, days: Record<string, number>, points: number) => Promise<any>;
}

export const EditHabit: FC<ExtendedHabitProps> = ({ habitID, title, setTitle, points, setPoints, description, setDescription,
    days, setDays, onDelete, modifyHabit, successToast, failToast }) => {

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Store the initial values when the component mounts
    const [initialTitle] = useState(title);
    const [initialPoints] = useState(points);
    const [initialDescription] = useState(description);
    const [initialDays] = useState([...days]); // Use a copy to avoid referencing issues

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

    const handleDelete = () => {
        Alert.alert(
            "Delete Habit?",
            "Are you sure you want to delete this habit?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                {
                    text: "Yes",
                    onPress: () => onDelete(false)
                }
            ]
        );
    }

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
                    onPress: discardChanges
                }
            ]
        );
    }

    const discardChanges = () => {
        setTitle(initialTitle);
        setPoints(initialPoints);
        setDescription(initialDescription);
        setDays([...initialDays]);

        onDelete(false);
    }

    const editHabitRequest = () => {
        if (modifyHabit) {
            const daysObject = dayNames.reduce((acc, day, index) => {
                acc[day] = days[index];
                return acc;
            }, {} as Record<string, number>);

            modifyHabit(habitID, title, description, daysObject, Number(points))
                .then(response => {
                    if (successToast) successToast(); else console.log("Habit created successfully:", response);
                    onDelete(false);
                })
                .catch(error => {
                    if (failToast) failToast(); else console.error("Could not create habit:", error);
                })
        } else {
            onDelete(false);
        }
    }

    const handleSave = () => {
        Alert.alert(
            "Save changes?",
            "Are you sure you want to change this habit?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                {
                    text: "Yes",
                    onPress: editHabitRequest
                }
            ]
        );
    };

    return (
        <TouchableOpacity style={styles.modalOverlay} onPress={discardChanges} activeOpacity={1}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.safeView}>
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
                                handleDelete={handleDelete}
                                handleSave={handleSave}
                                hasStats={true}
                            />
                        </View>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    safeView: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
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

