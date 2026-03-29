// ─── Enums ────────────────────────────────────────────────────────────────────

export type TipoCard =
  | 'CAPUT_ISOLADO'
  | 'PARAGRAFO_ISOLADO'
  | 'ARTIGO_COMPLETO'
  | 'INCISO_COM_CAPUT'
  | 'ALINEA_COM_INCISO_E_CAPUT';

export type Dificuldade = 'FACIL' | 'MEDIO' | 'DIFICIL';

// ─── Variante ─────────────────────────────────────────────────────────────────
// Uma substituição possível no textoOriginal para criar uma versão errada

export interface Variante {
  palavraOriginal: string;   // palavra real da lei
  palavraSubstituta: string; // palavra trocada (o "erro")
}

// ─── SpukCard (dados do corpus) ───────────────────────────────────────────────

export interface SpukCard {
  id: string;
  referencia: string;         // "Art. 1º, §1º"
  tipo: TipoCard;
  textoContexto: string;      // "Art. 1º — DAS DISPOSIÇÕES GERAIS"
  textoParent: string | null; // contexto pai para incisos/alíneas
  textoOriginal: string;      // texto real da lei
  materiaNome: string;
  assuntoNome: string;
  dificuldade: Dificuldade;
  ordemEstudo: number;
  ativo: boolean;
  conceitos: string[];        // frases-chave destacadas em bold no FeedbackSuccess
  variantes: Variante[];      // alternativas erradas possíveis
}

// ─── SpukCardApresentado (runtime — o que o usuário vê) ──────────────────────

export interface SpukCardApresentado {
  card: SpukCard;
  textoApresentado: string;       // textoOriginal ou com uma variante aplicada
  isCorreto: boolean;             // true = texto original | false = variante
  varianteUsada: Variante | null; // qual variante foi aplicada (se houver)
}