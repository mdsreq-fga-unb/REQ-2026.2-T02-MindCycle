import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public, TokenService } from '@nestjs/authentication';
import {
  cadastroSchema,
  CodigoErro,
  confirmacaoRecuperacaoSchema,
  entradaSchema,
  pedidoRecuperacaoSchema,
  renovacaoSchema,
  type CadastroDto,
  type ConfirmacaoRecuperacaoDto,
  type EntradaDto,
  type PedidoRecuperacaoDto,
  type RenovacaoDto,
  type Tokens,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { CredenciaisService } from '../account/credenciais.service.js';
import { RecuperacaoService } from './recuperacao.service.js';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly credenciais: CredenciaisService,
    private readonly recuperacao: RecuperacaoService,
    private readonly tokens: TokenService,
  ) {}

  // HU25
  @Post('cadastro')
  async cadastrar(
    @Body({ schema: cadastroSchema }) body: CadastroDto,
  ): Promise<Tokens> {
    const usuaria = await this.credenciais.cadastrar(body);
    return this.tokens.issue(usuaria.id, { method: 'password' });
  }

  @Post('entrada')
  @HttpCode(200)
  async entrar(
    @Body({ schema: entradaSchema }) body: EntradaDto,
  ): Promise<Tokens> {
    const usuaria = await this.credenciais.verificar(body.email, body.senha);
    if (!usuaria) {
      throw erro(HttpStatus.UNAUTHORIZED, CodigoErro.CredenciaisInvalidas);
    }
    return this.tokens.issue(usuaria.id, { method: 'password' });
  }

  // HU26. Responde igual exista a conta ou não: não revela quais e-mails estão cadastrados.
  @Post('recuperacao')
  @HttpCode(202)
  async pedirRecuperacao(
    @Body({ schema: pedidoRecuperacaoSchema }) body: PedidoRecuperacaoDto,
  ): Promise<void> {
    await this.recuperacao.solicitar(body.email);
  }

  @Post('recuperacao/confirmacao')
  @HttpCode(200)
  async confirmarRecuperacao(
    @Body({ schema: confirmacaoRecuperacaoSchema })
    body: ConfirmacaoRecuperacaoDto,
  ): Promise<Tokens> {
    const usuaria = await this.recuperacao.confirmar(body);
    return this.tokens.issue(usuaria.id, { method: 'password' });
  }

  // Um refresh token desconhecido, expirado ou reutilizado recebe 401.
  @Post('renovacao')
  @HttpCode(200)
  renovar(
    @Body({ schema: renovacaoSchema }) body: RenovacaoDto,
  ): Promise<Tokens> {
    return this.tokens.refresh(body.refreshToken);
  }

  @Post('saida')
  @HttpCode(204)
  async sair(
    @Body({ schema: renovacaoSchema }) body: RenovacaoDto,
  ): Promise<void> {
    await this.tokens.revoke(body.refreshToken);
  }
}
