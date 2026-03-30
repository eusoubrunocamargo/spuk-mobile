import { useEffect } from "react";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const DURATION = 300;

export function useFeedbackEntrance() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(32);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: DURATION, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: DURATION, easing: Easing.out(Easing.cubic) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}