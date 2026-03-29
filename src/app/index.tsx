import SwipeScreen from "@/components/SwipeScreen";
import { Stack } from "expo-router";

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SwipeScreen />
    </>
  );
}