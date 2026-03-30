import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";
import { SpukCardApresentado } from "../data/types";
import { useFeedbackEntrance } from "../hooks/useFeedbackEntrance";

interface FeedbackSuccessProps {
  cardApresentado: SpukCardApresentado;
  onContinuar: () => void;
}

export default function FeedbackSuccess({ cardApresentado, onContinuar }: FeedbackSuccessProps) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(107,112,120,0.75)" : "rgba(153,155,165,0.75)";
  const iconColor = isDark ? "rgba(240,235,225,0.5)" : "rgba(153,155,165,0.6)";

  const { card } = cardApresentado;
  const [lei, ...resto] = card.textoContexto.split(" — ");
  const referencia = resto.join(" — ");

  const entranceStyle = useFeedbackEntrance();

  return (
    <Animated.View style={[styles.container, entranceStyle]}>
      <Pressable style={styles.inner} onPress={onContinuar}>
        <Ionicons name="trophy-outline" size={40} color={iconColor} style={styles.icone} />
        <Text style={[styles.frase, { color: mutedColor }]}>Parabéns, você acertou!</Text>

        <Text style={[styles.lei, { color: mutedColor }]}>{lei}</Text>
        {referencia ? <Text style={styles.referencia}>{referencia}</Text> : null}
        <View style={styles.divider} />

        <Text style={[styles.texto, { color: textColor }]}>
          {renderComConceitos(card.textoOriginal, card.conceitos, textColor)}
        </Text>

        <Text style={styles.tapHint}>toque para continuar</Text>
      </Pressable>
    </Animated.View>
  );
}

function renderComConceitos(texto: string, conceitos: string[], textColor: string) {
  if (conceitos.length === 0) return texto;
  type Seg = { texto: string; isConceito: boolean };
  let segs: Seg[] = [{ texto, isConceito: false }];
  for (const c of conceitos) {
    const next: Seg[] = [];
    for (const s of segs) {
      if (s.isConceito || !s.texto.includes(c)) { next.push(s); continue; }
      const partes = s.texto.split(c);
      partes.forEach((p, i) => {
        if (p) next.push({ texto: p, isConceito: false });
        if (i < partes.length - 1) next.push({ texto: c, isConceito: true });
      });
    }
    segs = next;
  }
  return (
    <Text style={{ color: textColor, fontSize: 16, fontWeight: "400", lineHeight: 34, textAlign: "center" }}>
      {segs.map((s, i) =>
        s.isConceito
          ? <Text key={i} style={{ fontWeight: "900" }}>{s.texto}</Text>
          : <Text key={i}>{s.texto}</Text>
      )}
    </Text>
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
  tapHint: { position: "absolute", bottom: 64, fontSize: 12, color: "rgba(153,155,165,0.45)" },
});