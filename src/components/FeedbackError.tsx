import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";
import { SpukCardApresentado } from "../data/types";
import { useFeedbackEntrance } from "../hooks/useFeedbackEntrance";

interface FeedbackErrorProps {
  cardApresentado: SpukCardApresentado;
  onContinuar: () => void;
}

export default function FeedbackError({ cardApresentado, onContinuar }: FeedbackErrorProps) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(107,112,120,0.75)" : "rgba(153,155,165,0.75)";
  const iconColor = isDark ? "rgba(240,235,225,0.5)" : "rgba(153,155,165,0.6)";

  const { card, varianteUsada, textoApresentado } = cardApresentado;
  const [lei, ...resto] = card.textoContexto.split(" — ");
  const referencia = resto.join(" — ");

  const entranceStyle = useFeedbackEntrance();

  return (
    <Animated.View style={[styles.container, entranceStyle]}>
      <Pressable style={styles.inner} onPress={onContinuar}>
        <Ionicons name="skull-outline" size={40} color={iconColor} style={styles.icone} />
        <Text style={[styles.frase, { color: mutedColor }]}>Cuidado, você errou!</Text>

        <Text style={[styles.lei, { color: mutedColor }]}>{lei}</Text>
        {referencia ? <Text style={styles.referencia}>{referencia}</Text> : null}
        <View style={styles.divider} />

        <Text style={[styles.texto, { color: textColor }]}>
          {varianteUsada
            ? renderComCorrecao(textoApresentado, varianteUsada.palavraSubstituta, varianteUsada.palavraOriginal, textColor)
            : textoApresentado}
        </Text>

        <Text style={styles.tapHint}>toque para continuar</Text>
      </Pressable>
    </Animated.View>
  );
}

function renderComCorrecao(texto: string, errada: string, correta: string, textColor: string) {
  const idx = texto.indexOf(errada);
  if (idx === -1) return <Text>{texto}</Text>;
  return (
    <>
      <Text style={{ color: textColor }}>{texto.substring(0, idx)}</Text>
      <Text style={styles.errada}>{errada} </Text>
      <Text style={styles.correta}>{correta}</Text>
      <Text style={{ color: textColor }}>{texto.substring(idx + errada.length)}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    gap: 8,
  },
  icone: { marginBottom: 8 },
  frase: { fontSize: 15, fontWeight: "600", textAlign: "center", marginBottom: 16 },
  lei: { fontSize: 12, fontWeight: "400", letterSpacing: 0.3, textAlign: "center" },
  referencia: { fontSize: 13, fontWeight: "500", color: "#999BA5", textAlign: "center" },
  divider: { width: 40, height: 1, backgroundColor: "rgba(153,155,165,0.25)", marginVertical: 8 },
  texto: { fontSize: 16, fontWeight: "400", lineHeight: 34, textAlign: "center" },
  errada: { color: "#FF4D4D", fontWeight: "700", textDecorationLine: "line-through" },
  correta: { color: "#2ECC71", fontWeight: "700" },
  tapHint: { position: "absolute", bottom: 64, fontSize: 12, color: "rgba(153,155,165,0.45)" },
});