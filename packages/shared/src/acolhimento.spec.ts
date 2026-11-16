import { describe, expect, it } from 'vitest';
import {
  DURACAO_MAXIMA_PRATICA_MINUTOS,
  MENSAGENS_ACOLHIMENTO,
  PRATICAS_ACOLHIMENTO,
  SUGESTOES_POR_DIA,
  mensagemDoDia,
  sugestoesDoDia,
} from './acolhimento.js';
import { somarDias } from './datas.js';

describe('práticas de acolhimento', () => {
  // O critério de aceite da HU21: uma sugestão só vale se apresentar uma prática
  // BREVE. Este teste é o que impede a lista de crescer para fora do teto quando
  // a cliente entregar as práticas dela.
  it('mantém toda prática dentro do teto de duração', () => {
    for (const pratica of PRATICAS_ACOLHIMENTO) {
      expect(pratica.duracaoMinutos).toBeGreaterThanOrEqual(1);
      expect(pratica.duracaoMinutos).toBeLessThanOrEqual(DURACAO_MAXIMA_PRATICA_MINUTOS);
    }
  });

  it('não repete id na lista', () => {
    const ids = PRATICAS_ACOLHIMENTO.map((pratica) => pratica.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Dias seguidos só deixam de repetir enquanto a lista couber mais de uma janela.
  it('tem práticas suficientes para a janela do dia', () => {
    expect(PRATICAS_ACOLHIMENTO.length).toBeGreaterThan(SUGESTOES_POR_DIA);
  });
});

describe('sugestoesDoDia', () => {
  it('devolve a quantidade do dia, sem repetir prática', () => {
    const sugestoes = sugestoesDoDia('2026-11-15');
    expect(sugestoes).toHaveLength(SUGESTOES_POR_DIA);
    expect(new Set(sugestoes.map((s) => s.id)).size).toBe(SUGESTOES_POR_DIA);
  });

  it('dá sempre as mesmas sugestões para a mesma data', () => {
    expect(sugestoesDoDia('2026-11-15')).toEqual(sugestoesDoDia('2026-11-15'));
  });

  it('troca as sugestões de um dia para o outro', () => {
    const hoje = sugestoesDoDia('2026-11-15').map((s) => s.id);
    const amanha = sugestoesDoDia('2026-11-16').map((s) => s.id);
    expect(amanha).not.toEqual(hoje);
    // A janela anda inteira: nada de ontem reaparece hoje.
    expect(amanha.filter((id) => hoje.includes(id))).toEqual([]);
  });

  it('funciona antes da data de referência da rotação', () => {
    const sugestoes = sugestoesDoDia('2025-03-07');
    expect(sugestoes).toHaveLength(SUGESTOES_POR_DIA);
    expect(sugestoes.every((s) => s.duracaoMinutos > 0)).toBe(true);
  });

  it('percorre a lista inteira ao longo dos dias', () => {
    const vistas = new Set<string>();
    let data = '2026-11-15';
    // Uma janela por dia cobre a lista em, no máximo, tantos dias quanto práticas.
    for (let i = 0; i < PRATICAS_ACOLHIMENTO.length; i++) {
      for (const sugestao of sugestoesDoDia(data)) {
        vistas.add(sugestao.id);
      }
      data = somarDias(data, 1);
    }
    expect(vistas.size).toBe(PRATICAS_ACOLHIMENTO.length);
  });

  it('nunca pede mais sugestões do que a lista tem', () => {
    expect(sugestoesDoDia('2026-11-15', 99)).toHaveLength(PRATICAS_ACOLHIMENTO.length);
    expect(sugestoesDoDia('2026-11-15', 0)).toEqual([]);
  });
});

describe('mensagens de acolhimento (HU22)', () => {
  it('não repete id na lista', () => {
    expect(new Set(MENSAGENS_ACOLHIMENTO).size).toBe(MENSAGENS_ACOLHIMENTO.length);
  });

  it('devolve sempre um id válido da lista', () => {
    expect(MENSAGENS_ACOLHIMENTO).toContain(mensagemDoDia('2026-11-15'));
  });

  it('dá sempre a mesma mensagem para a mesma data', () => {
    expect(mensagemDoDia('2026-11-15')).toBe(mensagemDoDia('2026-11-15'));
  });

  it('troca a mensagem de um dia para o outro', () => {
    const hoje = mensagemDoDia('2026-11-15');
    const amanha = mensagemDoDia('2026-11-16');
    expect(amanha).not.toBe(hoje);
  });

  it('funciona antes da data de referência da rotação', () => {
    const antes = mensagemDoDia('2025-03-07');
    expect(MENSAGENS_ACOLHIMENTO).toContain(antes);
  });

  it('percorre toda a lista ao longo dos dias', () => {
    const vistas = new Set<string>();
    let data = '2026-11-15';
    for (let i = 0; i < MENSAGENS_ACOLHIMENTO.length; i++) {
      vistas.add(mensagemDoDia(data));
      data = somarDias(data, 1);
    }
    expect(vistas.size).toBe(MENSAGENS_ACOLHIMENTO.length);
  });
});
