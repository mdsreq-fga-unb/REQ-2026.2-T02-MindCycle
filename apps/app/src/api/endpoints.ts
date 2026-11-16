import type {
  AdiamentoTarefaDto,
  AtualizacaoContaDto,
  CadastroDto,
  CadastroTarefaDto,
  Checkin,
  CheckinsDoDia,
  Ciclo,
  ConfirmacaoRecuperacaoDto,
  DefinicaoPinDto,
  EntradaDto,
  ExclusaoContaDto,
  InicioMenstruacao,
  PedidoRecuperacaoDto,
  PerfilCiclo,
  PerfilCicloDto,
  Pin,
  RecomendacaoReajustada,
  RegistroCheckinDto,
  SugestoesDoDia,
  Tarefa,
  Termos,
  Tokens,
  Usuaria,
} from '@mindcycle/shared';

import { pedir } from './cliente';

export const api = {
  cadastrar: (dados: CadastroDto) =>
    pedir<Tokens>('/auth/cadastro', { metodo: 'POST', corpo: dados, publica: true }),
  entrar: (dados: EntradaDto) =>
    pedir<Tokens>('/auth/entrada', { metodo: 'POST', corpo: dados, publica: true }),
  pedirRecuperacao: (dados: PedidoRecuperacaoDto) =>
    pedir<void>('/auth/recuperacao', { metodo: 'POST', corpo: dados, publica: true }),
  confirmarRecuperacao: (dados: ConfirmacaoRecuperacaoDto) =>
    pedir<Tokens>('/auth/recuperacao/confirmacao', {
      metodo: 'POST',
      corpo: dados,
      publica: true,
    }),
  sair: (refreshToken: string) =>
    pedir<void>('/auth/saida', { metodo: 'POST', corpo: { refreshToken }, publica: true }),
  conta: () => pedir<Usuaria>('/conta'),
  atualizarConta: (dados: AtualizacaoContaDto) =>
    pedir<Usuaria>('/conta', { metodo: 'PATCH', corpo: dados }),
  excluirConta: (dados: ExclusaoContaDto) =>
    pedir<void>('/conta/exclusao', { metodo: 'POST', corpo: dados }),
  definirPin: (dados: DefinicaoPinDto) =>
    pedir<void>('/conta/pin', { metodo: 'PUT', corpo: dados }),
  removerPin: (senha: string) =>
    pedir<void>('/conta/pin', { metodo: 'DELETE', corpo: { senha } }),
  verificarPin: (pin: Pin) =>
    pedir<void>('/conta/pin/verificacao', { metodo: 'POST', corpo: { pin } }),
  termos: () => pedir<Termos>('/termos', { publica: true }),
  aceitarTermos: (versao: string) =>
    pedir<void>('/termos/aceite', { metodo: 'POST', corpo: { versao } }),
  ciclo: () => pedir<Ciclo>('/ciclo'),
  registrarInicio: (data: string) =>
    pedir<InicioMenstruacao>('/ciclo/inicios', { metodo: 'POST', corpo: { data } }),
  removerInicio: (id: string) => pedir<void>(`/ciclo/inicios/${id}`, { metodo: 'DELETE' }),
  informarPerfil: (dados: PerfilCicloDto) =>
    pedir<PerfilCiclo>('/ciclo/perfil', { metodo: 'PUT', corpo: dados }),
  tarefas: () => pedir<Tarefa[]>('/tarefas'),
  cadastrarTarefa: (dados: CadastroTarefaDto) =>
    pedir<Tarefa>('/tarefas', { metodo: 'POST', corpo: dados }),
  checkinsDeHoje: () => pedir<CheckinsDoDia>('/checkins/hoje'),
  historicoCheckins: () => pedir<Checkin[]>('/checkins'),
  registrarCheckin: (dados: RegistroCheckinDto) =>
    pedir<Checkin>('/checkins', { metodo: 'POST', corpo: dados }),
  sugestoesAcolhimento: () => pedir<SugestoesDoDia>('/acolhimento/sugestoes'),
  corrigirCheckin: (id: string, dados: RegistroCheckinDto) =>
    pedir<Checkin>(`/checkins/${id}`, { metodo: 'PUT', corpo: dados }),
  adiarTarefa: (id: string, dados: AdiamentoTarefaDto) =>
    pedir<Tarefa>(`/tarefas/${id}/adiamento`, {
      metodo: 'PATCH',
      corpo: dados,
    }),
  recomendacaoDoDia: () => pedir<RecomendacaoReajustada>('/planejamento/hoje'),
  desfazerReajuste: (tarefaId: string) =>
    pedir<RecomendacaoReajustada>(
      `/planejamento/hoje/movidas/${tarefaId}/desfazimento`,
      { metodo: 'POST' },
    ),
};
