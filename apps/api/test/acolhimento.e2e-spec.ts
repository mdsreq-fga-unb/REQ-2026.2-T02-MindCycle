import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import {
  DURACAO_MAXIMA_PRATICA_MINUTOS,
  PRATICAS_ACOLHIMENTO,
  SUGESTOES_POR_DIA,
  type SugestaoAcolhimento,
} from '@mindcycle/shared';
import { cadastrar, criarApp } from './app.js';
import { RelogioFixo } from './relogio-fixo.js';

describe('Acolhimento: sugestões de atividades (HU21)', () => {
  let app: INestApplication<App>;
  // 02:30 UTC de 15/11: ainda 14/11 em São Paulo, já 15/11 em Tóquio.
  const INSTANTE = new Date('2026-11-15T02:30:00Z');
  const relogio = new RelogioFixo(INSTANTE);
  const HOJE = '2026-11-14';

  const IDS = PRATICAS_ACOLHIMENTO.map((pratica) => pratica.id) as string[];

  beforeAll(async () => {
    app = await criarApp({ relogio });
  });

  afterEach(() => {
    // Um teste adianta o relógio: os outros contam com o instante de origem.
    relogio.ajustar(INSTANTE);
  });

  afterAll(async () => {
    await app.close();
  });

  const servidor = () => app.getHttpServer();

  async function novaConta() {
    const { accessToken } = await cadastrar(app);
    const auth = (req: request.Test) => req.auth(accessToken, { type: 'bearer' });
    return {
      sugestoes: () => auth(request(servidor()).get('/acolhimento/sugestoes')),
      mudarFuso: (fuso: string) =>
        auth(request(servidor()).patch('/conta')).send({ fuso }).expect(200),
    };
  }

  it('devolve as sugestões do dia da usuária', async () => {
    const conta = await novaConta();

    const { body } = await conta.sugestoes().expect(200);

    expect(body.dataLocal).toBe(HOJE);
    expect(body.sugestoes).toHaveLength(SUGESTOES_POR_DIA);
    for (const sugestao of body.sugestoes as SugestaoAcolhimento[]) {
      expect(IDS).toContain(sugestao.id);
    }
  });

  // O critério de aceite da história: toda sugestão apresenta uma prática breve.
  it('só sugere prática dentro do teto de duração', async () => {
    const conta = await novaConta();

    const { body } = await conta.sugestoes().expect(200);

    for (const sugestao of body.sugestoes as SugestaoAcolhimento[]) {
      expect(sugestao.duracaoMinutos).toBeGreaterThanOrEqual(1);
      expect(sugestao.duracaoMinutos).toBeLessThanOrEqual(
        DURACAO_MAXIMA_PRATICA_MINUTOS,
      );
    }
  });

  it('não repete prática nas sugestões do mesmo dia', async () => {
    const conta = await novaConta();

    const { body } = await conta.sugestoes().expect(200);

    const ids = (body.sugestoes as SugestaoAcolhimento[]).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('mantém as sugestões quando a usuária abre a aba de novo no mesmo dia', async () => {
    const conta = await novaConta();

    const primeira = await conta.sugestoes().expect(200);
    const segunda = await conta.sugestoes().expect(200);

    expect(segunda.body).toEqual(primeira.body);
  });

  it('troca as sugestões quando o dia da usuária vira', async () => {
    const conta = await novaConta();
    const hoje = await conta.sugestoes().expect(200);

    // 03:30 UTC de 16/11 já é 16/11 em São Paulo: dois dias depois de HOJE.
    relogio.ajustar(new Date('2026-11-16T03:30:00Z'));
    const outroDia = await conta.sugestoes().expect(200);

    expect(outroDia.body.dataLocal).not.toBe(hoje.body.dataLocal);
    expect(outroDia.body.sugestoes).not.toEqual(hoje.body.sugestoes);
  });

  // T2: o "hoje" é o do calendário da usuária, não o do servidor.
  it('dá a cada usuária o dia do fuso dela', async () => {
    const saoPaulo = await novaConta();
    const tokyo = await novaConta();
    await tokyo.mudarFuso('Asia/Tokyo');

    const daquiBody = (await saoPaulo.sugestoes().expect(200)).body;
    const deLaBody = (await tokyo.sugestoes().expect(200)).body;

    expect(daquiBody.dataLocal).toBe(HOJE);
    expect(deLaBody.dataLocal).toBe('2026-11-15');
    expect(deLaBody.sugestoes).not.toEqual(daquiBody.sugestoes);
  });

  it('recusa quem não está autenticada', async () => {
    await request(servidor()).get('/acolhimento/sugestoes').expect(401);
  });
});
