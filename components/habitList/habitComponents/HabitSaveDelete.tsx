import React, { FC } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import CustomButton from '../../CustomButton';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';
import StatsIcon from 'react-native-vector-icons/Ionicons';

interface HabitSaveDeleteProps {
    handleSave: () => void;
    handleDelete?: () => void;

    hasStats: boolean;
}

export const HabitSaveDelete: FC<HabitSaveDeleteProps> = ({ handleSave, handleDelete, hasStats }) => {
    return (
        <View style={styles.deleteBox}>

            <TouchableOpacity style={!hasStats ? styles.discardArea : styles.discardAreaWithoutStats} 
                    onPress={handleDelete}>
                <TrashIcon name="trash" size={35} />
            </TouchableOpacity>

            {hasStats && <TouchableOpacity style={styles.deleteArea} onPress={handleDelete}>
                <StatsIcon name="stats-chart" size={40} />
            </TouchableOpacity> }

            <CustomButton title="Save"
                        onPress={handleSave}
                        style={styles.saveButton}
                        textStyle={styles.saveButtonText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
    discardArea: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '53%',
    },
    discardAreaWithoutStats: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20%',
    },
    deleteArea: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '19%',
    },
    deleteBox: {
        alignContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        padding: 20,
    }
})