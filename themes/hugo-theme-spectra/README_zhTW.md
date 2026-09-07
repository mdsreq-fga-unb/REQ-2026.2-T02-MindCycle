# Spectra — Hugo 主題

一款科幻風格融合現代 UI 的 Hugo 部落格主題，具備動畫效果、深色/淺色模式切換等功能。

**[線上 Demo](https://joeyang1412.github.io/hugo-theme-spectra/)**

![Screenshot](https://raw.githubusercontent.com/JoeYang1412/hugo-theme-spectra/main/images/screenshot_zhTW.jpg)

## 目錄

- [功能特色](#功能特色)
- [系統需求](#系統需求)
- [快速開始](#快速開始)
- [設定](#設定)
  - [名詞解釋](#名詞解釋)
  - [基本參數](#基本參數)
  - [Hugo 輸出格式](#hugo-輸出格式)
  - [內容數量限制](#內容數量限制)
  - [Banner 自訂](#banner-自訂)
  - [功能開關](#功能開關)
  - [分享按鈕](#分享按鈕)
  - [自訂 CSS / JS](#自訂-css--js)
  - [樣式覆蓋](#樣式覆蓋)
  - [側邊欄設定](#側邊欄設定)
  - [Markup 設定](#markup-設定)
  - [多語系](#多語系)
  - [導覽選單](#導覽選單)
  - [社群連結](#社群連結)
  - [相關文章](#相關文章)
  - [文章 Front Matter](#文章-front-matter)
  - [圖片放置方式](#圖片放置方式)
- [主題預設設定](#主題預設設定)
- [授權](#授權)

---

## 功能特色

- 深色/淺色模式
- 自帶漸層效果的封面圖，搭配浮動粒子與 L 形角括號裝飾
- 具備開場動畫
- 瀏覽文章時進場動畫
- 程式碼區塊複製按鈕
- KaTeX 數學公式支援（條件載入）
- 文章目錄，閱讀時附帶閱讀進度條
- 多語系支援（ 透過 i18n 實現）
- 滑鼠游標光暈效果（ 桌面版 ）
- 可設定的導覽選單
- 可設定的社群連結，內建 12+ 種平台圖示
- 響應式設計
- 使用 Hugo Pipes 處理 SCSS 編譯與 JS 
- 不需要 npm，JS 使用 Anime.js 與 Fuse.js



## 系統需求

- Hugo Extended v0.157.0+

---

> **聲明：** 本主題有使用 AI ( Claude Code ) 輔助開發完成，作者已完成所有程式碼的審查，並盡可能確保所有功能正確運作且安全。如發現任何問題，歡迎提交 Issue

---

## 快速開始

### 1. 建立新站台並安裝主題

**方式 A：Git Submodule**

```bash
hugo new site my-blog
cd my-blog
git init
git submodule add https://github.com/JoeYang1412/hugo-theme-spectra themes/hugo-theme-spectra
```

**方式 B：Hugo Module**

```bash
hugo new site my-blog
cd my-blog
hugo mod init github.com/your-username/my-blog
```

然後在 `hugo.toml` 加入：

```toml
[module]
  [[module.imports]]
    path = "github.com/JoeYang1412/hugo-theme-spectra"
```

> 使用 Hugo Module 時不需要 `theme = '...'`，由 `[module.imports]` 取代。

### 2. 複製範例設定

**Git Submodule：**

```bash
cp themes/hugo-theme-spectra/exampleSite/hugo.toml .
cp -r themes/hugo-theme-spectra/exampleSite/content ./content
```

**Hugo Module：**

從 GitHub 下載 [exampleSite](https://github.com/JoeYang1412/hugo-theme-spectra/tree/main/exampleSite) 的 `hugo.toml` 和 `content/` 目錄到站台根目錄。

### 3. 修改 `hugo.toml`

- `baseURL` 改成你的網址
- `[languages]` 裡的 `author`、`description`、`social` 改成你的
- Hugo Module 方式：移除 `theme = 'hugo-theme-spectra'` 這行

### 4. 啟動預覽

```bash
hugo server
```

## 設定

你複製的 `hugo.toml` 來自 `exampleSite/hugo.toml`，以下逐一說明各區塊的用途及需要修改的地方。「文章 Front Matter」則是寫在每篇 `.md` 檔案頂部，會另外標註。

> **關於主題預設值**：主題另有一份設定檔（`themes/hugo-theme-spectra/hugo.toml`），Hugo 會自動合併，你不需要動它。詳見文末[主題預設設定](#主題預設設定)。

### 名詞解釋

在設定過程中有一些名詞容易混淆，因此在這裡先統一定義：

| 名詞 | 說明 | 對應設定 |
|------|------|----------|
| 首頁封面 | 首頁最上方的大區塊，含視差背景、浮動粒子與標題文字 | `banner`（背景圖）、`showBanner`（開關）、`bannerTitle`（標題） |
| 文章封面 | 點入單篇文章後，文章頂部顯示的全寬圖片 | Front Matter 的 `cover`、`coverImageQuality`（壓縮品質） |
| 卡片縮圖 | 文章列表中，每張文章卡片上方顯示的縮圖（來源同 `cover`） | `cardImageQuality`（壓縮品質） |
| 側邊欄 | 左側固定的導覽面板，包含頭像、選單、標籤雲、最近文章等 | `[params.sidebar]` 區塊 |
| 標籤 | 側邊欄中的標籤區塊，藍色為一般標籤，粉色為熱門標籤 | `[params.sidebar]` 的 `tagsLimit`、`tagWarmThreshold` |
| 類別 | 側邊欄中的分類區塊，依 `content/posts/` 下的子目錄自動產生 | `showCategories`（開關）、`categoryLimit`（數量上限）、`categoryList`（指定顯示項目） |
| 系列文章 | 將多篇文章歸為同一系列，自動產生上/下篇導航 | Front Matter 的 `series`、`showSeriesNav`（開關） |


### 基本參數

> **多語系注意**：`description`、`author`、`tagline`、`bio`、`banner`、`avatar` 等參數應放在 `[languages.xx.params]` 下，讓每個語言可以有不同的值。

```toml
[languages.zh-tw.params]
  description = '網站描述'
  author = '你的名字'
  tagline = '// Developer'
  bio = '簡短的自我介紹。'
  banner = '/images/banner.webp'      # Banner 背景圖（可選，不設定則使用內建漸層）
  avatar = '/images/avatar.webp'      # Sidebar 頭像（可選）

[languages.en.params]
  description = 'Site description'
  author = 'Your Name'
  tagline = '// Developer'
  bio = 'A short bio.'
```

### Hugo 輸出格式

搜尋功能需要 JSON 輸出格式：

```toml
[outputs]
  home = ['HTML', 'RSS', 'JSON']
```

### 內容數量限制

```toml
[params]
  homepagePostsLimit = 10      # 首頁顯示的文章數量
  cardSummaryLength = 150      # 文章卡片摘要字數
  relatedPostsLimit = 3        # 相關文章顯示數量
  cardImageQuality = 80        # 卡片縮圖壓縮品質（1-100）
  coverImageQuality = 85       # 文章封面圖壓縮品質（1-100）
  # contentImageQuality = 90   # 內文圖片壓縮品質（1-100，需搭配 imageOptimize = true）
```

### Banner 自訂

Banner 區塊的標題文字可以自訂。若不設定 `bannerTitle` / `bannerHighlight`，將使用網站的 `title` 作為預設值：

```toml
[params]
  bannerTitle = 'My'                         # 標題前半段
  bannerHighlight = 'Tech Notes'             # 標題高亮段（漸層色）
```

### 功能開關

所有功能預設為啟用，將值改為 `false` 即可關閉：

```toml
[params]
  enableLoadingAnimation = true    # 頁面載入動畫
  enableMouseGlow = true           # 滑鼠游標光暈效果（僅桌面版）
  showBanner = true                # 首頁封面區塊
  showReadingProgress = true       # 文章內文頁面頂部閱讀進度條
  enableLightbox = true            # 點擊圖片放大檢視
  showScrollTop = true             # 回到頂部按鈕
  enableSearch = true              # 搜尋功能（使用 Fuse.js）
  showRelatedPosts = true          # 文章底部相關文章推薦
  showSeriesNav = true             # 系列文章上/下篇導航
  enableCodeCopy = true            # 程式碼區塊複製按鈕
  enableScrollAnimation = true     # 滾動進場動畫
```

### 分享按鈕

文章頁面的社群分享按鈕，可指定要顯示的平台：

```toml
[params]
  sharePlatforms = ['twitter', 'facebook', 'linkedin'] # 分享平台
```

### 自訂 CSS / JS

如需額外的樣式或腳本，可透過以下參數載入（檔案放在站台的 `static/` 目錄下）：

```toml
[params]
  customCSS = ['css/custom.css']
  customJS = ['js/custom.js']
```

### 樣式覆蓋

可自訂色彩、字體與 Banner 漸層樣式，無需修改主題原始碼：

```toml
[params.style]
  colorAccent = '#4a7de0'                                    # 主色調（科技藍）
  colorAccentWarm = '#e8609e'                                # 暖色調（粉紅）
  colorAccentSoft = '#a78bfa'                                # 柔色調（紫）
  fontDisplay = "'Outfit', sans-serif"                       # 標題字體
  fontBody = "'Zen Maru Gothic', 'Noto Sans TC', sans-serif" # 正文字體
  fontMono = "'JetBrains Mono', monospace"                   # 程式碼字體
  bannerImageText = '#fff'                                   # Banner 標題文字顏色
  # bannerImageSubtitle = 'rgba(255, 255, 255, 0.8)'        # Banner 副標題顏色
  bannerImageGradient = 'linear-gradient(135deg, #4a7de0, #e8609e)' # Banner 漸層（無背景圖時）
  bannerImageGradientFill = 'transparent'                    # Banner 漸層填充
```

如需載入自訂 Google Fonts，可透過 `googleFontsURL` 覆蓋預設字體 URL：

```toml
[params]
  googleFontsURL = 'https://fonts.googleapis.com/css2?family=Your+Font&display=swap'
```

### 側邊欄設定

```toml
[params.sidebar]
  showAllPosts = true      # 顯示所有文章連結
  showCategories = true    # 顯示分類區塊
  showTags = true          # 顯示標籤
  showRecent = true        # 顯示最近文章
  categoryLimit = 5        # 分類顯示數量上限
  tagsLimit = 20           # 標籤雲顯示數量
  recentLimit = 5          # 最近文章顯示數量
  # tagWarmThreshold = 3   # 文章數 >= 此值的標籤顯示粉色（不設定則自動計算）
```

### Markup 設定

程式碼高亮、目錄層級與 KaTeX 數學公式的相關設定：

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

### 多語系

主題支援完整的多語系設定，每個語言可以有獨立的參數、選單和社群連結。

內容檔案以副檔名區分語言版本：
- 繁體中文：`my-post.zh-tw.md`
- 英文：`my-post.en.md`

在 `hugo.toml` 中設定語言：

```toml
defaultContentLanguage = 'en'

[languages]
  [languages.zh-tw]
    languageCode = 'zh-tw'
    languageName = '繁體中文'
    weight = 1
    title = '我的部落格'

    [languages.zh-tw.params]
      description = '網站描述'
      author = '你的名字'
      tagline = '// Developer'
      bio = '自我介紹'

    [[languages.zh-tw.menus.main]]
      name = "首頁"
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

`weight` 決定語言選擇器的排列順序。完整的雙語設定範例請參考 `exampleSite/hugo.toml`。

### 導覽選單

在側邊欄中顯示的導覽選單。多語系時放在 `[[languages.xx.menus.main]]` 下，讓每個語言有不同的選單名稱：

```toml
[[languages.zh-tw.menus.main]]
  name = "首頁"
  pageRef = "/"
  weight = 1
  pre = "⌂"          # 顯示在名稱前的圖示

[[languages.zh-tw.menus.main]]
  name = "文章"
  pageRef = "/posts"
  weight = 2
  pre = "✎"

[[languages.zh-tw.menus.main]]
  name = "關於"
  pageRef = "/about"
  weight = 5
  pre = "◉"
```

| 欄位 | 說明 |
|------|------|
| `name` | 選單顯示名稱 |
| `pageRef` | 對應的頁面路徑（建議使用 `pageRef` 而非 `url`，Hugo 會自動處理多語系路徑） |
| `weight` | 排序權重，數字越小越前面 |
| `pre` | 名稱前的圖示，接受任何文字或 HTML entity |

### 社群連結

在 Sidebar 底部顯示的社群連結圖示。多語系時放在 `[[languages.xx.params.social]]` 下：

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

內建圖示支援以下平台（`name` 大小寫不影響）：

| `name` 值 | `url` 範例 | 備註 |
|-----------|-----------|------|
| `GitHub` | `https://github.com/your-account` | |
| `Twitter` / `X` | `https://x.com/your-account` | 兩者皆可，顯示相同圖示 |
| `HackMD` | `https://hackmd.io/@your-account` | |
| `LinkedIn` | `https://linkedin.com/in/your-account` | |
| `Email` | `mailto:you@example.com` | URL 使用 `mailto:` 格式 |
| `RSS` | `/index.xml` | |
| `Mastodon` | `https://mastodon.social/@your-account` | |
| `YouTube` | `https://youtube.com/@your-channel` | |
| `Instagram` | `https://instagram.com/your-account` | |
| `Facebook` | `https://facebook.com/your-account` | |
| `Discord` | `https://discord.gg/your-invite` | |
| `Threads` | `https://threads.net/@your-account` | |

未在上述列表中的名稱會顯示通用連結圖示。

### 相關文章

文章底部的相關文章推薦基於標籤和日期的相似度計算：

```toml
[related]
  includeNewer = true
  threshold = 50
  toLower = true
  [[related.indices]]
    name = "tags"
    weight = 80          # 標籤相符權重最高
  [[related.indices]]
    name = "date"
    weight = 10
    pattern = "2006"     # 同年份給予少量加分
```

### 文章 Front Matter

> 以下設定寫在每篇文章的 `.md` 檔案頂部，不是 `hugo.toml`。

每篇文章的 Markdown 檔案頂部需包含以下 metadata：

```yaml
---
title: "文章標題"
date: 2025-01-01
draft: false
tags: [標籤1, 標籤2]
series: [系列名稱]        # 系列文章分類（可選，同系列文章會顯示上/下篇導航）
math: false              # 設為 true 則在單篇文章中啟用 KaTeX 數學公式
cover: "/images/my.webp" # 封面圖 URL（可選，建議 WebP 格式、< 200KB）
toc: true                # 顯示內文目錄
description: "文章摘要"   # 用於卡片摘要
---
```

| 欄位 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `title` | string | （必填） | 文章標題 |
| `date` | date | （必填） | 發布日期，用於排序 |
| `draft` | bool | `false` | 設為 `true` 時僅在 `hugo server -D` 模式可見 |
| `tags` | array | `[]` | 標籤，會顯示在 Sidebar 標籤雲中 |
| `series` | array | `[]` | 系列文章，同系列會自動產生上/下篇導航 |
| `math` | bool | `false` | 啟用 KaTeX（僅在需要時開啟，避免載入額外資源） |
| `cover` | string | `""` | 封面圖片路徑 |
| `toc` | bool | `true` | 顯示文章右側目錄（桌面版固定於右側，行動版收合於頂部） |
| `description` | string | `""` | 文章摘要 |

### 圖片放置方式

主題支援三種圖片放置方式，差異在於是否能使用 Hugo 的圖片處理（壓縮、轉 WebP）：

| 放置位置 | 圖片處理 | 適合用途 | 範例路徑 |
|----------|---------|---------|---------|
| 與文章同個目錄 | 有 | 文章專屬的封面圖、內文圖片 | `content/posts/my-post/cover.webp` |
| `assets/images/` | 有 | 多篇文章共用的圖片 | `assets/images/shared-banner.webp` |
| `static/images/` | 無 | 不需處理的靜態圖片（如 favicon） | `static/images/logo.svg` |

**說明：**

- `cardImageQuality`、`coverImageQuality`、`contentImageQuality` 等壓縮品質參數，僅對 Page Bundle 和 `assets/` 中的圖片生效
- `static/` 中的圖片會原封不動輸出，不經過任何處理
- 建議封面圖與內文圖片使用 Page Bundle 或 `assets/`，以獲得自動壓縮與格式轉換的效果

**Page Bundle 範例結構：**

```
content/posts/my-post/
├── index.zh-tw.md
├── index.en.md
├── cover.webp        # 封面圖
└── screenshot.png    # 內文圖片
```

在 Front Matter 中引用：

```yaml
cover: "cover.webp"
```

在 Markdown 內文中引用：

```markdown
![截圖說明](screenshot.png)
```

## 主題預設設定

主題自帶一份設定檔（`themes/hugo-theme-spectra/hugo.toml`），Hugo 會自動與你的站台設定合併，**你不需要修改它**。如需覆蓋某個值，在你的 `hugo.toml` 中設定相同的 key 即可。

以下為主題提供的完整預設值：

```toml
[params]
  math = false                        # 全域 KaTeX 開關（需要時改 true 或在 Front Matter 開啟）
  share = true                        # 文章分享按鈕
  imageOptimize = true                # 啟用圖片壓縮與 WebP 轉換
  bannerSubtitle = '// blog × code × ideas'  # Banner 副標題文字

  # 功能開關（全部預設 true，設 false 可關閉）
  # enableLoadingAnimation / enableMouseGlow / showBanner
  # showReadingProgress / enableLightbox / showScrollTop
  # enableSearch / showRelatedPosts / showSeriesNav
  # enableCodeCopy / enableScrollAnimation

[outputs]
  home = ['HTML', 'RSS', 'JSON']      # 搜尋功能需要 JSON

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

## 授權

[MIT](LICENSE)
