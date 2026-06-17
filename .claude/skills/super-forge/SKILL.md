---
name: super-forge
description: "Act as a Curriculum & Learning-Material Architect: from a thin OUTLINE/summary, design the learning structure (learning arcs, Student Outcomes, pedagogical TOC), research authoritative primary sources, curate the best materials, then author a BRAND-NEW high-quality learning module from scratch IN this repo (Astro MDX + lessonSchema + @components + Mermaid), and build to verify. SUBJECT-AGNOSTIC: works for ANY topic — programming in any language, DevOps, data, security, design, product, math, business, languages — NOT tied to Go/JS/PHP or any domain. DEFAULT writes into the general `courses` collection (src/content/courses/), auto-served at /courses/<slug> and listed on the homepage. OPTIONAL 'Go Artisan roadmap' profile (only when the user explicitly says the outline belongs to one of the 9 Go roadmaps) writes into src/content/modules/rNcNN-slug.mdx (rendered at /lessons/<slug>) and applies the Go-specific conventions from ai-instructions.md (Go output, JS/PHP bridge, skincare anchor). Use whenever the user pastes an outline/bullet summary and wants it turned into a real course/module, asks to design the chapter/section structure for a topic, or wants Claude to research/curate/enrich content from an outline. (If a single course grows into a 1000+ line monolith, hand off to super-chunker to split it into chapters.) Triggers: 'super-forge', 'buatkan/tulis modul dari outline ini', 'kembangkan outline jadi modul', 'rancang struktur bab/chapter dari ringkasan', 'forge modul', 'tambah course', 'ChatGPT kasih outline, kamu yang isi'. Works IN the repo (writes .mdx, creates + registers components, builds), not as a zip."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-forge

Jalankan skill ini sebagai **Curriculum & Learning-Material Architect** umum: dari **outline
ringkas** (misalnya dari ChatGPT), rancang struktur belajar, riset sumber otoritatif,
kurasi materi terbaik, lalu tulis **modul belajar berkualitas tinggi dari nol** langsung di
repo, lalu build untuk verifikasi. Yang ada hanya kerangka; Claude yang **memikirkan busur
belajar, urutan bab, Student Outcome, lalu mengisinya** — bukan menyalin bullet jadi heading.

**Bebas subjek.** Skill ini TIDAK terikat ke Go/JS/PHP atau domain mana pun. Topik apa saja
bisa di-forge: pemrograman bahasa apa pun, DevOps, data, keamanan, desain, produk, bisnis,
matematika, sampai bahasa asing. Yang ditiru hanyalah **pipeline platform** (MDX +
`lessonSchema` + `@components` + Mermaid + build), bukan materi spesifik Go.

> Materi Go Artisan (online shop skincare, jembatan JS/PHP, output Go) **bukan default** lagi
> melainkan satu **profil opsional** yang hanya aktif saat menulis modul roadmap Go. Lihat
> "Profil Go Artisan Roadmap (opsional)".

## Keluarga skill (satu paket, satu standar)

Tiga skill ini satu keluarga Curriculum & Learning-Material Architect; pakai pipeline,
kosakata, dan standar mutu yang sama, untuk subjek apa pun:

- **`super-forge`** — dari OUTLINE tipis → rancang kurikulum lalu tulis modul/course baru
  dari nol. **(skill ini)**
- **`super-refine`** — satu file materi yang SUDAH ada → poles, perdalam, perkaya ke
  world-class (tanpa memecah struktur).
- **`super-chunker`** — satu file course monolit raksasa → kurasi jadi banyak chapter koheren
  + perkaya (transform struktural).

Alur antar skill: `super-forge` melahirkan materi; course yang menggemuk jadi monolit
diserahkan ke `super-chunker` untuk dipecah; file materi mana pun dipoles `super-refine`.

Kosakata bersama: *learning arc* (satu modul/chapter = satu busur belajar menuju Student
Outcome), *Student Outcome* ("di akhir bagian ini kamu bisa ..."), *connect the dots* (jahit
antar bagian), *Mesin enrichment* (rubrik aset pendukung), dan prinsip **"memperjelas, bukan
menggemukkan"**.

## Filosofi inti (jangan dilupakan)

**1. Arsitektur kurikulum dulu, baru tulis.** Ubah outline mentah jadi **urutan section
pedagogis** dengan busur yang jelas dan Student Outcome per bagian. Outline besar yang
mencakup banyak topik → usulkan pembagian modul/chapter dan konfirmasi sebelum menulis
banyak file.

**2. Tetapkan profil materi (pengganti asumsi yang dulu di-hardcode).** Sebelum menulis,
tetapkan tiga parameter; ini yang membuat skill berlaku untuk subjek apa pun:
- **Subjek & cakupan** — topik dan batasannya.
- **Audiens & bekal awal** — siapa pembacanya dan apa yang sudah mereka kuasai. Bila ada
  bekal yang jelas, **jembatani dari yang sudah mereka tahu** (teknik "bridge"); bila tidak,
  tulis lugas tanpa memaksakan jembatan.
- **Skenario jangkar (running example)** — satu contoh konkret realistis yang dipakai
  berulang agar materi membumi (mis. aplikasi e-commerce, dataset nyata, studi kasus,
  proyek desain). Pilih yang paling pas dengan subjek; **jangan** memaksakan domain tertentu.
- **Medium contoh** — kode (bahasa sesuai topik), konfigurasi, rumus, diagram, atau soal
  terbimbing, sesuai subjek.

**3. Riset + kurasi sebelum fakta.** Jangan menebak versi/nama/standar/angka. Verifikasi ke
sumber **primer & otoritatif untuk subjek itu**, lalu kumpulkan contoh terbaik (bukan
generik).

**4. Perkaya = lebih dalam + lebih nyata + lebih nyambung.** Tiap bagian punya "kenapa",
use-case nyata, hands-on/latihan, jebakan umum, visual yang memperjelas, dan penutup yang
menyambung.

**5. Memperjelas, bukan menggemukkan.** Tiap aset tambahan harus "membayar tempatnya".

## Dua jalur penulisan (pilih yang tepat)

### Jalur A — COURSE (DEFAULT, subjek apa pun)

Untuk topik apa pun. Ditulis ke **koleksi `courses`** di `src/content/courses/` (koleksi ini
**sudah ada**). Otomatis tersaji di `/courses/<slug>` lewat `src/pages/courses/[...slug].astro`
dan muncul di blok "Latest courses" homepage. Tidak ada domain/bahasa/jembatan yang
diwajibkan; pakai profil materi (Filosofi #2) yang sesuai topik. **JANGAN menyentuh** modul
roadmap atau listing roadmap.

### Jalur B — GO ARTISAN ROADMAP (profil opsional, hanya bila diminta eksplisit)

Hanya bila pengguna **menyatakan** outline ini milik salah satu dari 9 roadmap Go Artisan
(mis. "ini chapter baru untuk Roadmap 5"). Aktifkan "Profil Go Artisan Roadmap" di bawah:
ditulis ke `src/content/modules/rNcNN-slug.mdx`, dengan konvensi Go penuh.

Bila ragu, **pilih Jalur A** dan konfirmasi. Jangan pernah memodifikasi modul roadmap yang
sudah ada tanpa diminta.

## Sumber kebenaran (baca dulu, jangan menghafal dari ingatan)

1. **Kontrak platform** di `ai-instructions.md` (bagian antara `=== MULAI ===` dan
   `=== SELESAI ===`): aturan **teknis-platform** yang berlaku untuk SEMUA materi — skema
   frontmatter pasti (jangan tambah/kurang field), komponen sah, aturan MDX, cara menulis
   code/fenced block & Mermaid, aturan SVG figure. Patuhi 100%. **Catatan penting**: bagian
   yang menyebut output Go, "jembatan dari JS/PHP wajib", dan "jangkar skincare" adalah
   **profil Go Artisan**, hanya mengikat **Jalur B**; untuk **Jalur A** itu tidak berlaku.
2. **`component-reference.txt`** (root repo) = **sumber kebenaran komponen** `@components`
   (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip, Hero, Compare, FileTree,
   Endpoint, Def) + pola code block & Mermaid. Netral subjek. Jangan mengarang prop/slot/
   ikon/varian komponen TERDAFTAR. Komponen baru lewat jalur adaptif lalu didokumentasikan.
   (Komponen condong-teknis seperti `FileTree`/`Endpoint`/code block dipakai hanya bila
   subjeknya teknis.)
3. **`src/content.config.ts`** — `lessonSchema` bersama (netral subjek) untuk semua koleksi.
   Koleksi `courses` & `modules` **sudah ada**; tak perlu bootstrap.
4. **`src/styles/globals.css`** (area "GO-ARTISAN 2026") untuk gaya, dan
   **`src/components/index.ts`** untuk komponen yang benar-benar diekspor. Bila tak cocok
   dengan `component-reference.txt`, itu drift, samakan keduanya.
5. **Tetangga di koleksi yang sama**: baca course lain di `src/content/courses/` untuk pola
   gaya, kedalaman, penomoran `order`, dan bentuk entry (mis. `aws.mdx`/`go-luminas.mdx`).

## Mesin enrichment (rubrik bersama keluarga skill)

Sambil menulis, jalankan rubrik ini; tiap "tambah X" dipicu bentuk konten, **diisi sesuai
subjek** (bukan selalu kode):

1. **Use-case nyata** — bagaimana konsep dipakai di dunia nyata, dilabuhkan ke skenario
   jangkar materi. Hindari contoh generik.
2. **Visual (Mermaid default)** — alur/arsitektur/urutan/state/hubungan → ```mermaid
   (flowchart, sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram, dst.) + caption
   `<p class="fig-cap">`. SVG `.astro` HANYA untuk konsep yang tak cocok di Mermaid.
3. **Analogi** — konsep abstrak → `<Box variant="analogy">`.
4. **Hands-on / latihan** — prosedur atau soal konkret → `<Steps>`/`<Step>` + contoh
   (code/config/worked problem sesuai subjek).
5. **Best practice & jebakan** — cara yang direkomendasikan → `<Box variant="tip">`;
   kesalahan klasik → `<Box variant="warn">`.
6. **Perbandingan** — dua pendekatan bersaing → `<Compare>`. (Jembatan dari bekal audiens
   masuk sini bila profil materi mendefinisikan baseline; di Jalur B = jembatan JS/PHP wajib.)
7. **Kumpulan item terkait** — `<CardGrid>`/`<Card>`. Struktur proyek/berkas (subjek teknis)
   → `<FileTree>`.
8. **Contoh nyata & benar** — bisa "dieksekusi di kepala"; untuk kode pakai fenced block
   dengan `title="path/file"` dan idiomatik untuk bahasa/tool-nya.
9. **Connect the dots** — transisi antar section; tutup dengan "Ringkasan & Poin Penting"
   (`<Recap>`, `summaryHref = #ringkasan`).

Guardrail: setiap diagram/box memperjelas, bukan hiasan. **Dilarang**: `<div>` warna sebagai
pengganti gambar, atau SVG "sketsa" amatir.

## Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber **primer & otoritatif untuk subjeknya**. **Jangan
menebak** versi/nama/standar/angka; kutip dari sumber. Contoh peta sumber:

- Pemrograman/tool: dokumentasi resmi bahasa/framework, release notes, registry paket resmi
  (mis. untuk subjek Go: go.dev/doc, pkg.go.dev; subjek lain: docs resminya masing-masing).
- Standar/protokol: spesifikasi resmi (RFC, W3C, OpenAPI, ISO, dll.).
- Data/sains/matematika: makalah, buku teks standar, dataset/dokumentasi primer.
- Praktik industri: panduan resmi vendor, postmortem/engineering blog yang kredibel.

Verifikasi nama/jalur/versi ke sumber resmi sebelum menulisnya.

## Kurasi materi terbaik

Selain memverifikasi fakta, kumpulkan **bahan ajar terbaik**: contoh idiomatik dari sumber
resmi, pola yang direkomendasikan komunitas/praktisi subjek itu, dan satu-dua tautan lanjutan
yang benar-benar bernilai (taruh sebagai `[teks](url)` di prosa/Ringkasan, bukan dump
tautan). Pilih contoh yang bisa dieksekusi mental, bukan generik.

## Alur kerja

### 0. Verifikasi infrastruktur (umumnya sudah lengkap)

Koleksi `courses` & `modules`, route `/courses/[...slug]` & `/lessons/[...slug]`, dan blok
"Latest courses" homepage **sudah ada**. Jalur A cukup menulis `.mdx` ke
`src/content/courses/`; ia otomatis muncul. Hanya bila infrastruktur itu benar-benar hilang
(repo baru), bootstrap idempotent meniru pola yang ada, lalu verifikasi via build.

### 1. Terima outline; tetapkan profil materi & jalur

Outline bisa teks tempel, file, atau rujukan; bila tidak ada, tanyakan. Tetapkan:

- **Profil materi**: subjek, audiens & bekal awal, skenario jangkar, medium contoh
  (Filosofi #2). Tanyakan bila tidak tersirat di outline.
- **Jalur** (A Course / B Go Artisan Roadmap). Default A.
- **Granularitas**: satu topik → satu `.mdx`. Outline besar → **usulkan pembagian** (daftar
  slug + judul + 1 kalimat cakupan + Student Outcome + `order`) dan **konfirmasi** dulu.

### 2. Tentukan posisi & metadata

- **Jalur A (Course)**: slug topik yang jelas (mis. `caching-strategies`, `design-systems`,
  `intro-statistics`), bukan pola `rNcNN`. `order` = lanjutan course yang ada (cek tetangga
  di `src/content/courses/`). `target` = `"Course · <Topik>"` (middot literal `·`). `badge`
  2-4 huruf. URL jadi `/courses/<slug>`.
- **Jalur B (Go Roadmap)**: ikuti "Profil Go Artisan Roadmap" di bawah.

### 3. Rancang struktur belajar (inti skill ini)

Ubah outline mentah jadi **urutan section pedagogis**; tiap section punya Student Outcome.
Pola tulang punggung (sesuaikan per subjek):

1. **Intro / Kenapa** — motivasi & peta materi; kapan/di mana konsep dipakai.
2. **Mental model** — model pikir inti sebelum detail/sintaks/prosedur.
3. **Konsep inti** — satu section per ide besar, dari sederhana ke kompleks.
4. **Penerapan** — contoh nyata yang dilabuhkan ke skenario jangkar.
5. **Hands-on / latihan** — langkah/soal konkret (`<Steps>`/`<Step>` + contoh).
6. **Jebakan umum** — kesalahan klasik + cara menghindar.
7. **Ringkasan & Poin Penting** — section terakhir; `summaryHref = #ringkasan`.

Tuliskan rancangan section sebagai daftar `toc` final (num/id/title) sebelum mengisi. Untuk
modul besar, boleh tampilkan rancangan TOC ke pengguna dulu.

### 4. Riset terbaru

Jalankan riset + kurasi (di atas) untuk tiap fakta sebelum menulisnya.

### 5. Tulis modul dari nol (mengikuti kontrak platform)

Tulis `.mdx` ke folder yang sesuai jalur, ikuti kontrak platform `ai-instructions.md`:

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

Jalankan "Mesin enrichment": Mermaid untuk alur/arsitektur/urutan/state/hubungan; FileTree
untuk struktur berkas (subjek teknis); code/contoh block untuk contoh; SVG `.astro` hanya
untuk konsep yang tak cocok di Mermaid — aturan SVG: `viewBox`, tanpa `style=`, teks gelap di
latar terang, aksen token `--blue`, pakai lewat `<Figure>`, tak pernah di `.mdx`.

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
dibungkus `.tbl-wrap`, `&#123;` di dalam inline-code (pakai `{` literal di backtick). Jalur A:
course muncul di `/courses/<slug>` + blok "Latest courses". Jalur B: modul muncul di
`/lessons/<slug>` + katalog roadmap `courses/go-luminas.astro`.

### 10. Poles akhir (opsional, serahkan ke keluarga skill)

Setelah build bersih: file materi siap diserahkan ke **`super-refine`** untuk pass kualitas
akhir. **Course** yang tumbuh jadi monolit raksasa diserahkan ke **`super-chunker`** untuk
dipecah jadi chapter + diperkaya.

## Profil Go Artisan Roadmap (opsional, hanya Jalur B)

Aktif HANYA saat menulis modul roadmap Go (`src/content/modules/rNcNN-slug.mdx`). Di sini
seluruh konvensi Go di `ai-instructions.md` berlaku penuh:

- **Output Go**, audiens developer berpengalaman (kuat JS/React, pemula PHP/Laravel).
- **Jembatan dari JS/PHP WAJIB**: tiap konsep Go yang asing dijelaskan dari padanan JS/React
  atau PHP/Laravel (`<Box variant="bridge">` / `<Compare>`).
- **Jangkar skincare WAJIB**: contoh dilabuhkan ke proyek backend online shop skincare.
  Konvensi kode: module path `github.com/kamu/skincare-backend`, uang `PriceRupiah int64`.
- **`order` dari rentang roadmap**: R1 1-12 · R2 13-20 · R3 21-30 · R4 31-38 · R5 39-48 ·
  R6 49-53 · R7 54-58 · R8 59-67 · R9 68-73 (verifikasi ke tetangga `rNc*`). `target` =
  `"Roadmap N · <Judul Roadmap>"`.
- **Kompas konten**: `roadmap-md/NN-*.md` yang bersesuaian (Student Outcome per chapter).
- **Riset stack Go**: go.dev/doc, Effective Go, pkg.go.dev, chi (`github.com/go-chi/chi/v5`),
  pgx (`github.com/jackc/pgx/v5`), PostgreSQL, Docker, AWS. (Per Juni 2026: Go seri 1.26,
  PERIKSA ULANG.)

## Aturan keras (jangan dilanggar)

- **Rancang dulu, baru tulis.** Struktur belajar (busur + Student Outcome + urutan
  pedagogis) ditetapkan sebelum mengisi; jangan salin bullet outline jadi heading.
- **Tetapkan profil materi** (subjek/audiens/jangkar/medium) sebelum menulis; jangan
  mewarisi asumsi Go/JS/PHP/skincare kecuali di Jalur B.
- **Connect the dots.** Beri transisi antar section; tutup dengan "Ringkasan & Poin Penting".
- Patuhi kontrak platform `ai-instructions.md` (frontmatter, komponen, MDX, code block,
  Mermaid, SVG) untuk SEMUA materi.
- **Jalur A (Course)**: tulis ke `src/content/courses/`, JANGAN sentuh modul roadmap /
  listing roadmap. Tanpa domain/bahasa/jembatan yang dipaksakan.
- **Jalur B (Go Roadmap)**: hanya bila diminta eksplisit; aktifkan profil Go penuh.
- Tanpa `<h1>`/`<h2>` manual; tiap blok berteks satu baris (kecuali code/mermaid).
- Kode = fenced code block dengan `title=`. Diagram alur = ```mermaid. SVG mentah hanya di
  `.astro`.
- Box hanya 5 varian sah (tip/analogy/warn/note/bridge); Chip hanya di slot meta Hero, ikon
  dari daftar sah. Jangan varian "exam".
- Komponen sah + prop/slot/varian = `component-reference.txt`. Komponen baru → perbarui
  `component-reference.txt` + `index.ts`.
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan
  `@apply`, bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; fakta/versi/angka dari sumber otoritatif terkini.
- Bila outline mencakup banyak modul, konfirmasi rancangan pembagian sebelum menulis banyak file.

## Definition of done

- [ ] **Profil materi ditetapkan** (subjek, audiens & bekal awal, skenario jangkar, medium)
      dan jalur ditentukan benar (Course = default; Go Roadmap hanya bila eksplisit).
- [ ] **Struktur belajar dirancang** dari outline (busur + Student Outcome + TOC pedagogis
      runtut), bukan salin bullet; antar section dijahit (connect the dots).
- [ ] Modul baru ditulis penuh di folder yang benar; `order`/`target`/slug konsisten dengan
      jalur & tetangganya.
- [ ] Konten punya "kenapa", use-case nyata, hands-on/latihan, jebakan umum; ditutup
      "Ringkasan & Poin Penting". (Jalur B juga: jembatan JS/PHP + jangkar skincare.)
- [ ] Contoh benar & idiomatik untuk subjeknya, lulus build. Visual relevan (Mermaid untuk
      alur); tiap diagram memperjelas + caption.
- [ ] (Bila perlu) komponen baru dibuat, token-driven, diekspor, dipakai, didokumentasikan.
- [ ] Frontmatter & TOC sinkron 1:1; `readingTime` diisi; field frontmatter tak ditambah.
- [ ] Fakta diverifikasi & materi terbaik dikurasi dari sumber otoritatif terbaru subjek itu.
- [ ] `npm run build` bersih; Jalur A tampil di `/courses/<slug>` + homepage, Jalur B di
      `/lessons/<slug>` + katalog roadmap. Bahasa Indonesia penuh, tanpa em dash.
