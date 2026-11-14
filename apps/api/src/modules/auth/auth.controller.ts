import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public, TokenService } from '@nestjs/authentication';
import {
  cadastroSchema,
  CodigoErro,
  entradaSchema,
  renovacaoSchema,
  type CadastroDto,
  type EntradaDto,
  type RenovacaoDto,
  type Tokens,
} from '@mindcycle/shared';
import { erro } from '../../common/erro.js';
import { CredenciaisService } from './credenciais.service.js';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly credenciais: CredenciaisService,
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
