# REQ-2026.2-T02-MindCycle

Repositório de projeto da disciplina de **Requisitos de Software (REQ) — Turma 02 — 2026.2**.

**MindCycle** é um aplicativo de organização de tarefas que adapta o planejamento diário
às variações de energia, foco e disposição ao longo do ciclo menstrual, desenvolvido na
disciplina de Requisitos de Software da FCTE/UnB.

📄 **Documentação publicada:** <https://mdsreq-fga-unb.github.io/REQ-2026.2-T02-MindCycle/>

---

## O que há neste repositório

Esta branch contém o **site de documentação** do projeto, feito em HTML, CSS e JavaScript
puros — sem gerador de site nem build — e publicado no GitHub Pages a cada `push` na branch
`gh-pages`. O site segue o protótipo *MindCycle — novo fluxo do site*: a página principal é a
árvore de requisitos, do problema até cada história de usuário, e as outras páginas contam
como a equipe trabalha.

A versão anterior, com o Documento de Visão dividido em Seções 1 a 15 e uma página por
iteração, fica guardada na branch `refactor/html-puro`, só para consulta. Os endereços dessas
seções continuam funcionando: o `404.html` leva cada um à página nova com o mesmo assunto.

```
.
├── index.html                     Requisitos: a árvore do problema até as histórias
├── visao/                         Visão de produto (figuras ampliáveis)
├── engenharia-de-requisitos/      Escolhas de processo e Catálogo de Metas
├── mvp/                           Composição do MVP por característica
├── backlog/                       Situação operacional, carga, responsáveis e tarefas
├── historico/                     O que mudou em cada história e RNF
├── reunioes/                      Gravações, com cada decisão no momento do vídeo
├── cronograma/                    Linha do tempo, releases e painel de fases
├── dor-e-dod/                     Definition of Ready e Definition of Done
├── priorizacao/                   Cálculo, MoSCoW e matriz impacto × esforço
├── licoes-aprendidas/             Lições de cada unidade
├── 404.html                       Página de erro; redireciona os endereços antigos
├── assets/
│   ├── css/site.css               Todo o visual (cores em variáveis no topo)
│   ├── js/
│   │   ├── dados.js               Histórias, RNFs, reuniões, histórico, fases e cronograma
│   │   ├── site.js                Tema, diálogos e o detalhe da história e do RNF
│   │   └── requisitos.js, mvp.js, backlog.js, priorizacao.js, reunioes.js, historico.js, cronograma.js
│   │                              O que cada página monta a partir de dados.js
│   ├── img/                       Figuras (WebP em 480, 800 e 1280 px) e favicon
│   ├── brand/                     Marca (vem da branch main): paleta, logos, Fraunces
│   └── fonts/                     Fraunces SemiBold, subconjunto latino em WOFF2
└── .github/workflows/gh-pages.yml Publicação automática
```

## Atualização do DoD

Em `assets/js/dados.js`, edite `dodCriterios` para alterar o título, a descrição geral
e o protocolo de cada critério. A página DoR e DoD e os modais usam esse cadastro.
Preserve o `id` dos critérios existentes ao editar ou reordenar, pois ele identifica
os resultados registrados.

As histórias incluídas no MVP recebem os painéis automaticamente, com resultados
iniciais como **Não verificado**. Os RNFs exibidos vêm dos vínculos da história e dos
requisitos marcados com `todasAsHistorias`.

Para registrar uma verificação, adicione ou atualize a HU em `aplicacaoDod`.
Os resultados ficam em `criterios`, usando o ID do critério como chave.

```js
HU13: {
  versao: 'commit ou versão avaliada',
  avaliacaoExterna: 'Pendente',
  criterios: {
    '1': {
      resultado: 'Aprovado',
      executor: 'Nome',
      revisor: 'Nome',
      data: 'DD/MM/AAAA',
      evidencia: 'Referência ao resultado da verificação'
    }
  }
}
```

## Atualização do backlog

A página `backlog/` é montada a partir das histórias e do bloco `backlog` de
`assets/js/dados.js`. Ela não repete descrição, benefício nem critérios: cada HU abre o
mesmo detalhe usado na árvore de requisitos.

- `responsaveis` registra somente atribuições formalizadas; sem entrada, a HU aparece como
  **Não atribuído**.
- `capacidadePorIteracao` registra a capacidade disponível. Enquanto estiver nula, a carga
  planejada é exibida, mas a relação carga/capacidade permanece **Não calculável**.
- `tarefasPadrao` mantém a decomposição operacional rastreável por HU; `itens` guarda apenas
  bloqueios e exceções específicas, como as lacunas de HU31 e HU32.
- A situação usa iteração, DoR e DoD já registrados. Ausência de evidência aparece como
  **Situação não registrada**, em vez de ser interpretada como conclusão.

## Sobre os identificadores do Problema, OE, CP, RF e RNF

A origem dos identificadores é a **Matriz de Rastreabilidade de Requisitos v1.0**,
extraída do quadro *MindCycle – Figma* em 28/09/2026. Esse quadro é uma fotografia
histórica; o catálogo vigente fica em `assets/js/dados.js`, conforme a decisão
proposta no [PR #49](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/49).
Os identificadores foram preservados:

| Nível | Conjunto válido |
|---|---|
| Problema | Sobrecarga Executiva |
| Objetivos específicos | `OE1` a `OE3` |
| Características de produto | `CP1` a `CP7` |
| Histórias de usuário | `HU01` a `HU36` |
| Requisitos não funcionais | `RNF01` a `RNF11`, **sem `RNF05`** |

No site, tudo isso vive num lugar só: `assets/js/dados.js`. A árvore, o MVP, o backlog, a
priorização, as reuniões, o histórico e o detalhe de cada história leem desse arquivo, então um
identificador ou uma nota alterados ali mudam em todas as páginas. Uma história nova recebe
sempre o próximo número livre, nunca um número já usado.

As referências `RFxx` da avaliação correspondem às atuais `HUxx` de mesmo número.
Regras e critérios ficam no cadastro da história responsável; `relacionadas` permite
navegar entre elas sem copiar a especificação. `regras.situacao` distingue propostas
de decisões validadas, `regras.origem` identifica o PR de origem e
`regras.pendencias` lista decisões ainda necessárias. `validadaCliente` continua
indicando a confirmação da prioridade, não a aprovação das novas regras.

Nesta revisão da issue #38 foram reaproveitadas apenas as regras de HU13/HU15, a
correção de HU17 e a apresentação das regras do PR #49. O DoD integrado pelo
[PR #51](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/51) foi preservado.
Quando o [PR #52](https://github.com/mdsreq-fga-unb/REQ-2026.2-T02-MindCycle/pull/52)
for combinado com estas alterações, seus registros de DoR devem ser conferidos de
novo: regra documentada não significa regra validada nem história pronta.

---

## Pendências para a equipe

| O que | Onde |
|---|---|
| **Validação do MVP consolidado com a cliente** | Páginas MVP e Priorização. A reunião de 05/10/2026 com a Dra. Cláudia Araújo Bottino tratou requisitos individuais; o conjunto do MVP e as notas ainda em hipótese aguardam a reunião de acompanhamento. |
| **Atribuições e capacidade ainda incompletas** | A página Backlog registra as atribuições informadas. Completar `backlog.responsaveis` e `backlog.capacidadePorIteracao` após o acordo da equipe. |
| **Validação dos refinamentos da #38** | Regras nos detalhes de HU04, HU05, HU13, HU15, HU23, HU30 e HU32. A fórmula clínica e os limites das fases em HU05 continuam pendentes de revisão da cliente; a ampliação de HU23 e o formato de exportação são propostas. |
| **RNF05** | Não existe no quadro: a numeração salta de RNF04 para RNF06. Confirmar se houve descarte e registrar, ou renumerar. |

---

## Como editar o site

Cada página é o `index.html` da pasta com o seu endereço. O conteúdo fica dentro de
`<main class="content">`; o menu lateral, a barra superior e o rodapé são iguais em todas as
páginas.

| Para mudar | Edite |
|---|---|
| Texto de Visão de produto, Engenharia de requisitos, DoR e DoD ou Lições aprendidas | O `index.html` da página |
| Uma história (nome, critérios, regras, relacionadas, nota MoSCoW, esforço, iteração) ou um RNF | `historias` ou `rnfs` em `assets/js/dados.js` |
| Responsável, capacidade, bloqueio ou exceção operacional do backlog | `backlog` em `assets/js/dados.js` |
| Uma reunião nova ou uma decisão | `reunioes` em `assets/js/dados.js` (código do vídeo no YouTube e o segundo de cada decisão) |
| Uma alteração no histórico | `historico` em `assets/js/dados.js` |
| A iteração atual ou as histórias prontas pelo DoR | `iteracaoAtual` e `dorAtendido` em `assets/js/dados.js` |
| Iterações, evidências e técnicas de cada fase | `fases` em `assets/js/dados.js` |
| Cores e espaçamentos | As variáveis no topo de `assets/css/site.css` |

Os comentários no topo de `assets/js/dados.js` explicam cada campo.

Uma história ou um RNF abre de qualquer página com `#` e o código no endereço — por exemplo,
`…/priorizacao/#HU13` ou `…/#RNF04`. Uma reunião abre com o código do vídeo
(`…/reunioes/#PKoWLngGSRg`); as figuras da Visão, com `#figura-1` a `#figura-3`; o Catálogo de
Metas, com `…/engenharia-de-requisitos/#metas`.

### Acrescentar uma página

1. Copie a pasta de uma página parecida com o novo nome e troque o `<title>`, a trilha
   (`<div class="crumb">`) e o conteúdo de `<main>`.
2. Inclua o link no menu (`<nav class="menu">`) de **todas** as páginas, inclusive o
   `404.html`, e marque a nova com `class="navb on"` e `aria-current="page"`.

## Rodando localmente

Não há build nem dependências. Sirva a pasta:

```bash
python3 -m http.server 8000
```

e abra `http://localhost:8000/`. O `404.html` e os redirecionamentos dos endereços antigos só
funcionam no GitHub Pages.

## Publicação

O workflow `.github/workflows/gh-pages.yml` publica os arquivos do site (tudo menos o
README, `.github` e `.claude`) no GitHub Pages a cada `push` na branch `gh-pages`, e também
sob demanda (*Run workflow*).

> **Configuração necessária uma única vez:** em **Settings → Pages**, definir
> **Source: GitHub Actions**.

---

## Equipe

| Integrante | Papéis |
|---|---|
| Ana Luisa Vieira Nunes | Gerente de Projeto · Analista de Requisitos (Gestora do Fluxo Kanban) |
| Allan Kelvin Dias Gomes Monteiro | Analista de Requisitos · Analista de Dados |
| Tiago Santos Bittencourt | Gerente de Projeto · Desenvolvedor Backend (Responsável pelo Backlog) |
| Gustavo Silva Rodrigues | Desenvolvedor Frontend · Analista de QA |
| Luana Carvalho de Almeida | Analista de Dados · Analista de Requisitos |
| Pedro Ian Guedes de Carvalho | Analista de QA · Analista de Dados |
| Arthur Palhares | Desenvolvedor Frontend · Analista de Requisitos |

## Marca

Os logos, a paleta e a tipografia vêm de `assets/brand/`, mantido na branch `main`.
O site usa o ícone da lua no menu lateral e a **Fraunces SemiBold** nos títulos —
subconjunto latino em WOFF2, 24 KB, servido pelo próprio site. As cores da marca que não
alcançavam 4,5:1 de contraste em texto foram escurecidas: Rose `#EC6F9C` → `#B84371`, Plum
`#8A5C77` → `#6E4A5F`.
