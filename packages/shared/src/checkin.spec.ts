import { describe, expect, it } from 'vitest';
import { registroCheckinSchema } from './checkin.js';

const valido = (registro: unknown) => registroCheckinSchema.safeParse(registro).success;

describe('registroCheckinSchema', () => {
  it('aceita sintomas com intensidade ou "sem sintomas"', () => {
    expect(
      valido({
        disposicao: 2,
        semSintomas: false,
        sintomas: [{ sintoma: 'colica', intensidade: 3 }],
      }),
    ).toBe(true);
    expect(valido({ disposicao: 1, semSintomas: true, sintomas: [] })).toBe(true);
  });

  it.each([
    ['sem sintomas junto com sintomas', { semSintomas: true, sintomas: [{ sintoma: 'colica', intensidade: 1 }] }],
    ['nenhum sintoma e sem "sem sintomas"', { semSintomas: false, sintomas: [] }],
    [
      'sintoma repetido',
      {
        semSintomas: false,
        sintomas: [
          { sintoma: 'colica', intensidade: 1 },
          { sintoma: 'colica', intensidade: 2 },
        ],
      },
    ],
    ['sintoma fora da lista', { semSintomas: false, sintomas: [{ sintoma: 'febre', intensidade: 1 }] }],
    ['intensidade 0', { semSintomas: false, sintomas: [{ sintoma: 'colica', intensidade: 0 }] }],
    ['intensidade 4', { semSintomas: false, sintomas: [{ sintoma: 'colica', intensidade: 4 }] }],
    ['sintoma sem intensidade', { semSintomas: false, sintomas: [{ sintoma: 'colica' }] }],
  ])('recusa %s', (_caso, resto) => {
    expect(valido({ disposicao: 2, ...resto })).toBe(false);
  });

  it.each([undefined, 0, 4])('recusa a disposição %s', (disposicao) => {
    expect(valido({ disposicao, semSintomas: true, sintomas: [] })).toBe(false);
  });
});
