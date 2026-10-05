# REQ-2026.2-T02-MindCycle

Repositório de projeto da disciplina de **Requisitos de Software (REQ) — Turma 02 — 2026.2**.

**MindCycle** é um aplicativo de organização de tarefas que adapta o planejamento diário
às variações de energia, foco e disposição ao longo do ciclo menstrual, desenvolvido para o
**Laboratório de Competência em Software Livre (LabLivre)** da FCTE/UnB.

📄 **Documentação publicada:** <https://mdsreq-fga-unb.github.io/REQ-2026.2-T02-MindCycle/>

---

## O que há neste repositório

Esta branch (`gh-pages`) contém o **site de documentação** do projeto, gerado com
[Hugo](https://gohugo.io/) e o tema
[Spectra](https://github.com/JoeYang1412/hugo-theme-spectra) (MIT), e publicado
automaticamente no GitHub Pages a cada `push`.

```
.
├── content/                       Conteúdo em Markdown
│   ├── _index.md                  Página inicial (equipe, histórico de revisão)
│   ├── visao/                     Documento de Visão do Produto e Projeto
│   │   ├── _index.md              Índice das seções
│   │   ├── 01-cenario-atual.md    Seção 1
│   │   ├── …                      Seções 2 a 7
│   │   ├── 11-licoes-aprendidas.md
│   │   └── 12-referencias.md
│   └── entregas/
│       └── unidade-1.md           Entrega da Unidade 1 (vídeo e escopo)
├── layouts/                       Templates que substituem os do tema
│   ├── _default/baseof.html       Estrutura da página (barra superior, tema claro/escuro)
│   ├── partials/                  Sumário lateral, scripts e estilos enxutos
│   └── shortcodes/                figura, cartao e membro (WebP responsivo)
├── assets/
│   ├── css/custom.css             Camada visual da documentação
│   ├── img/                       Figuras do Documento de Visão (originais, não publicados)
│   │   └── equipe/                Avatares do GitHub da equipe
│   └── js/search.js               Busca ajustada para documentação (ver comentários)
├── assets/brand/                  Marca (vem da branch main): paleta, logos, Fraunces
├── assets/fonts/                  Fraunces SemiBold, subconjunto latino em WOFF2
├── static/
│   └── img/favicon.svg            Ícone da lua
├── themes/hugo-theme-spectra/     Tema (cópia local, licença MIT)
├── i18n/pt-br.toml                Textos da interface em português
├── hugo.toml                      Configuração do site e menu de navegação
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
| Requisitos funcionais | `RF01` a `RF27` |
| Requisitos não funcionais | `RNF01` a `RNF11`, **sem `RNF05`** |

As Seções 2.2, 2.3, 8 e 6 foram realinhadas a esse conjunto. Antes disso, o site tinha
três estruturas incompatíveis: a Seção 2.3 declarava `CP1`–`CP6` com nomes que não
correspondiam a nenhum requisito elicitado (incluindo *Decompor Tarefas*, sem nenhum RF),
a Seção 8 usava `CP1`–`CP8` e `RF01`–`RF37` com outro significado para os mesmos IDs, e a
Seção 6 remapeava as duas por conta própria.

Se os identificadores mudarem de novo, os lugares a conferir são
`content/visao/02-solucao-proposta.md` (Quadro 2),
`content/visao/08-requisitos-de-software.md` (árvore de derivação e catálogos) e
`content/visao/06-cronograma-e-entregas.md` (Quadro 6, Quadro 7 e considerações 5 e 6).
O levantamento anterior (`requisitos-por-tela-mindcycle.md`, `RF01`–`RF69`) é **histórico**
e não deve ser citado.

## Escopo publicado

O site cobre as Seções **1 a 11**, **14.1** e **15**:

| Seção | Release |
|---|---|
| 1 a 7 — cenário, solução, intervenção social, estratégias, ER, cronograma e equipe | 1 (Unidade 1) |
| 8 — Requisitos de Software | 2 (Unidade 2) |
| 9 — Priorização de Requisitos | 2 (Unidade 2) |
| 10 — Definição e Composição do MVP | 2 (Unidade 2) |
| 11 — Rastreabilidade dos Requisitos | 2 (Unidade 2) |
| 14.1 — Lições Aprendidas da Unidade 1 · 15 — Referências | 1 (Unidade 1) |

Ainda **não escritas**, e por isso ausentes do menu: a Seção **12 (DoR e DoD)** e a Seção
**13 (Backlog do Produto)**, ambas entregas da Release 2, e as Seções **14.2** a **14.4**
(lições das Unidades 2 a 4). Quando forem escritas, basta criar os arquivos em
`content/visao/` e acrescentar as entradas no menu em `hugo.toml` — há um comentário no
arquivo indicando o lugar.

As páginas da seção *Visão do Produto e Projeto* reproduzem o documento e nada além dele,
com uma exceção deliberada: as Seções 2.3, 8, 9, 10 e 11 trazem notas que registram a
origem dos requisitos e as pendências de validação, porque a alternativa seria publicar
divergência sem aviso.

---

## Pendências para a equipe

| O que | Onde |
|---|---|
| **Vídeo da Unidade 1** | `content/entregas/unidade-1.md` — instruções comentadas no arquivo. |
| **GitHub do Allan Kelvin** | `content/_index.md` — é o único integrante que não aparece na lista de colaboradores do repositório, então o cartão dele está sem `github=` e sem `foto=`. Baixe o avatar para `assets/img/equipe/` e preencha os dois parâmetros. |
| **Como comprovar o objetivo geral** | Seção 2.1 tem uma pendência registrada pela equipe (indicadores de verificação). |
| **Validação da priorização e do MVP com a cliente** | Seções 9.8.2 e 10.4.1 — o contato com a Dra. Cláudia Araújo Bottino não ocorreu a tempo da Release 2; as notas de valor de negócio estão registradas como hipótese da equipe. |
| **Valores de negócio VN1–VN7** | Seção 2.3 — redigidos pela equipe a partir dos critérios da Seção 9.2 após o realinhamento das características; aguardam validação com a cliente. |
| **Seções 12 (DoR e DoD) e 13 (Backlog do Produto)** | Entregas da Release 2 ainda não escritas. |
| **RNF05** | Não existe no quadro: a numeração salta de RNF04 para RNF06. Confirmar se houve descarte e registrar, ou renumerar (achado 03 da Seção 11.8). |

---

## Rodando localmente

Requer **Hugo extended ≥ 0.157.0** (o tema exige essa versão; a publicação usa a 0.165.0).

```bash
hugo server
```

O site fica em `http://localhost:1313/REQ-2026.2-T02-MindCycle/`.

Para gerar a versão de produção em `public/`:

```bash
hugo --gc --minify
```

## Publicação

O workflow `.github/workflows/gh-pages.yml` constrói o site e publica no GitHub Pages a cada
`push` nas branches `gh-pages` ou `main`, e também sob demanda (*Run workflow*).

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
`#6E4A5F`. Para trocar qualquer logo, basta apontar `logoIcone`, `logoWordmark` e
`logoWordmarkEscuro` em `hugo.toml` para outro arquivo de `assets/`.

## Créditos

Tema [Spectra](https://github.com/JoeYang1412/hugo-theme-spectra) por
[JoeYang1412](https://github.com/JoeYang1412), sob licença MIT
(`themes/hugo-theme-spectra/LICENSE`).
