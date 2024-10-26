import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const AppScreen = ({ children, style }: { children: any; style: ViewStyle; }) => {
    return (
        <View style={style}>
            <SafeAreaView style={styles.container}>{ children }</SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 20, // Approximate conversion of TailwindCSS px-5
        paddingVertical: 12, // Approximate conversion of TailwindCSS py-3
    },
})

export default AppScreen;