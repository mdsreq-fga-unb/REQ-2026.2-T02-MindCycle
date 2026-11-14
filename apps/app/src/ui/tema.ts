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
} as const;

/** Largura máxima do conteúdo: no computador (até 1440 px, RNF10) a tela não estica. */
export const larguraMaxima = 480;
