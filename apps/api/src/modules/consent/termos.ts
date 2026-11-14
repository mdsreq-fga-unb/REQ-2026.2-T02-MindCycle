import type { Termos } from '@mindcycle/shared';

// HU12, RNF02: os termos descrevem a finalidade de cada tipo de dado.
// RASCUNHO da equipe: o texto precisa de revisão da cliente antes da homologação.
// Mudar o texto exige nova versão, e quem aceitou a anterior aceita de novo.
export const TERMOS: Termos = {
  versao: '2026-11-13',
  secoes: [
    {
      titulo: 'Quem trata seus dados',
      texto:
        'O MindCycle guarda seus dados apenas para organizar sua rotina. Eles são acessíveis somente por você: ninguém mais, nem gestores, tem acesso.',
    },
    {
      titulo: 'Conta',
      texto:
        'Seu e-mail e sua senha servem para você entrar na sua conta e recuperar o acesso. O fuso horário do aparelho define qual é o seu dia.',
    },
    {
      titulo: 'Ciclo menstrual',
      texto:
        'As datas de início da menstruação e a duração do ciclo servem para estimar a fase em que você está e mostrar conteúdos sobre ela.',
    },
    {
      titulo: 'Sintomas e disposição',
      texto:
        'Os sintomas, suas intensidades e sua disposição servem para ordenar e reajustar as tarefas do dia de acordo com a sua capacidade real.',
    },
    {
      titulo: 'Tarefas',
      texto:
        'Título, prazo, prioridade e energia necessária de cada tarefa servem para montar a recomendação do dia.',
    },
    {
      titulo: 'Seus direitos',
      texto:
        'Você pode excluir sua conta a qualquer momento. A exclusão apaga todos os seus dados e revoga este consentimento.',
    },
  ],
};
