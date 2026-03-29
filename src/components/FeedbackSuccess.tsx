import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SpukCardApresentado } from "../data/types";

interface FeedbackSuccessProps {
  cardApresentado: SpukCardApresentado;
  onContinuar: () => void;
}

export default function FeedbackSuccess({
  cardApresentado,
  onContinuar,
}: FeedbackSuccessProps) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(107,112,120,0.75)" : "rgba(153,155,165,0.75)";
  const iconColor = isDark ? "rgba(240,235,225,0.5)" : "rgba(153,155,165,0.6)";

  const { card } = cardApresentado;

  // Reutiliza a mesma lógica do SwipeHeader
  const [lei, ...resto] = card.textoContexto.split(" — ");
  const referencia = resto.join(" — ");

  return (
    <Pressable style={styles.container} onPress={onContinuar}>
      {/* Troféu vetorial */}
      <Ionicons name="trophy-outline" size={40} color={iconColor} style={styles.trofeu} />

      {/* Parabéns */}
      <Text style={[styles.parabens, { color: mutedColor }]}>Parabéns, você acertou!</Text>

      {/* Header — mesmo padrão do SwipeHeader */}
      <Text style={[styles.lei, { color: mutedColor }]}>{lei}</Text>
      {referencia ? <Text style={styles.referencia}>{referencia}</Text> : null}
      <View style={styles.divider} />

      {/* Texto com conceitos em bold */}
      <Text style={[styles.texto, { color: textColor }]}>
        {renderComConceitos(card.textoOriginal, card.conceitos, textColor)}
      </Text>

      <Text style={styles.tapHint}>toque para continuar</Text>
    </Pressable>
  );
}

function renderComConceitos(
  texto: string,
  conceitos: string[],
  textColor: string
) {
  if (conceitos.length === 0) return texto;

  type Segmento = { texto: string; isConceito: boolean };
  let segmentos: Segmento[] = [{ texto, isConceito: false }];

  for (const conceito of conceitos) {
    const novosSegmentos: Segmento[] = [];
    for (const seg of segmentos) {
      if (seg.isConceito || !seg.texto.includes(conceito)) {
        novosSegmentos.push(seg);
        continue;
      }
      const partes = seg.texto.split(conceito);
      partes.forEach((parte, i) => {
        if (parte) novosSegmentos.push({ texto: parte, isConceito: false });
        if (i < partes.length - 1)
          novosSegmentos.push({ texto: conceito, isConceito: true });
      });
    }
    segmentos = novosSegmentos;
  }

  return (
    <Text style={{ color: textColor, fontSize: 16, fontWeight: "400", lineHeight: 34, textAlign: "center" }}>
      {segmentos.map((seg, i) =>
        seg.isConceito ? (
          <Text key={i} style={{ fontWeight: "900" }}>{seg.texto}</Text>
        ) : (
          <Text key={i}>{seg.texto}</Text>
        )
      )}
    </Text>
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
  trofeu: {
    marginBottom: 24,
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
  tapHint: {
    position: "absolute",
    bottom: 64,
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(153,155,165,0.45)",
  },
  parabens: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
});