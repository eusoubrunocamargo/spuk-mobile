import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SpukCardApresentado } from "../data/types";

interface FeedbackErrorProps {
  cardApresentado: SpukCardApresentado;
  onContinuar: () => void;
}

export default function FeedbackError({
  cardApresentado,
  onContinuar,
}: FeedbackErrorProps) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(107,112,120,0.75)" : "rgba(153,155,165,0.75)";
  const iconColor = isDark ? "rgba(240,235,225,0.5)" : "rgba(153,155,165,0.6)";

  const { card, varianteUsada, textoApresentado } = cardApresentado;

  // Mesmo padrão do SwipeHeader
  const [lei, ...resto] = card.textoContexto.split(" — ");
  const referencia = resto.join(" — ");

  return (
    <Pressable style={styles.container} onPress={onContinuar}>
      {/* Caveira */}
      <Ionicons name="skull-outline" size={40} color={iconColor} style={styles.icone} />

      {/* Frase */}
      <Text style={[styles.frase, { color: mutedColor }]}>Cuidado, você errou!</Text>

      {/* Header */}
      <Text style={[styles.lei, { color: mutedColor }]}>{lei}</Text>
      {referencia ? <Text style={styles.referencia}>{referencia}</Text> : null}
      <View style={styles.divider} />

      {/* Texto com erro tachado + correção em verde */}
      <Text style={[styles.texto, { color: textColor }]}>
        {varianteUsada
          ? renderComCorrecao(
              textoApresentado,
              varianteUsada.palavraSubstituta,
              varianteUsada.palavraOriginal,
              textColor
            )
          : textoApresentado}
      </Text>

      <Text style={styles.tapHint}>toque para continuar</Text>
    </Pressable>
  );
}

function renderComCorrecao(
  texto: string,
  palavraErrada: string,
  palavraCorreta: string,
  textColor: string
) {
  const idx = texto.indexOf(palavraErrada);
  if (idx === -1) return <Text>{texto}</Text>;

  const antes = texto.substring(0, idx);
  const depois = texto.substring(idx + palavraErrada.length);

  return (
    <>
      <Text style={{ color: textColor }}>{antes}</Text>
      <Text style={styles.palavraErrada}>{palavraErrada} </Text>
      <Text style={styles.palavraCorreta}>{palavraCorreta}</Text>
      <Text style={{ color: textColor }}>{depois}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    gap: 8,
  },
  icone: {
    marginBottom: 8,
  },
  frase: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  lei: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  referencia: {
    fontSize: 13,
    fontWeight: "500",
    color: "#999BA5",
    textAlign: "center",
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(153,155,165,0.25)",
    marginVertical: 8,
  },
  texto: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 34,
    textAlign: "center",
  },
  palavraErrada: {
    color: "#FF4D4D",
    fontWeight: "700",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  palavraCorreta: {
    color: "#2ECC71",
    fontWeight: "700",
  },
  tapHint: {
    position: "absolute",
    bottom: 64,
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(153,155,165,0.45)",
  },
});