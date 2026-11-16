import { CodigoErro, type Fase, type PraticaAcolhimento, type Sintoma } from '@mindcycle/shared';

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
    consultar: 'Termos de uso',
    versao: (versao: string) => `Versão ${versao}`,
    voltar: 'Voltar à conta',
    carregando: 'Carregando os termos...',
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
  // HU04
  checkin: {
    titulo: 'Como você está agora?',
    subtitulo: 'Registre quando quiser. Se algo mudar no dia, é só fazer outro registro.',
    carregando: 'Carregando seu registro de hoje...',
    disposicao: {
      rotulo: 'Sua disposição',
      niveis: { 1: 'Baixa', 2: 'Média', 3: 'Alta' },
    },
    sintomas: {
      rotulo: 'O que você está sentindo?',
      dica: 'Um toque marca como leve. Toque de novo para moderada, intensa ou para desmarcar.',
      semSintomas: 'Sem sintomas',
      semSintomasDica: 'Marque se não está sentindo nenhum sintoma agora.',
      // Lista provisória: a cliente ainda vai revisá-la (reunião de 05/10).
      nomes: {
        colica: 'Cólica',
        dor_de_cabeca: 'Dor de cabeça',
        dor_nas_costas: 'Dor nas costas',
        sensibilidade_nos_seios: 'Sensibilidade nos seios',
        inchaco: 'Inchaço',
        nausea: 'Enjoo',
        acne: 'Acne',
        cansaco: 'Cansaço',
        desanimo: 'Desânimo',
        irritabilidade: 'Irritabilidade',
        ansiedade: 'Ansiedade',
        alteracao_do_sono: 'Alteração do sono',
        dificuldade_de_concentracao: 'Dificuldade de concentração',
      } satisfies Record<Sintoma, string>,
      intensidades: { 1: 'leve', 2: 'moderada', 3: 'intensa' },
      // Dito pelo leitor de tela depois de cada toque no sintoma.
      anuncio: (nome: string, intensidade?: string) =>
        intensidade ? `${nome}, ${intensidade}` : `${nome}, desmarcado`,
    },
    registrar: 'Registrar',
    salvarCorrecao: 'Salvar correção',
    cancelar: 'Cancelar',
    disposicaoVazia: 'Escolha como está a sua disposição para registrar.',
    sintomasVazios: 'Marque o que está sentindo ou toque em "Sem sintomas".',
    registrado: 'Registro salvo. Obrigada por se escutar.',
    corrigido: 'Registro corrigido.',
    hoje: {
      titulo: 'Seu registro de hoje',
      registradoAs: (hora: string) => `Registrado às ${hora}`,
      corrigir: 'Corrigir este registro',
      novo: 'Fazer um novo registro',
      verRegistros: 'Meus registros',
    },
    resumo: {
      disposicao: (nivel: string) => `Disposição: ${nivel.toLowerCase()}`,
      semSintomas: 'Sem sintomas',
      sintoma: (nome: string, intensidade: string) => `${nome} (${intensidade})`,
    },
    corrigirTela: {
      titulo: 'Corrigir registro',
      subtitulo: 'Ajuste o que mudou. O horário do registro continua o mesmo.',
      voltar: 'Voltar',
    },
    registros: {
      titulo: 'Meus registros',
      subtitulo: 'Seus registros mais recentes, do último para o primeiro.',
      carregando: 'Carregando seus registros...',
      vazio: 'Você ainda não fez nenhum registro. Quando quiser, ele aparece aqui.',
      data: (data: string, hora: string) => `${data} às ${hora}`,
      corrigir: 'Corrigir',
      rotuloCorrigir: (data: string, hora: string) => `Corrigir o registro de ${data} às ${hora}`,
      voltar: 'Voltar',
    },
  },
  ciclo: {
    carregando: 'Carregando seu ciclo...',
    dataInvalida: 'Confira a data: use o formato dia/mês/ano, como 15/11/2026.',
    formatoData: 'DD/MM/AAAA',
    duracao: {
      rotulo: 'Quantos dias seu ciclo costuma durar',
      dias: (dias: number) => `${dias} dias`,
      vazio: 'Toque em − ou + para escolher',
      diminuir: 'Diminuir um dia',
      aumentar: 'Aumentar um dia',
      irregular: 'Meu ciclo é irregular',
    },
    // HU06 e HU07 juntas: aparece enquanto o ciclo não foi informado.
    formulario: {
      titulo: 'Sobre o seu ciclo',
      subtitulo: 'Essas informações ficam só com você e ajudam a entender o seu ritmo.',
      inicio: 'Quando começou sua última menstruação?',
      botao: 'Salvar meu ciclo',
      faltaData: 'Informe quando começou sua última menstruação, no formato dia/mês/ano.',
      faltaDuracao: 'Escolha quantos dias seu ciclo costuma durar, ou marque que ele é irregular.',
    },
    // Depois de informado: a tela do protótipo, que HU05 e HU10 completam.
    seuCiclo: {
      titulo: 'Seu ciclo',
      ultimoInicio: (data: string) => `Sua última menstruação começou em ${data}.`,
      duracao: (dias: number) => `Seu ciclo costuma durar cerca de ${dias} dias.`,
      irregular: 'Você indicou que seu ciclo é irregular.',
      comecou: 'Minha menstruação começou',
      registradoHoje: 'Início de hoje registrado.',
      editar: 'Editar meu ciclo',
    },
    editar: {
      titulo: 'Editar meu ciclo',
      voltar: 'Voltar',
    },
    caracteristicas: {
      titulo: 'Duração do ciclo',
      botao: 'Salvar duração',
      salvo: 'Duração salva.',
    },
    inicio: {
      titulo: 'Registrar outro início',
      rotulo: 'Data de início (dia/mês/ano)',
      botao: 'Registrar início',
      registrado: (data: string) => `Início de ${data} registrado.`,
    },
    historico: {
      titulo: 'Inícios registrados',
      vazio: 'Nenhum início registrado ainda.',
      remover: 'Remover',
      rotuloRemover: (data: string) => `Remover o início de ${data}`,
    },
    // HU28. Rascunho da equipe, a revisar com a Dra. Cláudia.
    fases: {
      titulo: 'Fases do ciclo',
      introducao:
        'O ciclo vai do primeiro dia de uma menstruação até a véspera da próxima. Costuma durar de 21 a 35 dias e passa por quatro fases.',
      dica: 'Toque em uma fase para saber mais.',
      rotuloAcessivel: (nome: string) => `Fase ${nome.toLowerCase()}`,
      tituloModal: (nome: string) => `Fase ${nome.toLowerCase()}`,
      dicaAcessivel: 'Abre a explicação da fase',
      quando: 'Quando acontece',
      corpo: 'O que acontece no corpo',
      sentir: 'Como costuma ser',
      nota: 'Cada corpo tem o seu ritmo: as durações são aproximadas e podem mudar de um ciclo para outro.',
      fechar: 'Fechar',
      porFase: {
        menstrual: {
          nome: 'Menstrual',
          quando: 'Do primeiro dia da menstruação até ela terminar, em geral de 3 a 7 dias.',
          corpo:
            'O revestimento do útero, preparado no ciclo anterior, se desprende e sai como menstruação. Os hormônios estrogênio e progesterona estão no nível mais baixo do ciclo.',
          sentir:
            'Cólica, cansaço e menos disposição são comuns. Ir com mais calma nesses dias faz parte do ritmo.',
        },
        folicular: {
          nome: 'Folicular',
          quando:
            'Do fim da menstruação até a ovulação. Num ciclo de 28 dias, vai até por volta do 13º dia.',
          corpo:
            'O estrogênio sobe aos poucos enquanto um folículo amadurece no ovário, e o útero volta a se preparar.',
          sentir: 'Muitas pessoas sentem a energia e a concentração voltando.',
        },
        ovulatoria: {
          nome: 'Ovulatória',
          quando: 'Poucos dias no meio do ciclo. Num ciclo de 28 dias, por volta do 14º dia.',
          corpo:
            'O ovário libera um óvulo. O estrogênio chega ao ponto mais alto e o hormônio LH tem um pico.',
          sentir:
            'É comum ter mais disposição e vontade de conversar. Algumas pessoas sentem uma dor leve em um dos lados da barriga.',
        },
        lutea: {
          nome: 'Lútea',
          quando: 'Da ovulação até a próxima menstruação, em geral por cerca de 14 dias.',
          corpo:
            'A progesterona sobe para manter o útero preparado. Sem gravidez, os hormônios caem no fim da fase e a menstruação começa.',
          sentir:
            'Perto do fim da fase podem aparecer cansaço, inchaço, sensibilidade nos seios e irritabilidade. Tudo bem precisar de mais pausas.',
        },
      } satisfies Record<Fase, { nome: string; quando: string; corpo: string; sentir: string }>,
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
      dataPlanejada: (data: string) => `Planejada para ${data}`,
      prazo: (data: string) => `Prazo: ${data}`,
      prioridade: (nivel: string) => `Prioridade ${nivel.toLowerCase()}`,
      energia: (nivel: string) => `Energia ${nivel.toLowerCase()}`,
      duracao: (minutos: number) => `Cerca de ${duracaoPorExtenso(minutos)}`,
    },
    niveis: { 1: 'Baixa', 2: 'Média', 3: 'Alta' },
    adiamento: {
      abrir: 'Adiar',
      rotuloAbrir: (titulo: string) => `Adiar a tarefa ${titulo}`,
      campoData: 'Nova data (dia/mês/ano)',
      formatoData: 'DD/MM/AAAA',
      salvar: 'Confirmar nova data',
      cancelar: 'Cancelar',
      dataInvalida: 'Confira a data: use o formato dia/mês/ano.',
      confirmado: (data: string) => `Tarefa planejada para ${data}.`,
    },
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
    // Sobrou para a HU22, que ainda não entrou. Fica no rodapé: anunciar no topo
    // o que ainda não existe empurra para baixo o que já funciona.
    emBreve: 'Em breve, mensagens de cuidado aparecem aqui.',
    // HU21. Convite, nunca cobrança: a usuária não "deve" nada à aba. O convite
    // nomeia a seção e abre a tela numa linha só, para as práticas virem logo;
    // o que é contexto, e não conteúdo, desceu para o rodapé.
    sugestoes: {
      convite: 'Práticas para hoje, se fizerem sentido agora. Nada aqui é tarefa.',
      rodape: 'As sugestões mudam a cada dia. Nada fica registrado.',
      carregando: 'Carregando as sugestões de hoje...',
      vazio: 'Hoje não há sugestões.',
      duracao: (minutos: number) => duracaoPorExtenso(minutos),
      // Lido pelo leitor de tela: o nome sozinho não diz quanto tempo leva.
      rotuloAcessivel: (nome: string, minutos: number) =>
        `${nome}, ${duracaoPorExtenso(minutos)}`,
      // Lista provisória, junto com PRATICAS_ACOLHIMENTO: a cliente ainda vai
      // entregar as práticas dela. Convites curtos, sem recomendação de saúde.
      nomes: {
        respiracao_lenta: 'Respiração lenta',
        alongamento_curto: 'Alongamento curto',
        pausa_sem_tela: 'Pausa sem tela',
        beber_agua: 'Um copo de água',
        caminhada_curta: 'Caminhada curta',
        musica_calma: 'Música calma',
        anotar_tres_coisas: 'Anotar três coisas',
        compressa_morna: 'Compressa morna',
      } satisfies Record<PraticaAcolhimento, string>,
      comoFazer: {
        respiracao_lenta: 'Inspire contando até quatro e solte contando até seis.',
        alongamento_curto: 'Alongue ombros, pescoço e costas, sem forçar.',
        pausa_sem_tela: 'Deixe o celular de lado e olhe para longe um pouco.',
        beber_agua: 'Beba devagar, sem fazer outra coisa ao mesmo tempo.',
        caminhada_curta: 'Dê uma volta curta, na rua ou dentro de casa.',
        musica_calma: 'Escolha uma música que te acalme e ouça até o fim.',
        anotar_tres_coisas: 'Escreva três coisas boas de hoje, mesmo pequenas.',
        compressa_morna: 'Deixe uma bolsa ou toalha morna onde o corpo pedir.',
      } satisfies Record<PraticaAcolhimento, string>,
    },
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
  // HU11, RNF09
  pin: {
    progresso: (toques: number, total: number) => `${toques} de ${total}`,
    petalas: {
      flor: 'Flor com 6 pétalas',
      petala: (numero: number) => `Pétala ${numero}`,
      apagar: 'Apagar último toque',
    },
    numerico: {
      teclado: 'Teclado numérico',
      digito: (digito: number) => `Dígito ${digito}`,
      apagar: 'Apagar último dígito',
    },
    tipos: {
      numerico: {
        nome: 'PIN numérico',
        descricao: 'Quatro dígitos, de 0 a 9, num teclado.',
      },
      petalas: {
        nome: 'Flor de pétalas',
        descricao: 'Quatro toques nas pétalas de uma flor.',
      },
    },
    trava: {
      titulo: 'Digite seu PIN',
      subtitulo: {
        numerico: 'Digite os 4 dígitos do seu PIN.',
        petalas: 'Toque nas pétalas da sua sequência.',
      },
      esqueci: 'Esqueci meu PIN',
      esqueciDica: 'Você volta a entrar com e-mail e senha e pode trocar o PIN.',
    },
    senhaIncorreta: 'A senha não confere. Confira e tente de novo.',
    definir: {
      tituloNovo: 'Proteger com PIN',
      tituloTroca: 'Trocar PIN ou tipo',
      tipo: 'Escolha o tipo de PIN',
      tipoSubtitulo: 'Você pode mudar de tipo quando quiser, na aba Conta.',
      continuar: 'Continuar',
      senhaSubtitulo: 'Para sua segurança, confirme a senha da conta.',
      senha: 'Senha da conta',
      escolher: 'Escolha seu PIN',
      escolherSubtitulo: {
        numerico: 'Digite 4 dígitos. Você pode repetir um dígito.',
        petalas: 'Toque em 4 pétalas. Você pode repetir uma pétala.',
      },
      confirmar: 'Confirme seu PIN',
      confirmarSubtitulo: 'Repita o mesmo PIN.',
      diferente: 'Os dois PINs não são iguais. Vamos escolher de novo.',
      cancelar: 'Agora não',
    },
    conta: {
      semPin: 'Peça uma trava extra para abrir o app.',
      tipoAtual: {
        numerico: 'PIN: numérico',
        petalas: 'PIN: flor de pétalas',
      },
      proteger: 'Proteger com PIN',
      trocar: 'Trocar PIN ou tipo',
      remover: 'Remover PIN',
      removerSubtitulo: 'Confirme a senha da conta para remover o PIN.',
      confirmarRemocao: 'Remover PIN',
      cancelar: 'Cancelar',
    },
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
    [CodigoErro.DataAdiamentoInvalida]:
      'Escolha uma data posterior ao dia planejado, a partir de hoje.',
    [CodigoErro.TarefaConcluida]: 'Essa tarefa já foi concluída. Sua lista será atualizada.',
    [CodigoErro.TarefaAlterada]:
      'Essa tarefa mudou enquanto você escolhia a data. Atualize a lista e tente de novo.',
    [CodigoErro.PinIncorreto]:
      'Essa sequência não confere. Respire e tente de novo quando quiser.',
    [CodigoErro.PinBloqueado]:
      'Vamos fazer uma pausa. Tente de novo em alguns minutos ou entre com seu e-mail e senha.',
    [CodigoErro.PinNaoDefinido]:
      'Sua conta não tem PIN. Você pode criar um na aba Conta.',
    validacao: 'Confira os campos destacados.',
    generico: 'Algo não saiu como esperado. Tente de novo em instantes.',
  },
} as const;
