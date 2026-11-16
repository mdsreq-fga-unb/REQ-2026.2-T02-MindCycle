import type { Fase } from '@mindcycle/shared';

// Tokens de assets/brand/colors. Combinações de texto e fundo usadas aqui
// passam no WCAG 2.1 AA (RNF11): ink sobre rose 4,87; plum sobre ground 4,90;
// inkSoft sobre ground 5,18. Branco sobre rose (2,87) não passa: não use.
export const cores = {
  rose: '#EC6F9C',
  roseDeep: '#D6558A',
  lilac: '#A98BD1',
  coral: '#FF9E86',
  plum: '#8A5C77',
  ground: '#FBF1F5',
  blush: '#F6E7EF',
  white: '#FFFFFF',
  ink: '#3E2338',
  inkSoft: '#7A5E71',
} as const;

// Cor de fundo de cada fase do ciclo (HU28; o calendário da HU10 usa as mesmas).
// O texto vai sempre em ink e passa no AA: rose 4,87; coral 6,98; dourado 8,52;
// lilac 4,86. A cor nunca é a única pista: o nome da fase aparece junto.
// O dourado não é da marca: entrou porque são quatro fases e a marca tem três matizes.
export const coresFase = {
  menstrual: cores.rose,
  folicular: cores.coral,
  ovulatoria: '#F2C36B',
  lutea: cores.lilac,
} as const satisfies Record<Fase, string>;

// Fundo claro de cada fase, para os dias do calendário e as etiquetas: ink sobre
// eles passa folgado no AA. A cor cheia (coresFase) marca o dia de hoje e os pontos.
export const coresFaseSuave = {
  menstrual: '#FBDDE8',
  folicular: '#FFE6DD',
  ovulatoria: '#FCEFD3',
  lutea: '#ECE4F6',
} as const satisfies Record<Fase, string>;

/** Fraunces (assets/brand) para títulos; carregada em app/_layout.tsx. */
export const fonteTitulo = 'Fraunces-SemiBold';

export const espaco = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const raio = {
  campo: 12,
  botao: 999,
  cartao: 20,
} as const;

/** Largura máxima do conteúdo: em telas largas, como tablets, o formulário não estica. */
export const larguraMaxima = 480;
