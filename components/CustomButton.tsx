import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { useState } from 'react';

interface CustomButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    pressedStyle?: ViewStyle;
}

export const CustomButton: FC<CustomButtonProps> = ({ onPress, title, style, textStyle, pressedStyle }) => {
  const [ isPressed, setPressed ] = useState(false);

  const handlePressIn = () => {
    setPressed(!isPressed);
  }

  return (
    <TouchableOpacity 
            style={[styles.button, style, isPressed && pressedStyle]} 
            onPress={onPress}
            onPressIn={handlePressIn}
            >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee', // default button color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // default text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
