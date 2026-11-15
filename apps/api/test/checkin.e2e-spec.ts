import { randomUUID } from 'node:crypto';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { CodigoErro } from '@mindcycle/shared';
import { TERMOS } from '../src/modules/consent/termos.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Check-in: sintomas e disposição (HU04)', () => {
  let app: INestApplication<App>;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, onde as contas de teste estão.
  const relogio = new RelogioFixo(new Date('2026-11-15T02:30:00Z'));
  const HOJE = '2026-11-14';

  beforeAll(async () => {
    app = await criarApp({ relogio });
  });

  afterAll(async () => {
    await app.close();
  });

  const servidor = () => app.getHttpServer();

  const colicaECansaco = {
    disposicao: 1,
    semSintomas: false,
    sintomas: [
      { sintoma: 'cansaco', intensidade: 2 },
      { sintoma: 'colica', intensidade: 3 },
    ],
  };
  const semSintomas = { disposicao: 3, semSintomas: true, sintomas: [] };

  async function novaConta({ aceitar = true } = {}) {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) =>
      req.auth(accessToken, { type: 'bearer' });
    if (aceitar) {
      await auth(request(servidor()).post('/termos/aceite'))
        .send({ versao: TERMOS.versao })
        .expect(204);
    }
    const { body } = await auth(request(servidor()).get('/conta')).expect(200);
    return {
      id: body.id as string,
      registrar: (dados: unknown) =>
        auth(request(servidor()).post('/checkins')).send(dados as object),
      corrigir: (id: string, dados: unknown) =>
        auth(request(servidor()).put(`/checkins/${id}`)).send(dados as object),
      hoje: () => auth(request(servidor()).get('/checkins/hoje')),
      historico: (consulta = '') =>
        auth(request(servidor()).get(`/checkins${consulta}`)),
    };
  }

  describe('registro', () => {
    it('registra sintomas com intensidade e disposição, no dia da usuária', async () => {
      const conta = await novaConta();
      const { body } = await conta.registrar(colicaECansaco).expect(201);
      expect(body).toEqual({
        id: expect.any(String),
        dataLocal: HOJE,
        criadoEm: expect.any(String),
        atualizadoEm: expect.any(String),
        disposicao: 1,
        semSintomas: false,
        // Na ordem da lista de sintomas, não na do envio.
        sintomas: [
          { sintoma: 'colica', intensidade: 3 },
          { sintoma: 'cansaco', intensidade: 2 },
        ],
        origem: 'registro',
      });
    });

    it('registra "sem sintomas" com a disposição', async () => {
      const conta = await novaConta();
      const { body } = await conta.registrar(semSintomas).expect(201);
      expect(body).toMatchObject({
        disposicao: 3,
        semSintomas: true,
        sintomas: [],
      });
    });

    it('usa o hoje da usuária, não o de UTC, na virada do dia', async () => {
      const conta = await novaConta();
      try {
        // 02:59 UTC de 15/11: ainda 14/11 em São Paulo.
        relogio.ajustar(new Date('2026-11-15T02:59:00Z'));
        const antes = await conta.registrar(semSintomas).expect(201);
        expect(antes.body.dataLocal).toBe('2026-11-14');

        // 03:00 UTC: já é 15/11 em São Paulo (e continua sendo em UTC).
        relogio.ajustar(new Date('2026-11-15T03:00:00Z'));
        const depois = await conta.registrar(semSintomas).expect(201);
        expect(depois.body.dataLocal).toBe('2026-11-15');

        // O "hoje" mudou: só o segundo registro vale agora.
        const { body } = await conta.hoje().expect(200);
        expect(body.registros.map((c: { id: string }) => c.id)).toEqual([
          depois.body.id,
        ]);
      } finally {
        relogio.ajustar(new Date('2026-11-15T02:30:00Z'));
      }
    });

    it.each([
      [
        'sem sintomas junto com sintomas',
        { semSintomas: true, sintomas: [{ sintoma: 'colica', intensidade: 1 }] },
      ],
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
      [
        'sintoma fora da lista',
        { semSintomas: false, sintomas: [{ sintoma: 'febre', intensidade: 1 }] },
      ],
      [
        'sintoma sem intensidade',
        { semSintomas: false, sintomas: [{ sintoma: 'colica' }] },
      ],
      [
        'intensidade 0',
        { semSintomas: false, sintomas: [{ sintoma: 'colica', intensidade: 0 }] },
      ],
      [
        'intensidade 4',
        { semSintomas: false, sintomas: [{ sintoma: 'colica', intensidade: 4 }] },
      ],
      ['disposição ausente', { disposicao: undefined }],
      ['disposição 0', { disposicao: 0 }],
      ['disposição 4', { disposicao: 4 }],
      ['"sem sintomas" ausente', { semSintomas: undefined }],
    ])('recusa o registro com %s', async (_caso, alteracao) => {
      const conta = await novaConta();
      await conta
        .registrar({ ...colicaECansaco, ...alteracao })
        .expect(400);
      const { body } = await conta.historico().expect(200);
      expect(body).toEqual([]);
    });

    it('exige sessão', async () => {
      await request(servidor()).post('/checkins').send(semSintomas).expect(401);
      await request(servidor()).get('/checkins/hoje').expect(401);
      await request(servidor()).get('/checkins').expect(401);
    });
  });

  describe('vigente do dia e histórico', () => {
    it('sem registro hoje, não há vigente', async () => {
      const conta = await novaConta();
      const { body } = await conta.hoje().expect(200);
      expect(body).toEqual({ vigente: null, registros: [] });
    });

    it('com dois registros no mesmo dia, o mais recente é o vigente e os dois aparecem', async () => {
      const conta = await novaConta();
      const primeiro = await conta.registrar(colicaECansaco).expect(201);
      const segundo = await conta.registrar(semSintomas).expect(201);

      const { body } = await conta.hoje().expect(200);
      expect(body.vigente.id).toBe(segundo.body.id);
      expect(body.registros.map((c: { id: string }) => c.id)).toEqual([
        segundo.body.id,
        primeiro.body.id,
      ]);
    });

    it('o registro de ontem fica fora de hoje e aparece no histórico', async () => {
      const conta = await novaConta();
      try {
        relogio.ajustar(new Date('2026-11-14T15:00:00Z'));
        const ontem = await conta.registrar(colicaECansaco).expect(201);
        expect(ontem.body.dataLocal).toBe('2026-11-14');

        relogio.ajustar(new Date('2026-11-15T15:00:00Z'));
        const hoje = await conta.registrar(semSintomas).expect(201);
        expect(hoje.body.dataLocal).toBe('2026-11-15');

        const doDia = await conta.hoje().expect(200);
        expect(doDia.body.registros.map((c: { id: string }) => c.id)).toEqual([
          hoje.body.id,
        ]);
        const historico = await conta.historico().expect(200);
        expect(historico.body.map((c: { id: string }) => c.id)).toEqual([
          hoje.body.id,
          ontem.body.id,
        ]);
      } finally {
        relogio.ajustar(new Date('2026-11-15T02:30:00Z'));
      }
    });

    it('limita o histórico, do mais recente para o mais antigo', async () => {
      const conta = await novaConta();
      const criados = [];
      for (let i = 0; i < 3; i++) {
        criados.push((await conta.registrar(semSintomas).expect(201)).body.id);
      }

      const { body } = await conta.historico('?limite=2').expect(200);
      expect(body.map((c: { id: string }) => c.id)).toEqual([
        criados[2],
        criados[1],
      ]);
      const todos = await conta.historico().expect(200);
      expect(todos.body).toHaveLength(3);
    });

    it.each(['0', '-1', '101', 'abc', '1.5'])(
      'recusa o limite %s',
      async (limite) => {
        const conta = await novaConta();
        await conta.historico(`?limite=${limite}`).expect(400);
      },
    );

    it('aceita o limite máximo', async () => {
      const conta = await novaConta();
      await conta.historico('?limite=100').expect(200);
    });
  });

  describe('correção', () => {
    it('troca o conteúdo sem duplicar nem mudar o id e o instante de criação', async () => {
      const conta = await novaConta();
      const prisma = app.get(PrismaService);
      const criado = await conta.registrar(colicaECansaco).expect(201);

      const { body } = await conta
        .corrigir(criado.body.id, {
          disposicao: 2,
          semSintomas: false,
          // "colica" repete de propósito: a troca não pode esbarrar na unicidade.
          sintomas: [
            { sintoma: 'colica', intensidade: 1 },
            { sintoma: 'desanimo', intensidade: 2 },
          ],
        })
        .expect(200);

      expect(body).toMatchObject({
        id: criado.body.id,
        criadoEm: criado.body.criadoEm,
        dataLocal: HOJE,
        disposicao: 2,
        semSintomas: false,
        sintomas: [
          { sintoma: 'colica', intensidade: 1 },
          { sintoma: 'desanimo', intensidade: 2 },
        ],
      });
      expect(new Date(body.atualizadoEm).getTime()).toBeGreaterThan(
        new Date(criado.body.atualizadoEm).getTime(),
      );

      const { body: doDia } = await conta.hoje().expect(200);
      expect(doDia.registros).toEqual([body]);
      // O sintoma antigo (cansaço) não sobra.
      expect(
        await prisma.checkinSintoma.count({
          where: { checkinId: criado.body.id },
        }),
      ).toBe(2);
      expect(
        await prisma.checkinSintoma.count({
          where: { checkinId: criado.body.id, sintoma: 'cansaco' },
        }),
      ).toBe(0);
    });

    it('troca sintomas por "sem sintomas" e o contrário', async () => {
      const conta = await novaConta();
      const criado = await conta.registrar(colicaECansaco).expect(201);

      const semSint = await conta
        .corrigir(criado.body.id, semSintomas)
        .expect(200);
      expect(semSint.body).toMatchObject({ semSintomas: true, sintomas: [] });

      const comSint = await conta
        .corrigir(criado.body.id, colicaECansaco)
        .expect(200);
      expect(comSint.body.sintomas).toHaveLength(2);
    });

    it('corrigir um registro anterior não muda o vigente', async () => {
      const conta = await novaConta();
      const primeiro = await conta.registrar(colicaECansaco).expect(201);
      const segundo = await conta.registrar(semSintomas).expect(201);

      await conta.corrigir(primeiro.body.id, semSintomas).expect(200);

      const { body } = await conta.hoje().expect(200);
      expect(body.vigente.id).toBe(segundo.body.id);
      expect(body.registros).toHaveLength(2);
    });

    it.each([
      ['sem sintomas junto com sintomas', { semSintomas: true }],
      ['nenhum sintoma', { sintomas: [] }],
      ['disposição 4', { disposicao: 4 }],
    ])('recusa a correção com %s e não muda nada', async (_caso, alteracao) => {
      const conta = await novaConta();
      const criado = await conta.registrar(colicaECansaco).expect(201);
      await conta
        .corrigir(criado.body.id, { ...colicaECansaco, ...alteracao })
        .expect(400);
      const { body } = await conta.hoje().expect(200);
      expect(body.registros).toEqual([criado.body]);
    });

    it('responde 404 para um registro que não existe', async () => {
      const conta = await novaConta();
      const { body } = await conta
        .corrigir(randomUUID(), semSintomas)
        .expect(404);
      expect(body.codigo).toBe(CodigoErro.NaoEncontrado);
    });

    it('responde 400 para um id que não é uuid', async () => {
      const conta = await novaConta();
      await conta.corrigir('nao-e-uuid', semSintomas).expect(400);
    });
  });

  describe('RNF02: termos aceitos', () => {
    it('sem o aceite, POST e PUT respondem 403 e nada é gravado', async () => {
      const prisma = app.get(PrismaService);
      const comAceite = await novaConta();
      const criado = await comAceite.registrar(colicaECansaco).expect(201);
      const semAceite = await novaConta({ aceitar: false });

      const post = await semAceite.registrar(semSintomas).expect(403);
      expect(post.body.codigo).toBe(CodigoErro.ConsentimentoPendente);
      expect(
        await prisma.checkin.count({ where: { usuariaId: semAceite.id } }),
      ).toBe(0);

      // Nem o registro de outra conta muda: o guard barra antes de olhar o id.
      const put = await semAceite
        .corrigir(criado.body.id, semSintomas)
        .expect(403);
      expect(put.body.codigo).toBe(CodigoErro.ConsentimentoPendente);
      const { body } = await comAceite.hoje().expect(200);
      expect(body.registros).toEqual([criado.body]);
    });

    it('sem o aceite, o PUT no próprio registro também é barrado', async () => {
      const prisma = app.get(PrismaService);
      const conta = await novaConta({ aceitar: false });
      // Um registro de quando os termos estavam aceitos e foram revogados (HU36).
      const antigo = await prisma.checkin.create({
        data: {
          usuariaId: conta.id,
          dataLocal: new Date(`${HOJE}T00:00:00Z`),
          disposicao: 1,
          semSintomas: true,
        },
      });

      const { body } = await conta.corrigir(antigo.id, colicaECansaco).expect(403);
      expect(body.codigo).toBe(CodigoErro.ConsentimentoPendente);
      const depois = await prisma.checkin.findUniqueOrThrow({
        where: { id: antigo.id },
        include: { sintomas: true },
      });
      expect(depois).toMatchObject({ disposicao: 1, semSintomas: true, sintomas: [] });
    });

    it('sem o aceite, a leitura dos próprios registros continua', async () => {
      const conta = await novaConta({ aceitar: false });
      await conta.hoje().expect(200);
      await conta.historico().expect(200);
    });
  });

  describe('RNF03: acesso exclusivo da usuária', () => {
    it('nega a correção do registro de outra conta e nada muda', async () => {
      const dona = await novaConta();
      const outra = await novaConta();
      const criado = await dona.registrar(colicaECansaco).expect(201);

      const { body } = await outra
        .corrigir(criado.body.id, semSintomas)
        .expect(403);
      expect(body.codigo).toBe(CodigoErro.AcessoNegado);

      const doDia = await dona.hoje().expect(200);
      expect(doDia.body.registros).toEqual([criado.body]);
    });

    it('os GETs de uma conta não mostram os registros da outra', async () => {
      const ana = await novaConta();
      const bia = await novaConta();
      const daAna = await ana.registrar(colicaECansaco).expect(201);
      const daBia = await bia.registrar(semSintomas).expect(201);

      const hojeAna = await ana.hoje().expect(200);
      expect(hojeAna.body.registros.map((c: { id: string }) => c.id)).toEqual([
        daAna.body.id,
      ]);
      const histBia = await bia.historico().expect(200);
      expect(histBia.body.map((c: { id: string }) => c.id)).toEqual([
        daBia.body.id,
      ]);
    });
  });

  it('apaga registros e sintomas junto com a usuária', async () => {
    const conta = await novaConta();
    const prisma = app.get(PrismaService);
    const criado = await conta.registrar(colicaECansaco).expect(201);
    await conta.registrar(semSintomas).expect(201);
    const checkinId = criado.body.id as string;
    expect(await prisma.checkin.count({ where: { usuariaId: conta.id } })).toBe(
      2,
    );
    expect(await prisma.checkinSintoma.count({ where: { checkinId } })).toBe(2);

    await prisma.usuaria.delete({ where: { id: conta.id } });
    expect(await prisma.checkin.count({ where: { usuariaId: conta.id } })).toBe(
      0,
    );
    expect(await prisma.checkinSintoma.count({ where: { checkinId } })).toBe(0);
  });
});
