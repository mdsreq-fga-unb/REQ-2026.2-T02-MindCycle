import { z } from 'zod';

// Variáveis de ambiente da API, validadas quando ela sobe: com algo faltando ou
// errado, a API nem começa e diz o que corrigir (docs/deploy.md).
const ambienteSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z
    .string({ error: 'obrigatória' })
    .regex(/^postgres(ql)?:\/\//, { error: 'deve começar com postgresql://' }),
  JWT_SECRET: z
    .string({ error: 'obrigatória; gere com: openssl rand -base64 32' })
    .min(32, { error: 'precisa de pelo menos 32 caracteres' }),
  // Fora de produção, cai no Mailpit do docker-compose.yml.
  SMTP_URL: z
    .string()
    .regex(/^smtps?:\/\//, { error: 'deve começar com smtp:// ou smtps://' })
    .default('smtp://localhost:1025'),
  EMAIL_REMETENTE: z.string().min(1).default('MindCycle <nao-responda@mindcycle.local>'),
  // Padrão: exige STARTTLS em produção. O Mailpit não oferece, então a API do
  // docker-compose.yml, que roda como produção, usa "opportunistic".
  SMTP_STARTTLS: z.enum(['required', 'opportunistic', 'never']).optional(),
});

export type Ambiente = Omit<z.infer<typeof ambienteSchema>, 'SMTP_STARTTLS'> & {
  SMTP_STARTTLS: 'required' | 'opportunistic' | 'never';
};

/** Em produção, o e-mail não pode cair no padrão de desenvolvimento. */
const obrigatoriasEmProducao = ['SMTP_URL', 'EMAIL_REMETENTE'] as const;

export function validarAmbiente(bruto: Record<string, unknown>): Ambiente {
  const problemas: string[] = [];
  const resultado = ambienteSchema.safeParse(bruto);
  if (!resultado.success) {
    for (const problema of resultado.error.issues) {
      problemas.push(`${problema.path.join('.')}: ${problema.message}`);
    }
  }
  if (bruto.NODE_ENV === 'production') {
    for (const nome of obrigatoriasEmProducao) {
      if (!bruto[nome]) {
        problemas.push(`${nome}: obrigatória em produção`);
      }
    }
  }
  if (problemas.length > 0 || !resultado.success) {
    throw new Error(
      `Variáveis de ambiente inválidas:\n${problemas.map((p) => `- ${p}`).join('\n')}`,
    );
  }
  const ambiente = resultado.data;
  return {
    ...ambiente,
    SMTP_STARTTLS:
      ambiente.SMTP_STARTTLS ?? (ambiente.NODE_ENV === 'production' ? 'required' : 'opportunistic'),
  };
}
