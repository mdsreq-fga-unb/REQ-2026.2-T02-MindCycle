# Arquitetura do MindCycle — design

Data: 13/11/2026 · Escopo: MVP (iterações 5 e 6, 21 HUs) · Fonte dos requisitos:
`assets/js/dados.js` da branch `docs/#38-RFs`.

## Decisões

| Tema | Decisão | Motivo |
|---|---|---|
| Forma | Monorepo + monólito modular | Equipe pequena, PRs em fatia vertical (DoD), tipos únicos entre front e back |
| Repositório | Este repositório, npm workspaces (npm 11) | Fica ao lado de `assets/brand/`; npm já vem com o Node, sem instalar outro gerenciador |
| Front | Expo SDK 58 (React Native) + Expo Router, exportado também para web | RNF10 (360–1440 px) e RNF06/07/08 são medidos no DevTools |
| Back | NestJS 12 (ESM, Vitest), um módulo por domínio | Stack do README |
| Banco | PostgreSQL + Prisma 7 | Migrations versionadas e tipos gerados |
| Conta | E-mail + senha; PIN de pétalas como trava da sessão | 4 toques em 6 pétalas = 1296 combinações, pouco para credencial única |
| Autenticação | `@nestjs/authentication`: access token JWT (15 min) + refresh token rotativo no PostgreSQL | Mesmo fluxo bearer na web e no celular; o pacote detecta reuso de refresh token |
| Infra | Docker Compose (postgres; api no perfil `api`) + GitHub Actions | CI exigido pelo DoD (critério 3); Mailpit entra com a HU26 |

Descartado: repositórios separados (duplica tipos e CI) e BaaS (contraria o stack
e o perfil de software livre do cliente).

## Estrutura

```
apps/
  app/                       Expo + Expo Router (iOS/Android/Web)
    app/                     rotas: (auth) · termos · pin · (abas) hoje | ciclo | tarefas | acolhimento | conta
    src/features/            checkin · ciclo · tarefas · plano-do-dia · acolhimento · conta
    src/ui/                  design system (tokens de assets/brand, PinPetalas, ...)
    src/api/                 cliente HTTP + TanStack Query
    src/textos.ts            todos os textos exibidos à usuária (DoD 5)
  api/                       NestJS
    src/modules/
      auth/       HU25 HU26 HU11     JWT, senha, PIN (hash + bloqueio por tentativas)
      consent/    HU12               ConsentGuard (RNF02)
      account/    HU36               exclusão em cascata e revogação do consentimento
      cycle/      HU05 HU06 HU07     EstimadorDeFase
      checkin/    HU04 HU02
      tasks/      HU16-20 HU18
      planning/   HU13 HU15          domain/ puro + service que orquestra
      content/    HU01 HU09 HU28 HU21 HU22   JSON versionado no repositório
    src/common/                      guards, Clock, filtro de erros, @CurrentUser
    prisma/                          schema, migrations, seed
    test/                            e2e contra Postgres
packages/shared/                     enums (Nivel 1-3, Fase), schemas zod, tipos de resposta
docker-compose.yml
.github/workflows/ci.yml             lint · typecheck · unit · e2e
```

## Regras transversais

- **RNF03, acesso exclusivo.** O `userId` vem sempre do token (`@CurrentUser`), nunca
  da rota ou do corpo. Repositórios buscam por `{ id, userId }`; recurso de outra conta
  responde 403. Cada módulo tem um e2e "sessão de outra conta → acesso negado".
- **RNF02, consentimento.** `ConsentGuard` em toda rota que grava ciclo, sintoma ou
  disposição: sem aceite vigente da versão atual dos termos, responde 403 com código
  `CONSENTIMENTO_PENDENTE`, que o app usa para levar à tela de termos.
- **Data local.** A usuária guarda seu fuso (IANA). "Hoje" é calculado por um `Clock`
  injetável no fuso dela; dias de ciclo contam por calendário, não por horas (HU05).
- **Linguagem acolhedora.** Nenhum texto de interface fora de `src/textos.ts`; mensagens
  de erro da API trazem só código, e o app escolhe o texto.

## Modelo de dados (rascunho)

- `Usuaria` (id, email, senhaHash, pinHash, pinTentativas, pinBloqueadoAte, fuso)
- `Consentimento` (usuariaId, versaoTermos, aceitoEm, revogadoEm)
- `RefreshToken` (estado do `@nestjs/authentication`; `userId` sem chave estrangeira,
  como o contrato do pacote supõe, então a HU36 revoga e apaga esses registros explicitamente)
- `InicioMenstruacao` (usuariaId, data) · `PerfilCiclo` (usuariaId, duracaoMedia?, irregular)
- `Checkin` (usuariaId, dataLocal, criadoEm, disposicao 1-3, semSintomas, origem `registro|sobrecarga`)
- `CheckinSintoma` (checkinId, sintoma, intensidade 1-3)
- `Tarefa` (usuariaId, titulo, prazo, prioridade 1-3, energia 1-3, dataPlanejada, criadaEm, concluidaEm?)
- `MovimentacaoTarefa` (tarefaId, de, para, origem `usuaria|reajuste`, em, desfeitaEm?)

A sobrecarga (HU02) vira um `Checkin` de origem `sobrecarga` com disposição baixa, e
assim "vale até o próximo registro" sai da mesma regra do "registro mais recente do dia".
`MovimentacaoTarefa` permite desfazer (HU15), distinguir o adiamento manual (HU18) do
automático e aplicar a regra de retorno quando a disposição sobe.

Exclusão de conta (HU36): `onDelete: Cascade` a partir de `Usuaria`, numa transação.

## Planejamento do dia (HU13 e HU15)

`planning/domain` contém só funções puras, sem Nest nem Prisma:

- `recomendar(tarefas, disposicao, hoje) → Tarefa[]`: grupos (1) prazo hoje ou vencido,
  (2) energia ≤ disposição, (3) energia > disposição; desempate por prazo, prioridade,
  energia e cadastro. Sem check-in no dia, a disposição é média.
- `reajustar(tarefas, movimentacoesDeHoje, disposicao, hoje) → Movimentacao[]`: move para
  amanhã o que excede a disposição e tem prazo depois de hoje; nunca move o que tem prazo
  hoje ou vencido; não move de novo o que foi desfeito; devolve as movidas por reajuste
  que voltaram a caber.

O service carrega os dados, chama o domínio e grava as movimentações numa transação.
O reajuste roda de forma síncrona na gravação do check-in, e a resposta já traz a lista
nova (RNF07, até 2 s).

## Ciclo (HU05)

`EstimadorDeFase` é uma interface. A implementação do MVP aplica as regras que já existem
(sem data, sem duração, irregular ou dia além da duração → "não estimada" + motivo) e,
para ciclo regular, devolve "modelo pendente de validação". O modelo aprovado pela
cliente entra como nova implementação, sem tocar em quem consome.

## Erros

Filtro global na API que mapeia erros de domínio para `{ codigo, status }`: 400 para
validação (zod), 401 sem sessão, 403 para outra conta, consentimento pendente ou PIN
bloqueado, e 404 para inexistente. O app trata pelo `codigo`.

## Testes

- Unitários: `planning/domain` e `EstimadorDeFase`, com um caso por item das regras de
  negócio, incluindo os limites (sem check-in, prazo vencido, desfazer, retorno).
- E2E (Nest + Postgres no CI): fluxo de cada HU, RNF02 e RNF03.
- RNF06/07/08, RNF10 e RNF11: medições manuais no DevTools/Lighthouse no build web,
  registradas como evidência do DoD.

## Ordem de construção

1. ✅ Esqueleto: monorepo, Docker Compose, CI, Prisma, auth (HU25), termos (HU12) e uma
   tela no app que faz login e chama a API, ponta a ponta. Os textos dos termos são um
   rascunho que precisa de revisão da cliente.
2. PIN (HU11), recuperação (HU26), exclusão (HU36).
3. Ciclo (HU06, HU07, HU05) e check-in (HU04, HU02).
4. Tarefas (HU17, HU16, HU19, HU20, HU18).
5. Planejamento: domínio com testes primeiro, depois a tela "Hoje" (HU13, HU15).
6. Conteúdo e acolhimento (HU01, HU09, HU28, HU21, HU22).

## Pendências fora da arquitetura

- O README e o `dados.js` numeram as características (CP) de formas diferentes.
- O modelo de fases (HU05) e as regras de HU13/HU15 aguardam validação da cliente.
- Onde o MVP será hospedado para a homologação de 01/12.
