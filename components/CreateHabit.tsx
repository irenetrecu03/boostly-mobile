import React, { FC } from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, View, TextInput, 
    TouchableWithoutFeedback, Keyboard, TouchableHighlight, GestureResponderEvent, 
    TouchableOpacity} from 'react-native';
import { useState } from 'react';
import CustomButton from './CustomButton';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';

interface CreateHabitProps {
    onDelete: (event: GestureResponderEvent) => void;
}


export const CreateHabit: FC<CreateHabitProps> = ({ onDelete }) => {
    const [ title, setTitle ] = useState('');
    const [ points, setPoints ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ days, setDays ] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

    const firstRowDays = ['Mon', 'Tue', 'Wed', 'Thu'];
    const secondRowDays = ['Fri', 'Sat', 'Sun'];

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
                        <TouchableOpacity onPress={onDelete}>
                            <TrashIcon name="trash" size={30} />
                        </TouchableOpacity>
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
        width: '75%',
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
        alignItems: 'flex-end',
        marginTop: 10,
        padding: 20,
    }

})

