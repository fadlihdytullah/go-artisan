---
name: super-forge
description: "Act as a Curriculum & Learning-Material Architect: from a thin OUTLINE/summary (typically from ChatGPT), design the learning structure (learning arcs, Student Outcomes, pedagogical TOC), research up-to-date facts, curate the best source materials, then author a BRAND-NEW Go backend learning module from scratch IN this repo and build to verify. Turns any backend topic into a Go-output module for a Backend Developer Expert track. TWO tracks: (A) COURSE track (DEFAULT) for general backend topics outside the 9 roadmaps (HTTP, OpenAPI, Redis, gRPC, message queues, observability, etc.) — writes into the existing `courses` collection (src/content/courses/), auto-served at /courses/<slug> and listed on the homepage, no skincare anchoring or JS/PHP bridge required, never touches roadmap modules; (B) ROADMAP track (only when the user explicitly says the outline belongs to one of the 9 Web Artisan roadmaps) — writes into src/content/modules/rNcNN-slug.mdx (rendered at /lessons/<slug>) with the original skincare anchor + JS/PHP bridge. Use whenever the user pastes an outline/bullet summary and wants it turned into a real module, asks to design the chapter/section structure for a backend topic, or wants Claude to research/curate/enrich content from an outline. (If a single COURSE grows into a 1000+ line monolith, hand off to super-chunker to split it into chapters.) Triggers: 'super-forge', 'buatkan/tulis modul dari outline ini', 'kembangkan outline jadi modul', 'rancang struktur bab/chapter dari ringkasan', 'forge modul', 'tambah course backend', 'ChatGPT kasih outline, kamu yang isi'. Works IN the repo (writes .mdx, creates + registers components, builds), not as a zip. Obeys the writing contract in ai-instructions.md and the design system in src/styles/globals.css."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-forge

Jalankan skill ini sebagai **Curriculum & Learning-Material Architect** untuk materi
engineering. Dari **outline ringkas** (biasanya dari ChatGPT), skill ini **merancang
struktur belajar, meriset, mengurasi materi terbaik, lalu menulis modul Go (backend) lengkap
dari nol**, langsung di repo, lalu build untuk verifikasi. Yang ada hanya kerangka; Claude
yang **memikirkan busur belajar, urutan bab, Student Outcome, lalu mengisinya** — bukan
menyalin bullet jadi heading.

Tujuan besar: menjadikan pembaca **Backend Developer Expert**, dengan **Go sebagai bahasa
output** semua materinya. Topik apa pun di dunia backend (HTTP, OpenAPI, Redis, gRPC, message
queue, observability, dst.) bisa di-forge menjadi modul Go berkualitas world-class.

## Keluarga skill (satu paket, satu standar)

Tiga skill ini satu keluarga Curriculum & Learning-Material Architect; pakai kontrak,
kosakata, dan standar mutu yang sama:

- **`super-forge`** — dari OUTLINE tipis → rancang kurikulum lalu tulis modul/course baru
  dari nol. **(skill ini)**
- **`super-refine`** — modul roadmap yang SUDAH ada di repo → poles, perdalam, perkaya ke
  world-class.
- **`super-chunker`** — satu file course monolit raksasa → kurasi jadi chapter koheren +
  perkaya.

Alur antar skill: `super-forge` melahirkan materi; bila sebuah **course** tumbuh jadi monolit
raksasa (1000+ baris satu file), serahkan ke **`super-chunker`** untuk dipecah jadi chapter;
**modul roadmap** yang sudah jadi dipoles oleh **`super-refine`**.

Kosakata bersama: *learning arc* (satu modul/chapter = satu busur belajar menuju Student
Outcome), *Student Outcome* ("di akhir bagian ini kamu bisa ..."), *connect the dots* (jahit
antar bagian), *Mesin enrichment* (rubrik aset pendukung), dan prinsip **"memperjelas, bukan
menggemukkan"**.

## Filosofi inti (jangan dilupakan)

**1. Arsitektur kurikulum dulu, baru tulis.** Ubah outline mentah jadi **urutan section
pedagogis** dengan busur yang jelas dan Student Outcome per bagian. Outline besar yang
mencakup banyak topik → usulkan pembagian modul/chapter dan konfirmasi sebelum menulis
banyak file.

**2. Riset + kurasi sebelum fakta.** Jangan menebak versi/nama paket/API. Verifikasi ke
sumber resmi terkini dan kumpulkan contoh idiomatik terbaik (bukan generik `foo/bar`).

**3. Perkaya = lebih dalam + lebih nyata + lebih nyambung.** Tiap modul punya "kenapa",
use-case nyata, hands-on, jebakan umum, visual yang memperjelas, dan penutup yang menyambung.

**4. Memperjelas, bukan menggemukkan.** Tiap aset tambahan harus "membayar tempatnya".
Jangan menambah diagram untuk ide yang sudah jelas dalam satu kalimat.

## Dua track (pilih yang tepat)

### Track A — COURSE (DEFAULT, untuk topik backend umum)

Untuk topik di **luar** 9 roadmap Web Artisan (mis. OpenAPI, Redis, gRPC, message queue,
observability mendalam, dll.). Aturan track ini:

- Ditulis ke **koleksi `courses`** di `src/content/courses/` (koleksi ini **sudah ada**).
  Otomatis tersaji di `/courses/<slug>` lewat `src/pages/courses/[...slug].astro` dan muncul
  di blok "Latest courses" homepage lewat `getCollection('courses')`. **JANGAN menyentuh**
  modul roadmap, listing roadmap, atau `roadmap-md/`.
- **Tidak wajib** menjangkar ke proyek online shop skincare.
- **Tidak wajib** jembatan dari JS/React atau PHP/Laravel (boleh bila benar-benar
  memperjelas; opsional, bukan kewajiban).
- Sisa kontrak penulisan & sistem desain tetap berlaku.

Ini track utama untuk "buatkan course/modul backend dari outline ini".

### Track B — ROADMAP (HANYA bila diminta eksplisit)

Hanya bila pengguna **menyatakan** outline ini milik salah satu dari 9 roadmap Go Artisan
(mis. "ini chapter baru untuk Roadmap 5"). Aturan = perilaku Web Artisan asli: ditulis ke
`src/content/modules/rNcNN-slug.mdx` (render di `/lessons/<slug>`, tampil di katalog
`courses/go-luminas.astro`), **wajib** jembatan dari JS/PHP dan **wajib** jangkar ke domain
online shop skincare, `order` mengikuti rentang roadmap.

Bila ragu track mana, **pilih Track A (Course)** dan konfirmasi. Jangan pernah memodifikasi
modul roadmap yang sudah ada tanpa diminta.

## Sumber kebenaran (baca dulu, jangan menghafal dari ingatan)

Berlaku untuk KEDUA track:

1. **`ai-instructions.md`** (bagian antara `=== MULAI ===` dan `=== SELESAI ===`) =
   **kontrak penulisan**: skema frontmatter pasti (jangan tambah/kurang field), komponen
   sah, aturan MDX, code block & Mermaid, aturan SVG figure. Patuhi 100%. Catatan: "jembatan
   JS/PHP wajib" dan "jangkar skincare" hanya mengikat **Track B**; untuk **Track A** itu
   opsional.
2. **`component-reference.txt`** (root repo) = **sumber kebenaran komponen** `@components`
   (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip, Hero, Compare, FileTree,
   Endpoint, Def) + pola code block & Mermaid. Jangan mengarang prop/slot/ikon/varian
   komponen TERDAFTAR. Komponen baru lewat jalur adaptif lalu didokumentasikan.
3. **`src/content.config.ts`** — definisi koleksi (`modules`, `courses`, `aws`, `roadmaps`).
   Koleksi `courses` & `modules` **sudah ada**; tak perlu bootstrap.
4. **`src/styles/globals.css`** (area "GO-ARTISAN 2026") untuk gaya, dan
   **`src/components/index.ts`** untuk komponen yang benar-benar diekspor. Bila tak cocok
   dengan `component-reference.txt`, itu drift, samakan keduanya.
5. **Tetangga di koleksi yang sama**: Track A → baca course lain di `src/content/courses/`
   (gaya, kedalaman, penomoran `order`, pola entry tipis seperti `aws.mdx`/`go-luminas.mdx`);
   Track B → baca modul roadmap tetangga (`rNc*`) + `roadmap-md/NN-*.md` yang bersesuaian
   (kompas konten & Student Outcome).

Konvensi kode (Track B / saat menyentuh domain): module path
`github.com/kamu/skincare-backend`, uang `PriceRupiah int64` (jangan float).

## Mesin enrichment (rubrik bersama keluarga skill)

Sambil menulis, jalankan rubrik ini; tiap "tambah X" dipicu bentuk konten:

1. **Use-case nyata** — bagaimana konsep dipakai sistem/tim sungguhan (Track B: dilabuhkan ke
   online shop skincare; Track A: contoh realistis apa saja, tak harus skincare). Hindari
   `foo/bar`.
2. **Visual (Mermaid default)** — alur/arsitektur/urutan/state → ```mermaid (flowchart,
   sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram) + caption `<p class="fig-cap">`.
   SVG `.astro` HANYA untuk konsep yang tak cocok di Mermaid (memori, pointer).
3. **Analogi** — konsep abstrak → `<Box variant="analogy">`.
4. **Hands-on** — prosedur konkret → `<Steps>`/`<Step>` + code block `title=`.
5. **Best practice & jebakan** — cara idiomatik → `<Box variant="tip">`; kesalahan klasik →
   `<Box variant="warn">`.
6. **Perbandingan** — dua pendekatan bersaing → `<Compare>`. (Track B: jembatan JS/PHP via
   `<Box variant="bridge">`/`<Compare>` WAJIB; Track A opsional.)
7. **Kumpulan item terkait** — `<CardGrid>`/`<Card>`. **Struktur proyek** → `<FileTree>`.
8. **Kode nyata & idiomatik** — error sebagai nilai, gofmt, accept interfaces/return structs,
   context param pertama; `title="path/file.go"`.
9. **Connect the dots** — transisi antar section; tutup dengan "Ringkasan & Poin Penting"
   (`<Recap>`, `summaryHref = #ringkasan`).

Guardrail: setiap diagram/box memperjelas, bukan hiasan. **Dilarang**: `<div>` warna sebagai
pengganti gambar, atau SVG "sketsa" amatir.

## Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber resmi terkini. **Jangan menebak** versi/nama paket/
jalur impor/API; kutip dari sumber. Sumber inti per topik:

- Go: go.dev/doc, Effective Go, pkg.go.dev, rilis Go. (Per Juni 2026: Go seri 1.26, Modules
  default, loop variable per-iterasi sejak 1.22, PERIKSA ULANG.)
- Web/API: chi (`github.com/go-chi/chi/v5`), net/http, OpenAPI/Swagger (spec OpenAPI 3.x,
  oapi-codegen / swaggo bila relevan).
- Data/cache: PostgreSQL docs, pgx (`github.com/jackc/pgx/v5`), Redis docs + klien Go
  (`github.com/redis/go-redis/v9`).
- RPC/messaging: gRPC Go (`google.golang.org/grpc`, protobuf), Kafka/NATS/RabbitMQ klien Go.
- Infra/observability: Docker, AWS, OpenTelemetry, Prometheus.

Verifikasi nama paket/jalur impor/versi ke pkg.go.dev sebelum menulisnya di kode.

## Kurasi materi terbaik

Selain memverifikasi fakta, kumpulkan **bahan ajar terbaik**: contoh idiomatik dari dokumen
resmi, pola yang direkomendasikan komunitas Go, dan satu-dua tautan lanjutan yang
benar-benar bernilai (taruh sebagai `[teks](url)` di prosa/Ringkasan, bukan dump tautan).
Pilih contoh yang bisa dieksekusi mental, bukan generik.

## Alur kerja

### 0. Verifikasi infrastruktur (umumnya sudah lengkap)

Koleksi `courses` & `modules`, route `/courses/[...slug]` & `/lessons/[...slug]`, dan blok
"Latest courses" di homepage **sudah ada**. Track A cukup menulis `.mdx` ke
`src/content/courses/`; ia otomatis muncul. Hanya bila infrastruktur itu benar-benar hilang
(repo baru), bootstrap idempotent dengan meniru pola yang ada, lalu verifikasi via build.

### 1. Terima & pahami outline; tentukan track

Outline bisa teks tempel, file, atau rujukan; bila tidak ada, tanyakan. Tentukan:

- **Track** (A Course / B Roadmap). Default A.
- **Granularitas**: satu topik → satu `.mdx`. Outline besar mencakup banyak topik/bab →
  **usulkan pembagian** (daftar slug + judul + 1 kalimat cakupan + Student Outcome + `order`)
  dan **konfirmasi** sebelum menulis banyak file.

### 2. Tentukan posisi & metadata

- **Track A (Course)**: slug topik yang jelas (mis. `redis-caching`, `openapi-kontrak-api`,
  `grpc-dasar`), bukan pola `rNcNN`. `order` = lanjutan course yang sudah ada (ruang `order`
  Course terpisah dari roadmap; cek tetangga di `src/content/courses/`). `target` =
  `"Course · <Topik>"` (middot literal `·`). `badge` 2–4 huruf. URL jadi `/courses/<slug>`.
- **Track B (Roadmap)**: `rNcNN-slug.mdx`, `order` dari rentang roadmap, `target` =
  `"Roadmap N · <Judul Roadmap>"`. (R1 1–12 · R2 13–20 · R3 21–30 · R4 31–38 · R5 39–48 ·
  R6 49–53 · R7 54–58 · R8 59–67 · R9 68–73; verifikasi ke tetangga.) URL jadi `/lessons/<slug>`.

### 3. Rancang struktur belajar (inti skill ini)

Ubah outline mentah jadi **urutan section pedagogis**. Pola tulang punggung (sesuaikan per
topik), tiap section punya Student Outcome:

1. **Intro / Kenapa** — motivasi & peta materi; kapan/di mana konsep dipakai di backend.
2. **Mental model** — model pikir inti sebelum sintaks/konfigurasi.
3. **Konsep inti** — satu section per ide besar, dari sederhana ke kompleks.
4. **Penerapan** — contoh Go nyata. (Track B: wajib dilabuhkan ke proyek skincare. Track A:
   contoh realistis apa saja.)
5. **Hands-on** — langkah membangun sesuatu yang konkret (`<Steps>`/`<Step>` + code block).
6. **Jebakan umum** — kesalahan klasik + cara menghindar.
7. **Ringkasan & Poin Penting** — section terakhir; `summaryHref = #ringkasan`.

Tuliskan rancangan section sebagai daftar `toc` final (num/id/title) sebelum mengisi. Untuk
modul besar, boleh tampilkan rancangan TOC ke pengguna lebih dulu.

### 4. Riset terbaru

Jalankan riset + kurasi (di atas) untuk tiap fakta sebelum menulisnya.

### 5. Tulis modul dari nol (mengikuti kontrak)

Tulis `.mdx` ke folder yang sesuai track, ikuti `ai-instructions.md`:

- Frontmatter sesuai **skema pasti** (title, badge, topTitle, topSub, summary, order, target,
  readingTime, summaryHref, toc, footerTitle, footerSub). Jangan tambah/kurang field.
- Baris import hanya komponen yang dipakai, dari `@components`.
- `<Hero>` sekali di atas; judul HANYA via prop `title` (boleh `<em>` + `<br />`); `<Chip>`
  hanya di slot meta Hero, ikon dari daftar sah.
- Satu `<Section num id title>` per entri `toc` (1:1, urutan & id sama).
- Tiap `<p>`/`<li>`/blok daun berteks **satu baris** (kecuali isi fenced code & ```mermaid).
- Sub-judul `<h3>`/`<h4>` saja; tanpa `<h1>`/`<h2>` manual.
- `<Box>` hanya 5 varian (tip/analogy/warn/note/bridge). Escape `&#123;`/`&#125;` di TEKS MDX
  (bukan di code/mermaid). Pakai `&middot;`/`&rarr;` di konteks set:html; literal `·`/`→` di
  frontmatter & prop teks polos. **Tanpa em dash** di mana pun.
- Bahasa Indonesia penuh; gaya tenang, jelas, hangat, teknis; jangan menggurui hal dasar.

### 6. Perkaya visual (sambil menulis)

Jalankan "Mesin enrichment" di atas: Mermaid untuk alur/arsitektur/urutan/state; FileTree
untuk struktur proyek; code block untuk semua kode; SVG `.astro` hanya untuk konsep yang tak
cocok di Mermaid (memori, pointer) — aturan SVG: `viewBox`, tanpa `style=`, teks gelap di
latar terang, aksen `#006f8a` (token `--blue`), pakai lewat `<Figure>`, tak pernah di `.mdx`.
Jembatan JS/PHP **wajib di Track B**, **opsional di Track A**.

### 7. Komponen adaptif (buat + daftarkan + dokumentasikan)

Bila kebutuhan konten tak tercakup komponen/`globals.css` yang ada, buat komponen baru:
`src/components/<Nama>.astro` (lihat komponen sejenis) → style di `globals.css` area
"GO-ARTISAN 2026" (raw CSS token-driven, **bukan `@apply`**, bukan Tailwind mentah di MDX;
pakai `var(--ink/--ink-soft/--line/--paper/--blue)`, kontras AA >=4.5:1, hormati
`prefers-reduced-motion`) → re-export di `src/components/index.ts` → dokumentasikan di
`component-reference.txt` → import & pakai di `.mdx`.

### 8. Sinkronkan frontmatter & TOC

`toc` **1:1** dengan semua `<Section>` (num/id/urutan sama). Section terakhir = "Ringkasan &
Poin Penting", `summaryHref = #ringkasan`. `id` kebab-case unik. `readingTime` realistis.
Jangan menambah/menghapus field frontmatter di luar skema pasti.

### 9. Verifikasi (wajib)

`npm run build` sampai bersih. Cek gotcha render: tidak ada leak tag di EOF, `<table>` mentah
dibungkus `.tbl-wrap`, `&#123;` di dalam inline-code (pakai `{` literal di backtick). Track A:
course muncul di `/courses/<slug>` + blok "Latest courses" homepage. Track B: modul muncul di
`/lessons/<slug>` + katalog roadmap `courses/go-luminas.astro`.

### 10. Poles akhir (opsional, serahkan ke keluarga skill)

Setelah build bersih: modul **roadmap** (Track B) siap diserahkan ke **`super-refine`** untuk
pass kualitas akhir. **Course** (Track A) yang tumbuh jadi monolit raksasa diserahkan ke
**`super-chunker`** untuk dipecah jadi chapter + diperkaya.

## Aturan keras (jangan dilanggar)

- **Rancang dulu, baru tulis.** Struktur belajar (busur + Student Outcome + urutan
  pedagogis) ditetapkan sebelum mengisi; jangan salin bullet outline jadi heading.
- **Connect the dots.** Beri transisi antar section; tutup dengan "Ringkasan & Poin Penting".
- Patuhi seluruh kontrak `ai-instructions.md` (frontmatter, komponen, MDX, code block,
  Mermaid, SVG) untuk KEDUA track.
- **Track A (Course)**: tulis ke `src/content/courses/`, JANGAN sentuh modul roadmap /
  listing roadmap / `roadmap-md/`. Jangkar skincare & jembatan JS/PHP OPSIONAL.
- **Track B (Roadmap)**: hanya bila diminta eksplisit; jembatan JS/PHP & jangkar skincare
  WAJIB; `order` ikut rentang roadmap.
- Tanpa `<h1>`/`<h2>` manual; tiap blok berteks satu baris (kecuali code/mermaid).
- Kode = fenced code block dengan `title=`. Diagram alur = ```mermaid. SVG mentah hanya di
  `.astro`.
- Box hanya 5 varian sah (tip/analogy/warn/note/bridge); Chip hanya di slot meta Hero, ikon
  dari daftar sah. Jangan varian "exam".
- Komponen sah + prop/slot/varian = `component-reference.txt`. Komponen baru → perbarui
  `component-reference.txt` + `index.ts`.
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan
  `@apply`, bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; versi/jalur impor/API dari sumber terkini.
- Bila outline mencakup banyak modul, konfirmasi rancangan pembagian sebelum menulis banyak file.

## Definition of done

- [ ] Track ditentukan benar (Course = default; Roadmap hanya bila eksplisit). Track A tidak
      menyentuh apa pun milik roadmap.
- [ ] **Struktur belajar dirancang** dari outline (busur + Student Outcome + TOC pedagogis
      runtut), bukan salin bullet; antar section dijahit (connect the dots).
- [ ] Modul baru ditulis penuh di folder yang benar; `order`/`target`/slug konsisten dengan
      track & tetangganya.
- [ ] Konten punya "kenapa", use-case nyata, hands-on, jebakan umum; ditutup "Ringkasan &
      Poin Penting". (Track B juga: jembatan JS/PHP + jangkar skincare.)
- [ ] Contoh kode idiomatik, lulus build. Visual relevan (Mermaid untuk alur); tiap diagram
      memperjelas + caption.
- [ ] (Bila perlu) komponen baru dibuat, token-driven, diekspor, dipakai, didokumentasikan.
- [ ] Frontmatter & TOC sinkron 1:1; `readingTime` diisi; field frontmatter tak ditambah.
- [ ] Fakta diverifikasi & materi terbaik dikurasi dari sumber resmi terbaru.
- [ ] `npm run build` bersih; Track A tampil di `/courses/<slug>` + homepage, Track B di
      `/lessons/<slug>` + katalog roadmap. Bahasa Indonesia penuh, tanpa em dash.
