# Brand — MindCycle

Ativos de marca do **MindCycle**. Tudo aqui é versionável e pronto para commitar no repositório.

> **Slogan:** _Produtividade no ritmo do seu ciclo._

## Estrutura

```
brand/
├── README.md              ← este arquivo
├── slogan.md              ← slogan principal, tagline e variações
├── banner/                ← banner do README (claro e escuro)
│   ├── readme-banner-light.svg / .png
│   └── readme-banner-dark.svg  / .png
├── colors/                ← paleta em formatos de indústria
│   ├── palette.md         ← documentação (hex, rgb, uso)
│   ├── colors.css         ← CSS custom properties (--mc-*)
│   ├── colors.scss        ← variáveis SCSS
│   ├── colors.tokens.json ← design tokens (formato W3C)
│   └── swatches.svg / .png
├── logo/                  ← logotipo e símbolos (SVG + PNG)
│   ├── wordmark/          ← "MindCycle" (5 fundos)
│   ├── icon-lua/          ← ícone da Lua — versão original (5 fundos)
│   └── symbol-mare/       ← símbolo "Maré" (5 fundos)
└── typography/            ← fonte do logo + licença
    ├── Fraunces-SemiBold.ttf   (usada no wordmark)
    ├── Fraunces-Regular.ttf
    ├── Fraunces-Italic.ttf
    ├── Fraunces-OFL-License.txt
    └── typography.md
```

Cada logo vem em **SVG** (vetor, escalável) e **PNG** (alta resolução), nos fundos
`transparente`, `claro`, `escuro`, `blush` e `cor`.

## Usar o banner no README do repositório

```markdown
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="brand/banner/readme-banner-dark.png">
  <img alt="MindCycle" src="brand/banner/readme-banner-light.png" width="100%">
</picture>
```

## Paleta (referência rápida)

| Papel | Nome | HEX |
|---|---|---|
| Primária | Rose | `#EC6F9C` |
| Primária escura | Rose Deep | `#D6558A` |
| Secundária | Lilac | `#A98BD1` |
| Acento | Coral | `#FF9E86` |
| Tinta do wordmark | Plum | `#8A5C77` |
| Marca em fundo escuro | Cream | `#FFF4EC` |

Detalhes, RGB e usos em [`colors/palette.md`](colors/palette.md).

## Tipografia

Logotipo em **Fraunces SemiBold**. Fonte e licença (SIL OFL 1.1) em
[`typography/`](typography/). Fonte de apoio para interface: **Nunito Sans**.

---
Feito para o projeto MindCycle — Lab Livre / FCTE-UnB.
