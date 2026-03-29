import { SpukCard, SpukCardApresentado } from './types';

// Probabilidade de apresentar uma variante errada (50%)
const PROB_VARIANTE = 0.5;

/**
 * Monta o card que será apresentado ao usuário.
 * Se o card tiver variantes e o sorteio decidir, aplica uma substituição.
 */
export function montarCardApresentado(card: SpukCard): SpukCardApresentado {
  const temVariante = card.variantes.length > 0;
  const usarVariante = temVariante && Math.random() < PROB_VARIANTE;

  if (!usarVariante) {
    return {
      card,
      textoApresentado: card.textoOriginal,
      isCorreto: true,
      varianteUsada: null,
    };
  }

  const variante = sortear(card.variantes);
  const textoApresentado = card.textoOriginal.replace(
    variante.palavraOriginal,
    variante.palavraSubstituta,
  );

  return {
    card,
    textoApresentado,
    isCorreto: false,
    varianteUsada: variante,
  };
}

/**
 * Monta uma sequência de cards embaralhada para uma sessão.
 */
export function montarDeck(cards: SpukCard[]): SpukCardApresentado[] {
  const ativos = cards.filter((c) => c.ativo);
  return embaralhar(ativos).map(montarCardApresentado);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortear<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function embaralhar<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}