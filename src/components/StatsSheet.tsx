import { useEffect, useState } from "react";
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import StatsCardsRevisados from "./StatsCardsRevisados";
import StatsDesempenho from "./StatsDesempenho";
import StatsStreak from "./StatsStreak";

const { height: SCREEN_H } = Dimensions.get("window");
const SHEET_TOP = 45;
const SHEET_H = SCREEN_H - SHEET_TOP;
const CLOSE_THRESHOLD = 80;

interface StatsSheetProps {
    visible: boolean;
    onClose: () => void;
}

export default function StatsSheet({ visible, onClose }: StatsSheetProps) {
    const isDark = useColorScheme() === "dark";
    const bgColor = isDark ? "#242424" : "#F0EBE1";
    const textColor = isDark ? "#F0EBE1" : "#1A1A1A";

    //mock data for stats streak
    const streakMock = 3;
    const diasAtivosMock = [true, true, true, false, false, false, false];

    //mock data for desempenho geral
    const acertosMock = 83;
    const errosMock = 17;

    //mock data for cards revisados
    const revisadosMocks = 83;
    const totalCardsMocks = 208;

    // Controla montagem — evita leitura de .value durante render
    const [mounted, setMounted] = useState(false);

    const overlayOpacity = useSharedValue(0);
    const translateY = useSharedValue(SHEET_H);

    useEffect(() => {
        if (visible) {
            setMounted(true);
            overlayOpacity.value = withTiming(1, { duration: 300 });
            translateY.value = withSpring(0, { damping: 24, stiffness: 200 });
        } else {
            overlayOpacity.value = withTiming(0, { duration: 250 });
            translateY.value = withTiming(
                SHEET_H,
                { duration: 280, easing: Easing.in(Easing.cubic) },
                (finished) => { if (finished) runOnJS(setMounted)(false); }
            );
        }
    }, [visible]);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (e.translationY > 0) translateY.value = e.translationY;
        })
        .onEnd((e) => {
            if (e.translationY > CLOSE_THRESHOLD || e.velocityY > 800) {
                translateY.value = withTiming(SHEET_H, { duration: 280 });
                overlayOpacity.value = withTiming(0, { duration: 250 });
                runOnJS(onClose)();
            } else {
                translateY.value = withSpring(0, { damping: 24, stiffness: 200 });
            }
        });

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    if (!mounted) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="auto">
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            </Animated.View>

            <GestureDetector gesture={panGesture}>
                <Animated.View
                    style={[styles.sheet, { backgroundColor: bgColor, top: SHEET_TOP }, sheetStyle]}
                >
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <Pressable onPress={onClose} hitSlop={16}>
                            <Text style={[styles.closeBtn, { color: textColor }]}>×</Text>
                        </Pressable>
                        <Text style={[styles.title, { color: textColor }]}>Estatísticas</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingTop: 16, gap: 12, paddingBottom: 32 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <StatsStreak streak={streakMock} diasAtivos={diasAtivosMock} />
                        <StatsDesempenho acertos={acertosMock} erros={errosMock} />
                        <StatsCardsRevisados revisados={revisadosMocks} total={totalCardsMocks} />
                    </ScrollView>

                    {/* Conteúdo será adicionado componente a componente */}
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingBottom: 32,
    },
    handle: {
        alignSelf: "center",
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "rgba(153,155,165,0.3)",
        marginTop: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 8,
    },
    closeBtn: {
        fontSize: 24,
        lineHeight: 28,
        fontWeight: "300",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    headerSpacer: {
        width: 24,
    },
});