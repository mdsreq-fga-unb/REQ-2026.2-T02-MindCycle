import { CodigoErro } from '@mindcycle/shared';

function duracaoPorExtenso(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas === 0) {
    return `${resto} min`;
  }
  return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`;
}

// Todo texto exibido à usuária mora aqui, para a revisão de linguagem
// acolhedora do DoD (critério 5): sem cobrança, culpa ou contador de falhas.
export const textos = {
  marca: {
    nome: 'MindCycle',
    slogan: 'Produtividade no ritmo do seu ciclo.',
  },
  entrar: {
    titulo: 'Que bom te ver',
    email: 'E-mail',
    senha: 'Senha',
    botao: 'Entrar',
    esqueciSenha: 'Esqueci minha senha',
    irParaCadastro: 'Ainda não tem conta? Criar conta',
  },
  // HU26
  recuperar: {
    titulo: 'Vamos recuperar seu acesso',
    subtitulo:
      'Tudo bem, acontece. Enviamos um código para o seu e-mail e você escolhe uma nova senha. Seu histórico continua aqui.',
    email: 'E-mail',
    enviarCodigo: 'Enviar código',
    tituloCodigo: 'Confira seu e-mail',
    codigoEnviado: (email: string) =>
      `Enviamos um código para ${email}, se ele estiver cadastrado.`,
    codigo: 'Código de 6 dígitos',
    novaSenha: 'Nova senha (mínimo de 8 caracteres)',
    redefinir: 'Redefinir senha',
    reenviar: 'Reenviar código',
    reenviado:
      'Pedido feito. O código pode levar um minutinho para chegar; olhe também o spam.',
    voltar: 'Voltar',
  },
  cadastro: {
    titulo: 'Criar sua conta',
    subtitulo: 'Seu histórico fica só com você.',
    email: 'E-mail',
    senha: 'Senha (mínimo de 8 caracteres)',
    botao: 'Criar conta',
    irParaEntrar: 'Já tem conta? Entrar',
  },
  termos: {
    titulo: 'Antes de começar',
    subtitulo:
      'Leia como seus dados são usados. Nada é registrado antes do seu aceite.',
    botao: 'Li e aceito',
    sair: 'Agora não, sair',
  },
  abas: {
    hoje: 'Hoje',
    ciclo: 'Ciclo',
    tarefas: 'Tarefas',
    acolhimento: 'Acolhimento',
    conta: 'Conta',
  },
  hoje: {
    titulo: 'Hoje',
    emBreve: 'Em breve, suas tarefas do dia aparecem aqui.',
  },
  ciclo: {
    titulo: 'Meu ciclo',
    subtitulo: 'Essas informações ficam só com você e ajudam a entender o seu ritmo.',
    carregando: 'Carregando seu ciclo...',
    inicio: {
      titulo: 'Início da menstruação',
      rotulo: 'Data de início (dia/mês/ano)',
      formato: 'DD/MM/AAAA',
      botao: 'Registrar início',
      dataInvalida: 'Confira a data: use o formato dia/mês/ano, como 15/11/2026.',
      registrado: (data: string) => `Início de ${data} registrado.`,
    },
    historico: {
      titulo: 'Inícios registrados',
      vazio: 'Nenhum início registrado ainda.',
      remover: 'Remover',
      rotuloRemover: (data: string) => `Remover o início de ${data}`,
    },
    caracteristicas: {
      titulo: 'Características do ciclo',
      duracao: 'Duração média do ciclo (em dias)',
      irregular: 'Meu ciclo é irregular',
      botao: 'Salvar',
      duracaoInvalida: (minimo: number, maximo: number) =>
        `Informe a duração em dias, entre ${minimo} e ${maximo}.`,
      salvo: 'Informação salva.',
    },
  },
  tarefas: {
    titulo: 'Tarefas',
    carregando: 'Carregando suas tarefas...',
    novaTarefa: 'Nova tarefa',
    vazio: {
      titulo: 'Sua lista está livre por enquanto',
      texto: 'Quando quiser, adicione uma tarefa e ela entra no seu planejamento.',
    },
    item: {
      prazo: (data: string) => `Prazo: ${data}`,
      prioridade: (nivel: string) => `Prioridade ${nivel.toLowerCase()}`,
      energia: (nivel: string) => `Energia ${nivel.toLowerCase()}`,
      duracao: (minutos: number) => `Cerca de ${duracaoPorExtenso(minutos)}`,
    },
    niveis: { 1: 'Baixa', 2: 'Média', 3: 'Alta' },
    nova: {
      titulo: 'Nova tarefa',
      subtitulo: 'Conte o que precisa ser feito e quanto esforço isso pede.',
      campoTitulo: 'O que precisa ser feito?',
      campoPrazo: 'Prazo (dia/mês/ano)',
      formatoPrazo: 'DD/MM/AAAA',
      campoPrioridade: 'Prioridade',
      campoEnergia: 'Energia necessária',
      campoDuracao: 'Duração estimada em minutos (opcional)',
      botao: 'Salvar tarefa',
      cancelar: 'Cancelar',
      tituloVazio: 'Dê um nome para a tarefa.',
      prazoInvalido: 'Confira o prazo: use o formato dia/mês/ano, como 15/11/2026.',
      prioridadeVazia: 'Escolha a prioridade da tarefa.',
      energiaVazia: 'Escolha a energia que a tarefa pede.',
      duracaoInvalida: (minimo: number, maximo: number) =>
        `Se for informar a duração, use minutos inteiros, entre ${minimo} e ${maximo}.`,
    },
  },
  acolhimento: {
    titulo: 'Acolhimento',
    emBreve: 'Em breve, mensagens e práticas de cuidado aparecem aqui.',
  },
  conta: {
    titulo: 'Sua conta',
    email: (email: string) => `Conta: ${email}`,
    sair: 'Sair',
    excluir: 'Excluir minha conta',
  },
  excluirConta: {
    titulo: 'Excluir minha conta',
    intro:
      'Entendemos se você quer ir embora, e a decisão é sua. Antes de confirmar, veja o que acontece:',
    apagado: [
      'Seu ciclo e os registros dele',
      'Seus sintomas e a sua disposição de cada dia',
      'Suas tarefas',
      'O aceite dos termos de uso, que fica revogado',
      'Seu e-mail e sua senha: a conta deixa de existir',
    ],
    semVolta:
      'Não há como desfazer. Depois de excluir, nada pode ser recuperado, nem por nós. Se quiser voltar um dia, será com uma conta nova, sem histórico.',
    senha: 'Sua senha, para confirmar que é você',
    senhaIncorreta: 'Essa senha não confere. Confira e tente de novo.',
    confirmar: 'Excluir tudo definitivamente',
    voltar: 'Voltar, quero manter minha conta',
  },
  conexao: {
    titulo: 'Não conseguimos conectar',
    texto: 'Verifique sua internet e tente de novo quando quiser.',
    tentarDeNovo: 'Tentar de novo',
  },
  erros: {
    [CodigoErro.CredenciaisInvalidas]:
      'E-mail ou senha não conferem. Confira e tente de novo.',
    [CodigoErro.EmailJaCadastrado]:
      'Já existe uma conta com esse e-mail. Que tal entrar?',
    [CodigoErro.ConsentimentoPendente]:
      'Para registrar seus dados, aceite os termos de uso.',
    [CodigoErro.VersaoTermosDesatualizada]:
      'Os termos foram atualizados. Leia a nova versão para continuar.',
    [CodigoErro.DataNoFuturo]:
      'Essa data ainda não chegou. Escolha hoje ou um dia que já passou.',
    [CodigoErro.AcessoNegado]: 'Você não tem acesso a esse registro.',
    [CodigoErro.NaoEncontrado]:
      'Não encontramos esse registro. Ele pode já ter sido removido.',
    [CodigoErro.CodigoRecuperacaoInvalido]:
      'Esse código não está valendo: ele pode ter vencido ou ter algum dígito diferente. Peça um novo código e tente de novo.',
    [CodigoErro.PrazoNoPassado]:
      'Esse prazo já passou. Escolha hoje ou um dia à frente.',
    validacao: 'Confira os campos destacados.',
    generico: 'Algo não saiu como esperado. Tente de novo em instantes.',
  },
} as const;
