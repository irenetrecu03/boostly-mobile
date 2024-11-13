import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { EditHabit } from './EditHabit';
import { deleteHabitRequest, modifyHabitRequest } from '@/app/api/apiRequests';
import Toast from 'react-native-toast-message'

interface HabitItemProps {
    habitID: number,
    title: string;
    points: string;
    description: string;
    days: number[];
    daysSummary: string;
    
    habitListUpdated: boolean;
    setHabitListUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ToastProps = {
    msg: string,
}

export const HabitItem: FC<HabitItemProps> = ({ habitID, title, points, description, days, daysSummary,
    habitListUpdated, setHabitListUpdated
 }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [habitTitle, setTitle] = useState(title);
    const [habitPoints, setPoints] = useState(points);
    const [habitDescription, setDescription] = useState(description);
    const [habitDays, setDays] = useState(days);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const showSuccessToast = ({ msg }: ToastProps) => {
        Toast.show({
            type: 'success',
            text1: `${msg}`,
            visibilityTime: 3000,
            position: 'bottom',
            bottomOffset: 30,
        });
    };

    const showFailToast = ({ msg }: ToastProps) => {
        Toast.show({
            type: 'error',
            text1: `${msg}`,
            visibilityTime: 3000,
            position: 'bottom',
            bottomOffset: 30,
        });
    };

    return (
        <TouchableOpacity onPress={openModal}>
            <View style={styles.container}>
                <Text style={styles.titleText}>{ habitTitle }</Text>

                <View style={styles.elementRow}>

                    <View style={styles.elementItem}>
                        <AntDesignIcon name="clockcircle" size={22} />
                        <Text style={styles.text}>{ daysSummary }</Text>
                    </View>

                    <View style={styles.elementItem}>
                        <AntDesignIcon name="star" size={22} />
                        <Text style={styles.text}>{ habitPoints } points</Text>
                    </View>

                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <EditHabit
                        habitID={habitID} 
                        title={habitTitle}
                        setTitle={setTitle}
                        points={habitPoints}
                        setPoints={setPoints}
                        description={habitDescription}
                        setDescription={setDescription}
                        days={habitDays}
                        setDays={setDays}
                        onDelete={setModalVisible}
                        modifyHabit={modifyHabitRequest}
                        deleteHabit={deleteHabitRequest}
                        successToastMsg={showSuccessToast}
                        failToastMsg={showFailToast}
                        habitListUpdated={habitListUpdated}
                        setHabitListUpdated={setHabitListUpdated}
                    />
            </Modal>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF865E',
        borderRadius: 20,
        flexDirection: 'column',

        alignContent: 'center',
        justifyContent: 'center',

        paddingLeft: 25,
        paddingRight: 50,

        marginTop: 10,
        marginBottom: 10,

        height: 90,
        width: '100%',
    },
    titleText: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 18,
    },
    elementRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    elementItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})