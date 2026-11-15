import { describe, expect, it } from 'vitest';
import { adiamentoTarefaSchema, atualizacaoTarefaSchema } from './tarefas.js';

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

describe('Contrato da edição (HU16)', () => {
  const dados = { titulo: '  Ler  ', prazo: '2026-01-01', prioridade: 2, energia: 1 };

  it('permite corrigir tarefa com prazo passado e remover a duração', () => {
    expect(atualizacaoTarefaSchema.parse({ ...dados, duracaoMinutos: null })).toEqual({
      ...dados,
      titulo: 'Ler',
      duracaoMinutos: null,
    });
  });

  it.each(['id', 'usuariaId', 'dataPlanejada', 'criadaEm', 'concluidaEm'])(
    'não permite editar o campo interno %s',
    (campo) => {
      expect(atualizacaoTarefaSchema.safeParse({ ...dados, [campo]: 'outro' }).success).toBe(false);
    },
  );

  it.each([
    { titulo: '' },
    { prazo: '2026-02-30' },
    { prioridade: 4 },
    { energia: 0 },
    { duracaoMinutos: 1 },
    { duracaoMinutos: 30.5 },
  ])('recusa dados inválidos: %j', (alteracao) => {
    expect(atualizacaoTarefaSchema.safeParse({ ...dados, ...alteracao }).success).toBe(false);
  });
});
