# Verificação da HU22: mensagens de acolhimento

Referências: [issue #77](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/issues/77) e [PR #116](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/116).

## Comportamento e decisão de exibição

O cartão aparece no topo da aba Hoje, antes do check-in. A escolha é provisória:
os textos e o momento de exibição continuam aguardando validação com a cliente.
Não há cartão durante carregamento, erro de rede ou quando o APK não conhece o
ID recebido da API. O rótulo “Para hoje” usa tamanho 14.

A consulta busca a data atual ao reabrir ou voltar ao app. Não há atualização
automática à meia-noite enquanto a tela permanece aberta.

## Verificação automatizada

Executada em 16/11/2026:

| Comando | Resultado |
| --- | --- |
| `npm run test -w @mindcycle/app -- --runInBand cartao-mensagem.spec.tsx` | 16 testes passaram |
| `npm run test:e2e -w @mindcycle/api -- acolhimento.e2e-spec.ts` | 12 testes passaram, com PostgreSQL local |
| `npm run typecheck` | Passou em todos os workspaces |
| `npm run lint` | Passou |

Os testes do cartão cobrem sucesso, rótulo acessível, ausência de conteúdo no
carregamento/erro e ID desconhecido. A regex detecta expressões de cobrança ou
culpa e permite frases de acolhimento com “não precisa”; é apenas uma rede de
segurança e não substitui a revisão humana dos textos.

O e2e da HU22 verifica a passagem de 14/11 às 23:30 para 15/11 às 00:30 em São
Paulo, conferindo a data local exata e a troca da mensagem. O arquivo também
cobre as sugestões da HU21.

## Pendências humanas

- [ ] Outro integrante revisar os textos em `apps/app/src/textos.ts` (DoD 5).
- [ ] Validar com a cliente os textos e o momento de exibição (`aguarda-cliente`).
- [ ] Registrar o ensaio manual abaixo, incluindo fonte ampliada.

O comentário de evidências da issue contém um vídeo, mas faltam os dados abaixo
para completar o registro. Nenhum novo ensaio em aparelho foi realizado nesta
alteração.

| Dado do ensaio manual | Registro |
| --- | --- |
| Aparelho e versão do Android | Pendente |
| Data e responsável | Pendente |
| Commit e versão do APK/app | Pendente |
| Fonte normal e ampliada | Pendente |
| Exibição e leitura do cartão, sem cortes | Pendente |
| Falha de rede sem alerta deste cartão | Pendente |
| Estabilidade no mesmo dia e atualização ao voltar no dia seguinte | Pendente |
| Evidências e resultado | Pendente |
