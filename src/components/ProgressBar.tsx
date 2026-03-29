import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  total: number;
  atual: number;
}

export default function ProgressBar({ total, atual }: ProgressBarProps) {
  const progresso = total > 0 ? atual / total : 0;
  const fillWidth = Math.round(80 * progresso);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: fillWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 24,
  },
  track: {
    width: 80,
    height: 3,
    backgroundColor: "rgba(153,155,165,0.18)",
    borderRadius: 2,
  },
  fill: {
    height: 3,
    backgroundColor: "rgba(153,155,165,0.45)",
    borderRadius: 2,
  },
});