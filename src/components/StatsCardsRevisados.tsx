import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface StatsCardsRevisadosProps {
  revisados: number;
  total: number;
}

export default function StatsCardsRevisados({ revisados, total }: StatsCardsRevisadosProps) {
  const isDark = useColorScheme() === "dark";
  const bgCard    = isDark ? "#2E2E2E" : "#FFFFFF";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";

  return (
    <View style={[styles.card, { backgroundColor: bgCard }]}>
      {/* Título */}
      <Text style={[styles.titulo, { color: textColor }]}>Cards Revisados</Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: isDark ? "rgba(240,235,225,0.1)" : "rgba(26,26,26,0.1)" }]} />

      {/* Ícone + número */}
      <View style={styles.row}>
        <Ionicons name="layers-outline" size={25} color={textColor} />
        <Text style={[styles.numero, { color: textColor }]}>
          <Text style={styles.numeroPrincipal}>{revisados}/</Text>
          <Text style={styles.numeroTotal}>{total}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 38,
    paddingTop: 19,
    paddingBottom: 22,
    gap: 13,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    width: 270,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  numero: {
    lineHeight: 44,
  },
  numeroPrincipal: {
    fontSize: 40,
    fontWeight: "300",
  },
  numeroTotal: {
    fontSize: 20,
    fontWeight: "300",
  },
});