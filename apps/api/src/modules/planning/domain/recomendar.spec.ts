import type { Tarefa } from '@mindcycle/shared';
import { recomendar } from './recomendar.js';

// Um caso por regra de negócio da HU13 (issue #83), escrito antes da função.
const HOJE = '2026-11-15';

let sequencia = 0;
function tarefa(dados: Partial<Tarefa> = {}): Tarefa {
  sequencia += 1;
  return {
    id: `t${sequencia}`,
    titulo: `Tarefa ${sequencia}`,
    prazo: '2026-11-30',
    prioridade: 2,
    energia: 2,
    duracaoMinutos: null,
    dataPlanejada: HOJE,
    criadaEm: '2026-11-10T12:00:00.000Z',
    ...dados,
  };
}

const ids = (lista: { id: string }[]) => lista.map((t) => t.id);

describe('Recomendação das tarefas do dia (HU13)', () => {
  describe('quais tarefas entram', () => {
    it('entram as planejadas para hoje e para dias anteriores; as planejadas para depois ficam de fora', () => {
      const deHoje = tarefa({ dataPlanejada: HOJE });
      const atrasada = tarefa({ dataPlanejada: '2026-11-12' });
      const amanha = tarefa({ dataPlanejada: '2026-11-16' });

      const { tarefas } = recomendar([amanha, deHoje, atrasada], 2, HOJE);

      expect(ids(tarefas).sort()).toEqual([deHoje.id, atrasada.id].sort());
    });

    it('sem tarefas, a lista do dia fica vazia', () => {
      expect(recomendar([], 2, HOJE).tarefas).toEqual([]);
    });
  });

  describe('disposição considerada', () => {
    it('usa a disposição do registro do dia', () => {
      const alta = tarefa({ energia: 3 });

      const recomendacao = recomendar([alta], 3, HOJE);

      expect(recomendacao).toMatchObject({
        hoje: HOJE,
        disposicao: 3,
        disposicaoAssumida: false,
      });
      // Com a média assumida, ela iria para o grupo 3.
      expect(recomendacao.tarefas[0]?.grupo).toBe(2);
      // E com disposição baixa, uma tarefa média passa do grupo 2 para o 3.
      expect(
        recomendar([tarefa({ energia: 2 })], 1, HOJE).tarefas[0]?.grupo,
      ).toBe(3);
    });

    it('sem registro no dia, assume disposição média', () => {
      const media = tarefa({ energia: 2 });
      const alta = tarefa({ energia: 3 });

      const recomendacao = recomendar([alta, media], null, HOJE);

      expect(recomendacao.disposicao).toBe(2);
      expect(recomendacao.disposicaoAssumida).toBe(true);
      expect(recomendacao.tarefas.map((t) => [t.id, t.grupo])).toEqual([
        [media.id, 2],
        [alta.id, 3],
      ]);
    });
  });

  describe('grupos', () => {
    it('prazo hoje ou vencido vai para o grupo 1, mesmo acima da disposição', () => {
      const vencida = tarefa({ prazo: '2026-11-14', energia: 3 });
      const venceHoje = tarefa({ prazo: HOJE, energia: 1 });

      const { tarefas } = recomendar([venceHoje, vencida], 1, HOJE);

      expect(tarefas.map((t) => [t.id, t.grupo, t.avisoAdiamento])).toEqual([
        [vencida.id, 1, true],
        [venceHoje.id, 1, false],
      ]);
    });

    it('tarefa atrasada (planejada para um dia anterior) com prazo à frente não é urgente', () => {
      const atrasada = tarefa({
        dataPlanejada: '2026-11-12',
        prazo: '2026-11-20',
        energia: 3,
      });

      const { tarefas } = recomendar([atrasada], 2, HOJE);

      expect(tarefas[0]).toMatchObject({ grupo: 3, avisoAdiamento: false });
    });

    it('energia necessária igual ou menor que a disposição vai para o grupo 2', () => {
      const igual = tarefa({ energia: 2 });
      const menor = tarefa({ energia: 1 });

      const { tarefas } = recomendar([igual, menor], 2, HOJE);

      expect(tarefas.map((t) => t.grupo)).toEqual([2, 2]);
    });

    it('energia necessária acima da disposição vai para o grupo 3', () => {
      const { tarefas } = recomendar([tarefa({ energia: 3 })], 2, HOJE);
      expect(tarefas[0]?.grupo).toBe(3);
    });

    it('os grupos vêm na ordem 1, 2, 3, mesmo com prioridade maior num grupo de baixo', () => {
      const grupo3 = tarefa({ energia: 3, prioridade: 3, prazo: '2026-11-16' });
      const grupo2 = tarefa({ energia: 1, prioridade: 1, prazo: '2026-11-29' });
      const grupo1 = tarefa({ energia: 3, prioridade: 1, prazo: HOJE });

      const { tarefas } = recomendar([grupo3, grupo2, grupo1], 2, HOJE);

      expect(ids(tarefas)).toEqual([grupo1.id, grupo2.id, grupo3.id]);
    });
  });

  describe('dentro do grupo, vale a primeira diferença', () => {
    it('prazo mais próximo primeiro, antes da prioridade', () => {
      const depois = tarefa({ prazo: '2026-11-20', prioridade: 3 });
      const antes = tarefa({ prazo: '2026-11-18', prioridade: 1 });

      const { tarefas } = recomendar([depois, antes], 2, HOJE);

      expect(ids(tarefas)).toEqual([antes.id, depois.id]);
    });

    // Decisão da equipe em 15/11/2026, a validar com a cliente: entre as
    // vencidas, a que venceu há mais tempo vem primeiro.
    it('no grupo 1, a tarefa vencida há mais tempo vem primeiro', () => {
      const venceHoje = tarefa({ prazo: HOJE });
      const venceuOntem = tarefa({ prazo: '2026-11-14' });
      const venceuAntes = tarefa({ prazo: '2026-11-10' });

      const { tarefas } = recomendar(
        [venceHoje, venceuOntem, venceuAntes],
        2,
        HOJE,
      );

      expect(ids(tarefas)).toEqual([
        venceuAntes.id,
        venceuOntem.id,
        venceHoje.id,
      ]);
    });

    it('com o mesmo prazo, prioridade maior primeiro, antes da energia', () => {
      const baixa = tarefa({ prioridade: 1, energia: 1 });
      const alta = tarefa({ prioridade: 3, energia: 2 });
      const media = tarefa({ prioridade: 2, energia: 1 });

      const { tarefas } = recomendar([baixa, alta, media], 2, HOJE);

      expect(ids(tarefas)).toEqual([alta.id, media.id, baixa.id]);
    });

    it('com o mesmo prazo e prioridade, energia necessária menor primeiro', () => {
      const media = tarefa({ energia: 2 });
      const baixa = tarefa({ energia: 1 });

      const { tarefas } = recomendar([media, baixa], 3, HOJE);

      expect(ids(tarefas)).toEqual([baixa.id, media.id]);
    });

    it('com prazo, prioridade e energia iguais, o cadastro mais antigo primeiro', () => {
      const nova = tarefa({ criadaEm: '2026-11-14T09:00:00.000Z' });
      const antiga = tarefa({ criadaEm: '2026-11-02T09:00:00.000Z' });

      const { tarefas } = recomendar([nova, antiga], 2, HOJE);

      expect(ids(tarefas)).toEqual([antiga.id, nova.id]);
    });

    it.each([
      ['prazo', { prazo: '2026-11-20' }, { prazo: '2026-11-18' }],
      ['prioridade', { prioridade: 1 }, { prioridade: 3 }],
      ['energia', { energia: 2 }, { energia: 1 }],
    ] as const)(
      'o cadastro mais antigo só desempata depois de %s',
      (_criterio, perde: Partial<Tarefa>, ganha: Partial<Tarefa>) => {
        const antiga = tarefa({
          criadaEm: '2026-11-02T09:00:00.000Z',
          ...perde,
        });
        const recente = tarefa({
          criadaEm: '2026-11-14T09:00:00.000Z',
          ...ganha,
        });

        const { tarefas } = recomendar([antiga, recente], 3, HOJE);

        expect(ids(tarefas)).toEqual([recente.id, antiga.id]);
      },
    );
  });

  describe('aviso sem cobrança', () => {
    it('tarefa urgente acima da disposição avisa que pode ser adiada', () => {
      // Energia média e disposição baixa: com a média assumida, não haveria aviso.
      const { tarefas } = recomendar(
        [tarefa({ prazo: HOJE, energia: 2 })],
        1,
        HOJE,
      );
      expect(tarefas[0]).toMatchObject({ grupo: 1, avisoAdiamento: true });
    });

    it('tarefa urgente dentro da disposição não tem aviso', () => {
      const { tarefas } = recomendar(
        [tarefa({ prazo: HOJE, energia: 2 })],
        2,
        HOJE,
      );
      expect(tarefas[0]).toMatchObject({ grupo: 1, avisoAdiamento: false });
    });

    it('tarefa do grupo 3 não tem aviso, porque não é urgente', () => {
      const { tarefas } = recomendar([tarefa({ energia: 3 })], 1, HOJE);
      expect(tarefas[0]).toMatchObject({ grupo: 3, avisoAdiamento: false });
    });
  });

  it('devolve a tarefa inteira, sem mudar prazo nem data planejada, e não mexe na lista recebida', () => {
    const original = tarefa({
      prazo: '2026-11-14',
      dataPlanejada: '2026-11-13',
      duracaoMinutos: 45,
    });
    const outra = tarefa();
    const lista = [outra, original];
    const copia = structuredClone(lista);

    const { tarefas } = recomendar(lista, 2, HOJE);

    expect(tarefas[0]).toEqual({
      ...original,
      grupo: 1,
      avisoAdiamento: false,
    });
    expect(lista).toEqual(copia);
  });
});
