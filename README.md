# REQ-2026.2-T02-MindCycle

Repositório de projeto da disciplina de **Requisitos de Software (REQ) — Turma 02 — 2026.2**.

**MindCycle** é um aplicativo de organização de tarefas que adapta o planejamento diário
às variações de energia, foco e disposição ao longo do ciclo menstrual, desenvolvido na
disciplina de Requisitos de Software da FCTE/UnB.

📄 **Documentação publicada:** <https://mdsreq-fga-unb.github.io/REQ-2026.2-T02-MindCycle/>

---

## O que há neste repositório

Esta branch (`gh-pages`) contém o **site de documentação** do projeto, feito em HTML, CSS
e JavaScript puros — sem gerador de site nem build — e publicado automaticamente no GitHub
Pages a cada `push`. O visual vem do tema
[Spectra](https://github.com/JoeYang1412/hugo-theme-spectra) (MIT), com a identidade do
MindCycle por cima.

```
.
├── index.html                     Página inicial (equipe, acesso rápido)
├── 404.html                       Página de erro do GitHub Pages
├── visao/                         Documento de Visão do Produto e Projeto
│   ├── index.html                 Índice das seções
│   ├── 01-cenario-atual/          Seção 1 (cada página é o index.html da sua pasta)
│   ├── …                          Seções 2 a 12
│   ├── 14-1-licoes-aprendidas-unidade-1/   Seção 14.1 (lições da Unidade 1)
│   ├── 14-2-licoes-aprendidas-unidade-2/   Seção 14.2 (lições da Unidade 2)
│   ├── 14-licoes-aprendidas/      Endereço antigo da Seção 14, redireciona para a 14.1
│   └── 15-referencias/
├── entregas/                      Vídeo de apresentação e escopo de cada unidade
├── openup/                        Uma pasta por fase do OpenUP, uma página por iteração
├── assets/
│   ├── css/
│   │   ├── spectra.css            Base visual: CSS do tema Spectra, só com as regras usadas
│   │   └── custom.css             Identidade do MindCycle: cores, tipografia e componentes
│   ├── js/
│   │   ├── sumario.js             Itens do sumário lateral — edite aqui para incluir páginas
│   │   ├── search.js              Busca: monta o índice lendo as páginas do sumário
│   │   ├── nav-collapse.js        Recolher e expandir os grupos do sumário
│   │   ├── theme-toggle.js        Tema claro/escuro
│   │   ├── sidebar.js             Sumário no celular e sumário recolhido no desktop
│   │   ├── scroll-top.js          Botão de voltar ao topo
│   │   ├── lightbox.js            Ampliar as figuras
│   │   └── vendor/fuse.min.js     Fuse.js (busca aproximada)
│   ├── img/                       Figuras do Documento de Visão (WebP em 480, 800 e 1280 px) e favicon
│   │   └── equipe/                Avatares da equipe (WebP, 144 × 144)
│   ├── brand/                     Marca (vem da branch main): paleta, logos, Fraunces
│   ├── fonts/                     Fraunces SemiBold, subconjunto latino em WOFF2
│   └── LICENSE-spectra.txt        Licença MIT do tema Spectra
└── .github/workflows/gh-pages.yml Publicação automática
```

## Sobre os identificadores do Problema, OE, CP, RF e RNF

A **fonte oficial** é a **Matriz de Rastreabilidade de Requisitos v1.0**, extraída do
quadro *MindCycle – Figma* em 28/09/2026 e reproduzida na **Seção 11**. Dela saem:

| Nível | Conjunto válido |
|---|---|
| Problema | Sobrecarga Executiva |
| Objetivos específicos | `OE1` a `OE3` |
| Características de produto | `CP1` a `CP7` |
| Requisitos funcionais | `RF01` a `RF27` (quadro) · `RF28` a `RF36` (acrescentados pela equipe, sem card) |
| Requisitos não funcionais | `RNF01` a `RNF11`, **sem `RNF05`** |

As Seções 2.2, 2.3, 8 e 6 foram realinhadas a esse conjunto. Antes disso, o site tinha
três estruturas incompatíveis: a Seção 2.3 declarava `CP1`–`CP6` com nomes que não
correspondiam a nenhum requisito elicitado (incluindo *Decompor Tarefas*, sem nenhum RF),
a Seção 8 usava `CP1`–`CP8` e `RF01`–`RF37` com outro significado para os mesmos IDs, e a
Seção 6 remapeava as duas por conta própria.

Se os identificadores mudarem de novo, os lugares a conferir são
`visao/02-solucao-proposta/index.html` (Quadro 2),
`visao/08-requisitos-de-software/index.html` (árvore de derivação e catálogos),
`visao/09-priorizacao-de-requisitos/index.html` (avaliações e matriz 4 × 4),
`visao/10-mvp/index.html` (composição e alocação do MVP),
`visao/11-rastreabilidade/index.html` (matrizes e elo *forward*),
`visao/06-cronograma-e-entregas/index.html` (artefatos de entrada das Iterações 5 e 6) e
as páginas das Iterações 2, 3 e 4 em `openup/` (histórias, backlog e as evidências copiadas
das Seções 2, 8 e 9).
Um RF novo recebe sempre o próximo número livre do catálogo da Seção 8, nunca um número já
usado em outra seção.
O levantamento anterior (`requisitos-por-tela-mindcycle.md`, `RF01`–`RF69`) é **histórico**
e não deve ser citado.

## Escopo publicado

O site cobre as Seções **1 a 12**, **14.1**, **14.2** e **15**. O sumário lateral é organizado por
unidade, e cada unidade lista só as seções já entregues:

- **Unidade 1 — Concepção do Projeto:** Seções 1 a 7, 14.1 e o vídeo de apresentação;
- **Unidade 2 — Requisitos de Software:** Seções 8 a 12, 14.2 e 15;
- **OpenUP — Concepção, Elaboração, Construção e Transição:** uma página por iteração
  (Iterações 01 e 02, 03 e 04, 05 e 06, 07) em `openup/`.

As páginas continuam em `visao/`; a divisão por unidade existe apenas no sumário
(`assets/js/sumario.js`), então os endereços publicados e os links entre seções não mudaram.
A exceção é a Seção 14 (Lições Aprendidas): cada unidade tem as suas lições, então há uma
página por subseção (`visao/14-1-licoes-aprendidas-unidade-1/`, …), listada no grupo da
unidade correspondente. O endereço antigo, `/visao/14-licoes-aprendidas/`, redireciona para a
14.1.

| Seção | Entrega |
|---|---|
| 1 a 7 — cenário, solução, intervenção social, estratégias, ER, cronograma e equipe | 1 (Unidade 1) |
| 8 — Requisitos de Software | 2 (Unidade 2) |
| 9 — Priorização de Requisitos | 2 (Unidade 2) |
| 10 — Definição e Composição do MVP | 2 (Unidade 2) |
| 11 — Rastreabilidade dos Requisitos | 2 (Unidade 2) |
| 12 — DoR e DoD | 2 (Unidade 2) |
| 14.1 — Lições Aprendidas da Unidade 1 · 15 — Referências | 1 (Unidade 1) |
| 14.2 — Lições Aprendidas da Unidade 2 | 2 (Unidade 2) |

Ainda **não escritas**, e por isso ausentes do menu: a Seção **13 (Backlog do Produto)** e
o vídeo da Unidade 2, previstos para a Entrega 2, e as Seções **14.3** e **14.4** (lições das
Unidades 3 e 4). Quando forem escritas, basta seguir
[Acrescentar uma página](#acrescentar-uma-página) — há um comentário em
`assets/js/sumario.js` indicando o lugar da Seção 13.

As páginas da seção *Visão do Produto e Projeto* reproduzem o documento e nada além dele,
com uma exceção deliberada: as Seções 2.3, 8, 9, 10 e 11 trazem notas que registram a
origem dos requisitos e as pendências de validação, porque a alternativa seria publicar
divergência sem aviso.

---

## Pendências para a equipe

| O que | Onde |
|---|---|
| **Vídeo da Unidade 1** | `entregas/unidade-1/index.html`. |
| **GitHub do Allan Kelvin** | `index.html` — é o único integrante que não aparece na lista de colaboradores do repositório, então o cartão dele mostra as iniciais e "@ a preencher". Salve o avatar em `assets/img/equipe/` (WebP, 144 × 144) e troque, no cartão dele, as iniciais pela `<img>` e o "@ a preencher" pelo link do GitHub, copiando o cartão de outro integrante. |
| **Como comprovar o objetivo geral** | Seção 2.1 tem uma pendência registrada pela equipe (indicadores de verificação). |
| **Validação da priorização e do MVP com a cliente** | Seções 9.8 e 10.4 — a reunião de 05/10/2026 com a Dra. Cláudia Araújo Bottino validou 14 dos 36 RFs; os demais e o MVP consolidado seguem como hipótese da equipe, a validar na reunião de acompanhamento. |
| **Valores de negócio VN1–VN7** | Seção 2.3 — redigidos pela equipe a partir dos critérios da Seção 9.2 após o realinhamento das características; aguardam validação com a cliente. |
| **Seção 13 (Backlog do Produto) e vídeo da Unidade 2** | Itens da Entrega 2 ainda não publicados. |
| **RNF05** | Não existe no quadro: a numeração salta de RNF04 para RNF06. Confirmar se houve descarte e registrar, ou renumerar (achado 03 da Seção 11.8). |

---

## Como editar o site

### Editar uma página

Cada página é o `index.html` da pasta com o seu endereço: a Seção 8 está em
`visao/08-requisitos-de-software/index.html`. O conteúdo fica entre
`<article class="article-content">` e `</article>`; o resto (sumário, barra superior,
rodapé) é igual em todas as páginas.

Os blocos do conteúdo usam classes de `assets/css/custom.css`. O jeito mais seguro de criar
um bloco novo é copiar um que já existe em outra página:

| Bloco | Marcação |
|---|---|
| Tabela | `<div class="table-scroll" tabindex="0" role="region" aria-label="Tabela"><table>…</table></div>`. Com 3 ou mais colunas, a `<table>` leva `style="min-width:…px"` (190 px por coluna; 205 px a partir de 5 colunas); células curtas (até 16 caracteres) levam `class="td-curta"` para não quebrar linha. Tabela sem cabeçalho: acrescente `table-plain` à `<div>`. |
| Figura | `<figure class="figura">` com a `<img>` em `srcset` (480, 800 e 1280 px) e a `<figcaption>` |
| Cartão de acesso | `<a class="cartao">` dentro de `<div class="card-grid">` (página inicial) |
| Integrante | `<div class="membro">` dentro de `<div class="equipe-grid">` (página inicial) |
| Evidência | `<details class="trecho">` (recolhida) ou `<section class="trecho">` (aberta), nas páginas das iterações |
| Vídeo | `<div class="video-embed">` com o `<iframe>` do YouTube (`youtube-nocookie.com`) |
| Quadro externo | `<figure class="embed">` com o `<iframe>` do Figma ou do Notion |

As evidências das iterações são **cópias** de subseções do Documento de Visão. Se a seção de
origem mudar e a evidência precisar acompanhar, copie o trecho de novo.

### Acrescentar uma página

1. Copie a pasta de uma página da mesma seção (por exemplo, `visao/12-dor-e-dod/`) com o novo
   nome e troque o título (`<title>`, trilha de navegação e `<h1>`), o resumo (`doc-lead`) e
   o conteúdo.
2. Ajuste os links *Anterior* e *Próxima* (`doc-pager`) da nova página e das duas vizinhas.
3. Inclua o item em `assets/js/sumario.js`. O sumário e a busca de todas as páginas passam a
   mostrar a página nova.
4. Se a seção tiver índice (`visao/index.html`, por exemplo), inclua a página na lista
   `doc-index`.

## Rodando localmente

Não há build nem dependências. Abrir o `index.html` no navegador já funciona — só a busca
fica indisponível, porque o navegador não deixa uma página aberta do disco ler as outras.
Para ter tudo, sirva a pasta:

```bash
python3 -m http.server 8000
```

e abra `http://localhost:8000/`.

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
O site usa o ícone da lua no sumário, o wordmark na página inicial (versão de tinta
no tema claro, versão creme no escuro) e a **Fraunces SemiBold** nos títulos —
subconjunto latino em WOFF2, 24 KB. As cores da marca que não alcançavam 4,5:1 de
contraste em texto foram escurecidas: Rose `#EC6F9C` → `#B84371`, Plum `#8A5C77` →
`#6E4A5F`. O ícone da lua está no `<aside class="sidebar">` de cada página e o wordmark no
`<div class="wordmark">` do `index.html`.

## Créditos

Tema [Spectra](https://github.com/JoeYang1412/hugo-theme-spectra) por
[JoeYang1412](https://github.com/JoeYang1412), sob licença MIT
(`assets/LICENSE-spectra.txt`). O site usa o CSS do tema compilado e reduzido
(`assets/css/spectra.css`) e alguns dos seus scripts.
