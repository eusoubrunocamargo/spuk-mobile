import { useMemo, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { montarDeck } from "../data/deckUtils";
import { mockCards } from "../data/mockCards";
import { SpukCardApresentado } from "../data/types";

import EmptyState from "./EmptyState";
import FeedbackError from "./FeedbackError";
import FeedbackSuccess from "./FeedbackSuccess";
import ProgressBar from "./ProgressBar";
import StatsButton from "./StatsButton";
import StatsSheet from "./StatsSheet";
import SwipeCard from "./SwipeCard";
import SwipeHeader from "./SwipeHeader";

type Fase = "card" | "feedbackSuccess" | "feedbackError";

export default function SwipeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bgColor = isDark ? "#1A1A1A" : "#F0EBE1";

  const deck = useMemo(() => montarDeck(mockCards), []);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState<Fase>("card");

  const [statsVisible, setStatsVisible] = useState(false);

  const cardAtual: SpukCardApresentado | null = deck[indice] ?? null;

  function handleCerto() {
    if (!cardAtual) return;
    setFase(cardAtual.isCorreto ? "feedbackSuccess" : "feedbackError");
  }

  function handleErrado() {
    if (!cardAtual) return;
    setFase(!cardAtual.isCorreto ? "feedbackSuccess" : "feedbackError");
  }

  function handleContinuar() {
    setFase("card");
    setIndice((i) => i + 1);
  }

  if (!cardAtual) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
        <EmptyState
          onContinuar={() => {
            setIndice(0);
            setFase("card");
          }}
          onMenuInicial={() => {
            // navegação para o menu — a implementar
          }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
        <View style={styles.container}>
          {fase === "card" && (
            <View style={styles.conteudo}>
              <SwipeHeader textoContexto={cardAtual.card.textoContexto} />
              <SwipeCard
                cardApresentado={cardAtual}
                onCerto={handleCerto}
                onErrado={handleErrado}
              />
            </View>
          )}

          {fase === "feedbackSuccess" && (
            <FeedbackSuccess
              cardApresentado={cardAtual}
              onContinuar={handleContinuar}
            />
          )}

          {fase === "feedbackError" && (
            <FeedbackError
              cardApresentado={cardAtual}
              onContinuar={handleContinuar}
            />
          )}

          <View style={styles.bottomBar}>
            <ProgressBar total={deck.length} atual={indice} />
            <StatsButton onPress={() => setStatsVisible(true)} />
          </View>
        </View>
        <StatsSheet visible={statsVisible} onClose={() => setStatsVisible(false)} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 36,
  },
  bottomBar: {
    alignItems: "center",
    paddingBottom: 24,
    gap: 8,
  },
});