import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface StatsStreakProps {
  streak: number;           // dias seguidos
  diasAtivos: boolean[];    // array de 7 booleans: [seg, ter, qua, qui, sex, sab, dom]
}

const DIAS = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

export default function StatsStreak({ streak, diasAtivos }: StatsStreakProps) {
  const isDark = useColorScheme() === "dark";
  const bgCard  = isDark ? "#2E2E2E" : "#FFFFFF";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = "#999BA5";
  const iconColor = isDark ? "#F0EBE1" : "#1A1A1A";

  return (
    <View style={[styles.card, { backgroundColor: bgCard }]}>
      {/* Título */}
      <Text style={[styles.titulo, { color: textColor }]}>Sua semana</Text>

      {/* Dias da semana */}
      <View style={styles.diasRow}>
        {DIAS.map((dia, i) => (
          <View key={dia} style={styles.diaCol}>
            <Ionicons
              name="flame"
              size={28}
              color={iconColor}
              style={{ opacity: diasAtivos[i] ? 1 : 0.10 }}
            />
            <Text style={[styles.diaLabel, { color: mutedColor }]}>{dia}</Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: isDark ? "rgba(240,235,225,0.1)" : "rgba(26,26,26,0.1)" }]} />

      {/* Frase de streak */}
      <Text style={[styles.frase, { color: textColor }]}>
        Você está em uma sequência de{" "}
        <Text style={styles.destaque}>{streak} {streak === 1 ? "dia" : "dias"}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 22,
    gap: 13,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
  },
  diasRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  diaCol: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  diaLabel: {
    fontSize: 10,
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: 270,
    alignSelf: "center",
  },
  frase: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
  },
  destaque: {
    fontWeight: "700",
  },
});