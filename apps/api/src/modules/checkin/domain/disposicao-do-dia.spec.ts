import { disposicaoDoDia } from './disposicao-do-dia.js';

// Um caso por regra da HU02 (issue #85) sobre a disposição que vale no dia. Os
// eventos de outro dia nem chegam aqui: o service busca só os de hoje, e o e2e
// (test/sobrecarga.e2e-spec.ts) confere isso.
const as = (hora: string) => new Date(`2026-11-14T${hora}:00Z`);

describe('Disposição que vale no dia (HU02, HU15)', () => {
  it('sem registro nem sinalização no dia, não há disposição', () => {
    expect(disposicaoDoDia(null, null)).toBeNull();
  });

  it('só com o registro, vale a disposição dele', () => {
    expect(
      disposicaoDoDia({ disposicao: 3, criadoEm: as('09:00') }, null),
    ).toEqual({ disposicao: 3, origem: 'registro' });
  });

  it('só com a sinalização, vale disposição baixa', () => {
    expect(disposicaoDoDia(null, { criadoEm: as('09:00') })).toEqual({
      disposicao: 1,
      origem: 'sobrecarga',
    });
  });

  it.each([1, 2, 3] as const)(
    'a sinalização depois de um registro de disposição %i vale como baixa',
    (disposicao) => {
      expect(
        disposicaoDoDia(
          { disposicao, criadoEm: as('08:00') },
          { criadoEm: as('10:00') },
        ),
      ).toEqual({ disposicao: 1, origem: 'sobrecarga' });
    },
  );

  it('um registro depois da sinalização encerra o efeito dela', () => {
    expect(
      disposicaoDoDia(
        { disposicao: 3, criadoEm: as('11:00') },
        { criadoEm: as('10:00') },
      ),
    ).toEqual({ disposicao: 3, origem: 'registro' });
  });

  it('o registro posterior vale mesmo quando também é baixo', () => {
    expect(
      disposicaoDoDia(
        { disposicao: 1, criadoEm: as('11:00') },
        { criadoEm: as('10:00') },
      ),
    ).toEqual({ disposicao: 1, origem: 'registro' });
  });

  it('no mesmo instante, vale a sinalização', () => {
    expect(
      disposicaoDoDia(
        { disposicao: 3, criadoEm: as('10:00') },
        { criadoEm: as('10:00') },
      ),
    ).toEqual({ disposicao: 1, origem: 'sobrecarga' });
  });

  it('um milissegundo de diferença já decide pelo mais recente', () => {
    const registro = new Date('2026-11-14T10:00:00.001Z');
    const sinalizacao = new Date('2026-11-14T10:00:00.000Z');
    expect(
      disposicaoDoDia(
        { disposicao: 2, criadoEm: registro },
        { criadoEm: sinalizacao },
      ),
    ).toEqual({ disposicao: 2, origem: 'registro' });
  });
});
