import { describe, expect, it } from 'vitest';
import { adiamentoTarefaSchema } from './tarefas.js';

describe('Contrato do adiamento (HU18)', () => {
  it('aceita apenas uma data de calendário real', () => {
    expect(adiamentoTarefaSchema.parse({ dataPlanejada: '2028-02-29' })).toEqual({
      dataPlanejada: '2028-02-29',
    });
  });
  it.each([
    {},
    { dataPlanejada: '2026-02-30' },
    { dataPlanejada: '15/11/2026' },
    { dataPlanejada: null },
    { dataPlanejada: '2026-11-15T00:00:00Z' },
  ])('recusa corpo inválido: %j', (dados) => {
    expect(adiamentoTarefaSchema.safeParse(dados).success).toBe(false);
  });
  it.each(['prazo', 'titulo', 'prioridade', 'origem', 'usuariaId'])(
    'não aceita alterar %s pelo adiamento',
    (campo) => {
      expect(
        adiamentoTarefaSchema.safeParse({
          dataPlanejada: '2026-11-16',
          [campo]: 'outro',
        }).success,
      ).toBe(false);
    },
  );
});
