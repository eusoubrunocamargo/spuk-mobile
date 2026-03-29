import { StyleSheet, useColorScheme } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { SpukCardApresentado } from "../data/types";
import { useSwipeDeck } from "../hooks/useSwipeDeck";

interface SwipeCardProps {
  cardApresentado: SpukCardApresentado;
  onCerto: () => void;
  onErrado: () => void;
}

export default function SwipeCard({ cardApresentado, onCerto, onErrado }: SwipeCardProps) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const textColor = isDark ? "#F0EBE1" : "#1A1A1A";

  const { gesture, translateX, translateY, tintOpacity } = useSwipeDeck({
    onCerto,
    onErrado,
  });

  // Rotação leve durante o arrasto
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${interpolate(translateX.value, [-200, 0, 200], [-8, 0, 8])}deg` },
    ],
  }));

  // Tint verde (certo) ou vermelho (errado) durante o arrasto
  const tintStyle = useAnimatedStyle(() => {
    const opacity = Math.abs(tintOpacity.value) * 0.15;
    const color = tintOpacity.value >= 0 ? "#2ECC71" : "#FF4D4D";
    return {
      backgroundColor: color,
      opacity,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, cardStyle]}>
        {/* Tint overlay */}
        <Animated.View style={[StyleSheet.absoluteFillObject, styles.tint, tintStyle]} />

        <Animated.Text style={[styles.texto, { color: textColor }]}>
          {cardApresentado.textoApresentado}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  tint: {
    borderRadius: 16,
    pointerEvents: "none",
  },
  texto: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 34,
    textAlign: "center",
    alignSelf: "stretch",
  },
});