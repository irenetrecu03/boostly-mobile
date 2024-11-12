import React, { FC } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

interface HabitPointsProps {
    points: string;
    setPoints: React.Dispatch<React.SetStateAction<string>>;
}

export const HabitPoints: FC<HabitPointsProps> = ({ points, setPoints }) => {
    return (
        <View style={styles.inputTextBox} >
            <TextInput style={styles.inputPoints}
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
    inputPoints: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
})