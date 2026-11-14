# Deploy da API

A homologação com a cliente em 01/12 precisa da API e do banco acessíveis pela
internet, com HTTPS, porque o APK de release não fala com HTTP sem TLS. A equipe
escolheu (issue de hospedagem, T4):

| Peça | Serviço | Detalhes |
|---|---|---|
| API | **Render**, plano Free | <https://mindcycle-api-main.onrender.com>, a partir da imagem do GHCR |
| Banco | **Neon** | projeto `bold-poetry-32138014`, branch `production`, PostgreSQL 18, região São Paulo (`aws-sa-east-1`) |
| E-mail | **Brevo**, SMTP | `smtp-relay.brevo.com`, porta 2525 com STARTTLS |
| Monitor | **UptimeRobot** | chama `/saude` a cada 5 minutos |

O desenvolvimento e os testes continuam no PostgreSQL e no Mailpit locais do
`docker-compose.yml`; nada disso fala com a Neon ou com o Brevo.

## Como as peças se ligam

- **Imagem da API:** `ghcr.io/mdsreq-fga-unb/mindcycle-api:main`, publicada pelo
  workflow **Publicar imagem da API** a cada push na `main` que muda a API. Cada
  publicação também ganha a tag `sha-<commit>`, para voltar a uma versão anterior.
  Ao subir, o contêiner confere as variáveis de ambiente, aplica as migrations
  (`prisma migrate deploy`) e inicia a API na porta `PORT`.
- **Banco:** a Neon dá duas URLs do mesmo banco: a *pooled* (host com `-pooler`),
  que a API usa, e a direta, que as migrations usam, porque o Prisma Migrate falha
  pelo pooler. Elas estão no painel do projeto (Connect) ou, pelo CLI da Neon, em
  `neon env pull --file .env.neon`, que grava as duas como `DATABASE_URL` e
  `DATABASE_URL_UNPOOLED` num arquivo ignorado pelo git.
- **E-mail:** o plano Free do Render bloqueia a saída nas portas 25, 465 e 587,
  as de SMTP. Por isso o Brevo é usado na **porta 2525**, que ele também oferece,
  com STARTTLS (a API exige TLS em produção).
- **Monitor:** o Render desliga um serviço Free depois de 15 minutos sem receber
  requisições, e acordá-lo leva perto de um minuto. O UptimeRobot chamando
  `/saude` a cada 5 minutos o mantém acordado e avisa se o banco cair (o `/saude`
  responde 503).

## Variáveis de ambiente no Render

A API valida tudo ao subir (`apps/api/src/common/ambiente.ts`): se algo faltar,
ela não inicia e o log do Render diz qual variável corrigir. Cadastre todas em
Environment, nunca no repositório.

| Variável | Valor |
|---|---|
| `DATABASE_URL` | a URL *pooled* da Neon |
| `DATABASE_URL_UNPOOLED` | a URL direta da Neon (sem `-pooler`) |
| `JWT_SECRET` | 32+ caracteres; gere com `openssl rand -base64 32` |
| `NODE_ENV` | `production` (a imagem já define) |
| `SMTP_URL` | `smtp://<login>:<chave-smtp>@smtp-relay.brevo.com:2525` |
| `EMAIL_REMETENTE` | `Suporte MindCycle <suporte.mindcycle@gmail.com>` |
| `PORT` | não precisa: o Render informa a porta |

Para o `SMTP_URL`, o login e a chave SMTP estão no Brevo em SMTP & API > SMTP. O
login é um e-mail: na URL, troque o `@` dele por `%40`. Use a chave SMTP, não a
chave da API. O remetente precisa estar verificado no Brevo (Senders).

## Passos para recriar

1. **Neon:** projeto na região São Paulo; copiar as duas URLs.
2. **Brevo:** verificar o remetente `suporte.mindcycle@gmail.com` e gerar uma
   chave SMTP.
3. **Render:** novo Web Service a partir de imagem existente,
   `ghcr.io/mdsreq-fga-unb/mindcycle-api:main`, plano Free, com as variáveis da
   tabela acima e Health Check Path `/saude`. O Render não tem região na América
   do Sul, então a API fica nos EUA e cada consulta ao banco cruza até São Paulo;
   para a homologação isso basta.
4. **Conferir:** `https://mindcycle-api-main.onrender.com/saude` responde 200 com
   `{"status":"ok","info":{"banco":{"status":"up",...}},...}`. Na primeira subida,
   o contêiner aplica a migration inicial na Neon.
5. **UptimeRobot:** monitor HTTP(s) para a mesma URL do `/saude`, a cada 5 minutos.
6. **GitHub:** em Settings > Secrets and variables > Actions > Variables, a
   variável `API_URL_TESTE` com o endereço **base** da API,
   `https://mindcycle-api-main.onrender.com`, sem caminho no fim: o app junta
   `/auth/...`, `/conta` etc. a ele. O próximo APK de teste já usa essa API
   (docs/qualidade/matriz-de-suporte-android.md).

## Atualizar a API

Um merge na `main` publica a imagem nova no GHCR, mas o Render não percebe sozinho
uma imagem nova. Depois que o workflow **Publicar imagem da API** terminar, abra o
serviço no Render e use Manual Deploy > Deploy latest reference. Para voltar a uma
versão anterior, troque a imagem do serviço para a tag `sha-<commit>` desejada.

Para automatizar, o Render dá um Deploy Hook (Settings > Deploy Hook). Guardado
como o secret `RENDER_DEPLOY_HOOK` no GitHub, o workflow de publicação pode
chamá-lo ao fim; esse passo ainda não existe porque o secret não foi criado.

## Limites e cuidados

- **Render Free:** 750 horas por mês para a workspace inteira. Um serviço acordado
  o mês todo gasta até 744 horas, então ele deve ser o único serviço Free da
  workspace. O Render pode reiniciar o serviço a qualquer momento, e o disco não
  persiste (a API não grava nada em disco).
- **Neon:** o banco suspende o processamento quando fica ocioso e volta na
  próxima conexão, em menos de um segundo; com o UptimeRobot, isso quase não
  acontece.
- **Remetente @gmail.com:** sem domínio próprio, o e-mail não leva assinatura do
  domínio e pode cair no spam. Para a homologação serve; se o produto seguir, vale
  um domínio próprio autenticado no Brevo.
- **LGPD (RNF02):** os dados de saúde ficam guardados na Neon, em São Paulo; a
  API, que só os processa, roda nos EUA.
