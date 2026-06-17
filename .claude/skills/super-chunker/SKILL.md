---
name: super-chunker
description: "Transform monolithic single-file courses (src/content/courses/*.mdx) into chunked multi-file lesson collections with chapters, ENRICHING each chapter as it is split. Chunking is never a plain copy-paste: every chapter is researched against real-world use cases + current best practices and given complementary, visual learning material (Mermaid, Box, Steps, Compare, CardGrid, real code, Recap) automatically. TWO modes: (A) CHUNK + ENRICH (DEFAULT) — split a monolith into per-chapter files in a dedicated collection (like the aws/ pattern), research + enrich each chapter, build a dedicated CourseHero catalog page, register the collection + routes; (B) ENRICH-only — deepen chapter files that are already split, without touching collection/routing. Targets bloated single-file courses (git.mdx, docker.mdx, http.mdx, openapi.mdx, redis.mdx — each ~1000+ lines). Uses the same lessonSchema + ModuleLayout/ArticleTOC pipeline as the rest of the platform. Triggers: 'course-chunker', 'chunk course', 'split course', 'chunk <nama-course>', 'pisah course', 'pecah modul', 'enrich course', 'perkaya course', 'chunk lalu enrich'. Works IN the repo (writes .mdx, registers collections, creates routes + catalog page, builds), not as a zip."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-chunker

Kebalikan dari menulis dari outline (`super-forge`). Skill ini mengambil **materi kursus
yang sudah ada tetapi terkumpul dalam satu file raksasa** (`src/content/courses/*.mdx`
dengan puluhan section), lalu **memecahnya menjadi file-file chapter terpisah SAMBIL
memperkaya tiap chapter** — bukan sekadar potong-tempel. Setiap chapter hasil pecahan
diriset ulang terhadap **use-case dunia nyata + best practice terkini** dan dilengkapi
materi belajar pendukung & visual (Mermaid, Box, Steps, Compare, contoh kode, Recap)
secara otomatis.

- `super-forge`: dari outline → tulis modul baru dari nol.
- `super-refine`: poles & perkaya modul yang sudah jadi.
- `super-chunker`: dari monolit raksasa → chunked **dan langsung diperkaya**.

Tujuan besar: bukan hanya membelah file, tapi mengubah "satu halaman raksasa yang sulit
dinavigasi" menjadi "kurikulum berchapter yang lebih kaya, lebih konkret, dan lebih nyata"
daripada aslinya. Pemecahan memberi ruang; ruang itu diisi enrichment, bukan dibiarkan
tipis.

## Filosofi inti (jangan dilupakan)

**Chunk = pecah + perkaya, selalu.** Monolit dipotong karena setiap section sebenarnya
layak jadi pelajaran mandiri. Begitu jadi chapter mandiri, ia WAJIB lebih baik dari
potongan aslinya: ada use-case nyata, ada best practice terkini, ada visual yang
memperjelas, ada langkah hands-on. Chapter yang isinya identik dengan section asli =
pekerjaan belum selesai.

Aturan emas enrichment: **memperjelas, bukan menggemukkan.** Tiap aset tambahan harus
"membayar tempatnya" dengan menjelaskan kesulitan nyata. Jangan menambah diagram untuk ide
yang sudah jelas dalam satu kalimat.

## Dua mode (pilih yang tepat)

### Mode A — CHUNK + ENRICH (DEFAULT)

Ambil monolith course dari `src/content/courses/` (mis. `git.mdx`, `docker.mdx`,
`http.mdx`, `openapi.mdx`, `redis.mdx`), analisis struktur `<Section>`-nya, lalu untuk
tiap chapter: riset use-case + best practice, tulis ulang sebagai file chapter mandiri
yang **diperkaya**, dan pasang infrastrukturnya.

Aturan mode ini:

- Membuat koleksi baru di `content.config.ts` (salin dari definisi koleksi `aws`).
- Membuat route chapter `src/pages/<nama>/[...slug].astro` (cermin `aws/[...slug].astro`).
- Membuat **halaman katalog `src/pages/courses/<nama>.astro`** (cermin `courses/aws.astro`,
  pakai `CourseHero` + kelas `.track-*`). **Bukan** sekadar mengandalkan mdx tipis.
- Menambah filter pengecualian course ini di `src/pages/courses/[...slug].astro`.
- `courses/<nama>.mdx` asli **diubah jadi entry tipis** (sumber frontmatter/hero untuk
  halaman katalog `.astro`, seperti `courses/aws.mdx`), BUKAN lagi monolit.
- Tiap chapter mendapat frontmatter sendiri + **enrichment pass wajib** (lihat
  "Mesin enrichment").

### Mode B — ENRICH-only (deepen yang sudah terpecah)

Ambil chapter file yang **sudah** terpecah, lalu perdalam isinya tanpa mengubah struktur
koleksi atau routing. Sama persis dengan "Mesin enrichment" di bawah, tapi dijalankan pada
file chapter yang sudah ada (mis. memperdalam `src/content/aws/06-databases-analytics.mdx`).
Tidak menyentuh `content.config.ts`, route, atau katalog.

Bila ragu: mode default adalah **A**. Mode B hanya bila course memang sudah terpecah jadi
koleksi dan permintaannya murni "perdalam".

## Sumber kebenaran (baca dulu, jangan menghafal dari ingatan)

Berlaku untuk KEDUA mode:

1. **`ai-instructions.md`** (bagian antara `=== MULAI ===` dan `=== SELESAI ===`) =
   **kontrak penulisan**: skema frontmatter pasti (jangan tambah/kurang field), komponen
   sah, aturan MDX, cara menulis code block & Mermaid, aturan SVG figure. Patuhi 100%.
   Catatan: "jembatan dari JS/PHP wajib" dan "jangkar skincare" hanya mengikat modul
   roadmap; untuk course di luar roadmap itu **opsional** (pakai hanya bila memperjelas).
2. **`component-reference.txt`** (root repo) = **sumber kebenaran komponen** `@components`
   (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip, Hero, Compare,
   FileTree, Endpoint, Def) + pola code block & Mermaid. Jangan mengarang prop/slot/ikon/
   varian komponen TERDAFTAR. Komponen baru lewat jalur adaptif lalu didokumentasikan.
3. **`src/content.config.ts`** — definisi koleksi. Koleksi `modules`, `courses`, `aws`,
   `roadmaps` sudah ada; koleksi baru untuk course yang di-chunk perlu ditambahkan.
4. **`src/styles/globals.css`** (area "GO-ARTISAN 2026") untuk gaya yang tersedia, dan
   **`src/components/index.ts`** untuk komponen yang benar-benar diekspor. Bila `index.ts`
   dan `component-reference.txt` tidak cocok, itu drift — samakan keduanya.
5. **Pola "Tracks" (katalog course)**: katalog course memakai **`CourseHero.astro` +
   kelas `.track-*`** global (dibagi `go-luminas` & `aws`, satu sumber, anti-drift). JANGAN
   bikin kelas `.gl-*`/`.aws-*` per-halaman lagi. Referensi langsung:
   - `src/pages/courses/aws.astro` = contoh halaman katalog (`getEntry` hero + `getCollection`
     daftar chapter + `.track-chapters`/`.track-chapter-link`).
   - `src/content/courses/aws.mdx` = contoh entry tipis (frontmatter + 1 paragraf body).
   - `src/content/aws/01-cloud-computing.mdx` = contoh chapter file yang baik.
   - `src/pages/aws/[...slug].astro` = contoh route chapter.
   - definisi koleksi `aws` di `content.config.ts` = contoh registrasi.
6. **Figure imports**: untuk course Git ada 5 figure Astro di `src/components/figures/`
   prefix `Git*` (`GitThreeTreeFig01`, `GitRebaseFig01`, `GitCommitDagFig01`,
   `GitResetModesFig01`, `GitDetachedHeadFig01`). Untuk course lain, cek eksistensi figure
   di `src/components/figures/`. Import via `@figures/<NamaFigure>.astro`. Figure yang sudah
   ada WAJIB dipakai di chapter yang relevan (jangan dibuang saat memecah).

## Mesin enrichment (inti skill — dijalankan per chapter, WAJIB)

Ini bagian yang membuat chunking ≠ copy-paste. Untuk **tiap** chapter (baik saat CHUNK
maupun ENRICH-only), jalankan urutan ini dan **tambahkan yang belum ada**. Tiap keputusan
"tambah X" dipicu oleh bentuk konten, bukan selera:

1. **Riset use-case nyata + best practice (lakukan dulu).** Sebelum menulis, cari 2-3
   skenario dunia nyata + praktik terkini untuk topik chapter ini lewat **WebSearch/
   WebFetch** ke sumber resmi/otoritatif (lihat "Riset" di bawah). Jangan menebak versi/
   nama tool/flag. Hasilnya dijahit ke prosa, contoh, atau callout — bukan ditempel
   sebagai daftar tautan.
2. **Use-case "di dunia nyata".** Tambahkan minimal satu contoh konkret bagaimana konsep
   chapter ini dipakai tim/sistem nyata (mis. untuk Git rebase: merapikan PR sebelum merge
   di tim yang pakai squash; untuk Redis: cache-aside pada endpoint katalog). Hindari
   contoh `foo/bar` generik.
3. **Visual (Mermaid default).** Apakah chapter menjelaskan alur/arsitektur/urutan/state/
   percabangan? → tambahkan diagram ```mermaid (flowchart/sequence/stateDiagram/gitGraph)
   dengan `<p class="fig-cap">`. Bila sudah ada `@figures/*` SVG yang cocok (mis. figure
   Git), **pakai itu** lewat `<Figure>` + caption, jangan buat ulang.
4. **Mental model / analogi.** Konsep abstrak yang mudah salah-paham? → `<Box variant="analogy">`.
5. **Hands-on.** Ada prosedur konkret? → `<Steps>`/`<Step>` dengan perintah/kode nyata
   (`title="path/file"`). Chapter yang praktis WAJIB punya minimal satu blok hands-on.
6. **Best practice & jebakan.** Ada cara yang direkomendasikan? → `<Box variant="tip">`.
   Ada kesalahan klasik/bahaya? → `<Box variant="warn">`. Ini kanal utama "best practice".
7. **Perbandingan.** Dua pendekatan bersaing (merge vs rebase, SQL vs cache, dst.)? →
   `<Compare>`.
8. **Kumpulan item terkait.** Sekumpulan perintah/opsi/layanan sejajar? → `<CardGrid>`/`<Card>`.
9. **Kode nyata & idiomatik.** Contoh yang bisa "dieksekusi di kepala", dengan `title=` path.
   Untuk konteks Go, idiomatik (error sebagai nilai, gofmt, context param pertama).
10. **Recap.** Tiap chapter ditutup `<Section ... id="ringkasan">` berisi `<Recap>`.
11. **Cross-link antar chapter.** Bila chapter bergantung pada chapter sebelumnya, beri
    tautan prosa ke chapter terkait (navigasi belajar yang menyatu).

Guardrail: setiap aset harus memperjelas kesulitan nyata. Jika sebuah ide sudah jelas dalam
satu kalimat, jangan dibungkus diagram/box. Enrichment yang baik membuat chapter **lebih
mudah dipahami**, bukan lebih panjang.

## Riset (WAJIB sebelum menulis fakta enrichment)

Pakai **WebFetch/WebSearch** ke sumber resmi terkini untuk use-case & best practice. Jangan
menebak versi, nama paket, flag, atau API. Sumber inti per topik umum:

- Git/VCS: git-scm.com (Pro Git book), docs GitHub/GitLab (flow, branch protection, PR).
- Docker: docs.docker.com (Dockerfile best practices, multi-stage, compose), OCI.
- HTTP/API: MDN HTTP, RFC 9110, chi (`github.com/go-chi/chi/v5`), net/http.
- OpenAPI: spec OpenAPI 3.x, oapi-codegen / swaggo bila relevan.
- Redis: redis.io docs + klien Go (`github.com/redis/go-redis/v9`).
- Go umum: go.dev/doc, Effective Go, pkg.go.dev (verifikasi nama paket/jalur impor/versi).

Tujuannya bukan menulis ulang dokumentasi, tapi mengangkat **praktik nyata** (bagaimana tim
sungguhan memakainya, jebakan yang sering kena) ke dalam chapter.

## Alur kerja

### 0. Analisis sumber (wajib sebelum membelah)

Baca file monolithic yang ditunjuk (mis. `src/content/courses/git.mdx`). Identifikasi:

- Jumlah `<Section>` (di `git.mdx` ada 18) — ini kandidat jumlah chapter.
- Frontmatter asli — `title`, `badge`, `order`, `target`, `toc`, `readingTime`,
  `topTitle`, `topSub`, `summary`, `footerTitle`, `footerSub`.
- Import — komponen & figure apa saja yang dipakai (mis. figure `Git*`).
- Hero — eyebrow, judul, slot meta.
- Konten tiap section — untuk menentukan granularitas chapter.

Buat peta:

```
Section 01 (kenapa-git)   → chapter 01 → 01-kenapa-git.mdx       → slug <nama>/01-kenapa-git
Section 02 (mental-model) → chapter 02 → 02-mental-model.mdx
...
```

**Granularitas**: default satu chapter per `<Section>` puncak. Gabungkan section yang
sangat pendek/saling bergantung, atau pecah section yang terlalu gemuk. Bila jumlah chapter
> 12 atau ada keputusan penggabungan yang tidak jelas, **tampilkan rancangan ke pengguna
untuk konfirmasi** sebelum menulis banyak file.

### 1. Rancang struktur chapter

Tentukan untuk tiap chapter:

- **Slug file**: `NN-slug.mdx` (2-digit + kebab-case dari `id` section), mis. `01-kenapa-git.mdx`.
- **Frontmatter** (skema pasti `lessonSchema`, jangan tambah/kurang field):
  - `title`: spesifik per chapter.
  - `badge`: badge course + nomor (mis. `"GIT01"`).
  - `topTitle` / `topSub`: judul & subjudul pendek chapter.
  - `summary`: ringkasan 1-2 kalimat.
  - `order`: nomor urut (1, 2, 3, ...) — ruang `order` koleksi chapter terpisah dari course.
  - `target`: sama dengan course induk (mis. `"Course · Git"`, middot literal `·`).
  - `readingTime`: realistis per chapter (mis. `"~12 menit baca"`), bukan total course.
  - `summaryHref`: `"#ringkasan"`.
  - `toc`: daftar `<Section>` di dalam chapter ini (1:1).
  - `footerTitle` / `footerSub`.
- **Import**: hanya komponen & figure yang dipakai chapter ini.
- **Hero**: sesuai konten chapter.
- **Rencana enrichment per chapter**: catat aset apa yang akan ditambah (Mermaid? hands-on?
  compare? use-case nyata?) berdasarkan "Mesin enrichment".

### 2. Bootstrap infrastruktur (sekali per course; lewati bila sudah ada)

1. **`src/content.config.ts`** — tambah koleksi baru, mis. `git`:

   ```ts
   const git = defineCollection({
     loader: glob({ pattern: '**/*.mdx', base: './src/content/git' }),
     schema: lessonSchema,
   });
   export const collections = { modules, courses, aws, git, roadmaps };
   ```

   (salin definisi koleksi `aws`, ganti nama & `base`.)

2. **`src/pages/<nama>/[...slug].astro`** — route chapter, cermin `src/pages/aws/[...slug].astro`:
   - `getCollection('aws')` → `getCollection('<nama>')`.
   - prev/next dihitung HANYA di dalam koleksi ini.
   - Render via `ModuleLayout`/`ArticleTOC` yang sama. URL jadi `/<nama>/<slug>`.

3. **`src/pages/courses/<nama>.astro`** — **halaman katalog** (cermin `src/pages/courses/aws.astro`):
   - `const course = await getEntry('courses', '<nama>')` → sumber hero (title/topTitle/
     topSub/summary/target).
   - `const mods = (await getCollection('<nama>')).sort((a,b) => a.data.order - b.data.order)`.
   - Render `<CourseHero ... primaryHref={`/<nama>/${firstId}`} />` di dalam `.shell-col` >
     `.shell-band.course-hero-band`.
   - Daftar chapter dengan `<ol class="track-chapters">` → `.track-chapter` →
     `.track-chapter-link` (href `/<nama>/${mod.id}`), pakai `mod.data.topTitle`,
     `mod.data.summary`, `mod.data.readingTime`. JANGAN bikin kelas baru per-halaman.

4. **`src/pages/courses/[...slug].astro`** — tambah filter pengecualian course ini di
   `getStaticPaths` (course punya katalog `.astro` khusus, jadi tak boleh dobel di renderer
   dinamis):

   ```ts
   .filter((c) => c.id !== 'go-luminas' && c.id !== 'aws' && c.id !== 'git')
   ```

5. **`src/content/courses/<nama>.mdx`** — transformasi monolit → **entry tipis** (seperti
   `courses/aws.mdx`):
   - Frontmatter tetap lengkap (sumber data untuk katalog `.astro`). `toc` boleh
     mengelompokkan chapter jadi tahap (`S1`, `S2`, ...) ATAU tetap datar; `readingTime`
     jadi total/jumlah modul; `summaryHref` jadi `"#kurikulum"`.
   - Body: 1 paragraf ringkas yang mengarahkan ke `/<nama>/<slug>`.
   - **Catatan**: chapter files ditulis FLAT `NN-slug.mdx`; pengelompokan tahap (S1..Sn)
     hanya ada di `toc` katalog, bukan di nama file.

Verifikasi dengan `npm run build` setelah infrastruktur selesai.

### 3. Tulis + perkaya chapter files (Mode A — CHUNK + ENRICH)

Untuk tiap section di monolit, tulis satu `.mdx` di `src/content/<nama>/`, **dengan
enrichment pass** (bukan copy-paste):

1. **Frontmatter** sesuai rancangan Langkah 1 (skema pasti, jangan tambah/kurang field).
2. **Import** hanya komponen yang dipakai:
   ```mdx
   import { Section, Box, Steps, Step, Recap, Hero, Chip, Figure, Compare, CardGrid, Card, FileTree } from "@components";
   ```
   Plus figure spesifik bila perlu:
   ```mdx
   import GitThreeTreeFig01 from "@figures/GitThreeTreeFig01.astro";
   ```
3. **Hero** (`<Hero>`) sekali di atas; judul via prop `title` (boleh `<em>` + `<br />`).
   Slot meta dengan `<Chip>` (ikon dari daftar sah, hanya di slot meta Hero).
4. **Section**: tiap chapter minimal punya satu `<Section>` isi + satu
   `<Section num="XX" id="ringkasan" title="Ringkasan">` di akhir dengan `<Recap>`.
5. **Pindahkan konten dari monolit, lalu JALANKAN "Mesin enrichment"** pada chapter ini:
   tambah use-case nyata + best practice (hasil riset), Mermaid/figure, Box (tip/warn/
   analogy/note), Steps hands-on, Compare, CardGrid, contoh kode idiomatik, cross-link.
   Target: chapter keluar lebih kaya & lebih konkret daripada section aslinya.
6. **Tanpa `<h1>`/`<h2>` manual**; sub-judul `<h3>`/`<h4>` saja.
7. **Code blocks** fenced dengan `title="path/file"`.
8. **Satu baris per blok teks** (kecuali fenced code & ```mermaid).
9. **Escape**: `&#123;`/`&#125;` di teks MDX (bukan di code/mermaid). `&middot;`/`&rarr;` di
   konteks `set:html`; literal `·`/`→` di frontmatter & prop teks polos. **Tanpa em dash.**
10. **Frontmatter `toc` & `<Section>` sinkron 1:1**. `summaryHref = "#ringkasan"`.

### 4. (Mode B — ENRICH-only) Perdalam chapter yang sudah ada

Untuk koleksi yang SUDAH terpecah, jalankan "Mesin enrichment" langsung pada file chapter
yang ada — tambah Mermaid/figure, Box, Steps, Compare, CardGrid, use-case nyata, contoh
kode, Recap. **Jangan ubah** struktur koleksi, frontmatter di luar perbaikan TOC, atau
routing. Hanya body konten.

### 5. Sinkronkan frontmatter & TOC

- Tiap chapter punya `toc` 1:1 dengan `<Section>` di dalamnya (num/id/urutan sama).
- `order` berurutan, tak bentrok di dalam koleksi.
- `target` konsisten di semua chapter satu course.
- `readingTime` realistis (per chapter).
- `summaryHref = "#ringkasan"`.
- Entry tipis `courses/<nama>.mdx`: `toc` (tahap/datar) konsisten dengan daftar chapter.

### 6. Verifikasi (wajib)

```bash
npm run build
```

Sampai bersih. Cek gotcha render:

- Tidak ada leak tag di EOF.
- `<table>` mentah dibungkus `.tbl-wrap`.
- `&#123;` di dalam inline-code (pakai `{` literal di backtick).
- Chapter muncul di route `/<nama>/<slug>`.
- Katalog `/courses/<nama>` (halaman `.astro`) tampil dengan `CourseHero` + daftar
  `.track-chapters` yang benar; tiap baris menautkan ke chapter.
- Course yang di-chunk **tidak lagi** dobel di renderer dinamis (`[...slug].astro` sudah
  memfilternya).
- Prev/next berfungsi di dalam koleksi chapter.
- (Bila ada figure `@figures/*`) figure terpakai dengan caption, bukan hilang.

### 7. Poles akhir (opsional)

Setelah build bersih, tiap chapter siap diserahkan ke **`super-refine`** untuk pass kualitas
akhir.

## Aturan keras (jangan dilanggar)

- **Chunk ≠ copy-paste.** Tiap chapter WAJIB melewati "Mesin enrichment": minimal punya
  satu use-case nyata + satu best-practice/jebakan callout + satu visual atau hands-on yang
  relevan, ditutup `<Recap>`. Chapter yang identik dengan section asli = belum selesai.
- Patuhi seluruh kontrak `ai-instructions.md` (frontmatter, komponen, MDX, code block,
  Mermaid, SVG) untuk KEDUA mode.
- **Mode A (CHUNK)**: tulis ke koleksi terpisah `src/content/<nama>/`, JANGAN sentuh modul
  roadmap / listing roadmap / `src/content/modules/`. Jangkar skincare & jembatan JS/PHP
  OPSIONAL untuk course non-roadmap.
- **Katalog course = halaman `.astro` (`CourseHero` + `.track-*`)**, bukan mdx tipis yang
  dirender lewat `[...slug].astro`. Mdx tipis hanya sumber frontmatter/hero. JANGAN bikin
  kelas `.gl-*`/`.aws-*`/per-halaman baru.
- **Mode B (ENRICH-only)**: hanya modifikasi body konten; jangan ubah struktur koleksi atau
  routing.
- Tanpa `<h1>`/`<h2>` manual; tiap blok berteks satu baris (kecuali code/mermaid).
- Kode = fenced code block dengan `title=`. Diagram alur = ```mermaid. SVG mentah hanya di
  `.astro` (via `<Figure>`).
- Box hanya 5 varian sah (tip/analogy/warn/note/bridge); Chip hanya di slot meta Hero, ikon
  dari daftar sah. Jangan varian "exam".
- Komponen sah + prop/slot/varian = `component-reference.txt`. Komponen baru → perbarui
  `component-reference.txt` + `index.ts`.
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan
  `@apply`, bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash. Versi/jalur impor/API dari sumber terkini (riset
  WAJIB sebelum menulis fakta enrichment).
- Figure spesifik monolit (mis. `@figures/Git*`) harus dipakai di chapter relevan, bukan
  dibuang.

## Definition of done

- [ ] Mode ditentukan benar (CHUNK + ENRICH = default; ENRICH-only hanya untuk course yang
      sudah terpecah).
- [ ] (CHUNK) Monolit dianalisis: jumlah section, frontmatter, import, figure terpetakan;
      granularitas chapter ditentukan (dan dikonfirmasi bila > 12 / penggabungan tak jelas).
- [ ] (CHUNK) Infrastruktur di-bootstrap: koleksi di `content.config.ts`, route
      `src/pages/<nama>/[...slug].astro`, **halaman katalog `src/pages/courses/<nama>.astro`
      (CourseHero + .track-*)**, filter di `courses/[...slug].astro`, dan
      `courses/<nama>.mdx` jadi entry tipis.
- [ ] (CHUNK) Semua chapter ditulis di `src/content/<nama>/NN-slug.mdx`.
- [ ] **Tiap chapter melewati Mesin enrichment**: riset use-case nyata + best practice
      terpasang; visual/figure/Mermaid relevan; hands-on bila praktis; Compare/CardGrid bila
      perlu; contoh kode idiomatik; Recap di `#ringkasan`. Chapter lebih kaya dari aslinya.
- [ ] Fakta/versi/nama tool diverifikasi dari sumber resmi terbaru (bukan tebakan).
- [ ] Figure yang sudah ada (`@figures/*`) dipakai dengan caption; tidak ada yang hilang.
- [ ] Frontmatter & TOC sinkron 1:1; `order` berurutan; `target` konsisten; `readingTime`
      realistis.
- [ ] `npm run build` bersih; gotcha render dicek; katalog `.astro` + route chapter +
      prev/next berfungsi; course tidak dobel di renderer dinamis.
- [ ] Bahasa Indonesia penuh, tanpa em dash.
