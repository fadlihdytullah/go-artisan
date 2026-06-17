---
name: super-refine
description: "Refine and enrich an EXISTING Go backend learning module already present in this repo (src/content/modules/*.mdx) for the Go Artisan site (Go for experienced JS/PHP developers, building an online shop skincare backend up to AWS deploy). Use after a generated module has been unzipped into the project and needs a quality pass, or whenever the user wants to refine, enrich, deepen, polish, or update a Go module, add more visuals/diagrams (Mermaid), improve code examples, create a new reusable Astro component and wire it in, or verify facts with up-to-date Go/chi/pgx/PostgreSQL/AWS research. Triggers: 'super-refine', 'perkaya/perdalam/poles/refine modul', 'tambah visual/diagram', 'buat komponen baru untuk materi', 'update materi modul Go'. Works IN the repo (edits files, creates + registers components, builds to verify), not as a zip. Obeys the writing contract in ai-instructions.md and the design system in src/styles/globals.css."
metadata:
  author: "Fadli Hidayatullah"
  scope: project
---

# super-refine

Memoles modul belajar **Go (backend) untuk Go Artisan** yang **sudah ada di repo**
menjadi berkualitas world-class: memperkaya konten, menguatkan jembatan dari JS/PHP,
memperbaiki contoh kode, menguatkan visual (Mermaid), dan membuat komponen baru bila
perlu, lalu memasangnya langsung.

Audiens materi: developer BERPENGALAMAN (kuat React/JS/TS, pemula Laravel/PHP), bukan
pemula ngoding. Semua modul membangun satu proyek: backend online shop skincare, dari
fondasi Go sampai deploy ke AWS.

Bedanya dengan generator (`ai-instructions.md`): generator **membuat modul baru** dan
mengeluarkan zip. `super-refine` **mengerjakan file yang sudah ada di repo**, mengedit
di tempat, membuat + mendaftarkan komponen, lalu `build` untuk memverifikasi.

## Sumber kebenaran (baca dulu)

Sebelum mengubah apa pun:

1. **`ai-instructions.md`** (bagian antara `=== MULAI ===` dan `=== SELESAI ===`)
   adalah **kontrak penulisan**: skema frontmatter pasti (jangan tambah/kurang field),
   komponen yang sah, aturan MDX, cara menulis code block & Mermaid, aturan SVG figure.
   Patuhi 100%. Skill ini mengatur _apa yang dikerjakan_ (refine in-repo); kontrak itu
   mengatur _cara menulisnya_.
2. **`component-reference.txt`** (root repo) adalah **sumber kebenaran komponen**:
   `@components` bawaan (Section, Box, Steps, Step, Recap, CardGrid, Card, Figure, Chip,
   Hero, Compare, FileTree, Endpoint, Def) berikut prop, slot, varian, ikon, plus pola
   code block (fenced + `title=`) dan Mermaid (fenced ```mermaid). Untuk komponen
   TERDAFTAR, jangan mengarang prop/slot/ikon/varian. Bila butuh komponen yang BELUM
   ada, buat lewat jalur adaptif (langkah 6) lalu dokumentasikan ke berkas ini.
3. **Modul target**: `src/content/modules/NN-slug.mdx` + figure-nya (bila ada) di
   `src/components/figures/`. Baca utuh sebelum menilai.
4. **`roadmap-md/NN-<slug>.md`** — roadmap kurikulum yang cocok dengan nomor modul
   (mis. modul `01-fondasi-go` → `roadmap-md/01-go-programming-foundations.md`).
   Berisi Chapter, Primary Focus, Summary, Student Outcome per bab; gunakan sebagai
   **kompas konten**: apa yang wajib dicakup, kedalaman yang diharapkan, urutan
   pedagogis yang benar. Lihat pemetaan lengkap di bawah.
5. **`src/styles/globals.css`** untuk gaya yang tersedia (area "GO-ARTISAN 2026"),
   dan `src/components/index.ts` untuk komponen yang benar-benar diekspor. Bila
   `index.ts` dan `component-reference.txt` tidak cocok, itu drift, samakan keduanya.

Jangan menghafal dari ingatan; baca file aslinya karena bisa berubah.

### Pemetaan modul → roadmap

| Modul (src/content/modules/) | Roadmap (roadmap-md/)                               |
| ---------------------------- | --------------------------------------------------- |
| `01-fondasi-go`              | `01-go-programming-foundations.md`                  |
| `02-*`                       | `02-go-web-api-with-chi.md`                         |
| `03-*`                       | `03-postgresql-and-pgx.md`                          |
| `04-*`                       | `04-clean-backend-architecture-modular-monolith.md` |
| `05-*`                       | `05-online-shop-skincare-domain-mastery.md`         |
| `06-*`                       | `06-testing-go-backend-applications.md`             |
| `07-*`                       | `07-security-authentication-production-safety.md`   |
| `08-*`                       | `08-docker-cicd-aws-deployment.md`                  |
| `09-*`                       | `09-advanced-backend-engineering-scaling.md`        |

Bila modul belum punya roadmap yang jelas (mis. modul lintas topik), pilih roadmap
yang paling banyak overlap kontennya dan catat alasannya.

## Alur kerja

### 1. Tentukan & pahami target

Identifikasi modul yang akan dipoles (tanya bila ambigu). Baca secara berurutan:

1. File `.mdx` target + semua figure yang di-import + frontmatter (`toc`, `readingTime`, `summaryHref`).
2. Roadmap yang bersesuaian (`roadmap-md/NN-*.md`) — baca seluruh Chapter, Primary
   Focus, Summary, dan Student Outcome. Ini adalah **outline resmi** yang menentukan
   topik wajib, urutan, dan kedalaman yang diinginkan.

Catat gap antara kondisi modul saat ini dan outline roadmap: chapter yang hilang,
section tipis, jembatan dari JS/PHP yang kurang, contoh kode yang tidak idiomatik,
tempat yang butuh diagram, klaim versi/API yang mungkin usang.

### 2. Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber resmi terkini: go.dev/doc, Effective Go,
pkg.go.dev, rilis Go, repo chi (`github.com/go-chi/chi/v5`) dan pgx
(`github.com/jackc/pgx/v5`), PostgreSQL docs, Docker docs, AWS docs. Verifikasi
versi, nama paket, jalur impor, dan API. **Jangan menebak**; kutip dari sumber
terkini. (Per Juni 2026: Go seri 1.26, chi v5, pgx v5, Go Modules default,
loop variable per-iterasi sejak 1.22, PERIKSA ULANG.)

### 3. Analisis celah

Bandingkan modul dengan roadmap chapter per chapter:

- **Chapter roadmap belum ada di modul** → section/topik wajib ditambahkan agar
  Student Outcome tiap chapter bisa tercapai.
- **Chapter ada tapi dangkal vs. roadmap** → perdalam sesuai Summary & Primary Focus
  di roadmap; tambahkan "kenapa", contoh kode, atau diagram.
- **Topik di modul tapi tidak ada di roadmap** → pertahankan bila relevan untuk
  proyek skincare atau dibutuhkan sebagai jembatan; tandai bila perlu dipindah ke modul lain.
- Belum dijembatani dari JS/React atau PHP/Laravel → tambahkan `<Box variant="bridge">`
  atau `<Compare>` (jembatan dulu, definisi Go menyusul, lalu perbedaannya).
- Contoh kode tidak idiomatik (error tidak dicek, tidak gofmt, interface dipaksakan)
  → perbaiki agar idiomatik dan berlabuh ke domain online shop skincare.
- Alur/arsitektur/urutan/state sulit dibayangkan → butuh diagram Mermaid.
- Belum ada hands-on / jebakan umum → tambahkan. Tutup dengan "Ringkasan & Poin Penting".

### 4. Perkaya konten (edit di tempat)

Edit `.mdx` mengikuti kontrak: judul hero lewat prop `title`, tiap `<p>`/blok berteks
**satu baris** (kecuali isi fenced code block & ```mermaid yang memang multi-baris),
sub-judul `<h3>`/`<h4>`, `<Box>` hanya 5 varian (tip/analogy/warn/note/bridge),
`<Chip>` hanya di slot meta Hero, escape `&#123;`/`&#125;` di TEKS MDX (bukan di
code/mermaid), pakai `&middot;`/`&rarr;`, **tanpa em dash**. Bahasa Indonesia penuh,
gaya tenang, jelas, hangat, teknis. Jangan menggurui hal dasar pemrograman.

### 5. Perkuat visual

Pilih jalur paling tepat untuk Go:

- **Mermaid (default untuk alur/arsitektur/urutan/state)**: tulis fenced ```mermaid
  block (flowchart, sequenceDiagram, stateDiagram-v2, erDiagram, classDiagram).
  Sudah terpasang lewat integrasi `astro-mermaid`, render di klien, mengikuti tema.
  Caption opsional `<p class="fig-cap">`. Cocok untuk request lifecycle, layered
  architecture, order state machine, alur checkout, goroutine/channel, event-driven.
- **Code block**: perbaiki/lengkapi contoh sebagai fenced ```go/```bash/```sql dengan
  `title="path/file.go"`. Pastikan idiomatik dan benar-benar bisa dikompilasi secara mental.
- **FileTree**: untuk struktur proyek/modular monolith.
- **SVG `.astro` (khusus)**: HANYA untuk konsep yang tak cocok di Mermaid (memori,
  pointer, header slice). Aturan SVG: viewBox, tanpa `style=`, tanpa aset eksternal,
  teks gelap di latar terang, aksen `#006f8a` (Go cyan, token `--blue`). Pakai lewat `<Figure>`.
- **Gambar raster**: HANYA bila ada tool/MCP image-generation di sesi ini. Simpan ke
  `public/img/<modul>/<nama>.png`, rujuk via `<Figure><img ... /></Figure>`. Tanpa tool
  gambar, JANGAN paksakan. **Dilarang**: kotak `<div>` warna sebagai pengganti gambar,
  atau SVG "sketsa" amatir.

Setiap diagram harus benar-benar memperjelas, bukan hiasan. Beri caption naratif singkat.

### 6. Komponen adaptif (buat + daftarkan + pakai)

Bila kebutuhan konten tak tercakup komponen/`globals.css` yang ada, **buat komponen
baru dan benar-benar pasang**:

1. Buat `src/components/<Nama>.astro` (lihat komponen sejenis dulu agar pola konsisten;
   props sederhana, markup pakai class semantik).
2. Tambahkan stylenya di `src/styles/globals.css`, di area penanda **"GO-ARTISAN 2026"**
   (raw CSS dengan token dari `@theme inline`, **bukan `@apply`**, **bukan** utility
   Tailwind mentah di MDX). Pakai `var(--ink/--ink-soft/--line/--paper/--blue)` agar
   **reaktif tema** (light/sepia/dark). Teks tubuh wajib kontras **AA (>=4.5:1)**.
   Hormati `prefers-reduced-motion` untuk animasi.
3. Re-export di `src/components/index.ts` agar bisa di-import dari `@components`.
4. **Dokumentasikan di `component-reference.txt`**: tambahkan satu blok `FILE:` (prop,
   slot, varian, contoh) mengikuti pola entri lain, dan perbarui daftar "Import HANYA
   dari @components" di atas. Berkas itu dilampirkan ke generator ChatGPT, jadi wajib
   sinkron dengan `index.ts`.
5. Import & gunakan komponen itu di `.mdx`.

Jangan menyisipkan utility Tailwind mentah di MDX; semua gaya tinggal di globals.css.

### 7. Sinkronkan frontmatter & TOC

Bila menambah/menghapus `<Section>`: jaga `toc` **1:1** (num/id/urutan sama), section
terakhir = "Ringkasan & Poin Penting", `summaryHref = #ringkasan`, perbarui
`readingTime`. `id` kebab-case unik. Jangan menambah/menghapus field frontmatter di
luar skema pasti `ai-instructions.md` (title, badge, topTitle, topSub, summary, order,
target, readingTime, summaryHref, toc, footerTitle, footerSub), hanya perbarui nilainya.

### 8. Verifikasi (wajib)

Jalankan `npm run build` sampai bersih (tanpa error). Modul otomatis muncul di list
kurikulum homepage dan switcher navbar lewat `getCollection`.

### 9. Setelah berhasil, hapus folder zip hasil generator (bila ada) agar tidak membingungkan.

## Aturan keras (jangan dilanggar)

- Patuhi seluruh kontrak `ai-instructions.md` (frontmatter, komponen, MDX, code block, Mermaid, SVG).
- **Ikuti outline roadmap**: topik dari roadmap chapter adalah wajib; jangan lewatkan
  Student Outcome yang disebut; urutan pedagogis roadmap adalah urutan yang benar.
- Tanpa `<h1>`/`<h2>` manual di MDX; tiap blok berteks satu baris (kecuali code/mermaid).
- Kode = fenced code block dengan `title=` (bukan `<pre>` manual). Diagram alur = ```mermaid.
  SVG mentah hanya di file `.astro`, tidak pernah di `.mdx`.
- Box hanya 5 varian sah (tip/analogy/warn/note/bridge); Chip hanya di slot meta Hero,
  ikon dari daftar sah. Jangan pakai varian "exam".
- Setiap konsep Go yang asing DIJEMBATANI dari JS/React atau PHP/Laravel.
- Komponen sah + prop/slot/varian = `component-reference.txt`. Bila membuat komponen
  baru, perbarui `component-reference.txt` + `index.ts` agar generator tetap sinkron.
- Component utilities di `globals.css` (token-driven, area "GO-ARTISAN 2026"), bukan
  `@apply`, bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; versi/jalur impor/API dari sumber terkini.
- Jangan menyentuh chrome situs (homepage list, navbar, layout) kecuali diminta; fokus
  pada materi modul dan komponen pendukungnya.

## Definition of done

- [ ] **Roadmap coverage**: semua chapter di roadmap yang bersesuaian terwakili; Student
      Outcome tiap chapter bisa dicapai dari konten modul; urutan section mengikuti urutan
      pedagogis roadmap (kecuali ada alasan kuat yang dicatat).
- [ ] Konten lebih dalam: ada "kenapa", jembatan konkret dari JS/PHP, hands-on, jebakan umum.
- [ ] Contoh kode idiomatik, berlabuh ke domain online shop skincare, lulus build secara mental.
- [ ] Visual relevan ditambah/diperkuat (Mermaid untuk alur); tiap diagram memperjelas, ada caption.
- [ ] (Bila perlu) komponen baru dibuat, di-style token-driven, diekspor, dipakai, dan
      didokumentasikan di `component-reference.txt` (sinkron dengan `index.ts`).
- [ ] Frontmatter & TOC sinkron; `readingTime` diperbarui; field frontmatter tak ditambah.
- [ ] Fakta diverifikasi ke sumber resmi terbaru (Go/chi/pgx/PostgreSQL/AWS).
- [ ] `npm run build` bersih.
- [ ] Bahasa Indonesia penuh, tanpa em dash; kontrak MDX tidak dilanggar.
