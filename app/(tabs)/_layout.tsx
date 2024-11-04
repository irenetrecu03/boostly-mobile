import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="today" options={{ headerShown: false, tabBarLabel: "Today" }} />
      <Tabs.Screen name="habitList" options={{ headerShown: false, tabBarLabel: "Habits" }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
