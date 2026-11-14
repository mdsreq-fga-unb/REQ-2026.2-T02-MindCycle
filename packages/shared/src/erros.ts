// A API responde só com o código; o app escolhe o texto exibido (DoD 5).
export const CodigoErro = {
  CredenciaisInvalidas: 'CREDENCIAIS_INVALIDAS',
  EmailJaCadastrado: 'EMAIL_JA_CADASTRADO',
  ConsentimentoPendente: 'CONSENTIMENTO_PENDENTE',
  VersaoTermosDesatualizada: 'VERSAO_TERMOS_DESATUALIZADA',
} as const;
export type CodigoErro = (typeof CodigoErro)[keyof typeof CodigoErro];

export interface RespostaErro {
  statusCode: number;
  codigo?: CodigoErro;
  message?: string | string[];
}
