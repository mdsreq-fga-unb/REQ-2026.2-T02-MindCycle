import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasswordHasher } from '@nestjs/authentication';
import { Mailer } from '@nestjs/mail';
import {
  CodigoErro,
  TAMANHO_CODIGO_RECUPERACAO,
  type ConfirmacaoRecuperacaoDto,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { Relogio } from '../../common/relogio.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UsuariasRepository } from '../account/usuarias.repository.js';
import type { UsuariaAutenticada } from '../account/usuaria.js';

// HU26. Valores a validar com a equipe e a cliente.
export const RECUPERACAO_VALIDADE_MINUTOS = 15;
export const RECUPERACAO_MAX_TENTATIVAS = 5;
export const RECUPERACAO_REENVIO_SEGUNDOS = 60;

@Injectable()
export class RecuperacaoService {
  private readonly logger = new Logger(RecuperacaoService.name);

  constructor(
    private readonly usuarias: UsuariasRepository,
    private readonly hasher: PasswordHasher,
    private readonly prisma: PrismaService,
    private readonly mailer: Mailer,
    private readonly relogio: Relogio,
    private readonly config: ConfigService,
  ) {}

  /**
   * Gera e envia o código. Não devolve nada nem falha por causa do e-mail ou do
   * SMTP: quem chama responde sempre igual, e o tempo de resposta também não
   * muda, para não revelar quais e-mails estão cadastrados.
   */
  async solicitar(email: string): Promise<void> {
    const usuaria = await this.usuarias.buscarPorEmail(email);
    if (!usuaria) {
      return;
    }
    const agora = this.relogio.agora();

    const ultima = await this.prisma.recuperacaoAcesso.findFirst({
      where: { usuariaId: usuaria.id },
      orderBy: { criadoEm: 'desc' },
      select: { criadoEm: true },
    });
    if (
      ultima &&
      agora.getTime() - ultima.criadoEm.getTime() <
        RECUPERACAO_REENVIO_SEGUNDOS * 1000
    ) {
      return;
    }

    // Dígitos aleatórios com zeros à esquerda: "004821" é um código válido.
    const codigo = String(randomInt(10 ** TAMANHO_CODIGO_RECUPERACAO)).padStart(
      TAMANHO_CODIGO_RECUPERACAO,
      '0',
    );
    await this.prisma.$transaction([
      // Um código novo substitui o anterior: só o último e-mail vale.
      this.prisma.recuperacaoAcesso.updateMany({
        where: { usuariaId: usuaria.id, usadoEm: null, expiraEm: { gt: agora } },
        data: { expiraEm: agora },
      }),
      this.prisma.recuperacaoAcesso.create({
        data: {
          usuariaId: usuaria.id,
          codigoHash: this.hashDoCodigo(usuaria.id, codigo),
          criadoEm: agora,
          expiraEm: new Date(
            agora.getTime() + RECUPERACAO_VALIDADE_MINUTOS * 60_000,
          ),
        },
      }),
    ]);

    // Sem await: esperar o SMTP faria quem tem conta demorar mais para responder.
    void this.enviarEmail(usuaria.email, codigo);
  }

  /**
   * Troca a senha e encerra todas as sessões anteriores. Devolve a usuária para
   * quem chama emitir os tokens novos. Qualquer motivo de recusa vira o mesmo erro.
   */
  async confirmar({
    email,
    codigo,
    novaSenha,
  }: ConfirmacaoRecuperacaoDto): Promise<UsuariaAutenticada> {
    const usuaria = await this.usuarias.buscarPorEmail(email);
    if (!usuaria) {
      throw this.codigoInvalido();
    }
    const agora = this.relogio.agora();
    const vigente = {
      usuariaId: usuaria.id,
      usadoEm: null,
      expiraEm: { gt: agora },
      tentativas: { lt: RECUPERACAO_MAX_TENTATIVAS },
    };

    const recuperacao = await this.prisma.recuperacaoAcesso.findFirst({
      where: vigente,
      orderBy: { criadoEm: 'desc' },
    });
    if (!recuperacao) {
      throw this.codigoInvalido();
    }

    // A tentativa é contada antes de conferir o código, numa escrita condicional:
    // requisições em paralelo não ganham tentativas além do limite.
    const { count } = await this.prisma.recuperacaoAcesso.updateMany({
      where: { ...vigente, id: recuperacao.id },
      data: { tentativas: { increment: 1 } },
    });
    if (
      count !== 1 ||
      !this.confere(recuperacao.codigoHash, usuaria.id, codigo)
    ) {
      throw this.codigoInvalido();
    }

    // O hash é lento: fica fora da transação, que segura a conexão enquanto roda.
    const senhaHash = await this.hasher.hash(novaSenha);

    // Marcar o uso, trocar a senha e encerrar as sessões acontecem juntos: se um
    // passo falhar, o código continua valendo. Usa o `tx` direto, em vez do
    // UsuariasRepository, para a troca da senha entrar na mesma transação.
    await this.prisma.$transaction(async (tx) => {
      // Só uma de duas confirmações simultâneas com o código certo marca o uso.
      const { count: usados } = await tx.recuperacaoAcesso.updateMany({
        where: { id: recuperacao.id, usadoEm: null },
        data: { usadoEm: agora },
      });
      if (usados !== 1) {
        throw this.codigoInvalido();
      }
      await tx.usuaria.update({
        where: { id: usuaria.id },
        data: { senhaHash },
      });
      // Quem tinha a senha antiga (ou o aparelho perdido) deixa de renovar a sessão.
      await tx.refreshToken.deleteMany({ where: { userId: usuaria.id } });
    });
    return usuaria;
  }

  private codigoInvalido() {
    return erro(HttpStatus.BAD_REQUEST, CodigoErro.CodigoRecuperacaoInvalido);
  }

  // Só 10^6 códigos existem: um hash simples seria revertido por força bruta se
  // o banco vazasse. O HMAC com o segredo da API e a usuária impede isso.
  private hashDoCodigo(usuariaId: string, codigo: string): string {
    return createHmac('sha256', this.config.getOrThrow<string>('JWT_SECRET'))
      .update(`${usuariaId}:${codigo}`)
      .digest('hex');
  }

  private confere(hashGuardado: string, usuariaId: string, codigo: string) {
    const esperado = Buffer.from(hashGuardado, 'hex');
    const recebido = Buffer.from(this.hashDoCodigo(usuariaId, codigo), 'hex');
    return (
      esperado.length === recebido.length && timingSafeEqual(esperado, recebido)
    );
  }

  private async enviarEmail(para: string, codigo: string): Promise<void> {
    try {
      await this.mailer.send({
        to: para,
        subject: 'Seu código para voltar ao MindCycle',
        text: [
          'Olá!',
          '',
          'Tudo bem, acontece de esquecer a senha. Para criar uma nova e voltar à sua conta, digite este código no aplicativo:',
          '',
          `    ${codigo}`,
          '',
          `O código vale por ${RECUPERACAO_VALIDADE_MINUTOS} minutos. Todo o seu histórico continua exatamente onde você deixou.`,
          '',
          'Se não foi você quem pediu, pode ignorar este e-mail. Sua senha continua a mesma.',
          '',
          'Um abraço,',
          'Equipe MindCycle',
        ].join('\n'),
      });
    } catch (e) {
      // Responder 500 revelaria que a conta existe; o pedido pode ser repetido.
      this.logger.error('Não foi possível enviar o código de recuperação', e);
    }
  }
}
