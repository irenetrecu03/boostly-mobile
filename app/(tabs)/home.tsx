import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

    return (
        <View style={styles.container}>
            <Button
                onPress={() => router.push("/") }
                title="Home"
                color="#fff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
    },
  });