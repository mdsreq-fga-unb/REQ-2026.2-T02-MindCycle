<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand/banner/readme-banner-dark.png">
  <img alt="MindCycle — Produtividade no ritmo do seu ciclo." src="assets/brand/banner/readme-banner-light.png" width="100%">
</picture>

<h3 align="center">📄 <a href="https://mdsreq-fga-unb.github.io/REQ-2026.2-T02-MindCycle/">Documentação do produto e do projeto</a></h3>

<p align="center">
  Requisitos de Software · 2026.2 · Turma 02 · FCTE/UnB<br>
  Cliente: Laboratório de Competência em Software Livre (LabLivre)
</p>

---

## Sobre o projeto

Ferramentas de produtividade tratam todos os dias como iguais. Para mulheres que atuam ou
estudam em tecnologia, isso transforma oscilações fisiológicas normais — de energia, foco,
humor e dor ao longo do ciclo menstrual — em percepção de baixo desempenho. O resultado é
sobrecarga executiva, autocobrança e uma perda de produtividade que ninguém mede.

O **MindCycle** é um aplicativo de organização de tarefas que faz o contrário: planeja a
partir da capacidade real da usuária, trata o descanso como parte legítima da rotina e
mantém os dados de ciclo e sintomas sob controle exclusivo de quem os registra — sem
exposição a gestores, sem contadores de falha, sem pontuação.

**Objetivos específicos**

| ID | Objetivo |
|---|---|
| OE1 | Reduzir o abandono de tarefas planejadas pela usuária |
| OE2 | Reduzir a sobrecarga percebida na organização da rotina |
| OE3 | Adequar o planejamento de tarefas à fase do ciclo menstrual |

**Características do produto**

| ID | Característica | Contribui para |
|---|---|---|
| CP1 | Decompor Tarefas | OE1 |
| CP2 | Registrar e acompanhar o ciclo menstrual | OE3 |
| CP3 | Adaptar planejamento por fase de ciclo | OE2 |
| CP4 | Registrar nível de energia | OE3 |
| CP5 | Adaptar a carga diária visível | OE2 |
| CP6 | Sugerir atividades de Bem-Estar | OE2 |

Detalhamento, rastreabilidade e justificativas na
[documentação](https://mdsreq-fga-unb.github.io/REQ-2026.2-T02-MindCycle/visao/).

## Processo

Abordagem **híbrida**, ciclo de vida **iterativo e incremental**, processo **OpenUP** e
framework de gerenciamento **Kanban**, com iterações de duas semanas.

| Release | Unidade | Período | Entrega | Data |
|---|---|---|---|---|
| 1 | Unidade 1 | 11/08 – 14/09/2026 | Documento de Visão do Produto e Projeto, v1.0 | 08/09/2026 |
| 2 | Unidade 2 | 15/09 – 19/10/2026 | Requisitos, DoR e DoD, backlog priorizado e MVP delimitado | 13/10/2026 |
| 3 | Unidade 3 | 20/10 – 23/11/2026 | Incrementos funcionais de CP1, CP2 e CP3 | 17/11/2026 |
| 4 | Unidade 4 | 24/11 – 10/12/2026 | MVP integrado e homologado pelo cliente | 01/12/2026 |

Até o fim da Release 2 o trabalho é de Engenharia de Requisitos; os incrementos funcionais
começam na Release 3. O [cronograma completo](https://mdsreq-fga-unb.github.io/REQ-2026.2-T02-MindCycle/visao/06-cronograma-e-entregas/)
traz cada iteração, as entregas esperadas e o que o cliente valida em cada ciclo.

## Tecnologias

`React Native (Expo)` · `TypeScript` · `Node.js + NestJS` · `PostgreSQL + Prisma` · `Docker` ·
`GitHub Actions` · `Figma` · `Hugo` + `GitHub Pages`

## Equipe

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/ananunesv">
        <img src="https://github.com/ananunesv.png" width="72" alt=""><br>
        <sub><b>Ana Luisa Vieira Nunes</b></sub>
      </a><br>
      <sub>Gerente de Projeto<br>Analista de Requisitos</sub>
    </td>
    <td align="center" width="150">
      <img src="assets/brand/logo/icon-lua/lua-original_blush.png" width="72" alt=""><br>
      <sub><b>Allan Kelvin Dias<br>Gomes Monteiro</b></sub><br>
      <sub>Analista de Requisitos<br>Analista de Dados</sub>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/TiagoSBittencourt">
        <img src="https://github.com/TiagoSBittencourt.png" width="72" alt=""><br>
        <sub><b>Tiago Santos Bittencourt</b></sub>
      </a><br>
      <sub>Gerente de Projeto<br>Desenvolvedor Backend</sub>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/g-srodrigues">
        <img src="https://github.com/g-srodrigues.png" width="72" alt=""><br>
        <sub><b>Gustavo Silva Rodrigues</b></sub>
      </a><br>
      <sub>Desenvolvedor Frontend<br>Analista de QA</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/luanaa2005">
        <img src="https://github.com/luanaa2005.png" width="72" alt=""><br>
        <sub><b>Luana Carvalho de Almeida</b></sub>
      </a><br>
      <sub>Analista de Dados<br>Analista de Requisitos</sub>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/pedroiaan">
        <img src="https://github.com/pedroiaan.png" width="72" alt=""><br>
        <sub><b>Pedro Ian Guedes<br>de Carvalho</b></sub>
      </a><br>
      <sub>Analista de QA<br>Analista de Dados</sub>
    </td>
    <td align="center" width="150">
      <a href="https://github.com/arthurpalhares1">
        <img src="https://github.com/arthurpalhares1.png" width="72" alt=""><br>
        <sub><b>Arthur Palhares</b></sub>
      </a><br>
      <sub>Desenvolvedor Frontend<br>Analista de Requisitos</sub>
    </td>
    <td width="150"></td>
  </tr>
</table>


## Organização do repositório

| Branch | Conteúdo |
|---|---|
| `main` | Código do produto, identidade visual em `assets/brand/` e este README |
| `gh-pages` | Código-fonte do site de documentação, em Hugo, publicado automaticamente pelo GitHub Actions |

A documentação **não** é escrita à mão em HTML: a branch `gh-pages` guarda o fonte em
Markdown e, a cada push, o workflow constrói e publica o site.

O código é um monorepo com npm workspaces. A arquitetura e as decisões estão em
[`docs/plans/2026-11-13-arquitetura-design.md`](docs/plans/2026-11-13-arquitetura-design.md).

| Pasta | Conteúdo |
|---|---|
| `apps/api` | API em NestJS + Prisma (PostgreSQL), um módulo por domínio em `src/modules/` |
| `apps/app` | App em Expo (React Native) para Android, iOS e web, com rotas em `src/app/` |
| `packages/shared` | Schemas (Zod) e tipos usados pela API e pelo app |

## Como rodar

Precisa de Node 22.18+, **npm 11** (`npm install -g npm@11`) e Docker.

```bash
npm install
```

```bash
cp apps/api/.env.example apps/api/.env
```

Preencha `JWT_SECRET` em `apps/api/.env` (gere com `openssl rand -base64 32`). Depois suba o
banco, aplique as migrações e rode a API e o app web, cada um num terminal:

```bash
npm run db:up
```

```bash
npm run prisma:migrate -w @mindcycle/api
```

```bash
npm run dev:api
```

```bash
npm run dev:app
```

O app abre em <http://localhost:8081> e a API responde em <http://localhost:3000>. Se a porta
5432 já estiver em uso, suba o banco com `POSTGRES_PORT=5434 npm run db:up` e ajuste a porta
em `DATABASE_URL`. No emulador Android, defina `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000`.

| Comando | O que faz |
|---|---|
| `npm run typecheck` | Checa os tipos de todos os pacotes |
| `npm run lint` | Lint da API (oxlint) e do app (ESLint) |
| `npm test` | Testes unitários |
| `npm run test:e2e` | Testes e2e da API, num banco `mindcycle_test` criado automaticamente |

O CI (`.github/workflows/ci.yml`) roda tudo isso a cada PR, além do build da imagem Docker
da API.

## Marca

Paleta, logotipos e tipografia estão em [`assets/brand/`](assets/brand/), com um
[guia de uso](assets/brand/README.md). A fonte do logotipo é a
[Fraunces](https://fonts.google.com/specimen/Fraunces), sob licença OFL.

| Papel | Cor | HEX |
|---|---|---|
| Primária | Rose | `#EC6F9C` |
| Secundária | Lilac | `#A98BD1` |
| Acento | Coral | `#FF9E86` |
| Tinta do wordmark | Plum | `#8A5C77` |

---

<p align="center">
  <sub>Universidade de Brasília · Faculdade de Ciências e Tecnologias em Engenharia (FCTE)<br>
  Requisitos de Software — 2026.2 — Turma 02</sub>
</p>
