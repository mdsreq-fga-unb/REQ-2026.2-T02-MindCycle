# Spectra — Hugo Theme

A Hugo blog theme blending sci-fi aesthetics with modern UI, featuring animations, dark/light mode toggle, and more.

**[Live Demo](https://joeyang1412.github.io/hugo-theme-spectra/)**

![Screenshot](https://raw.githubusercontent.com/JoeYang1412/hugo-theme-spectra/main/images/screenshot.jpg)

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Glossary](#glossary)
  - [Basic Parameters](#basic-parameters)
  - [Hugo Output Formats](#hugo-output-formats)
  - [Content Limits](#content-limits)
  - [Banner Customization](#banner-customization)
  - [Feature Toggles](#feature-toggles)
  - [Share Buttons](#share-buttons)
  - [Custom CSS / JS](#custom-css--js)
  - [Style Overrides](#style-overrides)
  - [Sidebar Settings](#sidebar-settings)
  - [Markup Settings](#markup-settings)
  - [Multilingual](#multilingual)
  - [Navigation Menu](#navigation-menu)
  - [Social Links](#social-links)
  - [Related Posts](#related-posts)
  - [Post Front Matter](#post-front-matter)
  - [Image Placement](#image-placement)
- [Theme Defaults](#theme-defaults)
- [License](#license)

---

## Features

- Dark/Light mode
- Cover image with built-in gradient effect, floating particles, and L-bracket decorations
- Opening animation
- Scroll entrance animations for browsing posts
- Code block copy button
- KaTeX math formula support (conditional loading)
- Table of Contents with reading progress bar
- Multilingual support (via i18n)
- Mouse cursor glow effect (desktop)
- Configurable navigation menu
- Configurable social links with 12+ built-in platform icons
- Responsive design
- SCSS compilation and JS handling via Hugo Pipes
- No npm required — uses Anime.js and Fuse.js



## Requirements

- Hugo Extended v0.157.0+

---

> **Disclaimer:** This theme was developed with AI (Claude Code) assistance. The author has reviewed all code and made every effort to ensure all features work correctly and securely. If you find any issues, feel free to submit an Issue.

---

## Quick Start

### 1. Create a New Site and Install the Theme

**Method A: Git Submodule**

```bash
hugo new site my-blog
cd my-blog
git init
git submodule add https://github.com/JoeYang1412/hugo-theme-spectra themes/hugo-theme-spectra
```

**Method B: Hugo Module**

```bash
hugo new site my-blog
cd my-blog
hugo mod init github.com/your-username/my-blog
```

Then add the following to `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/JoeYang1412/hugo-theme-spectra"
```

> When using Hugo Module, you don't need `theme = '...'` — it is replaced by `[module.imports]`.

### 2. Copy the Example Configuration

**Git Submodule:**

```bash
cp themes/hugo-theme-spectra/exampleSite/hugo.toml .
cp -r themes/hugo-theme-spectra/exampleSite/content ./content
```

**Hugo Module:**

Download the `hugo.toml` and `content/` directory from the [exampleSite](https://github.com/JoeYang1412/hugo-theme-spectra/tree/main/exampleSite) on GitHub to your site root.

### 3. Edit `hugo.toml`

- Change `baseURL` to your website URL
- Update `author`, `description`, `social` under `[languages]` with your own info
- Hugo Module method: remove the `theme = 'hugo-theme-spectra'` line

### 4. Start the Preview

```bash
hugo server
```

## Configuration

The `hugo.toml` you copied comes from `exampleSite/hugo.toml`. The following sections explain each block and what you may need to modify. "Post Front Matter" refers to settings written at the top of each `.md` file and will be noted separately.

> **About theme defaults**: The theme has its own configuration file (`themes/hugo-theme-spectra/hugo.toml`) which Hugo automatically merges. You don't need to modify it. See [Theme Defaults](#theme-defaults) at the end for details.

### Glossary

Some terms can be confusing during configuration, so here are unified definitions:

| Term | Description | Corresponding Setting |
|------|-------------|----------------------|
| Homepage Banner | The large block at the top of the homepage, containing parallax background, floating particles, and title text | `banner` (background image), `showBanner` (toggle), `bannerTitle` (title) |
| Post Cover | The full-width image displayed at the top of a single post page | Front Matter `cover`, `coverImageQuality` (compression quality) |
| Card Thumbnail | The thumbnail displayed at the top of each post card in the post list (sourced from `cover`) | `cardImageQuality` (compression quality) |
| Sidebar | The fixed navigation panel on the left, containing avatar, menu, tag cloud, recent posts, etc. | `[params.sidebar]` block |
| Tags | The tag section in the sidebar — blue for regular tags, pink for popular tags | `[params.sidebar]` `tagsLimit`, `tagWarmThreshold` |
| Categories | The category section in the sidebar, automatically generated from subdirectories under `content/posts/` | `showCategories` (toggle), `categoryLimit` (max count), `categoryList` (specify displayed items) |
| Series | Groups multiple posts into a series with automatic previous/next navigation | Front Matter `series`, `showSeriesNav` (toggle) |


### Basic Parameters

> **Multilingual note**: Parameters like `description`, `author`, `tagline`, `bio`, `banner`, `avatar` should be placed under `[languages.xx.params]` so each language can have different values.

```toml
[languages.zh-tw.params]
  description = 'Site description'
  author = 'Your Name'
  tagline = '// Developer'
  bio = 'A short bio about yourself.'
  banner = '/images/banner.webp'      # Banner background image (optional, uses built-in gradient if not set)
  avatar = '/images/avatar.webp'      # Sidebar avatar (optional)

[languages.en.params]
  description = 'Site description'
  author = 'Your Name'
  tagline = '// Developer'
  bio = 'A short bio.'
```

### Hugo Output Formats

The search feature requires JSON output format:

```toml
[outputs]
  home = ['HTML', 'RSS', 'JSON']
```

### Content Limits

```toml
[params]
  homepagePostsLimit = 10      # Number of posts displayed on the homepage
  cardSummaryLength = 150      # Post card summary character count
  relatedPostsLimit = 3        # Number of related posts displayed
  cardImageQuality = 80        # Card thumbnail compression quality (1-100)
  coverImageQuality = 85       # Post cover image compression quality (1-100)
  # contentImageQuality = 90   # Content image compression quality (1-100, requires imageOptimize = true)
```

### Banner Customization

The banner section title text can be customized. If `bannerTitle` / `bannerHighlight` are not set, the site `title` will be used as the default:

```toml
[params]
  bannerTitle = 'My'                         # First part of the title
  bannerHighlight = 'Tech Notes'             # Highlighted part of the title (gradient color)
```

### Feature Toggles

All features are enabled by default. Set the value to `false` to disable:

```toml
[params]
  enableLoadingAnimation = true    # Page loading animation
  enableMouseGlow = true           # Mouse cursor glow effect (desktop only)
  showBanner = true                # Homepage banner section
  showReadingProgress = true       # Reading progress bar at the top of post pages
  enableLightbox = true            # Click to enlarge images
  showScrollTop = true             # Scroll to top button
  enableSearch = true              # Search feature (using Fuse.js)
  showRelatedPosts = true          # Related posts recommendation at the bottom of posts
  showSeriesNav = true             # Series post previous/next navigation
  enableCodeCopy = true            # Code block copy button
  enableScrollAnimation = true     # Scroll entrance animations
```

### Share Buttons

Social share buttons on post pages. You can specify which platforms to display:

```toml
[params]
  sharePlatforms = ['twitter', 'facebook', 'linkedin'] # Share platforms
```

### Custom CSS / JS

To load additional styles or scripts, use the following parameters (place files in your site's `static/` directory):

```toml
[params]
  customCSS = ['css/custom.css']
  customJS = ['js/custom.js']
```

### Style Overrides

Customize colors, fonts, and banner gradient styles without modifying the theme source code:

```toml
[params.style]
  colorAccent = '#4a7de0'                                    # Primary color (tech blue)
  colorAccentWarm = '#e8609e'                                # Warm accent (pink)
  colorAccentSoft = '#a78bfa'                                # Soft accent (purple)
  fontDisplay = "'Outfit', sans-serif"                       # Heading font
  fontBody = "'Zen Maru Gothic', 'Noto Sans TC', sans-serif" # Body font
  fontMono = "'JetBrains Mono', monospace"                   # Code font
  bannerImageText = '#fff'                                   # Banner title text color
  # bannerImageSubtitle = 'rgba(255, 255, 255, 0.8)'        # Banner subtitle color
  bannerImageGradient = 'linear-gradient(135deg, #4a7de0, #e8609e)' # Banner gradient (when no background image)
  bannerImageGradientFill = 'transparent'                    # Banner gradient fill
```

To load custom Google Fonts, override the default font URL with `googleFontsURL`:

```toml
[params]
  googleFontsURL = 'https://fonts.googleapis.com/css2?family=Your+Font&display=swap'
```

### Sidebar Settings

```toml
[params.sidebar]
  showAllPosts = true      # Show all posts link
  showCategories = true    # Show categories section
  showTags = true          # Show tags
  showRecent = true        # Show recent posts
  categoryLimit = 5        # Maximum number of categories displayed
  tagsLimit = 20           # Number of tags in the tag cloud
  recentLimit = 5          # Number of recent posts displayed
  # tagWarmThreshold = 3   # Tags with >= this many posts are displayed in pink (auto-calculated if not set)
```

### Markup Settings

Settings related to code highlighting, table of contents levels, and KaTeX math formulas:

```toml
[markup]
  [markup.highlight]
    guessSyntax = true
    noClasses = false
    lineNos = false
    lineNumbersInTable = true
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 4
  [markup.goldmark.renderer]
    unsafe = true
  [markup.goldmark.extensions.passthrough]
    enable = true
    [markup.goldmark.extensions.passthrough.delimiters]
      block = [['$$', '$$']]
      inline = [['$', '$']]
```

### Multilingual

The theme supports full multilingual configuration. Each language can have independent parameters, menus, and social links.

Content files are distinguished by language using filename extensions:
- Traditional Chinese: `my-post.zh-tw.md`
- English: `my-post.en.md`

Configure languages in `hugo.toml`:

```toml
defaultContentLanguage = 'en'

[languages]
  [languages.zh-tw]
    languageCode = 'zh-tw'
    languageName = '繁體中文'
    weight = 1
    title = 'My Blog'

    [languages.zh-tw.params]
      description = 'Site description'
      author = 'Your Name'
      tagline = '// Developer'
      bio = 'About me'

    [[languages.zh-tw.menus.main]]
      name = "Home"
      pageRef = "/"
      weight = 1
      pre = "⌂"

    [[languages.zh-tw.params.social]]
      name = "GitHub"
      url = "https://github.com/your-account"

  [languages.en]
    languageCode = 'en'
    languageName = 'English'
    weight = 2
    title = 'My Blog'

    [languages.en.params]
      description = 'Site description'
      author = 'Your Name'
      tagline = '// Developer'
      bio = 'About me'

    [[languages.en.menus.main]]
      name = "Home"
      pageRef = "/"
      weight = 1
      pre = "⌂"

    [[languages.en.params.social]]
      name = "GitHub"
      url = "https://github.com/your-account"
```

`weight` determines the display order in the language selector. For a complete bilingual configuration example, see `exampleSite/hugo.toml`.

### Navigation Menu

The navigation menu displayed in the sidebar. For multilingual sites, place it under `[[languages.xx.menus.main]]` so each language can have different menu names:

```toml
[[languages.zh-tw.menus.main]]
  name = "Home"
  pageRef = "/"
  weight = 1
  pre = "⌂"          # Icon displayed before the name

[[languages.zh-tw.menus.main]]
  name = "Posts"
  pageRef = "/posts"
  weight = 2
  pre = "✎"

[[languages.zh-tw.menus.main]]
  name = "About"
  pageRef = "/about"
  weight = 5
  pre = "◉"
```

| Field | Description |
|-------|-------------|
| `name` | Menu display name |
| `pageRef` | Corresponding page path (prefer `pageRef` over `url` — Hugo automatically handles multilingual paths) |
| `weight` | Sort weight — lower numbers appear first |
| `pre` | Icon before the name — accepts any text or HTML entity |

### Social Links

Social link icons displayed at the bottom of the sidebar. For multilingual sites, place them under `[[languages.xx.params.social]]`:

```toml
[[languages.zh-tw.params.social]]
  name = "GitHub"
  url = "https://github.com/your-account"

[[languages.zh-tw.params.social]]
  name = "Twitter"
  url = "https://x.com/your-account"

[[languages.zh-tw.params.social]]
  name = "Email"
  url = "mailto:you@example.com"

[[languages.zh-tw.params.social]]
  name = "RSS"
  url = "/index.xml"
```

Built-in icon support for the following platforms (`name` is case-insensitive):

| `name` Value | `url` Example | Notes |
|-------------|---------------|-------|
| `GitHub` | `https://github.com/your-account` | |
| `Twitter` / `X` | `https://x.com/your-account` | Both work, same icon displayed |
| `HackMD` | `https://hackmd.io/@your-account` | |
| `LinkedIn` | `https://linkedin.com/in/your-account` | |
| `Email` | `mailto:you@example.com` | URL uses `mailto:` format |
| `RSS` | `/index.xml` | |
| `Mastodon` | `https://mastodon.social/@your-account` | |
| `YouTube` | `https://youtube.com/@your-channel` | |
| `Instagram` | `https://instagram.com/your-account` | |
| `Facebook` | `https://facebook.com/your-account` | |
| `Discord` | `https://discord.gg/your-invite` | |
| `Threads` | `https://threads.net/@your-account` | |

Names not in the above list will display a generic link icon.

### Related Posts

Related post recommendations at the bottom of posts are based on tag and date similarity:

```toml
[related]
  includeNewer = true
  threshold = 50
  toLower = true
  [[related.indices]]
    name = "tags"
    weight = 80          # Tag match has the highest weight
  [[related.indices]]
    name = "date"
    weight = 10
    pattern = "2006"     # Same year gives a small bonus
```

### Post Front Matter

> The following settings are written at the top of each post's `.md` file, not in `hugo.toml`.

Each post's Markdown file should include the following metadata at the top:

```yaml
---
title: "Post Title"
date: 2025-01-01
draft: false
tags: [tag1, tag2]
series: [series-name]        # Series classification (optional, posts in the same series show previous/next navigation)
math: false                  # Set to true to enable KaTeX math formulas in this post
cover: "/images/my.webp"     # Cover image URL (optional, WebP format recommended, < 200KB)
toc: true                    # Show table of contents
description: "Post summary"  # Used for card summary
---
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | (required) | Post title |
| `date` | date | (required) | Publication date, used for sorting |
| `draft` | bool | `false` | When set to `true`, only visible in `hugo server -D` mode |
| `tags` | array | `[]` | Tags, displayed in the sidebar tag cloud |
| `series` | array | `[]` | Series posts — posts in the same series automatically generate previous/next navigation |
| `math` | bool | `false` | Enable KaTeX (only enable when needed to avoid loading extra resources) |
| `cover` | string | `""` | Cover image path |
| `toc` | bool | `true` | Show table of contents on the right side of the post (fixed on desktop, collapsed at the top on mobile) |
| `description` | string | `""` | Post summary |

### Image Placement

The theme supports three image placement methods, differing in whether Hugo's image processing (compression, WebP conversion) is available:

| Location | Image Processing | Best For | Example Path |
|----------|-----------------|----------|-------------|
| Same directory as the post | Yes | Post-specific cover images, inline images | `content/posts/my-post/cover.webp` |
| `assets/images/` | Yes | Images shared across multiple posts | `assets/images/shared-banner.webp` |
| `static/images/` | No | Static images that don't need processing (e.g., favicon) | `static/images/logo.svg` |

**Notes:**

- Compression quality parameters like `cardImageQuality`, `coverImageQuality`, `contentImageQuality` only apply to images in Page Bundles and `assets/`
- Images in `static/` are output as-is without any processing
- It is recommended to use Page Bundles or `assets/` for cover images and inline images to benefit from automatic compression and format conversion

**Page Bundle Example Structure:**

```
content/posts/my-post/
├── index.zh-tw.md
├── index.en.md
├── cover.webp        # Cover image
└── screenshot.png    # Inline image
```

Reference in Front Matter:

```yaml
cover: "cover.webp"
```

Reference in Markdown content:

```markdown
![Screenshot description](screenshot.png)
```

## Theme Defaults

The theme comes with its own configuration file (`themes/hugo-theme-spectra/hugo.toml`) which Hugo automatically merges with your site configuration — **you don't need to modify it**. To override a value, simply set the same key in your `hugo.toml`.

The following are the complete default values provided by the theme:

```toml
[params]
  math = false                        # Global KaTeX toggle (set to true or enable in Front Matter when needed)
  share = true                        # Post share buttons
  imageOptimize = true                # Enable image compression and WebP conversion
  bannerSubtitle = '// blog × code × ideas'  # Banner subtitle text

  # Feature toggles (all default to true, set to false to disable)
  # enableLoadingAnimation / enableMouseGlow / showBanner
  # showReadingProgress / enableLightbox / showScrollTop
  # enableSearch / showRelatedPosts / showSeriesNav
  # enableCodeCopy / enableScrollAnimation

[outputs]
  home = ['HTML', 'RSS', 'JSON']      # JSON required for search feature

[pagination]
  pagerSize = 10

[taxonomies]
  tag = 'tags'
  series = 'series'

[related]
  includeNewer = true
  threshold = 50
  toLower = true
  [[related.indices]]
    name = "tags"
    weight = 80
  [[related.indices]]
    name = "date"
    weight = 10
    pattern = "2006"
```

## License

[MIT](LICENSE)
