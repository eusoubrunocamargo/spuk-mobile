import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const THRESHOLD = 120; // px para considerar swipe intencional
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

interface UseSwipeDeckProps {
  onCerto: () => void;
  onErrado: () => void;
}

export function useSwipeDeck({ onCerto, onErrado }: UseSwipeDeckProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const tintOpacity = useSharedValue(0); // 0 = neutro, positivo = verde, negativo = vermelho

  function dispararCerto() {
    onCerto();
    resetar();
  }

  function dispararErrado() {
    onErrado();
    resetar();
  }

  function resetar() {
    translateX.value = withTiming(0, { duration: 0 });
    translateY.value = withTiming(0, { duration: 0 });
    tintOpacity.value = withTiming(0, { duration: 0 });
  }

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;

      // tint: positivo para certo (direita/cima), negativo para errado (esquerda/baixo)
      const dx = e.translationX;
      const dy = e.translationY;
      const dominante = Math.abs(dx) > Math.abs(dy) ? dx : -dy;
      tintOpacity.value = Math.max(-1, Math.min(1, dominante / THRESHOLD));
    })
    .onEnd((e) => {
      const dx = e.translationX;
      const dy = e.translationY;

      const swipeCerto = dx > THRESHOLD || dy < -THRESHOLD;
      const swipeErrado = dx < -THRESHOLD || dy > THRESHOLD;

      if (swipeCerto) {
        translateX.value = withSpring(500, SPRING_CONFIG);
        runOnJS(dispararCerto)();
      } else if (swipeErrado) {
        translateX.value = withSpring(-500, SPRING_CONFIG);
        runOnJS(dispararErrado)();
      } else {
        // Snap back
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
        tintOpacity.value = withTiming(0);
      }
    });

  return { gesture, translateX, translateY, tintOpacity };
}