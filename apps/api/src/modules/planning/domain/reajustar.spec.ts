import type { Tarefa } from '@mindcycle/shared';
import {
  passagemDeHoje,
  planoDoDia,
  reajustar,
  type Mudanca,
  type MovimentacaoReajuste,
} from './reajustar.js';

// Um caso por regra de negócio da HU15 (issue #84).
const ONTEM = '2026-11-14';
const HOJE = '2026-11-15';
const AMANHA = '2026-11-16';

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
    concluidaEm: null,
    ...dados,
  };
}

function passagem(
  da: Tarefa,
  dados: Partial<MovimentacaoReajuste> = {},
): MovimentacaoReajuste {
  sequencia += 1;
  return {
    id: `m${sequencia}`,
    tarefaId: da.id,
    dataAnterior: HOJE,
    dataNova: AMANHA,
    desfeita: false,
    devolvida: false,
    ...dados,
  };
}

/** O banco em miniatura: guarda o que o service gravaria. */
class Dia {
  constructor(
    public tarefas: Tarefa[],
    public movimentacoes: MovimentacaoReajuste[] = [],
  ) {}

  /** Faz o que o service faz a cada pedido do plano do dia. */
  reajustar(disposicao: 1 | 2 | 3 | null): Mudanca[] {
    const mudancas = reajustar(
      this.tarefas,
      disposicao,
      HOJE,
      this.movimentacoes,
    );
    for (const mudanca of mudancas) {
      this.mudarData(mudanca.tarefa.id, mudanca.para);
      if (mudanca.tipo === 'mover') {
        this.movimentacoes.push(
          passagem(mudanca.tarefa, {
            dataAnterior: mudanca.tarefa.dataPlanejada,
            dataNova: mudanca.para,
          }),
        );
      } else {
        this.marcar(mudanca.movimentacaoId, { devolvida: true });
      }
    }
    return mudancas;
  }

  /** O desfazer da usuária, como o service faz. */
  desfazer(id: string): void {
    const atual = this.tarefa(id);
    const vigente = passagemDeHoje(atual, this.movimentacoes, HOJE);
    if (!vigente) throw new Error('sem passagem para desfazer');
    this.mudarData(id, vigente.dataAnterior);
    this.marcar(vigente.id, { desfeita: true });
  }

  /** O adiamento da HU18: muda a data sem passagem do reajuste. */
  adiar(id: string, para: string): void {
    this.mudarData(id, para);
  }

  /** A edição da HU16: muda os dados da tarefa, não a data planejada. */
  editar(id: string, dados: Partial<Tarefa>): void {
    this.tarefas = this.tarefas.map((t) => (t.id === id ? { ...t, ...dados } : t));
  }

  tarefa(id: string): Tarefa {
    const achada = this.tarefas.find((t) => t.id === id);
    if (!achada) throw new Error(id);
    return achada;
  }

  plano(disposicao: 1 | 2 | 3 | null) {
    return planoDoDia(this.tarefas, disposicao, HOJE, this.movimentacoes);
  }

  private mudarData(id: string, dataPlanejada: string) {
    this.tarefas = this.tarefas.map((t) =>
      t.id === id ? { ...t, dataPlanejada } : t,
    );
  }

  private marcar(id: string, dados: Partial<MovimentacaoReajuste>) {
    this.movimentacoes = this.movimentacoes.map((m) =>
      m.id === id ? { ...m, ...dados } : m,
    );
  }
}

const ids = (lista: { id: string }[]) => lista.map((t) => t.id);

describe('Reajuste da recomendação do dia (HU15)', () => {
  describe('quais tarefas passam para o dia seguinte', () => {
    it('energia acima da disposição e prazo depois de hoje: passa para amanhã', () => {
      const pesada = tarefa({ energia: 3 });

      expect(reajustar([pesada], 2, HOJE, [])).toEqual([
        { tipo: 'mover', tarefa: pesada, para: AMANHA },
      ]);
    });

    it('energia igual ou menor que a disposição fica no dia', () => {
      const igual = tarefa({ energia: 2 });
      const menor = tarefa({ energia: 1 });

      expect(reajustar([igual, menor], 2, HOJE, [])).toEqual([]);
    });

    it('com disposição baixa, a média também passa; com alta, nenhuma passa', () => {
      const media = tarefa({ energia: 2 });
      const alta = tarefa({ energia: 3 });

      expect(ids(reajustar([media, alta], 1, HOJE, []).map((m) => m.tarefa))).toEqual([
        media.id,
        alta.id,
      ]);
      expect(reajustar([media, alta], 3, HOJE, [])).toEqual([]);
    });

    it('sem registro de disposição no dia, nada se move', () => {
      expect(reajustar([tarefa({ energia: 3 })], null, HOJE, [])).toEqual([]);
    });

    it('a atrasada (planejada antes de hoje) com prazo à frente também passa para amanhã', () => {
      const atrasada = tarefa({ energia: 3, dataPlanejada: '2026-11-10' });

      expect(reajustar([atrasada], 2, HOJE, [])).toEqual([
        { tipo: 'mover', tarefa: atrasada, para: AMANHA },
      ]);
    });

    it('a planejada para amanhã por outro motivo não é tocada', () => {
      const adiada = tarefa({ energia: 3, dataPlanejada: AMANHA });

      expect(reajustar([adiada], 1, HOJE, [])).toEqual([]);
    });
  });

  describe('o prazo nunca muda', () => {
    it('a mudança só leva a data planejada; a tarefa movida mantém o prazo', () => {
      const dia = new Dia([tarefa({ energia: 3, prazo: '2026-11-20' })]);

      const [mudanca] = dia.reajustar(2);

      expect(Object.keys(mudanca ?? {}).sort()).toEqual(['para', 'tarefa', 'tipo']);
      expect(dia.plano(2).movidas).toMatchObject([
        { prazo: '2026-11-20', dataPlanejada: AMANHA },
      ]);
    });

    it('com prazo amanhã, a nova data é o próprio prazo, nunca depois', () => {
      const venceAmanha = tarefa({ energia: 3, prazo: AMANHA });

      expect(reajustar([venceAmanha], 1, HOJE, [])).toEqual([
        { tipo: 'mover', tarefa: venceAmanha, para: AMANHA },
      ]);
    });
  });

  describe('prazo hoje ou vencido nunca sai do dia', () => {
    it.each([
      ['vence hoje', HOJE, HOJE],
      ['venceu ontem', ONTEM, HOJE],
      ['venceu há dias', '2026-11-01', HOJE],
      ['atrasada que vence hoje', HOJE, '2026-11-10'],
      ['atrasada vencida', ONTEM, '2026-11-10'],
    ])('%s: fica, mesmo acima da disposição, com o aviso sem cobrança', (_caso, prazo, dataPlanejada) => {
      const urgente = tarefa({ energia: 3, prazo, dataPlanejada });
      const dia = new Dia([urgente]);

      expect(dia.reajustar(1)).toEqual([]);
      expect(dia.plano(1).tarefas).toMatchObject([
        { id: urgente.id, grupo: 1, avisoAdiamento: true },
      ]);
    });
  });

  describe('desfazer no mesmo dia', () => {
    it('a desfeita volta para a data anterior e não sai de novo, nem com a disposição mais baixa', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(2);

      dia.desfazer(pesada.id);

      expect(dia.tarefa(pesada.id).dataPlanejada).toBe(HOJE);
      expect(dia.reajustar(2)).toEqual([]);
      expect(dia.reajustar(1)).toEqual([]);
      expect(ids(dia.plano(1).tarefas)).toEqual([pesada.id]);
      expect(dia.plano(1).movidas).toEqual([]);
    });

    it('a atrasada desfeita volta para o dia em que estava planejada', () => {
      const atrasada = tarefa({ energia: 3, dataPlanejada: '2026-11-10' });
      const dia = new Dia([atrasada]);
      dia.reajustar(1);

      dia.desfazer(atrasada.id);

      expect(dia.tarefa(atrasada.id).dataPlanejada).toBe('2026-11-10');
    });

    it('desfazer uma tarefa não protege as outras', () => {
      const a = tarefa({ energia: 3 });
      const b = tarefa({ energia: 3 });
      const dia = new Dia([a, b]);
      dia.reajustar(2);

      dia.desfazer(a.id);

      expect(ids(dia.plano(2).tarefas)).toEqual([a.id]);
      expect(ids(dia.plano(2).movidas)).toEqual([b.id]);
    });

    it('a desfeita ontem pode sair hoje: a regra vale só para o dia', () => {
      const pesada = tarefa({ energia: 3 });
      const deOntem = passagem(pesada, {
        dataAnterior: ONTEM,
        dataNova: HOJE,
        desfeita: true,
      });

      expect(reajustar([pesada], 2, HOJE, [deOntem])).toEqual([
        { tipo: 'mover', tarefa: pesada, para: AMANHA },
      ]);
    });

    it('só a passagem vigente pode ser desfeita', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(2);
      dia.desfazer(pesada.id);

      expect(() => dia.desfazer(pesada.id)).toThrow();
    });
  });

  describe('quando a disposição sobe no mesmo dia', () => {
    it('as movidas hoje pelo reajuste que agora cabem voltam para a data anterior', () => {
      const media = tarefa({ energia: 2 });
      const alta = tarefa({ energia: 3 });
      const dia = new Dia([media, alta]);
      dia.reajustar(1);

      const mudancas = dia.reajustar(2);

      expect(mudancas).toEqual([
        {
          tipo: 'devolver',
          tarefa: { ...media, dataPlanejada: AMANHA },
          para: HOJE,
          movimentacaoId: expect.any(String),
        },
      ]);
      expect(ids(dia.plano(2).tarefas)).toEqual([media.id]);
      expect(ids(dia.plano(2).movidas)).toEqual([alta.id]);
    });

    it('a atrasada volta para o dia em que estava planejada', () => {
      const atrasada = tarefa({ energia: 3, dataPlanejada: '2026-11-10' });
      const dia = new Dia([atrasada]);
      dia.reajustar(1);
      dia.reajustar(3);

      expect(dia.tarefa(atrasada.id).dataPlanejada).toBe('2026-11-10');
    });

    it('a adiada pela usuária (HU18) não volta', () => {
      const adiada = tarefa({ energia: 3, dataPlanejada: AMANHA });
      const dia = new Dia([adiada]);

      expect(dia.reajustar(3)).toEqual([]);
      expect(dia.tarefa(adiada.id).dataPlanejada).toBe(AMANHA);
    });

    it('a movida pelo reajuste e depois adiada pela usuária não volta', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(2);
      dia.adiar(pesada.id, '2026-11-18');

      expect(dia.reajustar(3)).toEqual([]);
      expect(dia.tarefa(pesada.id).dataPlanejada).toBe('2026-11-18');
      expect(dia.plano(3).movidas).toEqual([]);
    });

    it('a que voltou e depois foi adiada pela usuária para amanhã não volta de novo', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(2);
      dia.reajustar(3);
      dia.adiar(pesada.id, AMANHA);

      expect(dia.reajustar(3)).toEqual([]);
      expect(dia.tarefa(pesada.id).dataPlanejada).toBe(AMANHA);
    });

    it('a passagem de ontem (que veio para hoje) não conta como de hoje', () => {
      const pesada = tarefa({ energia: 3 });
      const deOntem = passagem(pesada, { dataAnterior: ONTEM, dataNova: HOJE });

      expect(reajustar([pesada], 3, HOJE, [deOntem])).toEqual([]);
      expect(planoDoDia([pesada], 3, HOJE, [deOntem]).movidas).toEqual([]);
      expect(reajustar([pesada], 1, HOJE, [deOntem])).toEqual([
        { tipo: 'mover', tarefa: pesada, para: AMANHA },
      ]);
    });

    it('a desfeita e depois adiada pela usuária para amanhã não volta nem aparece entre as movidas', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(2);
      dia.desfazer(pesada.id);
      dia.adiar(pesada.id, AMANHA);

      expect(dia.reajustar(3)).toEqual([]);
      expect(dia.plano(3).movidas).toEqual([]);
      expect(() => dia.desfazer(pesada.id)).toThrow();
      expect(dia.tarefa(pesada.id).dataPlanejada).toBe(AMANHA);
    });

    it('a movida cujo prazo passou a ser hoje (edição da HU16) volta, mesmo sem caber', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(1);
      dia.editar(pesada.id, { prazo: HOJE });

      expect(dia.reajustar(1)).toMatchObject([
        { tipo: 'devolver', para: HOJE },
      ]);
      expect(dia.plano(1).tarefas).toMatchObject([
        { id: pesada.id, grupo: 1, avisoAdiamento: true },
      ]);
      expect(dia.plano(1).movidas).toEqual([]);
    });

    it('sobe e desce de novo: a que voltou pode sair outra vez', () => {
      const pesada = tarefa({ energia: 3 });
      const dia = new Dia([pesada]);
      dia.reajustar(2);
      dia.reajustar(3);

      expect(dia.reajustar(2)).toMatchObject([{ tipo: 'mover' }]);
      expect(ids(dia.plano(2).movidas)).toEqual([pesada.id]);
    });
  });

  describe('idempotência', () => {
    it('reajustar de novo com a mesma disposição não muda nada', () => {
      const dia = new Dia([
        tarefa({ energia: 3 }),
        tarefa({ energia: 2 }),
        tarefa({ energia: 3, prazo: HOJE }),
      ]);
      dia.reajustar(1);
      const depois = structuredClone(dia);

      expect(dia.reajustar(1)).toEqual([]);
      expect(dia.tarefas).toEqual(depois.tarefas);
      expect(dia.movimentacoes).toEqual(depois.movimentacoes);
    });

    it('depois da volta, reajustar de novo não muda nada', () => {
      const dia = new Dia([tarefa({ energia: 2 }), tarefa({ energia: 3 })]);
      dia.reajustar(1);
      dia.reajustar(2);

      expect(dia.reajustar(2)).toEqual([]);
    });

    it('não mexe nas listas recebidas', () => {
      const lista = [tarefa({ energia: 3 })];
      const movimentacoes = [passagem(tarefa(), { dataNova: HOJE })];
      const copia = structuredClone([lista, movimentacoes]);

      reajustar(lista, 1, HOJE, movimentacoes);
      planoDoDia(lista, 1, HOJE, movimentacoes);

      expect([lista, movimentacoes]).toEqual(copia);
    });
  });

  describe('a lista do dia depois do reajuste', () => {
    it('é recalculada com as regras de ordem da HU13', () => {
      const pesada = tarefa({ energia: 3, prioridade: 3 });
      const urgente = tarefa({ energia: 3, prazo: HOJE });
      const leve = tarefa({ energia: 1, prazo: '2026-11-18' });
      const media = tarefa({ energia: 2, prazo: '2026-11-17' });
      const dia = new Dia([pesada, leve, media, urgente]);
      dia.reajustar(2);

      const plano = dia.plano(2);

      expect(plano.tarefas.map((t) => [t.id, t.grupo])).toEqual([
        [urgente.id, 1],
        [media.id, 2],
        [leve.id, 2],
      ]);
      expect(ids(plano.movidas)).toEqual([pesada.id]);
    });

    it('as movidas vêm na ordem dos desempates da HU13 e inteiras', () => {
      const depois = tarefa({ energia: 3, prazo: '2026-11-25' });
      const antes = tarefa({ energia: 3, prazo: '2026-11-20', duracaoMinutos: 30 });
      const dia = new Dia([depois, antes]);
      dia.reajustar(2);

      expect(dia.plano(2).movidas).toEqual([
        { ...antes, dataPlanejada: AMANHA },
        { ...depois, dataPlanejada: AMANHA },
      ]);
    });

    it('sem contador nem cobrança: o plano só tem a lista, a disposição e as movidas', () => {
      const dia = new Dia([tarefa({ energia: 3 }), tarefa({ energia: 3 })]);
      dia.reajustar(1);
      dia.reajustar(3);
      dia.reajustar(1);

      expect(Object.keys(dia.plano(1)).sort()).toEqual([
        'disposicao',
        'disposicaoAssumida',
        'hoje',
        'movidas',
        'tarefas',
      ]);
    });
  });
});
