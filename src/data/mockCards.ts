import { SpukCard } from './types';

export const mockCards: SpukCard[] = [
  {
    id: 'lei8429-art1-caput',
    referencia: 'Art. 1º',
    tipo: 'CAPUT_ISOLADO',
    textoContexto: 'Lei 8.429/1992 — Art. 1º',
    textoParent: null,
    textoOriginal:
      'O sistema de responsabilização por atos de improbidade administrativa tutelará a probidade na organização do Estado e no exercício de suas funções, como forma de assegurar a integridade do patrimônio público e social, nos termos desta Lei.',
    materiaNome: 'Direito Administrativo',
    assuntoNome: 'Das Disposições Gerais',
    dificuldade: 'MEDIO',
    ordemEstudo: 1,
    ativo: true,
    conceitos: [
      'atos de improbidade administrativa',
      'probidade',
      'patrimônio público e social',
    ],
    variantes: [
      { palavraOriginal: 'probidade', palavraSubstituta: 'moralidade' },
      { palavraOriginal: 'patrimônio público e social', palavraSubstituta: 'patrimônio público' },
    ],
  },
  {
    id: 'lei8429-art1-par1',
    referencia: 'Art. 1º, §1º',
    tipo: 'PARAGRAFO_ISOLADO',
    textoContexto: 'Lei 8.429/1992 — Art. 1º, §1º',
    textoParent: null,
    textoOriginal:
      'Consideram-se atos de improbidade administrativa as condutas dolosas tipificadas nos arts. 9º, 10 e 11 desta Lei, ressalvados tipos previstos em leis especiais.',
    materiaNome: 'Direito Administrativo',
    assuntoNome: 'Das Disposições Gerais',
    dificuldade: 'MEDIO',
    ordemEstudo: 2,
    ativo: true,
    conceitos: [
      'atos de improbidade administrativa',
      'condutas dolosas',
    ],
    variantes: [
      { palavraOriginal: 'dolosas', palavraSubstituta: 'culposas' },
      { palavraOriginal: 'ressalvados', palavraSubstituta: 'excluídos' },
    ],
  },
  {
    id: 'lei8429-art1-par2',
    referencia: 'Art. 1º, §2º',
    tipo: 'PARAGRAFO_ISOLADO',
    textoContexto: 'Lei 8.429/1992 — Art. 1º, §2º',
    textoParent: null,
    textoOriginal:
      'Considera-se dolo a vontade livre e consciente de alcançar o resultado ilícito tipificado nos arts. 9º, 10 e 11 desta Lei, não bastando a voluntariedade do agente.',
    materiaNome: 'Direito Administrativo',
    assuntoNome: 'Das Disposições Gerais',
    dificuldade: 'MEDIO',
    ordemEstudo: 3,
    ativo: true,
    conceitos: [
      'vontade livre e consciente',
      'resultado ilícito',
      'voluntariedade do agente',
    ],
    variantes: [
      { palavraOriginal: 'livre e consciente', palavraSubstituta: 'livre e espontânea' },
      { palavraOriginal: 'não bastando', palavraSubstituta: 'sendo suficiente' },
    ],
  },
  {
    id: 'lei8429-art1-par3',
    referencia: 'Art. 1º, §3º',
    tipo: 'PARAGRAFO_ISOLADO',
    textoContexto: 'Lei 8.429/1992 — Art. 1º, §3º',
    textoParent: null,
    textoOriginal:
      'O mero exercício da função ou desempenho de competências públicas, sem comprovação de ato doloso com fim ilícito, afasta a responsabilidade por ato de improbidade administrativa.',
    materiaNome: 'Direito Administrativo',
    assuntoNome: 'Das Disposições Gerais',
    dificuldade: 'MEDIO',
    ordemEstudo: 4,
    ativo: true,
    conceitos: [
      'mero exercício da função',
      'ato doloso com fim ilícito',
      'afasta a responsabilidade',
    ],
    variantes: [
      { palavraOriginal: 'afasta', palavraSubstituta: 'não afasta' },
      { palavraOriginal: 'doloso', palavraSubstituta: 'culposo' },
    ],
  },
  {
    id: 'lei8429-art2-caput',
    referencia: 'Art. 2º',
    tipo: 'CAPUT_ISOLADO',
    textoContexto: 'Lei 8.429/1992 — Art. 2º',
    textoParent: null,
    textoOriginal:
      'Para os efeitos desta Lei, consideram-se agente público o agente político, o servidor público e todo aquele que exerce, ainda que transitoriamente ou sem remuneração, por eleição, nomeação, designação, contratação ou qualquer outra forma de investidura ou vínculo, mandato, cargo, emprego ou função nas entidades referidas no art. 1º desta Lei.',
    materiaNome: 'Direito Administrativo',
    assuntoNome: 'Das Disposições Gerais',
    dificuldade: 'MEDIO',
    ordemEstudo: 5,
    ativo: true,
    conceitos: [
      'agente público',
      'ainda que transitoriamente ou sem remuneração',
      'mandato, cargo, emprego ou função',
    ],
    variantes: [
      { palavraOriginal: 'transitoriamente ou sem remuneração', palavraSubstituta: 'transitoriamente e sem remuneração' },
      { palavraOriginal: 'agente político', palavraSubstituta: 'agente administrativo' },
    ],
  },
];