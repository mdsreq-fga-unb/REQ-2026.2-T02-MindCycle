import { CodigoErro } from '@mindcycle/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ConsentService } from './consent.service.js';
import { TERMOS } from './termos.js';

describe('Aceite dos termos: caminhos do serviço (HU12)', () => {
  let consentimento: {
    findFirst: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
  let service: ConsentService;
  beforeEach(() => {
    consentimento = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({}),
    };
    service = new ConsentService({ consentimento } as unknown as PrismaService);
  });

  it('recusa versão desatualizada antes de consultar ou gravar', async () => {
    await expect(service.aceitar('dona', 'antiga')).rejects.toMatchObject({
      response: { codigo: CodigoErro.VersaoTermosDesatualizada },
    });
    expect(consentimento.findFirst).not.toHaveBeenCalled();
    expect(consentimento.create).not.toHaveBeenCalled();
  });

  it('grava a versão vigente na própria conta', async () => {
    await service.aceitar('dona', TERMOS.versao);
    expect(consentimento.create).toHaveBeenCalledWith({
      data: { usuariaId: 'dona', versaoTermos: TERMOS.versao },
    });
    expect(consentimento.findFirst).toHaveBeenCalledWith({
      where: {
        usuariaId: 'dona',
        versaoTermos: TERMOS.versao,
        revogadoEm: null,
      },
      select: { id: true },
    });
  });

  it('não duplica um aceite vigente', async () => {
    consentimento.findFirst.mockResolvedValue({ id: 'aceite' });
    await service.aceitar('dona', TERMOS.versao);
    expect(consentimento.create).not.toHaveBeenCalled();
  });
});
