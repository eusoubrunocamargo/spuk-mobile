import { StyleSheet, Text, View } from "react-native";

interface SwipeHeaderProps {
  textoContexto: string; // "Lei 8.429/1992 — Art. 1º, §1º"
}

export default function SwipeHeader({ textoContexto }: SwipeHeaderProps) {
  // Separa "Lei X" da localização específica
  const [lei, ...resto] = textoContexto.split(" — ");
  const referencia = resto.join(" — ");

  return (
    <View style={styles.container}>
      <Text style={styles.lei}>{lei}</Text>
      {referencia ? <Text style={styles.referencia}>{referencia}</Text> : null}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 20,
    gap: 4,
  },
  lei: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(153,155,165,0.75)",
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
    marginTop: 8,
    width: 40,
    height: 1,
    backgroundColor: "rgba(153,155,165,0.25)",
  },
});