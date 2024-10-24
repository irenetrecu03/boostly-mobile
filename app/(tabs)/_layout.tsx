import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false, tabBarLabel: "Home" }} />
      <Tabs.Screen name="login" options={{ headerShown: false, tabBarLabel: "Login" }} />
    </Tabs>
  );
}
