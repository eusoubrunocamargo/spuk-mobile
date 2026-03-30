import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

interface EmptyStateProps {
  onContinuar: () => void;
  onMenuInicial: () => void;
}

export default function EmptyState({ onContinuar, onMenuInicial }: EmptyStateProps) {
  const isDark = useColorScheme() === "dark";
  const bgColor   = isDark ? "#1A1A1A" : "#F0EBE1";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(240,235,225,0.45)" : "rgba(26,26,26,0.45)";
  const btnBg     = isDark ? "#2E2E2E" : "#FFFFFF";
  const iconColor = isDark ? "rgba(240,235,225,0.5)" : "rgba(26,26,26,0.4)";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Ícone */}
      <Ionicons name="checkmark-done-outline" size={48} color={iconColor} style={styles.icone} />

      {/* Mensagem */}
      <Text style={[styles.mensagem, { color: textColor }]}>
        Parabéns, você concluiu{"\n"}seus cards de hoje!
      </Text>

      {/* Ações */}
      <View style={styles.acoes}>
        <Pressable
          style={[styles.botao, { backgroundColor: btnBg }]}
          onPress={onContinuar}
        >
          <Text style={[styles.botaoTexto, { color: textColor }]}>Continuar estudando</Text>
        </Pressable>

        <Pressable onPress={onMenuInicial} hitSlop={12}>
          <Text style={[styles.linkTexto, { color: mutedColor }]}>Ir para o menu inicial</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 8,
  },
  icone: {
    marginBottom: 24,
  },
  mensagem: {
    fontSize: 20,
    fontWeight: "300",
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 40,
  },
  acoes: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  botao: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: "600",
  },
  linkTexto: {
    fontSize: 14,
    fontWeight: "400",
  },
});