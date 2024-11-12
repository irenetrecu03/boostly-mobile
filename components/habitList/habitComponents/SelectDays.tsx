import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../../CustomButton';

interface SelectDaysProps {
    days: number[];
    toggleDay: (index: number) => void;
}

export const SelectDays: FC<SelectDaysProps> = ({days, toggleDay}) => {
    const firstRowDays = ['Mon', 'Tue', 'Wed', 'Thu'];
    const secondRowDays = ['Fri', 'Sat', 'Sun'];

    return (
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
    )
} 

const styles = StyleSheet.create({
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
})