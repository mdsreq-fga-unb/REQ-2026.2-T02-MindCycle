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
│       └── unidade-1.md           Entrega da Unidade 1 (vídeo, slides, escopo)
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
│   ├── img/favicon.svg            Ícone da lua
│   └── entregas/unidade-1/        Slides da Unidade 1 (a adicionar)
├── themes/hugo-theme-spectra/     Tema (cópia local, licença MIT)
├── i18n/pt-br.toml                Textos da interface em português
├── hugo.toml                      Configuração do site e menu de navegação
└── .github/workflows/gh-pages.yml Publicação automática
```

## Escopo publicado

O site cobre o Documento de Visão **versão 1.0**, entregue na **Release 1 (Unidade 1)**:
Seções **1 a 7**, **11.1** e **12**.

As Seções **8 (Requisitos de Software)**, **9 (DoR e DoD)** e **10 (Backlog de Produto)** —
e a Seção **11.2** — estão marcadas no documento original como *"a ser entregue na Unidade
2"* e, por isso, não aparecem no site. Quando forem escritas, basta criar os arquivos em
`content/visao/` e acrescentar as entradas no menu em `hugo.toml`.

As páginas da seção *Visão do Produto e Projeto* reproduzem o documento e nada além dele:
sem avisos, notas de rodapé editoriais ou subtítulos que o documento não tenha.

---

## Pendências para a equipe

| O que | Onde |
|---|---|
| **Seções 2.2 e 2.3 desatualizadas** | A Seção 6 do documento passou a citar **OE1–OE6** e **CP1–CP9** com nomes novos; as Seções 2.2 e 2.3 ainda listam OE1–OE3 e CP1–CP6 com os nomes antigos. |
| **Vídeo da Unidade 1** | `content/entregas/unidade-1.md` — instruções comentadas no arquivo. |
| **Slides da Unidade 1** | Colocar os arquivos em `static/entregas/unidade-1/` e descomentar o bloco de links. |
| **GitHub do Allan Kelvin** | `content/_index.md` — é o único integrante que não aparece na lista de colaboradores do repositório, então o cartão dele está sem `github=` e sem `foto=`. Baixe o avatar para `assets/img/equipe/` e preencha os dois parâmetros. |
| **Como comprovar o objetivo geral** | Seção 2.1 tem uma pendência registrada pela equipe (indicadores de verificação). |

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
