import { Stack, Tabs } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ statusBarColor: "#fff7ed" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ingredion" options={{ headerStyle: { backgroundColor: "#fff7ed" } }} />
    </Stack>
  );
}
