# Deploy da API

A homologação com a cliente em 01/12 precisa da API e do banco acessíveis pela
internet, com HTTPS, porque o APK de release não fala com HTTP sem TLS. Este
documento descreve o que a API precisa; **a escolha do provedor é da equipe**
(issue de hospedagem, T4).

## O que vai para o servidor

- **Imagem da API:** `ghcr.io/mdsreq-fga-unb/mindcycle-api:main`, publicada pelo
  workflow **Publicar imagem da API** a cada push na `main` que muda a API. Cada
  publicação também ganha a tag `sha-<commit>`, para voltar a uma versão anterior.
  Ao subir, o contêiner confere as variáveis de ambiente, aplica as migrations
  (`prisma migrate deploy`) e inicia a API na porta `PORT`.
- **PostgreSQL 17**, gerenciado pelo provedor ou num contêiner com volume persistente.
- **SMTP** para os e-mails de recuperação de acesso (HU26).

Se o pacote da imagem estiver privado, o provedor precisa de um token do GitHub com
`read:packages`, ou a equipe torna o pacote público em Packages > mindcycle-api >
Package settings.

## Variáveis de ambiente

A API valida tudo ao subir (`apps/api/src/common/ambiente.ts`): se algo faltar,
ela não inicia e o log diz qual variável corrigir.

| Variável | Obrigatória | Exemplo |
|---|---|---|
| `DATABASE_URL` | sim | `postgresql://usuario:senha@host:5432/mindcycle?schema=public` |
| `JWT_SECRET` | sim, 32+ caracteres | gere com `openssl rand -base64 32` |
| `NODE_ENV` | use `production` | `production` |
| `SMTP_URL` | sim em produção | `smtps://usuario:senha@smtp.provedor.com:465` |
| `EMAIL_REMETENTE` | sim em produção | `MindCycle <nao-responda@dominio>` |
| `SMTP_STARTTLS` | não (em produção, `required`) | `opportunistic` só para um SMTP sem TLS, como o Mailpit |
| `PORT` | não (padrão 3000) | a que o provedor indicar |

Guarde `JWT_SECRET` e as senhas como segredos do provedor, nunca no repositório.

## Passos

1. Criar o banco PostgreSQL e anotar a `DATABASE_URL`.
2. Criar o serviço da API a partir da imagem acima, com as variáveis da tabela.
3. Configurar a verificação de saúde em `GET /saude`: responde 200 com
   `{"status":"ok", ...}` e 503 quando o banco não responde (o motivo vai para o log).
4. Conferir que o endereço público tem HTTPS e abrir `https://<endereço>/saude`.
5. No GitHub, em Settings > Secrets and variables > Actions > Variables, criar
   `API_URL_TESTE` com o endereço HTTPS. O próximo APK de teste já usa essa API
   (docs/qualidade/matriz-de-suporte-android.md).
6. Para atualizar, publique uma nova imagem (merge na `main`) e reinicie o serviço,
   ou ative a atualização automática do provedor, se houver.

## Opções de provedor

Qualquer serviço que rode um contêiner Docker e ofereça PostgreSQL serve. O que
pesar na escolha:

| Critério | Por quê |
|---|---|
| Custo zero ou baixo até dezembro | projeto de disciplina |
| HTTPS automático | exigido pelo APK de release |
| Banco que não expira nem dorme durante a homologação | planos gratuitos às vezes apagam o banco após alguns dias |
| Dados em servidor sob controle conhecido | RNF02: dados de saúde são sensíveis pela LGPD |

Caminhos possíveis: um serviço de contêiner com plano gratuito junto de um
PostgreSQL gerenciado; uma máquina virtual com `docker compose` (a imagem da API,
o PostgreSQL e um proxy com HTTPS); ou a infraestrutura da universidade ou do
LabLivre, se a cliente puder oferecer, o que também simplifica a questão da LGPD.
