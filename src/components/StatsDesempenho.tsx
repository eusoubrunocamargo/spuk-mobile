import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface StatsDesempenhoProps {
  acertos: number; // valor de 0 a 100
  erros: number;   // valor de 0 a 100
}

export default function StatsDesempenho({ acertos, erros }: StatsDesempenhoProps) {
  const isDark = useColorScheme() === "dark";
  const bgCard    = isDark ? "#2E2E2E" : "#FFFFFF";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(240,235,225,0.5)" : "rgba(26,26,26,0.5)";

  return (
    <View style={[styles.card, { backgroundColor: bgCard }]}>
      {/* Título */}
      <Text style={[styles.titulo, { color: textColor }]}>Desempenho geral</Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: isDark ? "rgba(240,235,225,0.1)" : "rgba(26,26,26,0.1)" }]} />

      {/* Colunas */}
      <View style={styles.colunas}>
        {/* Acertos */}
        <View style={styles.coluna}>
          <View style={styles.labelRow}>
            <Ionicons name="checkmark-circle" size={15} color={textColor} />
            <Text style={[styles.label, { color: textColor }]}>acertos</Text>
          </View>
          <Text style={[styles.valor, { color: textColor }]}>{acertos}%</Text>
        </View>

        {/* Erros */}
        <View style={styles.coluna}>
          <View style={styles.labelRow}>
            <Ionicons name="close-circle" size={15} color={textColor} />
            <Text style={[styles.label, { color: textColor }]}>erros</Text>
          </View>
          <Text style={[styles.valor, { color: textColor }]}>{erros}%</Text>
        </View>
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
  colunas: {
    flexDirection: "row",
    gap: 8,
  },
  coluna: {
    flex: 1,
    gap: 4,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "300",
  },
  valor: {
    fontSize: 40,
    fontWeight: "300",
  },
});