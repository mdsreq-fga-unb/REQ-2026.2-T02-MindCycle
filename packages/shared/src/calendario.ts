import type { InicioMenstruacao, PerfilCiclo } from './ciclo.js';
import { diasEntre, somarDias, type DataLocal } from './datas.js';
import { faseDoDia, podeEstimar } from './estimador-de-fase.js';
import type { Fase } from './fases.js';

const doisDigitos = (n: number) => String(n).padStart(2, '0');

/**
 * As semanas do mês, de domingo a sábado, para o calendário da HU10. Dias de
 * outros meses viram null, para a grade ter sempre 7 colunas.
 */
export function gradeDoMes(ano: number, mes: number): (DataLocal | null)[][] {
  const primeiro: DataLocal = `${ano}-${doisDigitos(mes)}-01`;
  const diaDaSemana = new Date(`${primeiro}T00:00:00Z`).getUTCDay();
  const diasNoMes = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const dias: (DataLocal | null)[] = [
    ...Array<null>(diaDaSemana).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => somarDias(primeiro, i)),
  ];
  while (dias.length % 7 !== 0) {
    dias.push(null);
  }
  return Array.from({ length: dias.length / 7 }, (_, s) => dias.slice(s * 7, s * 7 + 7));
}

/**
 * HU10: a fase de cada dia no calendário. Um dia pertence ao ciclo do início
 * mais recente que não é posterior a ele. Se esse ciclo já fechou (há um início
 * depois), vale a duração real dele; no ciclo atual, a duração média informada.
 * Depois do fim da duração, sem estimativa possível (HU05) ou num ciclo fechado
 * fora da faixa do modelo, o dia fica sem fase: nunca há previsão do próximo.
 * Devolve uma função para os inícios serem ordenados uma vez só.
 */
export function fasesDoCalendario({
  inicios,
  perfil,
}: {
  inicios: InicioMenstruacao[];
  perfil: PerfilCiclo | null;
}): (data: DataLocal) => Fase | null {
  if (!podeEstimar(perfil) || perfil?.duracaoMedia == null) {
    return () => null;
  }
  const duracaoMedia = perfil.duracaoMedia;
  const datas = inicios.map((i) => i.data).sort();
  return (data) => {
    let i = -1;
    while (i + 1 < datas.length && datas[i + 1] <= data) {
      i++;
    }
    if (i < 0) {
      return null;
    }
    const proximo = datas[i + 1];
    const duracao = proximo ? diasEntre(datas[i], proximo) : duracaoMedia;
    return faseDoDia(diasEntre(datas[i], data) + 1, duracao);
  };
}

/** A fase de um único dia; para o mês inteiro, prefira fasesDoCalendario. */
export function faseNoCalendario(
  data: DataLocal,
  ciclo: { inicios: InicioMenstruacao[]; perfil: PerfilCiclo | null },
): Fase | null {
  return fasesDoCalendario(ciclo)(data);
}
