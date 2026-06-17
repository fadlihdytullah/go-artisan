---
name: super-chunker
description: "Act as a Curriculum & Learning-Material Architect: transform monolithic single-file courses (src/content/courses/*.mdx) into chunked multi-file lesson collections by RE-ANALYZING the existing sections and GROUPING related ones into coherent chapters (a chapter = one learning arc holding several <Section>s, like the aws/ chapters that hold 12-16 sections each), NOT mechanically one section per chapter — so the reader keeps focus and the thread stays connected ('connect the dots'). Each chapter is also ENRICHED as it is formed: researched against real-world use cases + current best practices and given complementary, visual learning material (Mermaid, Box, Steps, Compare, CardGrid, real code, Recap) automatically, with framing intro + transitions + a Recap that ties the grouped sections together. TWO modes: (A) CHUNK + ENRICH (DEFAULT) — cluster sections into chapters, write per-chapter files in a dedicated collection, research + enrich each, build a dedicated CourseHero catalog page, register the collection + routes; (B) ENRICH-only — deepen chapter files that are already split, without touching collection/routing. Targets bloated single-file courses (git.mdx, docker.mdx, http.mdx, openapi.mdx, redis.mdx — each ~1000+ lines). Uses the same lessonSchema + ModuleLayout/ArticleTOC pipeline as the rest of the platform. Triggers: 'course-chunker', 'chunk course', 'split course', 'chunk <nama-course>', 'pisah course', 'pecah modul', 'enrich course', 'perkaya course', 'chunk lalu enrich', 'kelompokkan section jadi chapter'. Works IN the repo (writes .mdx, registers collections, creates routes + catalog page, builds), not as a zip."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-chunker

Jalankan skill ini sebagai **Curriculum & Learning-Material Architect** untuk materi
engineering: bukan tukang potong file, tapi perancang kurikulum yang memutuskan **bagaimana
sebaiknya materi dipecah supaya paling enak dipelajari**. Kebalikan dari menulis dari
outline (`super-forge`): skill ini mengambil **materi kursus yang sudah ada tetapi
terkumpul dalam satu file raksasa** (`src/content/courses/*.mdx` dengan puluhan section),
lalu **menata ulang section-section itu menjadi chapter yang koheren SAMBIL memperkaya tiap
chapter** — bukan sekadar potong-tempel, dan bukan satu section = satu chapter.

Inti pekerjaannya dua lapis:

1. **Arsitektur kurikulum** — analisis ulang section yang ada, lalu **kelompokkan section
   yang saling berkaitan ke dalam chapter yang sama** supaya pembaca tidak kehilangan
   fokus dan benang merahnya tetap nyambung ("connecting the dots"). Satu chapter = satu
   busur belajar (learning arc) yang menuntaskan satu kemampuan, bukan satu fragmen lepas.
2. **Enrichment** — tiap chapter diriset ulang terhadap **use-case dunia nyata + best
   practice terkini** dan dilengkapi materi belajar pendukung & visual (Mermaid, Box, Steps,
   Compare, contoh kode, Recap) secara otomatis.

Tujuan besar: mengubah "satu halaman raksasa yang sulit dinavigasi" menjadi "kurikulum
berchapter yang runtut, nyambung, lebih kaya, dan lebih nyata" daripada aslinya.

## Keluarga skill (satu paket, satu standar)

Tiga skill ini satu keluarga Curriculum & Learning-Material Architect; pakai pipeline,
kosakata, dan standar mutu yang sama, untuk subjek apa pun (tidak terikat Go/JS/PHP):

- **`super-forge`** — dari OUTLINE tipis → rancang kurikulum lalu tulis modul/course baru
  dari nol.
- **`super-refine`** — satu file materi yang SUDAH ada → poles, perdalam, perkaya ke
  world-class (tanpa memecah struktur).
- **`super-chunker`** — satu file course monolit raksasa → kurasi jadi banyak chapter koheren
  + perkaya (transform struktural). **(skill ini)**

Alur antar skill: course yang lahir dari `super-forge` lalu menggemuk jadi monolit diserahkan
ke skill ini untuk dipecah; modul roadmap dipoles `super-refine`.

Kosakata bersama: *learning arc* (satu chapter = satu busur belajar menuju Student Outcome),
*Student Outcome* ("di akhir bab ini kamu bisa ..."), *connect the dots* (jahit antar
section), *Mesin enrichment* (rubrik aset pendukung), dan prinsip **"memperjelas, bukan
menggemukkan"**.

> **Bukti dari platform**: chapter AWS yang sudah jadi (`src/content/aws/*.mdx`) masing-
> masing memuat **12-16 `<Section>` di dalam SATU file chapter** (mis. `01-cloud-computing`
> punya 16 section: intro → traditional vs cloud → definisi → keuntungan → IaaS/PaaS/SaaS →
> ... → hands-on → jebakan → ringkasan). Itu bentuk target yang benar: **chapter = kumpulan
> section terkait dalam satu busur**, BUKAN satu section per file. Katalog lalu
> mengelompokkan chapter jadi tahap (S1..S5). Tiru pola ini.

## Filosofi inti (jangan dilupakan)

**1. Kurasi dulu, baru pecah — kelompokkan, jangan fragmentasi.** Default BUKAN "satu
section satu chapter". Section yang berurutan dan saling bergantung (membangun satu mental
model, satu rantai prasyarat, satu alur kerja) **digabung ke chapter yang sama** supaya
pembaca menjaga konteks. Memecah terlalu halus = pembaca kehilangan benang merah dan harus
melompat-lompat antar halaman untuk satu ide utuh. Section asli tidak hilang: ia menjadi
`<Section>` di dalam chapter gabungan, lengkap dengan jembatan/transisi yang
menghubungkannya ("connect the dots").

**2. Chunk = kurasi + perkaya, selalu.** Begitu jadi chapter, ia WAJIB lebih baik dari
potongan aslinya: ada use-case nyata, best practice terkini, visual yang memperjelas, dan
langkah hands-on. Chapter yang isinya identik dengan section asli = pekerjaan belum selesai.

**3. Memperjelas, bukan menggemukkan.** Tiap aset tambahan harus "membayar tempatnya"
dengan menjelaskan kesulitan nyata. Jangan menambah diagram untuk ide yang sudah jelas dalam
satu kalimat, dan jangan menggabung section yang tak berhubungan hanya demi mengurangi
jumlah file.

## Dua mode (pilih yang tepat)

### Mode A — CHUNK + ENRICH (DEFAULT)

Ambil monolith course dari `src/content/courses/` (mis. `git.mdx`, `docker.mdx`,
`http.mdx`, `openapi.mdx`, `redis.mdx`), **analisis ulang struktur `<Section>`-nya dan
kelompokkan section terkait jadi chapter koheren** (lihat "Arsitektur kurikulum"), lalu
untuk tiap chapter: riset use-case + best practice, tulis sebagai file chapter yang memuat
section-section gabungannya secara nyambung dan **diperkaya**, lalu pasang infrastrukturnya.

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

- Daftar `<Section>` lengkap (num, id, title, sub) + bobot/panjang tiap section.
  Di `git.mdx` ada 18 section.
- Frontmatter asli — `title`, `badge`, `order`, `target`, `toc`, `readingTime`,
  `topTitle`, `topSub`, `summary`, `footerTitle`, `footerSub`.
- Import — komponen & figure apa saja yang dipakai (mis. figure `Git*`).
- Hero — eyebrow, judul, slot meta.
- **Hubungan antar section** — mana yang prasyarat dari mana, mana yang berbagi mental
  model, mana yang satu alur kerja. Ini bahan untuk pengelompokan di Langkah 1.

### 1. Arsitektur kurikulum — kelompokkan section jadi chapter (inti, jangan dilewati)

Ini keputusan paling penting dan paling sering salah. **Jangan** memetakan satu section ke
satu chapter. Sebaliknya, **cari klaster section yang membentuk satu busur belajar** dan
gabungkan jadi satu chapter, supaya pembaca menuntaskan satu kemampuan utuh tanpa kehilangan
fokus.

**Heuristik pengelompokan** (gabung section ke chapter yang sama bila):

- Berbagi **mental model** yang sama (mis. "tiga area kerja" Git menaungi add/commit/diff).
- Membentuk **rantai prasyarat** yang harus dibaca berurutan untuk masuk akal.
- Bagian dari **satu alur kerja / satu cerita** (mis. branch → merge → conflict adalah satu
  busur "bekerja paralel lalu menyatukan").
- Section pendek yang **tidak berdiri sendiri** (tag, gitignore, hooks) → kumpulkan jadi
  satu chapter tematik, bukan tiga chapter mungil.

**Heuristik pemisahan** (pecah jadi chapter berbeda bila):

- Beban kognitif satu chapter terlalu besar — patokan ~20-35 menit baca, atau lebih dari
  satu **Student Outcome** yang berbeda jenis. Lewat itu, pecah di batas konsep alami.
- Topik berpindah ke domain yang benar-benar berbeda (mis. dari "history lokal" ke
  "kolaborasi remote").

Untuk **tiap chapter** tetapkan:

- **Judul chapter** yang menamai busurnya (bukan menyalin satu judul section).
- **Student Outcome**: satu kalimat "Di akhir bab ini kamu bisa ...".
- **Daftar section anggota** (urut) yang akan jadi `<Section>` di dalam file chapter itu.

Petakan section → chapter sebagai **many-to-one**:

```
Chapter 01  Fondasi & Mental Model Git      ← section 01 kenapa-git, 02 mental-model, 03 setup-repo
Chapter 02  Alur Kerja Harian: Commit       ← section 04 tracking, 05 commit-baik, 06 history
Chapter 03  Branching, Merge & Konflik      ← section 07 branch, 08 merge, 09 conflict
Chapter 04  Kolaborasi via Remote           ← section 10 remote, 11 pull-request, 12 branch-protection
Chapter 05  Menulis Ulang Sejarah Aman      ← section 13 rebase, 14 undo
Chapter 06  Konvensi & Otomasi Repo         ← section 15 tag-gitignore-hooks-conventions
Chapter 07  Workflow Tim & Lanjutan         ← section 16 workflows, 17 advanced-troubleshoot, 18 ringkasan
```

(18 section → 7 chapter koheren — ilustrasi, BUKAN cetakan wajib. Turunkan sendiri per
course berdasarkan heuristik, lalu cocokkan ke pola AWS: 12-16 section per chapter masih
sehat selama satu busur.)

**Konfirmasi rancangan ke pengguna** sebelum menulis: tampilkan daftar chapter + Student
Outcome + section anggotanya. Ini gerbang wajib bila pengelompokan tak sepele atau jumlah
chapter berubah banyak dari struktur asli.

### 2. Rancang detail tiap chapter

Untuk tiap chapter hasil pengelompokan di Langkah 1, tentukan:

- **Slug file**: `NN-slug.mdx` (2-digit urut + kebab-case dari **judul chapter**, bukan dari
  satu section), mis. `01-fondasi-mental-model.mdx`, `03-branching-merge-konflik.mdx`.
- **Frontmatter** (skema pasti `lessonSchema`, jangan tambah/kurang field):
  - `title`: judul chapter (busurnya), bukan judul satu section.
  - `badge`: badge course + nomor (mis. `"GIT01"`).
  - `topTitle` / `topSub`: judul & subjudul pendek chapter.
  - `summary`: ringkasan 1-2 kalimat yang menyebut kemampuan akhir (Student Outcome).
  - `order`: nomor urut (1, 2, 3, ...) — ruang `order` koleksi chapter terpisah dari course.
  - `target`: sama dengan course induk (mis. `"Course · Git"`, middot literal `·`).
  - `readingTime`: realistis untuk SELURUH section di chapter ini (mis. `"~25 menit baca"`).
  - `summaryHref`: `"#ringkasan"`.
  - `toc`: **daftar SEMUA section anggota** chapter ini (1:1 dengan tiap `<Section>` di
    file), num berurutan 01, 02, 03, ... di dalam chapter, ditutup entri `ringkasan`.
  - `footerTitle` / `footerSub`.
- **Import**: hanya komponen & figure yang dipakai chapter ini.
- **Hero**: membingkai busur chapter (kenapa section-section ini satu paket), bukan satu
  sub-topik saja.
- **Jaringan penghubung ("connect the dots")**: rencanakan kalimat transisi antar section
  anggota dan satu paragraf pembuka yang menjelaskan alur belajar chapter — supaya gabungan
  section terbaca sebagai satu cerita, bukan tumpukan potongan.
- **Rencana enrichment per chapter**: catat aset apa yang akan ditambah (Mermaid? hands-on?
  compare? use-case nyata?) berdasarkan "Mesin enrichment".

### 3. Bootstrap infrastruktur (sekali per course; lewati bila sudah ada)

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

### 4. Tulis + perkaya chapter files (Mode A — CHUNK + ENRICH)

Untuk tiap **chapter** (kelompok section dari Langkah 1), tulis satu `.mdx` di
`src/content/<nama>/`, **dengan enrichment pass** (bukan copy-paste):

1. **Frontmatter** sesuai rancangan Langkah 2 (skema pasti, jangan tambah/kurang field).
2. **Import** hanya komponen yang dipakai:
   ```mdx
   import { Section, Box, Steps, Step, Recap, Hero, Chip, Figure, Compare, CardGrid, Card, FileTree } from "@components";
   ```
   Plus figure spesifik bila perlu:
   ```mdx
   import GitThreeTreeFig01 from "@figures/GitThreeTreeFig01.astro";
   ```
3. **Hero** (`<Hero>`) sekali di atas; judul via prop `title` (boleh `<em>` + `<br />`).
   Slot meta dengan `<Chip>` (ikon dari daftar sah, hanya di slot meta Hero). Tulis pembuka
   chapter yang membingkai busurnya (kenapa section-section ini satu paket).
4. **Section**: bawa **tiap section anggota** masuk sebagai `<Section num id title>`
   tersendiri (num berurutan di dalam chapter), lalu tutup dengan
   `<Section num="XX" id="ringkasan" title="Ringkasan">` berisi `<Recap>`. Jadi satu file
   chapter memuat beberapa `<Section>` — persis pola AWS (12-16 section per chapter).
5. **Hubungkan antar section ("connect the dots")**: beri kalimat transisi di awal/akhir
   tiap section anggota supaya berpindah mulus ke section berikutnya; Recap penutup
   merangkum keseluruhan busur, bukan satu section terakhir saja.
6. **Pindahkan konten dari monolit, lalu JALANKAN "Mesin enrichment"** pada chapter ini:
   tambah use-case nyata + best practice (hasil riset), Mermaid/figure, Box (tip/warn/
   analogy/note), Steps hands-on, Compare, CardGrid, contoh kode idiomatik, cross-link.
   Target: chapter keluar lebih kaya, lebih nyambung, & lebih konkret daripada aslinya.
7. **Tanpa `<h1>`/`<h2>` manual**; sub-judul `<h3>`/`<h4>` saja.
8. **Code blocks** fenced dengan `title="path/file"`.
9. **Satu baris per blok teks** (kecuali fenced code & ```mermaid).
10. **Escape**: `&#123;`/`&#125;` di teks MDX (bukan di code/mermaid). `&middot;`/`&rarr;` di
    konteks `set:html`; literal `·`/`→` di frontmatter & prop teks polos. **Tanpa em dash.**
11. **Frontmatter `toc` & `<Section>` sinkron 1:1**. `summaryHref = "#ringkasan"`.

### 5. (Mode B — ENRICH-only) Perdalam chapter yang sudah ada

Untuk koleksi yang SUDAH terpecah, jalankan "Mesin enrichment" langsung pada file chapter
yang ada — tambah Mermaid/figure, Box, Steps, Compare, CardGrid, use-case nyata, contoh
kode, Recap. **Jangan ubah** struktur koleksi, frontmatter di luar perbaikan TOC, atau
routing. Hanya body konten.

### 6. Sinkronkan frontmatter & TOC

- Tiap chapter punya `toc` 1:1 dengan `<Section>` di dalamnya (num/id/urutan sama).
- `order` berurutan, tak bentrok di dalam koleksi.
- `target` konsisten di semua chapter satu course.
- `readingTime` realistis (per chapter).
- `summaryHref = "#ringkasan"`.
- Entry tipis `courses/<nama>.mdx`: `toc` (tahap/datar) konsisten dengan daftar chapter.

### 7. Verifikasi (wajib)

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

### 8. Poles akhir (opsional)

Setelah build bersih, tiap chapter siap diserahkan ke **`super-refine`** untuk pass kualitas
akhir.

## Aturan keras (jangan dilanggar)

- **Kelompokkan, jangan fragmentasi.** Default BUKAN satu section = satu chapter. Section
  terkait (satu mental model / rantai prasyarat / satu alur kerja) digabung ke chapter yang
  sama; tiap chapter = satu busur belajar dengan satu Student Outcome dan beberapa
  `<Section>` di dalamnya (tiru pola AWS 12-16 section/chapter). Rancangan pengelompokan
  dikonfirmasi ke pengguna sebelum menulis bila tak sepele.
- **Connect the dots.** Section gabungan WAJIB dijahit: paragraf pembuka yang membingkai
  busur + transisi antar section + Recap penutup yang merangkum keseluruhan, bukan tumpukan
  potongan tanpa benang merah.
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
- [ ] (CHUNK) Monolit dianalisis: section, frontmatter, import, figure, dan **hubungan antar
      section** terpetakan.
- [ ] (CHUNK) **Arsitektur kurikulum dirancang**: section dikelompokkan jadi chapter koheren
      (many-to-one), tiap chapter punya judul busur + Student Outcome + daftar section
      anggota; rancangan dikonfirmasi ke pengguna bila pengelompokan tak sepele.
- [ ] (CHUNK) Infrastruktur di-bootstrap: koleksi di `content.config.ts`, route
      `src/pages/<nama>/[...slug].astro`, **halaman katalog `src/pages/courses/<nama>.astro`
      (CourseHero + .track-*)**, filter di `courses/[...slug].astro`, dan
      `courses/<nama>.mdx` jadi entry tipis.
- [ ] (CHUNK) Semua chapter ditulis di `src/content/<nama>/NN-slug.mdx`; tiap file memuat
      section-section anggotanya sebagai `<Section>` + Ringkasan, **dijahit dengan transisi**
      (connect the dots), bukan potongan lepas.
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
