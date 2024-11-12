import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import CustomButton from './CustomButton';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';


interface CreateHabitProps {
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


export const CreateHabit: FC<CreateHabitProps> = ({ title, setTitle, points, setPoints, description, setDescription,
    days, setDays, onDelete, createHabit, successToast, failToast }) => {

    const firstRowDays = ['Mon', 'Tue', 'Wed', 'Thu'];
    const secondRowDays = ['Fri', 'Sat', 'Sun'];
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

    const handleDelete = () => {
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.titleBox} >
                    <TextInput style={styles.titleText}
                                placeholder='Enter habit name' 
                                onChangeText={(text: string) => {
                                    setTitle(text);
                                }}
                                value={title} />
                </View>

                <View>
                    <View style={styles.daysContainer}>
                        <View style={styles.buttonBox}>
                            {firstRowDays.map((day, index) => (
                                <CustomButton
                                    key={index}
                                    title={day}
                                    onPress={() => toggleDay(index)}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    pressedStyle={styles.buttonPressed}
                                    isPressed={days[index] == 1 ? true : false}
                                />
                                ))}
                        </View>
                        <View style={styles.buttonBox}>
                            {secondRowDays.map((day, index) => (
                                <CustomButton
                                    key={(index + 4)}
                                    title={day}
                                    onPress={() => toggleDay((index + 4))}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    pressedStyle={styles.buttonPressed}
                                    isPressed={days[index + 4] == 1 ? true : false}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.inputTextBox} >
                        <TextInput style={styles.inputPoints}
                                    placeholder='Enter points' 
                                    onChangeText={(text: string) => {
                                        setPoints(text);
                                    }}
                                    value={points} />
                    </View>

                    <View style={styles.inputTextBox} >
                        <TextInput style={styles.inputDes}
                                    placeholder='Enter description'
                                    multiline={true}
                                    onChangeText={(text: string) => {
                                        setDescription(text);
                                    }}
                                    value={description} />
                    </View>

                    <View style={styles.deleteBox}>
                        <TouchableOpacity style={styles.deleteArea} onPress={handleDelete}>
                            <TrashIcon name="trash" size={35} />
                        </TouchableOpacity>
                        <CustomButton title="Save"
                                    onPress={handleSave}
                                    style={styles.saveButton}
                                    textStyle={styles.saveButtonText}
                        />
                    </View>

                </View>

            </View>

        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEF9EF',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 20,
    },
    titleBox: {
        backgroundColor: '#FF865E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
    },
    titleText: {
        color: '#fff',
        fontSize: 32,
    },
    inputTextBox: {
        marginBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputPoints: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    inputDes: {
        height: 120,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        textAlignVertical: 'top'
    },
    daysContainer: {
        marginTop: 10,
        marginBottom: 25,
    },
    buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    button: {
        marginLeft: 4,
        marginRight: 4,
        padding: 1,
        borderRadius: 30,
        backgroundColor: '#C9C9C9',
        height: 40,
        width: 60,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: '#FF865E',
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    deleteBox: {
        alignContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        padding: 20,
    },
    saveButton: {
        padding: 15,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#FF865E',
        height: 50,
        width: 80,
        textAlign: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    deleteArea: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '53%',
    }

})

