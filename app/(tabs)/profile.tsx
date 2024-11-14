import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router";
import { useAuth } from '../context/AuthContext';

export default function Profile() {
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
          />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEF9EF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#0000',
    },
  });