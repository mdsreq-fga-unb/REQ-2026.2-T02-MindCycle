import type { InicioMenstruacao, PerfilCiclo } from './ciclo.js';
import { diasEntre, somarDias, type DataLocal } from './datas.js';
import { faseDoDia } from './estimador-de-fase.js';
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
 * HU10: a fase de um dia no calendário, pela fase do ciclo que o contém, contado
 * a partir do início mais recente que não é posterior a ele. Depois do fim da
 * duração informada, ou sem estimativa possível (HU05), o dia fica sem fase.
 */
export function faseNoCalendario(
  data: DataLocal,
  { inicios, perfil }: { inicios: InicioMenstruacao[]; perfil: PerfilCiclo | null },
): Fase | null {
  if (!perfil || perfil.irregular || perfil.duracaoMedia === null) {
    return null;
  }
  const inicio = inicios
    .map((i) => i.data)
    .filter((d) => d <= data)
    .sort()
    .at(-1);
  if (!inicio) {
    return null;
  }
  return faseDoDia(diasEntre(inicio, data) + 1, perfil.duracaoMedia);
}
