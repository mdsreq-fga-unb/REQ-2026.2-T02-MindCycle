import { CodigoErro } from '@mindcycle/shared';

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
    irParaCadastro: 'Ainda não tem conta? Criar conta',
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
    titulo: 'Seu ciclo',
    emBreve: 'Em breve, você registra e acompanha seu ciclo aqui.',
  },
  tarefas: {
    titulo: 'Tarefas',
    emBreve: 'Em breve, você organiza suas tarefas aqui.',
  },
  acolhimento: {
    titulo: 'Acolhimento',
    emBreve: 'Em breve, mensagens e práticas de cuidado aparecem aqui.',
  },
  conta: {
    titulo: 'Sua conta',
    email: (email: string) => `Conta: ${email}`,
    sair: 'Sair',
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
    validacao: 'Confira os campos destacados.',
    generico: 'Algo não saiu como esperado. Tente de novo em instantes.',
  },
} as const;
