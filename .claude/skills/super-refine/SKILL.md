---
name: super-refine
description: "Act as a Curriculum & Learning-Material Architect: refine and enrich an EXISTING Go backend learning module already present in this repo (src/content/modules/rNcNN-slug.mdx, 73 modules across 9 roadmaps, rendered at /lessons/<slug>) for the Go Artisan site (Go for experienced JS/PHP developers, building an online shop skincare backend up to AWS deploy). Treats the matching roadmap-md/ file as the official curriculum map (Student Outcomes per chapter) and brings the module up to those outcomes: deepens thin sections, strengthens the JS/PHP bridge, fixes idiomatic Go examples, adds real-world use cases + best practices, strengthens visuals (Mermaid), connects the dots between sections, and creates + wires a new reusable Astro component when needed. Use after a generated module is unzipped into the repo and needs a quality pass, or whenever the user wants to refine/enrich/deepen/polish/update a Go ROADMAP module. (For monolithic single-file COURSES in src/content/courses/, use super-chunker's ENRICH mode instead.) Triggers: 'super-refine', 'perkaya/perdalam/poles/refine modul', 'tambah visual/diagram', 'buat komponen baru untuk materi', 'update materi modul Go'. Works IN the repo (edits files, creates + registers components, builds to verify), not as a zip. Obeys the writing contract in ai-instructions.md and the design system in src/styles/globals.css."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-refine

Jalankan skill ini sebagai **Curriculum & Learning-Material Architect** untuk materi
engineering: memoles modul belajar **Go (backend) untuk Go Artisan** yang **sudah ada di
repo** menjadi berkualitas world-class. Bukan sekadar tukang edit kata, tapi perancang
kurikulum yang menutup jarak antara isi modul saat ini dan **Student Outcome** yang dituntut
roadmap: memperdalam yang tipis, menguatkan jembatan dari JS/PHP, memperbaiki contoh kode,
menambah use-case nyata + best practice, menguatkan visual (Mermaid), **menyambung benang
merah antar section**, dan membuat komponen baru bila perlu, lalu memasangnya langsung.

Audiens materi: developer BERPENGALAMAN (kuat React/JS/TS, pemula Laravel/PHP), bukan
pemula ngoding. Semua modul membangun satu proyek menerus: backend online shop skincare,
dari fondasi Go sampai deploy ke AWS.

## Keluarga skill (satu paket, satu standar)

Tiga skill ini satu keluarga Curriculum & Learning-Material Architect; pakai kontrak,
kosakata, dan standar mutu yang sama:

- **`super-forge`** — dari OUTLINE tipis → rancang kurikulum lalu tulis modul/course baru
  dari nol.
- **`super-refine`** — modul roadmap yang SUDAH ada di repo → poles, perdalam, perkaya ke
  world-class. **(skill ini)**
- **`super-chunker`** — satu file course monolit raksasa → kurasi jadi chapter koheren +
  perkaya (mode ENRICH-only untuk memperdalam chapter yang sudah terpecah).

Pembagian wilayah: `super-refine` menggarap **modul roadmap** (`src/content/modules/`,
render di `/lessons/<slug>`). Untuk file **course** (`src/content/courses/`), enrich-nya
ditangani `super-chunker`, bukan skill ini.

Kosakata bersama: *learning arc* (satu modul = satu busur belajar menuju Student Outcome),
*Student Outcome* ("di akhir bab ini kamu bisa ..."), *connect the dots* (jahit antar
section), *Mesin enrichment* (rubrik aset pendukung), dan prinsip **"memperjelas, bukan
menggemukkan"**.

## Filosofi inti (jangan dilupakan)

**1. Roadmap = peta kurikulum, modul = pelaksanaannya.** `roadmap-md/NN-*.md` yang
bersesuaian adalah outline resmi: Chapter, Primary Focus, Summary, dan Student Outcome.
Refine = memastikan setiap Student Outcome bisa dicapai dari isi modul, dengan urutan
pedagogis roadmap. Yang hilang ditambah, yang dangkal diperdalam.

**2. Perkaya = lebih dalam + lebih nyata + lebih nyambung, bukan lebih panjang.** Setiap
section idealnya punya "kenapa", jembatan konkret dari JS/PHP, use-case dunia nyata, dan
penutup yang menyambung ke section berikutnya. Modul yang sekadar benar tapi datar belum
selesai.

**3. Memperjelas, bukan menggemukkan.** Tiap aset tambahan (diagram, box, contoh) harus
"membayar tempatnya" dengan menjelaskan kesulitan nyata. Jangan menambah diagram untuk ide
yang sudah jelas dalam satu kalimat.

**4. Kerjakan di tempat.** Beda dengan generator yang mengeluarkan zip, `super-refine`
mengedit file yang sudah ada di repo, membuat + mendaftarkan komponen, lalu `build` untuk
memverifikasi.

## Sumber kebenaran (baca dulu, jangan menghafal dari ingatan)

Sebelum mengubah apa pun:

1. **`ai-instructions.md`** (bagian antara `=== MULAI ===` dan `=== SELESAI ===`) =
   **kontrak penulisan**: skema frontmatter pasti (jangan tambah/kurang field), komponen
   sah, aturan MDX, cara menulis code block & Mermaid, aturan SVG figure. Patuhi 100%. Skill
   ini mengatur _apa yang dikerjakan_ (refine in-repo); kontrak itu mengatur _cara
   menulisnya_.
2. **`component-reference.txt`** (root repo) = **sumber kebenaran komponen** `@components`
   (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip, Hero, Compare, FileTree,
   Endpoint, Def) + prop/slot/varian/ikon, plus pola code block (fenced + `title=`) dan
   Mermaid (fenced ```mermaid). Untuk komponen TERDAFTAR, jangan mengarang prop/slot/ikon/
   varian. Komponen baru lewat jalur adaptif (Langkah 6) lalu didokumentasikan.
3. **Modul target**: `src/content/modules/rNcNN-slug.mdx` + figure-nya (bila ada) di
   `src/components/figures/`. Baca utuh sebelum menilai. (Modul render di `/lessons/<slug>`
   dan tampil di katalog `src/pages/courses/go-luminas.astro` yang mengelompokkan 73 modul
   jadi 9 tahap roadmap.)
4. **`roadmap-md/NN-<slug>.md`** — roadmap kurikulum yang cocok dengan roadmap modul (lihat
   pemetaan di bawah). Berisi Chapter, Primary Focus, Summary, Student Outcome per bab.
   Gunakan sebagai **kompas konten**: apa yang wajib dicakup, kedalaman yang diharapkan,
   urutan pedagogis yang benar.
5. **`src/styles/globals.css`** (area "GO-ARTISAN 2026") untuk gaya yang tersedia, dan
   **`src/components/index.ts`** untuk komponen yang benar-benar diekspor. Bila `index.ts`
   dan `component-reference.txt` tidak cocok, itu drift, samakan keduanya.

Konvensi kode: module path `github.com/kamu/skincare-backend`, uang `PriceRupiah int64`
(jangan float) bila menyentuh domain itu.

### Pemetaan modul → roadmap

Modul memakai prefix `rNcNN` (Roadmap N, Chapter NN). Petakan per grup roadmap:

| Modul (src/content/modules/) | Roadmap (roadmap-md/)                               |
| ---------------------------- | --------------------------------------------------- |
| `r1c*`                       | `01-go-programming-foundations.md`                  |
| `r2c*`                       | `02-go-web-api-with-chi.md`                          |
| `r3c*`                       | `03-postgresql-and-pgx.md`                           |
| `r4c*`                       | `04-clean-backend-architecture-modular-monolith.md` |
| `r5c*`                       | `05-online-shop-skincare-domain-mastery.md`         |
| `r6c*`                       | `06-testing-go-backend-applications.md`             |
| `r7c*`                       | `07-security-authentication-production-safety.md`   |
| `r8c*`                       | `08-docker-cicd-aws-deployment.md`                  |
| `r9c*`                       | `09-advanced-backend-engineering-scaling.md`        |

Bila modul lintas topik dan roadmap-nya tak jelas, pilih roadmap dengan overlap konten
terbanyak dan catat alasannya.

## Mesin enrichment (rubrik bersama keluarga skill)

Saat memperkaya satu section/chapter, jalankan rubrik ini dan **tambahkan yang belum ada**.
Tiap "tambah X" dipicu bentuk konten, bukan selera:

1. **Use-case nyata.** Tambahkan minimal satu contoh konkret bagaimana konsep ini dipakai di
   backend sungguhan, dilabuhkan ke domain online shop skincare (mis. validasi harga
   `PriceRupiah`, alur checkout, idempotensi pembayaran). Hindari `foo/bar`.
2. **Jembatan JS/PHP (WAJIB di sini).** Tiap konsep Go yang asing dijembatani dari JS/React
   atau PHP/Laravel via `<Box variant="bridge">` atau `<Compare>` (jembatan dulu, definisi
   Go menyusul, lalu perbedaannya).
3. **Visual (Mermaid default).** Alur/arsitektur/urutan/state sulit dibayangkan? → ```mermaid
   (flowchart, sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram), caption
   `<p class="fig-cap">`. SVG `.astro` HANYA untuk konsep yang tak cocok di Mermaid (memori,
   pointer, header slice).
4. **Analogi.** Konsep abstrak yang mudah salah-paham? → `<Box variant="analogy">`.
5. **Hands-on.** Ada prosedur konkret membangun sesuatu? → `<Steps>`/`<Step>` + code block
   `title=`.
6. **Best practice & jebakan.** Cara idiomatik yang direkomendasikan → `<Box variant="tip">`;
   kesalahan klasik (error tak dicek, goroutine bocor, N+1 query) → `<Box variant="warn">`.
7. **Perbandingan.** Dua pendekatan bersaing → `<Compare>`.
8. **Kumpulan item terkait.** Sekumpulan opsi/perintah/komponen sejajar → `<CardGrid>`/`<Card>`.
9. **Kode nyata & idiomatik.** Error sebagai nilai, gofmt, accept interfaces/return structs,
   context sebagai parameter pertama; `title="path/file.go"`; bisa "dikompilasi di kepala".
10. **Connect the dots.** Beri kalimat transisi antar section dan tutup modul dengan
    "Ringkasan & Poin Penting" (`<Recap>`, `summaryHref = #ringkasan`).

Guardrail: setiap aset harus memperjelas kesulitan nyata, beri caption naratif singkat.
**Dilarang**: kotak `<div>` warna sebagai pengganti gambar, atau SVG "sketsa" amatir.

## Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber resmi terkini: go.dev/doc, Effective Go, pkg.go.dev,
rilis Go, repo chi (`github.com/go-chi/chi/v5`) & pgx (`github.com/jackc/pgx/v5`), PostgreSQL
docs, Docker docs, AWS docs. Verifikasi versi, nama paket, jalur impor, dan API. **Jangan
menebak**; kutip dari sumber. (Per Juni 2026: Go seri 1.26, chi v5, pgx v5, Go Modules
default, loop variable per-iterasi sejak 1.22, PERIKSA ULANG.)

## Alur kerja

### 1. Tentukan & pahami target

Identifikasi modul yang akan dipoles (tanya bila ambigu). Baca berurutan:

1. File `.mdx` target + semua figure yang di-import + frontmatter (`toc`, `readingTime`,
   `summaryHref`).
2. Roadmap yang bersesuaian (`roadmap-md/NN-*.md`) — seluruh Chapter, Primary Focus, Summary,
   dan **Student Outcome**. Ini outline resmi yang menentukan topik wajib, urutan, kedalaman.

Catat gap: chapter hilang, section tipis, jembatan JS/PHP kurang, contoh tak idiomatik,
tempat yang butuh diagram, klaim versi/API yang mungkin usang.

### 2. Riset terbaru

Jalankan riset di atas untuk tiap fakta yang akan ditulis/diubah.

### 3. Analisis celah (vs Student Outcome roadmap)

Bandingkan modul dengan roadmap chapter per chapter:

- **Chapter roadmap belum ada di modul** → tambahkan section/topik agar Student Outcome
  tercapai.
- **Chapter ada tapi dangkal** → perdalam sesuai Summary & Primary Focus; tambah "kenapa",
  contoh, diagram, use-case nyata.
- **Topik di modul tapi tak ada di roadmap** → pertahankan bila relevan untuk proyek
  skincare atau dibutuhkan sebagai jembatan; tandai bila perlu dipindah ke modul lain.
- Belum dijembatani dari JS/PHP, contoh tak idiomatik, alur sulit dibayangkan, belum ada
  hands-on/jebakan → tangani via "Mesin enrichment".

### 4. Perkaya konten (edit di tempat)

Edit `.mdx` mengikuti kontrak + "Mesin enrichment": judul hero lewat prop `title`, tiap
`<p>`/blok berteks **satu baris** (kecuali isi fenced code block & ```mermaid yang memang
multi-baris), sub-judul `<h3>`/`<h4>`, `<Box>` hanya 5 varian (tip/analogy/warn/note/bridge),
`<Chip>` hanya di slot meta Hero, escape `&#123;`/`&#125;` di TEKS MDX (bukan di
code/mermaid), pakai `&middot;`/`&rarr;`, **tanpa em dash**. Bahasa Indonesia penuh, gaya
tenang, jelas, hangat, teknis. Jangan menggurui hal dasar pemrograman.

### 5. Perkuat visual

- **Mermaid (default untuk alur/arsitektur/urutan/state)**: fenced ```mermaid (flowchart,
  sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram). Sudah terpasang lewat
  `astro-mermaid`, render di klien, mengikuti tema. Caption opsional `<p class="fig-cap">`.
  Cocok untuk request lifecycle, layered architecture, order state machine, alur checkout,
  goroutine/channel, event-driven.
- **Code block**: perbaiki/lengkapi contoh sebagai fenced ```go/```bash/```sql dengan
  `title="path/file.go"`, idiomatik & bisa dikompilasi secara mental.
- **FileTree**: untuk struktur proyek/modular monolith.
- **SVG `.astro` (khusus)**: HANYA untuk konsep yang tak cocok di Mermaid (memori, pointer,
  header slice). Aturan SVG: `viewBox`, tanpa `style=`, tanpa aset eksternal, teks gelap di
  latar terang, aksen `#006f8a` (Go cyan, token `--blue`). Pakai lewat `<Figure>`.
- **Gambar raster**: HANYA bila ada tool/MCP image-generation di sesi ini. Simpan ke
  `public/img/<modul>/<nama>.png`, rujuk via `<Figure><img ... /></Figure>`. Tanpa tool
  gambar, JANGAN paksakan.

### 6. Komponen adaptif (buat + daftarkan + pakai)

Bila kebutuhan konten tak tercakup komponen/`globals.css` yang ada, **buat komponen baru dan
benar-benar pasang**:

1. Buat `src/components/<Nama>.astro` (lihat komponen sejenis dulu; props sederhana, markup
   pakai class semantik).
2. Style di `src/styles/globals.css` area **"GO-ARTISAN 2026"** (raw CSS token-driven dari
   `@theme inline`, **bukan `@apply`**, **bukan** Tailwind mentah di MDX). Pakai
   `var(--ink/--ink-soft/--line/--paper/--blue)` agar **reaktif tema**; teks tubuh kontras
   **AA (>=4.5:1)**; hormati `prefers-reduced-motion`.
3. Re-export di `src/components/index.ts` agar bisa di-import dari `@components`.
4. **Dokumentasikan di `component-reference.txt`**: satu blok `FILE:` (prop, slot, varian,
   contoh) mengikuti pola entri lain + perbarui daftar import. Berkas ini dilampirkan ke
   generator, jadi wajib sinkron dengan `index.ts`.
5. Import & gunakan komponen itu di `.mdx`.

### 7. Sinkronkan frontmatter & TOC

Bila menambah/menghapus `<Section>`: jaga `toc` **1:1** (num/id/urutan sama), section
terakhir = "Ringkasan & Poin Penting", `summaryHref = #ringkasan`, perbarui `readingTime`.
`id` kebab-case unik. Jangan menambah/menghapus field frontmatter di luar skema pasti (title,
badge, topTitle, topSub, summary, order, target, readingTime, summaryHref, toc, footerTitle,
footerSub), hanya perbarui nilainya.

### 8. Verifikasi (wajib)

`npm run build` sampai bersih. Cek gotcha render: tidak ada leak tag di EOF, `<table>` mentah
dibungkus `.tbl-wrap`, `&#123;` di dalam inline-code (pakai `{` literal di backtick). Modul
muncul di `/lessons/<slug>` lewat `getCollection('modules')` dan di katalog roadmap
`courses/go-luminas.astro` (tahap roadmap yang sesuai).

### 9. Bersihkan

Setelah build bersih, hapus folder zip hasil generator (bila ada) agar tidak membingungkan.
Modul siap; bila ingin diproses lebih lanjut, lihat keluarga skill di atas.

## Aturan keras (jangan dilanggar)

- **Ikuti outline roadmap**: topik dari roadmap chapter wajib; jangan lewatkan Student
  Outcome; urutan pedagogis roadmap adalah urutan yang benar.
- **Connect the dots**: section tidak berdiri sendiri-sendiri; beri transisi & tutup dengan
  "Ringkasan & Poin Penting".
- Setiap konsep Go yang asing DIJEMBATANI dari JS/React atau PHP/Laravel.
- Patuhi seluruh kontrak `ai-instructions.md` (frontmatter, komponen, MDX, code block,
  Mermaid, SVG).
- Tanpa `<h1>`/`<h2>` manual di MDX; tiap blok berteks satu baris (kecuali code/mermaid).
- Kode = fenced code block dengan `title=` (bukan `<pre>` manual). Diagram alur = ```mermaid.
  SVG mentah hanya di file `.astro`, tidak pernah di `.mdx`.
- Box hanya 5 varian sah (tip/analogy/warn/note/bridge); Chip hanya di slot meta Hero, ikon
  dari daftar sah. Jangan varian "exam".
- Komponen sah + prop/slot/varian = `component-reference.txt`. Komponen baru → perbarui
  `component-reference.txt` + `index.ts` agar generator tetap sinkron.
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan
  `@apply`, bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; versi/jalur impor/API dari sumber terkini.
- Jangan menyentuh chrome situs (homepage, navbar, layout, katalog) kecuali diminta; fokus
  pada materi modul + komponen pendukungnya.

## Definition of done

- [ ] **Roadmap coverage**: semua chapter roadmap yang bersesuaian terwakili; tiap Student
      Outcome bisa dicapai dari konten modul; urutan section mengikuti urutan pedagogis
      roadmap (kecuali ada alasan kuat yang dicatat).
- [ ] Konten lebih dalam & lebih nyata: ada "kenapa", jembatan konkret JS/PHP, use-case
      nyata, hands-on, jebakan umum; antar section dijahit (connect the dots).
- [ ] Contoh kode idiomatik, berlabuh ke domain online shop skincare, lulus build mental.
- [ ] Visual relevan ditambah/diperkuat (Mermaid untuk alur); tiap diagram memperjelas + caption.
- [ ] (Bila perlu) komponen baru dibuat, token-driven, diekspor, dipakai, didokumentasikan
      di `component-reference.txt` (sinkron dengan `index.ts`).
- [ ] Frontmatter & TOC sinkron; `readingTime` diperbarui; field frontmatter tak ditambah.
- [ ] Fakta diverifikasi ke sumber resmi terbaru (Go/chi/pgx/PostgreSQL/AWS).
- [ ] `npm run build` bersih; modul tampil di `/lessons/<slug>` + katalog roadmap.
- [ ] Bahasa Indonesia penuh, tanpa em dash; kontrak MDX tidak dilanggar.
