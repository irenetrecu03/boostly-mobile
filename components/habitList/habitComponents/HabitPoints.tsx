import React, { FC } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

interface HabitPointsProps {
    points: string;
    setPoints: React.Dispatch<React.SetStateAction<string>>;
    isInvalid?: boolean;
    pointsError?: string;
}

export const HabitPoints: FC<HabitPointsProps> = ({ points, setPoints, isInvalid, pointsError }) => {
    return (
        <View style={styles.inputTextBox} >
            {(isInvalid && pointsError && pointsError.length > 0) && <Text style={styles.inputError}>{pointsError}</Text>}
            <TextInput style={isInvalid ? styles.errorInput : styles.inputPoints}
                        placeholder='Enter points' 
                        onChangeText={(text: string) => {
                            setPoints(text);
                        }}
                        value={points} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputTextBox: {
        marginBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    errorInput: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#EC524B',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
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
    inputError: {
        fontSize: 14,
        color: '#EC524B',
    }
})