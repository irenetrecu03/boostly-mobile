import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { useAuth, API_URL } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { onLogout } = useAuth();

  const logout = async () => {
    if (!onLogout) {
      alert("Logout function is not defined");
      return;
    }

    const result = await onLogout!();

    if (result && result.error) {
      alert(result.msg);
    } else {
      router.push("/")
    }
  };

  return (
      <View style={styles.container}>
          <Button
              onPress={logout}
              title="Logout"
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