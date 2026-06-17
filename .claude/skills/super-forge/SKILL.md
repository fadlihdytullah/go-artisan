---
name: super-forge
description: "Inverse of super-refine. From a thin OUTLINE/summary (typically from ChatGPT), author a BRAND-NEW Go backend learning module from scratch IN this repo: design the learning structure (chapters/sections/TOC), research up-to-date facts, curate the best source materials, and write the full enriched module, then build to verify. Aims to turn any backend topic into a Go-output module for a Backend Developer Expert track. TWO tracks: (A) COURSE track (DEFAULT) for general backend topics outside the existing 9 roadmaps (HTTP, OpenAPI, Redis, gRPC, message queues, observability, etc.) — writes into a SEPARATE `courses` collection (src/content/courses/), no skincare anchoring or JS/PHP bridge required, never touches the roadmap modules; (B) ROADMAP track (only when the user explicitly says the outline belongs to one of the 9 Web Artisan roadmaps) — writes into src/content/modules/rNcNN-slug.mdx with the original skincare anchor + JS/PHP bridge. Use whenever the user pastes an outline/bullet summary and wants it turned into a real module, asks to design the chapter/section structure for a backend topic, or wants Claude to make/research/enrich content from an outline. Triggers: 'super-forge', 'buatkan/tulis modul dari outline ini', 'kembangkan outline jadi modul', 'rancang struktur bab/chapter dari ringkasan', 'forge modul', 'tambah course backend', 'ChatGPT kasih outline, kamu yang isi'. Works IN the repo (writes .mdx, bootstraps the course collection/route if missing, creates + registers components, builds), not as a zip. Obeys the writing contract in ai-instructions.md and the design system in src/styles/globals.css."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-forge

Kebalikan dari `super-refine`. Dari **outline ringkas** (biasanya dari ChatGPT), skill ini
**merancang struktur belajar, meriset, mengurasi materi terbaik, lalu menulis modul Go
(backend) lengkap dari nol**, langsung di repo, lalu build untuk verifikasi.

- `super-refine`: ada modul utuh di repo, lalu dipoles & diperkaya.
- `super-forge`: yang ada hanya kerangka/ringkasan; Claude yang **memikirkan urutan bab,
  meriset, mengurasi materi, dan menulis seluruh isinya**.

Tujuan besar: menjadikan pembaca **Backend Developer Expert**, dengan **Go sebagai bahasa
output** semua materinya. Topik apa pun di dunia backend (HTTP, OpenAPI, Redis, gRPC,
message queue, observability, dst.) bisa di-forge menjadi modul Go yang berkualitas.

## Dua track (pilih yang tepat)

Outline yang masuk ditentukan dulu masuk track mana:

### Track A — COURSE (DEFAULT, untuk topik backend umum)

Untuk topik di **luar** 9 roadmap Web Artisan yang sudah ada (mis. OpenAPI, Redis, gRPC,
message queue, rate limiting lanjutan, observability mendalam, dll.). Aturan track ini:

- Ditulis ke **koleksi terpisah `courses`** di `src/content/courses/`, **bukan** ke
  `src/content/modules/`. **JANGAN menyentuh** modul roadmap, listing roadmap, atau
  `roadmap-md/` yang sudah ada.
- **Tidak wajib** menjangkar ke proyek online shop skincare.
- **Tidak wajib** membuat jembatan dari JS/React atau PHP/Laravel. Tulis langsung sebagai
  materi Go backend yang lugas (boleh tetap memberi jembatan bila benar-benar memperjelas,
  tapi itu opsional, bukan kewajiban).
- Sisa kontrak penulisan & sistem desain **tetap berlaku** (lihat di bawah): skema
  frontmatter, komponen sah, aturan MDX, code block, Mermaid, tanpa em dash, Bahasa
  Indonesia penuh, riset terbaru, build bersih.

Ini track utama untuk permintaan "buatkan course/modul backend dari outline ini".

### Track B — ROADMAP (HANYA bila diminta eksplisit)

Hanya dipakai bila pengguna **menyatakan** outline ini milik salah satu dari 9 roadmap Go
Artisan (mis. "ini chapter baru untuk Roadmap 5"). Aturan track ini = perilaku Web Artisan
asli: ditulis ke `src/content/modules/rNcNN-slug.mdx`, **wajib** jembatan dari JS/PHP dan
**wajib** jangkar ke domain online shop skincare, `order` mengikuti rentang roadmap.

Bila ragu track mana, **pilih Track A (Course)** dan konfirmasikan ke pengguna. Jangan
pernah memodifikasi modul roadmap yang sudah ada tanpa diminta.

## Sumber kebenaran (baca dulu, jangan menghafal dari ingatan)

Berlaku untuk KEDUA track:

1. **`ai-instructions.md`** (bagian antara `=== MULAI ===` dan `=== SELESAI ===`) =
   **kontrak penulisan**: skema frontmatter pasti (jangan tambah/kurang field), komponen
   sah, aturan MDX, cara menulis code block & Mermaid, aturan SVG figure. Patuhi 100%.
   Catatan: bagian kontrak yang menyebut "jembatan dari JS/PHP wajib" dan "jangkar
   skincare" hanya mengikat **Track B**; untuk **Track A (Course)** itu opsional.
2. **`component-reference.txt`** (root repo) = **sumber kebenaran komponen** `@components`
   (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip, Hero, Compare,
   FileTree, Endpoint, Def) + pola code block & Mermaid. Jangan mengarang prop/slot/ikon/
   varian komponen TERDAFTAR. Komponen baru lewat jalur adaptif lalu didokumentasikan.
3. **`src/content.config.ts`** — definisi koleksi. Koleksi `modules` (roadmap) sudah ada;
   koleksi `courses` mungkin **belum** ada (bootstrap di Langkah 0 bila perlu).
4. **`src/styles/globals.css`** (area "GO-ARTISAN 2026") untuk gaya yang tersedia, dan
   **`src/components/index.ts`** untuk komponen yang benar-benar diekspor. Bila `index.ts`
   dan `component-reference.txt` tidak cocok, itu drift, samakan keduanya.
5. **Tetangga di koleksi yang sama**: untuk Track A baca course lain di
   `src/content/courses/` (gaya, kedalaman, penomoran `order`); untuk Track B baca modul
   roadmap tetangga + `roadmap-md/NN-*.md` yang bersesuaian (kompas konten & Student Outcome).

## Alur kerja

### 0. Bootstrap infrastruktur Course (Track A, sekali saja bila belum ada)

Cek apakah koleksi `courses` sudah terpasang. Bila **belum**, buat infrastruktur minimal
yang **terpisah penuh** dari roadmap (idempotent, verifikasi dengan build):

1. **`src/content.config.ts`**: tambah koleksi `courses` yang memakai **schema yang sama**
   dengan `modules` (refactor schema jadi satu const bersama, lalu pakai untuk kedua
   koleksi). `loader: glob({ pattern: '**/*.mdx', base: './src/content/courses' })`.
   Tambahkan ke `export const collections = { modules, courses }`.
2. **`src/content/courses/`**: folder konten (terbentuk saat menulis `.mdx` pertama).
3. **`src/pages/kursus/[...slug].astro`**: route course = cermin
   `src/pages/modul/[...slug].astro`, tapi `getCollection('courses')` dan render pakai
   `ModuleLayout` yang sama. prev/next dihitung di dalam himpunan course saja. URL course
   jadi `/kursus/<slug>`.
4. **`src/pages/index.astro`**: tambah **section terpisah** untuk daftar Course (sortir by
   `order`), DI BAWAH/terpisah dari blok kurikulum roadmap. **Jangan** mengubah listing
   roadmap yang sudah ada; cukup tambahkan blok baru yang menarik `getCollection('courses')`.
5. (Opsional) **`src/components/Navbar.astro`**: bila diinginkan, tambah grup/entri Course
   di switcher. Logika grup roadmap saat ini memakai regex `^r(\d+)` pada id; course tidak
   cocok pola itu, jadi tangani sebagai grup terpisah berbasis route `/kursus/`. Bila ragu,
   lewati dulu (homepage + route course sudah cukup untuk mengakses materi).

Verifikasi dengan `npm run build`. Setelah ada, langkah ini dilewati di forge berikutnya.

### 1. Terima & pahami outline; tentukan track

Outline bisa berupa teks tempel, file, atau rujukan. Bila tidak ada, tanyakan. Tentukan:

- **Track** (A Course / B Roadmap) sesuai aturan di atas. Default A.
- **Granularitas**: satu topik → satu `.mdx`. Outline besar mencakup banyak topik/bab →
  **usulkan pembagian** (daftar slug + judul + 1 kalimat cakupan + `order`) dan
  **konfirmasi** sebelum menulis banyak file.

### 2. Tentukan posisi & metadata

- **Track A (Course)**: slug topik yang jelas (mis. `redis-caching`, `openapi-kontrak-api`,
  `grpc-dasar`), bukan pola `rNcNN`. `order` = lanjutan course yang sudah ada (ruang
  `order` Course terpisah dari roadmap; cek tetangga di `src/content/courses/`).
  `target` = `"Course · <Topik>"` (middot literal `·`). `badge` 2–4 huruf.
- **Track B (Roadmap)**: `rNcNN-slug.mdx`, `order` dari rentang roadmap, `target` =
  `"Roadmap N · <Judul Roadmap>"`. (R1 1–12 · R2 13–20 · R3 21–30 · R4 31–38 · R5 39–48 ·
  R6 49–53 · R7 54–58 · R8 59–67 · R9 68–73; verifikasi ke tetangga.)

Konvensi kode tetap berlaku: module path `github.com/kamu/skincare-backend`, uang
`PriceRupiah int64` (jangan float) bila menyentuh domain itu.

### 3. Rancang struktur belajar (inti skill ini)

Ubah outline mentah menjadi **urutan section pedagogis**, bukan salin-tempel bullet jadi
heading. Pola tulang punggung (sesuaikan per topik):

1. **Intro / Kenapa** — motivasi & peta materi; kapan/where konsep ini dipakai di backend.
2. **Mental model** — model pikir inti sebelum sintaks/konfigurasi.
3. **Konsep inti** — satu section per ide besar, dari sederhana ke kompleks.
4. **Penerapan** — contoh Go yang nyata. (Track B: wajib dilabuhkan ke proyek skincare.
   Track A: contoh realistis apa saja, tak harus skincare.)
5. **Hands-on** — langkah membangun sesuatu yang konkret (`<Steps>`/`<Step>` + code block).
6. **Jebakan umum** — kesalahan klasik + cara menghindar.
7. **Ringkasan & Poin Penting** — section terakhir; `summaryHref = #ringkasan`.

Tuliskan rancangan section sebagai daftar `toc` final (num/id/title) sebelum mengisi.
Untuk modul besar, boleh tampilkan rancangan TOC ke pengguna lebih dulu.

### 4. Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber resmi terkini. **Jangan menebak** versi, nama paket,
jalur impor, atau API; kutip dari sumber. Sumber inti per topik:

- Go: go.dev/doc, Effective Go, pkg.go.dev, rilis Go. (Per Juni 2026: Go seri 1.26,
  Modules default, loop variable per-iterasi sejak 1.22, PERIKSA ULANG.)
- Web/API: chi (`github.com/go-chi/chi/v5`), net/http, OpenAPI/Swagger
  (spec OpenAPI 3.x, oapi-codegen / swaggo bila relevan).
- Data/cache: PostgreSQL docs, pgx (`github.com/jackc/pgx/v5`), Redis docs + klien Go
  (mis. `github.com/redis/go-redis/v9`).
- RPC/messaging: gRPC Go (`google.golang.org/grpc`, protobuf), Kafka/NATS/RabbitMQ klien Go.
- Infra/observability: Docker, AWS, OpenTelemetry, Prometheus.

Verifikasi nama paket/jalur impor/versi ke pkg.go.dev sebelum menulisnya di kode.

### 5. Kurasi materi terbaik

Selain memverifikasi fakta, kumpulkan **bahan ajar terbaik**: contoh idiomatik dari dokumen
resmi, pola yang direkomendasikan komunitas Go, dan satu-dua tautan lanjutan yang benar-benar
bernilai (taruh sebagai `[teks](url)` di prosa atau Ringkasan, bukan dump tautan). Pilih
contoh yang bisa dieksekusi mental, bukan generik "foo/bar".

### 6. Tulis modul dari nol (mengikuti kontrak)

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
- Kode = fenced code block dengan `title="path/file.go"`, idiomatik (error sebagai nilai,
  gofmt, accept interfaces/return structs, context sebagai parameter pertama). Bahasa
  Indonesia penuh; gaya tenang, jelas, hangat, teknis; jangan menggurui hal dasar.

### 7. Perkaya visual (sambil menulis)

- **Mermaid (default untuk alur/arsitektur/urutan/state)**: fenced ```mermaid. Sudah
  terpasang via `astro-mermaid`. Caption opsional `<p class="fig-cap">`.
- **FileTree**: untuk struktur proyek. **Code block**: untuk semua kode.
- **SVG `.astro` (khusus)**: hanya untuk konsep yang tak cocok di Mermaid (memori, pointer).
  Aturan SVG: `viewBox`, tanpa `style=`, teks gelap di latar terang, aksen `#006f8a`
  (Go cyan, token `--blue`). Pakai lewat `<Figure>`. SVG mentah tak pernah di `.mdx`.
- **Jembatan JS/PHP** (`<Box variant="bridge">`/`<Compare>`): **wajib di Track B**,
  **opsional di Track A** (pakai hanya bila benar-benar memperjelas).
- **Dilarang**: `<div>` warna sebagai pengganti gambar, atau SVG "sketsa" amatir.

### 8. Komponen adaptif (buat + daftarkan + dokumentasikan)

Bila kebutuhan konten tak tercakup komponen/`globals.css` yang ada, buat komponen baru:
`src/components/<Nama>.astro` (lihat komponen sejenis) → style di `globals.css` area
"GO-ARTISAN 2026" (raw CSS token-driven, **bukan `@apply`**, bukan Tailwind mentah di MDX;
pakai `var(--ink/--ink-soft/--line/--paper/--blue)`, kontras AA >=4.5:1, hormati
`prefers-reduced-motion`) → re-export di `src/components/index.ts` → dokumentasikan di
`component-reference.txt` → import & pakai di `.mdx`.

### 9. Sinkronkan frontmatter & TOC

`toc` **1:1** dengan semua `<Section>` (num/id/urutan sama). Section terakhir = "Ringkasan &
Poin Penting", `summaryHref = #ringkasan`. `id` kebab-case unik. `readingTime` realistis.
Jangan menambah/menghapus field frontmatter di luar skema pasti.

### 10. Verifikasi (wajib)

`npm run build` sampai bersih. Cek gotcha render: tidak ada leak tag di EOF, `<table>` mentah
dibungkus `.tbl-wrap`, dan `&#123;` di dalam inline-code (pakai `{` literal di backtick).
Modul course muncul di section Course homepage + route `/kursus/<slug>`; modul roadmap muncul
di list kurikulum + `/modul/<slug>` lewat `getCollection`.

### 11. Poles akhir (opsional)

Setelah build bersih, modul siap diserahkan ke **`super-refine`** untuk pass kualitas akhir.

## Aturan keras (jangan dilanggar)

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
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan `@apply`,
  bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; versi/jalur impor/API dari sumber terkini.
- Bila outline mencakup banyak modul, konfirmasi rancangan pembagian sebelum menulis banyak file.

## Definition of done

- [ ] Track ditentukan benar (Course = default; Roadmap hanya bila eksplisit). Track A tidak
      menyentuh apa pun milik roadmap.
- [ ] (Track A, bila perlu) infrastruktur Course di-bootstrap: koleksi `courses`, route
      `/kursus/[...slug]`, section Course di homepage; build bersih.
- [ ] **Struktur belajar dirancang** dari outline (TOC pedagogis runtut), bukan salin bullet.
- [ ] Modul baru ditulis penuh di folder yang benar; `order`/`target`/slug konsisten dengan
      track & tetangganya.
- [ ] Konten punya "kenapa", hands-on, jebakan umum; ditutup "Ringkasan & Poin Penting".
      (Track B juga: jembatan JS/PHP + jangkar skincare.)
- [ ] Contoh kode idiomatik, lulus build. Visual relevan (Mermaid untuk alur), tiap diagram
      memperjelas + caption.
- [ ] (Bila perlu) komponen baru dibuat, token-driven, diekspor, dipakai, didokumentasikan.
- [ ] Frontmatter & TOC sinkron 1:1; `readingTime` diisi; field frontmatter tak ditambah.
- [ ] Fakta diverifikasi & materi terbaik dikurasi dari sumber resmi terbaru.
- [ ] `npm run build` bersih; gotcha render dicek. Bahasa Indonesia penuh, tanpa em dash.
