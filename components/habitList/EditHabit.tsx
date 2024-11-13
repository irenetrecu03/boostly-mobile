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
    deleteHabit?: (id: number) => Promise<any>;

    successToastMsg?: (props: any) => void;
    failToastMsg?: (props: any) => void;
}

export const EditHabit: FC<ExtendedHabitProps> = ({ habitID, title, setTitle, points, setPoints, description, setDescription,
    days, setDays, onDelete, modifyHabit, deleteHabit, successToastMsg, failToastMsg, 
    habitListUpdated, setHabitListUpdated }) => {

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

    const deleteHabitRequest = () => {
        if (deleteHabit) {
            deleteHabit(habitID)
                .then(response => {
                    setHabitListUpdated(!habitListUpdated);
                    if (successToastMsg) successToastMsg(`Habit ${title} deleted successfully!`); 
                    else console.log("Habit deleted successfully:", response);
                    onDelete(false);
                })
                .catch(error => {
                    if (failToastMsg) failToastMsg(`Could not delete habit ${title}, try again later!`); 
                    else console.error("Could not delete habit:", error);
                })
        } else {
            onDelete(false);
        }
    }

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
                    onPress: deleteHabitRequest
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
            // Transform numeric list into a JSON object
            const daysObject = dayNames.reduce((acc, day, index) => {
                acc[day] = days[index];
                return acc;
            }, {} as Record<string, number>);

            modifyHabit(habitID, title, description, daysObject, Number(points))
                .then(response => {
                    setHabitListUpdated(!habitListUpdated);
                    if (successToastMsg) successToastMsg(`Habit ${title} was changed!`);
                    else console.log("Habit changed successfully:", response);
                    onDelete(false);
                })
                .catch(error => {
                    if (failToastMsg) failToastMsg(`Could not change habit ${title}, try again later!`); 
                    else console.error("Could not change habit:", error);
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

