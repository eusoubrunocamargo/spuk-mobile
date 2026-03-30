import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const THRESHOLD = 120;
const SPRING_CONFIG = { damping: 20, stiffness: 200 };
const FLY_DURATION = 320; // ms para o card sair antes do feedback entrar

interface UseSwipeDeckProps {
  onCerto: () => void;
  onErrado: () => void;
}

export function useSwipeDeck({ onCerto, onErrado }: UseSwipeDeckProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const tintOpacity = useSharedValue(0);

  function resetar() {
    translateX.value = 0;
    translateY.value = 0;
    tintOpacity.value = 0;
  }

  // Delay para o card terminar de voar antes do feedback aparecer
  function dispararCerto() {
    setTimeout(() => {
      onCerto();
      resetar();
    }, FLY_DURATION);
  }

  function dispararErrado() {
    setTimeout(() => {
      onErrado();
      resetar();
    }, FLY_DURATION);
  }

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      const dx = e.translationX;
      const dy = e.translationY;
      const dominante = Math.abs(dx) > Math.abs(dy) ? dx : -dy;
      tintOpacity.value = Math.max(-1, Math.min(1, dominante / THRESHOLD));
    })
    .onEnd((e) => {
      const dx = e.translationX;
      const dy = e.translationY;
      const swipeCerto  = dx >  THRESHOLD || dy < -THRESHOLD;
      const swipeErrado = dx < -THRESHOLD || dy >  THRESHOLD;

      if (swipeCerto) {
        // Card voa para a direita
        translateX.value = withSpring(600, SPRING_CONFIG);
        translateY.value = withSpring(-80, SPRING_CONFIG);
        tintOpacity.value = withTiming(0, { duration: FLY_DURATION });
        runOnJS(dispararCerto)();
      } else if (swipeErrado) {
        // Card voa para a esquerda
        translateX.value = withSpring(-600, SPRING_CONFIG);
        translateY.value = withSpring(-80, SPRING_CONFIG);
        tintOpacity.value = withTiming(0, { duration: FLY_DURATION });
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