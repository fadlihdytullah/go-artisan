# Web Artisan — v2 Design Port Spec (design.pen → Astro)

> Single source of truth for porting `design.pen` into the live Astro site.
> Read this BEFORE implementing anything. The Pencil file is the visual target;
> this doc encodes the cross-cutting decisions, tokens, asset paths, and the map
> of which frame becomes which page/component.

## 0. Goal & approach

Reskin the existing Astro site to the **v2 design language** seen in `design.pen`
(cream base, terracotta/clay accent, Fraunces serif display, flat / no-shadow,
rounded, continuous full-height vertical "Anthropic lines"). This is a **reskin**,
not a rewrite: keep routes, content collections, and MDX content intact. Adopt v2
by (a) re-pointing the existing global tokens to v2 values, (b) restyling the
global component classes, (c) rebuilding the marketing/list/detail pages and shared
chrome to match the frames.

Hard constraints:
- **Astro MUST stay on 5.x** (do NOT let any install bump to 6 — it breaks the
  vite/rolldown build). Do not run `npm install <pkg>`; only `npm run build` / `npm run dev`.
- **No dark mode.** Themes = `light` (default) + `reader` (long-form) only.
- **Flat:** `--shadow: none` everywhere. Rounded corners (~12–16px). No gradients
  as the primary surface (subtle tints OK).
- **Copy language:** ALL UI copy in **English**, EXCEPT **course/roadmap summaries**
  which stay **Bahasa Indonesia**. Lesson body content stays Indonesian.
  → When in doubt, pull the EXACT copy from the frame's text nodes (batch_get).

## 1. Design file

- File: `/Users/timses-234/Downloads/go-artisan/design.pen` (Pencil — read ONLY via
  `mcp__pencil__*` tools; never Read/Grep it; load schemas via ToolSearch
  `select:mcp__pencil__get_screenshot,mcp__pencil__snapshot_layout,mcp__pencil__batch_get`).
- To implement a frame: `snapshot_layout(parentId: <frameId>, maxDepth: 3)` for
  structure + measurements, `batch_get(nodeIds:[...])` for exact text/fills, and a
  `get_screenshot(nodeId: <frameId or section>)` for visual reference.
- **Render glitch:** screenshots occasionally render blank (white text/images) on a
  first pass — just retry once; it self-recovers. Avoid requesting gradient nodes.

### Frame map (top-level frames on canvas)

| Frame ID | Name | Size (w×h) | → Becomes |
|---|---|---|---|
| `nr1kS` | Home | 1440×3691 | `src/pages/index.astro` |
| `zmpXy` | Courses — List | 1440×1536 | `src/pages/courses/index.astro` |
| `nRB05` | Roadmaps — List | 1440×1768 | `src/pages/roadmaps/index.astro` |
| `d4lirQ` | Course Detail — Article/Direct | 1440×1293 | `courses/[...slug].astro` (direct) + lesson reading view |
| `XM9X0` | Course Detail — Tracks | 1440×1808 | tracks template (e.g. go-luminas overview) |
| `NWG8T` | Material Components — Kit | 1440×1629 | global MDX component classes (the kit defines their v2 look) |
| `D5LI78` | Roadmap Detail — Timeline | 1440×1791 | `roadmaps/[...slug].astro` |

Known sub-node IDs (may be stale — verify via snapshot_layout):
- Home: nav `MtVvn`, footer `hVGBd`, logo mark `uHTFB` (uses logo.png), roadmaps row `e5k6lK`.
- Roadmap Detail: hero `ofowU` (horizontal split: text left `YGmmZ` w520, cover `AdT7Q` 504×284, CTA wrap `KFRjP`), timeline section `vZ1zQ`, spine `ma5qn`.

## 2. Tokens (v2)

Authoritative v2 values (from the .pen variables). Re-point the EXISTING globals.css
semantic tokens to these so the whole site adopts v2. Verify text contrast ≥ AA
(4.5:1) on cream before shipping; prefer `accent-deep` for text/links, `accent` for
fills/decoration.

| v2 token | value | role | maps onto existing globals.css token |
|---|---|---|---|
| accent | `#BD5D3E` | terracotta — fills, decoration, hover | `--blue-bright`, `--orange-bright` |
| accent-deep | `#9C4A2F` | dark clay — link/interactive TEXT (AA) | `--blue`, `--orange` |
| accent-soft | `#F0E3D8` | warm tint — badges, section-num, wash | `--blue-soft`, `--orange-soft` |
| bg | `#F3F1E9` | page background (cream) | `--bg` |
| bg-alt | `#EDEADF` | calm surface / zebra | `--paper-soft` |
| card | `#FBFAF5` | card/surface | `--paper` |
| ink | `#22201A` | headings / strong ink | `--ink` |
| text | `#1A1916` | body text | (body color) |
| muted | `#6E6A5C` | secondary / meta | `--ink-muted`, `--ink-soft` (soft a touch darker) |
| faint | `#9A9582` | faintest captions / placeholders | `--line-strong`-ish for text |
| border | `#D9D4C4` | hairline | `--line` |
| border-strong | `#C6C0AC` | strong divider | `--line-strong` |

Fonts:
- display = **Fraunces** (serif) → `--font-display` (h1/h2 big titles) and the
  editorial lede role (`--font-serif`). Fraunces is on Google Fonts (opsz/wght axes).
- body = **Inter** → base body + UI.
- mono = **JetBrains Mono** → `--font-mono`, code blocks.
- Load via Google Fonts `<link>` in `BaseLayout.astro` (and ModuleLayout if it loads
  its own). Replace the current Geist / Newsreader / Geist Mono links.
- Heading scale judgment: h1/h2 = Fraunces; small subheads (h3/h4, eyebrows, chips,
  meta) may stay Inter for legibility — match what the frames show per section.

Radius `--radius-card` ~12–16px. `--shadow: none`. Keep `--shell-max: 1180px`.

## 3. Line system ("Anthropic lines")

- Content lives in a centered **1180px column**. That column has **two continuous
  full-height vertical hairline borders** on its left & right edges
  (`stroke: border, strokeWidth {left:1,right:1}`), unbroken from the top of the
  first content band through the bottom of the footer.
- Achieve continuity by putting each section's vertical padding INSIDE the column,
  not on a wrapper — so the column border = full section height with no gaps.
- **Hero and Nav are FULL-WIDTH with NO side lines** (hero is edge-to-edge).
- The **Footer IS bordered** (side lines continue through it); footer has a
  full-width horizontal rule above the copyright row and full-height vertical
  dividers between footer menu groups.
- **No slash dividers, no dotted texture, no eyebrow bar** (all removed in v2).
- Horizontal full-width rules bracket the Stats band (line above + below).

→ Build a reusable **`PageShell.astro`** (slotted) that renders: full-width nav →
the bordered 1180 column (slot for bands) → footer. Marketing/list/detail pages use
it. Lessons keep `ModuleLayout` (TOC-sidebar layout), just reskinned to v2 tokens.

## 4. Assets (`public/`)

`logo.png` (browser+brush mark on lavender — nav logo), `favicon.svg`,
course thumbs 1:1: `http.png`, `openapi.png`, `redis.png`, `go-luminas.png`,
roadmap covers 16:9 (title baked into artwork): `backend-artisan.png`,
`laravel-artisan.png`, `ai-expeditions.png`, `aws-cloud-practitioner.png`.

## 5. Per-frame composition

### Home (`nr1kS`)
Full-width hero (big Fraunces headline "One clear path / from zero to production" +
lede + terracotta CTA + an isometric/layered tile cluster on the right; full-bleed,
no side lines) → Stats band (4 stats, bracketed by full-width horizontal rules) →
**Explore our roadmaps** (3 roadmap cards: Backend Artisan = live; Laravel Artisan,
AI Expeditions = coming-soon DIMMED; 16:9 covers) → **Latest courses** (2-col course
cards: http / openapi / redis; 1:1 thumbs) → Why band (terracotta panel) → CTA band →
footer. Nav = logo.png mark + "Web Artisan" wordmark; menu only "Roadmap" + "Courses".

### Courses — List (`zmpXy`)
Framed header (inside the lines) → featured **Go Luminas** banner → 3-col grid of the
rest (http / openapi / redis) → footer. No filters (clean catalog).

### Roadmaps — List (`nRB05`)
Framed header → rich stacked rows: cover + Indonesian summary + "INCLUDES" chips +
meta/CTA. Backend Artisan = available (no "available" tag, just present); Laravel /
AI = coming-soon dimmed. Roadmap card = **magazine-cutout** (cover with overlapping
cream panel; NO numeric badge; NO "available" tag).

### Course Detail — Article/Direct (`d4lirQ`)
Article template: sticky "On this page" TOC sidebar + long-form content. Also the
template for each lesson reading view. Header = eyebrow + Fraunces title + lede + meta.

### Course Detail — Tracks (`XM9X0`)
Overview template: hero + progress card + **curriculum accordion** (stage → modules).
Used by track-style courses (e.g. Go Luminas).

### Material Kit (`NWG8T`)
Defines the v2 look of the MDX components — restyle the GLOBAL classes to match:
callouts (`.box`/`.tip`/`.analogy`/`.warn` + note/bridge variants), `.def`,
`.endpoint`/`.ep-*` (method badges: GET teal, POST blue, PUT violet, PATCH amber,
DELETE red), `.compare`, `.recap`, FileTree, dark code block, `.chip`, `.grid`/`.card`.

### Roadmap Detail — Timeline (`D5LI78`)
Clean-split hero (text left + 16:9 cover right) → vertical timeline that connects
course → course down a coral spine (numbered nodes) to a **finish line** (flag) →
footer.

## 6. Component inventory to build/upgrade

Shared chrome: `PageShell.astro` (new), upgrade `Navbar.astro` → v2 (logo.png mark +
wordmark, Roadmap/Courses), new/upgraded **Footer** (full-width top rule + vertical
menu dividers + copyright row).

Reusable (new files, self-contained .astro + scoped `<style>` using v2 tokens):
`RoadmapCard.astro` (magazine cutout), upgrade `CourseCard.astro` (v2 2-col + 1:1
thumb), `StatBand.astro`, `SectionHeader.astro` (framed), `CTABand.astro`,
`WhyBand.astro` (terracotta panel), `RoadmapTimeline.astro` (spine + nodes + finish),
`CurriculumAccordion.astro` (stage→modules), `ArticleTOC.astro` (On this page).

Global (globals.css) restyle to v2: MDX component classes per Material Kit, base
type, tables, code blocks, the shell/line utility classes.

## 7. Build & verify

- `npm run build` must pass (static SSG). Fix type/MDX errors.
- Spot-check fidelity against the frames (Playwright screenshot of `npm run preview`
  optional). Watch the known MDX gotchas: no leaked `</...>` tags at EOF, wrap raw
  `<table>` in `.tbl-wrap`, use literal `{` in inline code (not `&#123;`).
