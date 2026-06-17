---
name: super-refine
description: "Act as a Curriculum & Learning-Material Architect: take ANY existing learning-material file already in this repo (a course in src/content/courses/, a chapter in a chunked collection like src/content/aws/, or a Go roadmap module in src/content/modules/) and refine it to world-class IN PLACE — deepen thin sections, add real-world use cases + best practices, fix/clarify examples, strengthen visuals (Mermaid), connect the dots between sections, and create + wire a new reusable Astro component when needed — WITHOUT restructuring it into separate files (that structural split is super-chunker's job). SUBJECT-AGNOSTIC: works for any topic, not tied to Go/JS/PHP or any domain. Refines the material against its learning goals: for a Go roadmap module the source of truth is the matching roadmap-md/ file and the OPTIONAL 'Go Artisan roadmap' profile applies (Go output, JS/PHP bridge, skincare anchor); for a general course the source of truth is the material's own Student Outcomes / a user-provided outline, with no forced domain. Use after a draft is added to the repo and needs a quality pass, or whenever the user wants to refine/enrich/deepen/polish/update a learning material. Triggers: 'super-refine', 'perkaya/perdalam/poles/refine materi', 'tambah visual/diagram', 'buat komponen baru untuk materi', 'update materi'. Works IN the repo (edits files, creates + registers components, builds to verify), not as a zip. Obeys the writing contract in ai-instructions.md and the design system in src/styles/globals.css."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-refine

Jalankan skill ini sebagai **Curriculum & Learning-Material Architect** umum: ambil **satu
file materi belajar yang SUDAH ada di repo** dan poles jadi berkualitas world-class **di
tempat** — memperdalam yang tipis, menambah use-case nyata + best practice, memperbaiki
contoh, menguatkan visual, **menyambung benang merah antar section**, dan membuat komponen
baru bila perlu. Ini pass **kualitas**, bukan restrukturisasi: memecah satu file jadi banyak
chapter adalah tugas `super-chunker`, bukan skill ini.

**Bebas subjek.** Skill ini TIDAK terikat ke Go/JS/PHP atau domain mana pun. Materi apa saja
bisa dipoles: pemrograman bahasa apa pun, DevOps, data, keamanan, desain, produk, bisnis,
sampai bahasa asing.

> Konvensi Go Artisan (output Go, jembatan JS/PHP, jangkar skincare) **bukan default** lagi,
> melainkan satu **profil opsional** yang hanya aktif saat memoles modul roadmap Go. Lihat
> "Profil Go Artisan Roadmap (opsional)".

## Keluarga skill (satu paket, satu standar)

Tiga skill ini satu keluarga Curriculum & Learning-Material Architect; pakai pipeline,
kosakata, dan standar mutu yang sama, untuk subjek apa pun:

- **`super-forge`** — dari OUTLINE tipis → rancang kurikulum lalu tulis modul/course baru
  dari nol.
- **`super-refine`** — satu file materi yang SUDAH ada → poles, perdalam, perkaya ke
  world-class (tanpa memecah struktur). **(skill ini)**
- **`super-chunker`** — satu file course monolit raksasa → kurasi jadi banyak chapter koheren
  + perkaya (transform struktural).

Pembagian wilayah: `super-refine` = pass kualitas pada **satu file** (course, chapter, atau
modul roadmap), TANPA mengubah strukturnya. Bila file terlalu raksasa dan perlu dipecah jadi
chapter, itu `super-chunker`.

Kosakata bersama: *learning arc* (satu materi/chapter = satu busur belajar menuju Student
Outcome), *Student Outcome* ("di akhir bagian ini kamu bisa ..."), *connect the dots* (jahit
antar section), *Mesin enrichment* (rubrik aset pendukung), dan prinsip **"memperjelas, bukan
menggemukkan"**.

## Filosofi inti (jangan dilupakan)

**1. Poles menuju tujuan belajar materi.** Tiap materi punya **sumber kebenaran tujuan**:
untuk modul roadmap Go = `roadmap-md/NN-*.md` (Student Outcome per chapter); untuk course
umum = Student Outcome/`toc`/ringkasan materi itu sendiri, atau outline yang diberikan
pengguna. Refine = memastikan tiap Student Outcome bisa dicapai dari isi, dengan urutan
pedagogis yang benar. Yang hilang ditambah, yang dangkal diperdalam.

**2. Kenali profil materi dulu.** Simpulkan dari file + sumber tujuannya: subjek, audiens &
bekal awal, skenario jangkar (running example), dan medium contoh (kode/konfig/rumus/kasus).
Pertahankan profil yang sudah ada; **jangan** memaksakan domain/bahasa baru. Bila profil
tak jelas, tanyakan singkat.

**3. Perkaya = lebih dalam + lebih nyata + lebih nyambung, bukan lebih panjang.** Tiap section
idealnya punya "kenapa", use-case dunia nyata, dan penutup yang menyambung ke section
berikutnya. Materi yang sekadar benar tapi datar belum selesai.

**4. Memperjelas, bukan menggemukkan.** Tiap aset tambahan harus "membayar tempatnya".

**5. Kerjakan di tempat, tanpa restrukturisasi.** Edit file yang ada, buat + daftarkan
komponen, lalu `build`. Jangan memecah file jadi banyak chapter (itu `super-chunker`).

## Dua konteks (tentukan dulu)

- **Materi umum (DEFAULT)** — course di `src/content/courses/`, atau chapter di koleksi yang
  sudah dipecah (mis. `src/content/aws/`). Poles terhadap Student Outcome materi sendiri /
  outline pengguna. Tanpa domain/bahasa/jembatan yang dipaksakan.
- **Modul roadmap Go** — file di `src/content/modules/rNcNN-slug.mdx`. Aktifkan "Profil Go
  Artisan Roadmap": sumber tujuan = `roadmap-md/`, konvensi Go penuh.

## Sumber kebenaran (baca dulu, jangan menghafal dari ingatan)

Sebelum mengubah apa pun:

1. **Kontrak platform** di `ai-instructions.md` (antara `=== MULAI ===` dan `=== SELESAI ===`):
   aturan **teknis-platform** untuk SEMUA materi — skema frontmatter pasti (jangan tambah/
   kurang field), komponen sah, aturan MDX, code/fenced block & Mermaid, aturan SVG figure.
   Patuhi 100%. **Catatan**: bagian output Go, "jembatan JS/PHP wajib", dan "jangkar skincare"
   adalah **profil Go Artisan**, hanya mengikat modul roadmap.
2. **`component-reference.txt`** (root repo) = **sumber kebenaran komponen** `@components`
   (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip, Hero, Compare, FileTree,
   Endpoint, Def) + pola code block & Mermaid. Netral subjek. Jangan mengarang prop/slot/
   ikon/varian komponen TERDAFTAR. Komponen baru lewat jalur adaptif (Langkah 6) lalu
   didokumentasikan.
3. **File materi target** + figure-nya (bila ada) di `src/components/figures/`. Baca utuh
   sebelum menilai. Catat di mana ia di-render (course → `/courses/<slug>`; chapter koleksi →
   `/<koleksi>/<slug>`; modul roadmap → `/lessons/<slug>`).
4. **Sumber kebenaran tujuan**: modul roadmap → `roadmap-md/NN-*.md` (lihat pemetaan di
   profil Go); course umum → Student Outcome/`toc`/ringkasan materi itu, atau outline dari
   pengguna.
5. **`src/styles/globals.css`** (area "GO-ARTISAN 2026") + **`src/components/index.ts`** untuk
   komponen yang benar-benar diekspor. Bila tak cocok dengan `component-reference.txt`, itu
   drift, samakan keduanya.

## Mesin enrichment (rubrik bersama keluarga skill)

Saat memperkaya satu section, jalankan rubrik ini dan **tambahkan yang belum ada**, diisi
sesuai subjek (bukan selalu kode):

1. **Use-case nyata** — contoh konkret pemakaian di dunia nyata, dilabuhkan ke skenario
   jangkar materi. Hindari contoh generik.
2. **Visual (Mermaid default)** — alur/arsitektur/urutan/state/hubungan sulit dibayangkan →
   ```mermaid (flowchart, sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram) +
   caption `<p class="fig-cap">`. SVG `.astro` HANYA untuk konsep yang tak cocok di Mermaid.
3. **Analogi** — konsep abstrak → `<Box variant="analogy">`.
4. **Hands-on / latihan** — prosedur atau soal konkret → `<Steps>`/`<Step>` + contoh.
5. **Best practice & jebakan** — cara yang direkomendasikan → `<Box variant="tip">`;
   kesalahan klasik → `<Box variant="warn">`.
6. **Perbandingan** — dua pendekatan bersaing → `<Compare>`. (Jembatan dari bekal audiens
   masuk sini bila profil materi mendefinisikan baseline; di modul roadmap = jembatan JS/PHP.)
7. **Kumpulan item terkait** — `<CardGrid>`/`<Card>`. Struktur berkas (subjek teknis) →
   `<FileTree>`.
8. **Contoh nyata & benar** — bisa "dieksekusi di kepala"; untuk kode pakai fenced block
   dengan `title="path/file"`, idiomatik untuk bahasa/tool-nya.
9. **Connect the dots** — kalimat transisi antar section; tutup dengan "Ringkasan & Poin
   Penting" (`<Recap>`, `summaryHref = #ringkasan`).

Guardrail: setiap aset memperjelas kesulitan nyata, beri caption naratif singkat.
**Dilarang**: `<div>` warna sebagai pengganti gambar, atau SVG "sketsa" amatir.

## Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber **primer & otoritatif untuk subjeknya** (dokumentasi
resmi bahasa/tool, spesifikasi/standar, buku teks/makalah, data primer). Verifikasi versi/
nama/standar/angka. **Jangan menebak**; kutip dari sumber. (Untuk profil Go: go.dev/doc,
pkg.go.dev, chi `github.com/go-chi/chi/v5`, pgx `github.com/jackc/pgx/v5`, PostgreSQL, Docker,
AWS. Per Juni 2026 Go seri 1.26, PERIKSA ULANG.)

## Alur kerja

### 1. Tentukan & pahami target

Identifikasi file materi yang akan dipoles (tanya bila ambigu). Tetapkan konteksnya (materi
umum vs modul roadmap Go) dan **profil materi** (subjek, audiens & bekal, jangkar, medium).
Baca berurutan:

1. File `.mdx` target + semua figure yang di-import + frontmatter (`toc`, `readingTime`,
   `summaryHref`).
2. **Sumber kebenaran tujuan**: modul roadmap → `roadmap-md/NN-*.md` (Chapter, Primary Focus,
   Summary, Student Outcome); course umum → Student Outcome/`toc` materi sendiri atau outline
   pengguna.

Catat gap: chapter/topik hilang, section tipis, contoh tak idiomatik, tempat yang butuh
diagram, klaim fakta/versi yang mungkin usang, jembatan yang kurang (bila profil punya
baseline).

### 2. Riset terbaru

Jalankan riset di atas untuk tiap fakta yang akan ditulis/diubah.

### 3. Analisis celah (vs sumber tujuan)

Bandingkan materi dengan sumber tujuannya, bagian per bagian:

- **Topik/Student Outcome di sumber tujuan belum tercakup** → tambahkan section/konten.
- **Ada tapi dangkal** → perdalam: tambah "kenapa", use-case nyata, contoh, diagram.
- **Ada di materi tapi tak ada di sumber tujuan** → pertahankan bila relevan; tandai bila
  perlu dipindah.
- Contoh tak idiomatik, alur sulit dibayangkan, belum ada hands-on/jebakan, antar section
  tak nyambung → tangani via "Mesin enrichment".

### 4. Perkaya konten (edit di tempat)

Edit `.mdx` mengikuti kontrak platform + "Mesin enrichment": judul hero lewat prop `title`,
tiap `<p>`/blok berteks **satu baris** (kecuali isi fenced code & ```mermaid yang memang
multi-baris), sub-judul `<h3>`/`<h4>`, `<Box>` hanya 5 varian (tip/analogy/warn/note/bridge),
`<Chip>` hanya di slot meta Hero, escape `&#123;`/`&#125;` di TEKS MDX (bukan di code/mermaid),
pakai `&middot;`/`&rarr;`, **tanpa em dash**. Bahasa Indonesia penuh, gaya tenang, jelas,
hangat, teknis. Jangan menggurui hal dasar.

### 5. Perkuat visual

- **Mermaid (default untuk alur/arsitektur/urutan/state/hubungan)**: fenced ```mermaid
  (flowchart, sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram). Terpasang lewat
  `astro-mermaid`, render di klien, mengikuti tema. Caption opsional `<p class="fig-cap">`.
- **Code/contoh block**: perbaiki/lengkapi sebagai fenced block dengan `title="path/file"`,
  idiomatik untuk bahasa/tool subjek, bisa dieksekusi mental.
- **FileTree**: untuk struktur proyek/berkas (subjek teknis).
- **SVG `.astro` (khusus)**: HANYA untuk konsep yang tak cocok di Mermaid. Aturan SVG:
  `viewBox`, tanpa `style=`, tanpa aset eksternal, teks gelap di latar terang, aksen token
  `--blue`. Pakai lewat `<Figure>`.
- **Gambar raster**: HANYA bila ada tool/MCP image-generation di sesi ini. Simpan ke
  `public/img/<materi>/<nama>.png`, rujuk via `<Figure><img ... /></Figure>`. Tanpa tool
  gambar, JANGAN paksakan.

### 6. Komponen adaptif (buat + daftarkan + pakai)

Bila kebutuhan konten tak tercakup komponen/`globals.css` yang ada, **buat komponen baru dan
benar-benar pasang**:

1. Buat `src/components/<Nama>.astro` (lihat komponen sejenis dulu; props sederhana, markup
   pakai class semantik).
2. Style di `src/styles/globals.css` area **"GO-ARTISAN 2026"** (raw CSS token-driven, **bukan
   `@apply`**, **bukan** Tailwind mentah di MDX). Pakai `var(--ink/--ink-soft/--line/--paper/
   --blue)` agar **reaktif tema**; teks tubuh kontras **AA (>=4.5:1)**; hormati
   `prefers-reduced-motion`.
3. Re-export di `src/components/index.ts` agar bisa di-import dari `@components`.
4. **Dokumentasikan di `component-reference.txt`**: satu blok `FILE:` (prop, slot, varian,
   contoh) + perbarui daftar import, sinkron dengan `index.ts`.
5. Import & gunakan komponen itu di `.mdx`.

### 7. Sinkronkan frontmatter & TOC

Bila menambah/menghapus `<Section>`: jaga `toc` **1:1** (num/id/urutan sama), section
terakhir = "Ringkasan & Poin Penting", `summaryHref = #ringkasan`, perbarui `readingTime`.
`id` kebab-case unik. Jangan menambah/menghapus field frontmatter di luar skema pasti (title,
badge, topTitle, topSub, summary, order, target, readingTime, summaryHref, toc, footerTitle,
footerSub), hanya perbarui nilainya.

### 8. Verifikasi (wajib)

`npm run build` sampai bersih. Cek gotcha render: tidak ada leak tag di EOF, `<table>` mentah
dibungkus `.tbl-wrap`, `&#123;` di dalam inline-code (pakai `{` literal di backtick). Materi
tetap tampil di rute-nya (course → `/courses/<slug>`; chapter koleksi → `/<koleksi>/<slug>`;
modul roadmap → `/lessons/<slug>` + katalog `courses/go-luminas.astro`).

### 9. Bersihkan

Setelah build bersih, hapus folder zip/draft sisa (bila ada) agar tidak membingungkan. Bila
materi perlu langkah lain, lihat keluarga skill di atas.

## Profil Go Artisan Roadmap (opsional)

Aktif HANYA saat memoles modul roadmap Go (`src/content/modules/rNcNN-slug.mdx`). Konvensi Go
di `ai-instructions.md` berlaku penuh:

- **Output Go**, audiens developer berpengalaman (kuat JS/React, pemula PHP/Laravel).
- **Jembatan dari JS/PHP WAJIB**: tiap konsep Go yang asing dijembatani dari JS/React atau
  PHP/Laravel (`<Box variant="bridge">` / `<Compare>`).
- **Jangkar skincare WAJIB**: contoh berlabuh ke backend online shop skincare. Konvensi kode:
  module path `github.com/kamu/skincare-backend`, uang `PriceRupiah int64`.
- **Sumber tujuan**: `roadmap-md/NN-*.md` per grup roadmap — `r1c*` → `01-go-programming-
  foundations.md`, `r2c*` → `02-go-web-api-with-chi.md`, `r3c*` → `03-postgresql-and-pgx.md`,
  `r4c*` → `04-clean-backend-architecture-modular-monolith.md`, `r5c*` → `05-online-shop-
  skincare-domain-mastery.md`, `r6c*` → `06-testing-go-backend-applications.md`, `r7c*` →
  `07-security-authentication-production-safety.md`, `r8c*` → `08-docker-cicd-aws-deployment.md`,
  `r9c*` → `09-advanced-backend-engineering-scaling.md`.
- **Riset stack Go**: go.dev/doc, Effective Go, pkg.go.dev, chi, pgx, PostgreSQL, Docker, AWS.

## Aturan keras (jangan dilanggar)

- **Poles ke sumber tujuan**: tutup tiap Student Outcome yang dituntut; ikuti urutan
  pedagogisnya (kecuali ada alasan kuat yang dicatat).
- **Pertahankan profil materi**: jangan memaksakan domain/bahasa/jembatan baru di materi umum;
  konvensi Go/JS-PHP/skincare hanya di modul roadmap.
- **Connect the dots**: section tidak berdiri sendiri-sendiri; beri transisi & tutup dengan
  "Ringkasan & Poin Penting".
- **Tanpa restrukturisasi**: jangan memecah file jadi banyak chapter (itu `super-chunker`).
- Patuhi kontrak platform `ai-instructions.md` (frontmatter, komponen, MDX, code block,
  Mermaid, SVG).
- Tanpa `<h1>`/`<h2>` manual di MDX; tiap blok berteks satu baris (kecuali code/mermaid).
- Kode = fenced code block dengan `title=` (bukan `<pre>` manual). Diagram alur = ```mermaid.
  SVG mentah hanya di file `.astro`, tidak pernah di `.mdx`.
- Box hanya 5 varian sah (tip/analogy/warn/note/bridge); Chip hanya di slot meta Hero, ikon
  dari daftar sah. Jangan varian "exam".
- Komponen sah + prop/slot/varian = `component-reference.txt`. Komponen baru → perbarui
  `component-reference.txt` + `index.ts`.
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan `@apply`,
  bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; fakta/versi/angka dari sumber otoritatif terkini.
- Jangan menyentuh chrome situs (homepage, navbar, layout, katalog) kecuali diminta; fokus
  pada materi + komponen pendukungnya.

## Definition of done

- [ ] Konteks & **profil materi** dikenali (subjek/audiens/jangkar/medium); sumber kebenaran
      tujuan ditetapkan (roadmap-md untuk modul roadmap, Student Outcome/outline untuk course).
- [ ] **Goal coverage**: tiap topik/Student Outcome di sumber tujuan terwakili; urutan
      mengikuti urutan pedagogis (kecuali ada alasan kuat yang dicatat).
- [ ] Konten lebih dalam & lebih nyata: ada "kenapa", use-case nyata, hands-on/latihan,
      jebakan umum; antar section dijahit (connect the dots). (Modul roadmap: jembatan JS/PHP
      + jangkar skincare.)
- [ ] Contoh benar & idiomatik untuk subjeknya, lulus build mental.
- [ ] Visual relevan ditambah/diperkuat (Mermaid untuk alur); tiap diagram memperjelas + caption.
- [ ] (Bila perlu) komponen baru dibuat, token-driven, diekspor, dipakai, didokumentasikan.
- [ ] Frontmatter & TOC sinkron; `readingTime` diperbarui; field frontmatter tak ditambah;
      struktur file tidak dipecah.
- [ ] Fakta diverifikasi ke sumber otoritatif terbaru subjek itu.
- [ ] `npm run build` bersih; materi tetap tampil di rutenya.
- [ ] Bahasa Indonesia penuh, tanpa em dash; kontrak MDX tidak dilanggar.
