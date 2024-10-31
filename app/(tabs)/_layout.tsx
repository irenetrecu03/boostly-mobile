import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false, tabBarLabel: "Home" }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
