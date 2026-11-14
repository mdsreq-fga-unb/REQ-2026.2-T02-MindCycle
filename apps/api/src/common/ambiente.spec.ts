import { validarAmbiente } from './ambiente.js';

const minimo = {
  DATABASE_URL: 'postgresql://mindcycle:mindcycle@localhost:5432/mindcycle',
  JWT_SECRET: 'x'.repeat(32),
};

describe('validarAmbiente', () => {
  it('aceita o mínimo e completa os padrões de desenvolvimento', () => {
    expect(validarAmbiente(minimo)).toEqual({
      ...minimo,
      NODE_ENV: 'development',
      PORT: 3000,
      SMTP_URL: 'smtp://localhost:1025',
      EMAIL_REMETENTE: 'MindCycle <nao-responda@mindcycle.local>',
      SMTP_STARTTLS: 'opportunistic',
    });
  });

  it('converte a porta, que chega como texto', () => {
    expect(validarAmbiente({ ...minimo, PORT: '8080' }).PORT).toBe(8080);
  });

  it('diz quais variáveis faltam', () => {
    expect(() => validarAmbiente({})).toThrow(
      /DATABASE_URL: obrigatória[\s\S]*JWT_SECRET: obrigatória/,
    );
  });

  it('recusa segredo curto e URLs no formato errado', () => {
    expect(() =>
      validarAmbiente({ ...minimo, JWT_SECRET: 'curto', SMTP_URL: 'mailpit:1025' }),
    ).toThrow(/JWT_SECRET: precisa de pelo menos 32[\s\S]*SMTP_URL: deve começar/);
    expect(() => validarAmbiente({ ...minimo, DATABASE_URL: 'mysql://x' })).toThrow(
      /DATABASE_URL: deve começar com postgresql/,
    );
    expect(() => validarAmbiente({ ...minimo, DATABASE_URL_UNPOOLED: 'mysql://x' })).toThrow(
      /DATABASE_URL_UNPOOLED: deve começar com postgresql/,
    );
  });

  it('exige o e-mail configurado em produção', () => {
    expect(() => validarAmbiente({ ...minimo, NODE_ENV: 'production' })).toThrow(
      /SMTP_URL: obrigatória em produção[\s\S]*EMAIL_REMETENTE: obrigatória em produção/,
    );
    const producao = {
      ...minimo,
      NODE_ENV: 'production',
      SMTP_URL: 'smtps://usuario:senha@smtp.exemplo.com:465',
      EMAIL_REMETENTE: 'MindCycle <nao-responda@exemplo.com>',
    };
    expect(validarAmbiente(producao)).toMatchObject({
      SMTP_URL: producao.SMTP_URL,
      SMTP_STARTTLS: 'required',
    });
    expect(validarAmbiente({ ...producao, SMTP_STARTTLS: 'opportunistic' }).SMTP_STARTTLS).toBe(
      'opportunistic',
    );
  });
});
