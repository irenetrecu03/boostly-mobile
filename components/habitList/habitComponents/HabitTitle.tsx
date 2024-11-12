import React, { FC } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

interface HabitTitleProps {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const HabitTitle: FC<HabitTitleProps> = ({ title, setTitle }) => {
    return (
        <View style={styles.titleBox} >
            <TextInput style={styles.titleText}
                placeholder='Enter habit name' 
                onChangeText={(text: string) => {
                    setTitle(text);
                }}
                value={title} />
        </View>
    )
}

const styles = StyleSheet.create({
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
})