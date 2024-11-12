import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { EditHabit } from './EditHabit';

interface HabitItemProps {
    title: string;
    points: string;
    description: string;
    days: number[];
    daysSummary: string,
}

export const HabitItem: FC<HabitItemProps> = ({ title, points, description, days, daysSummary }) => {
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
                <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} activeOpacity={1}>
                    <EditHabit 
                        title={habitTitle}
                        setTitle={setTitle}
                        points={habitPoints}
                        setPoints={setPoints}
                        description={habitDescription}
                        setDescription={setDescription}
                        days={habitDays}
                        setDays={setDays}
                        onDelete={setModalVisible}
                    />
                </TouchableOpacity>
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

        height: '50%',
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