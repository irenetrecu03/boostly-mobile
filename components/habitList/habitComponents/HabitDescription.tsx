import React, { FC } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

interface HabitDescriptionProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const HabitDescription: FC<HabitDescriptionProps> = ({ description, setDescription }) => {
    return (
        <View style={styles.inputTextBox} >
            <TextInput style={styles.inputDes}
                        placeholder='Enter description'
                        multiline={true}
                        onChangeText={(text: string) => {
                            setDescription(text);
                        }}
                        value={description} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputTextBox: {
        marginBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
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
})