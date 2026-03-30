import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

interface StatsButtonProps {
  onPress: () => void;
}

export default function StatsButton({ onPress }: StatsButtonProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <Pressable
      style={[styles.button, { backgroundColor: isDark ? "#2E2E2E" : "#E0DBD1" }]}
      onPress={onPress}
    >
      <Ionicons
        name="bar-chart-outline"
        size={22}
        color={isDark ? "rgba(240,235,225,0.7)" : "rgba(26,26,26,0.6)"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});