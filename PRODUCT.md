# Product - Go Artisan

## Users

Developer Indonesia BERPENGALAMAN yang ingin belajar Go untuk backend. Profil khas:
kuat di ReactJS/JavaScript/TypeScript, pemula di Laravel/PHP. Mereka bukan pemula
pemrograman, jadi tidak butuh diajari dasar ngoding, melainkan jembatan dari yang
sudah dikuasai ke cara berpikir Go. Konteks pemakaian: sesi baca fokus 45-75 menit,
di laptop maupun ponsel, kadang dalam mode baca gelap/sepia.

## Product Purpose

Materi belajar Go (backend) berbahasa Indonesia penuh yang menjembatani setiap konsep
dari React/JS dan Laravel/PHP. Semua modul membangun SATU proyek nyata: backend online
shop skincare, dari fondasi Go sampai berjalan di AWS. Sukses = pembaca paham idiom Go,
bisa membangun API + worker yang benar, dan siap men-deploy.

## Brand Personality

Tenang, jelas, teknis, ramah. Suara seperti senior engineer yang menjelaskan dengan
padanan konkret dari bahasa yang sudah dikenal, tanpa menggurui dan tanpa jargon yang
tidak perlu. Bahasa Indonesia penuh, tanpa em dash.

## Anti-references

- Dokumentasi kaku yang mengasumsikan pembaca sudah paham Go.
- Tutorial pemula yang mengulang "apa itu variabel" untuk developer berpengalaman.
- Kursus generik penuh badge, CTA, dan upsell.
- Template SaaS AI-slop: gradient ungu, kartu seragam tanpa karakter.

## Design Principles

- Keterbacaan di atas segalanya; alat belajar menghilang demi materi.
- Jembatan sebelum definisi: padanan dari JS/React atau PHP/Laravel dulu, baru istilah Go.
- Kode dan diagram jelas: code block dengan nama file, diagram Mermaid yang relevan.
- Konsistensi sebagai janji: kosakata komponen sama dari halaman ke halaman.
- Satu proyek nyata sebagai benang merah, supaya setiap konsep punya tempat berlabuh.
- Gratis dan tanpa friksi: tidak ada login atau paywall.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Tiga tema baca (terang, sepia, gelap) dengan kontras yang sudah
dinaikkan. Pengatur ukuran teks (--scale). Dukungan penuh `prefers-reduced-motion`.
Target sentuh >=44px di perangkat coarse. Navigasi keyboard dan landmark ARIA.

## Stack & catatan teknis

- Astro 5 (SSG) + MDX, Tailwind v4 (token + utilities, tanpa Preflight), design system
  tangan di `src/styles/globals.css`.
- Code block disorot Shiki (tema gelap konsisten) dengan header nama file + tombol salin.
- Diagram lewat integrasi `astro-mermaid` (fenced ```mermaid, render klien, theme-aware).
- Deploy: static assets ke Cloudflare lewat `wrangler` (lihat `wrangler.jsonc`).
- Konten: `src/content/modules/NN-slug.mdx`. Panduan penulisan: `ai-instructions.md`,
  `component-reference.txt`, dan `instructions.txt` (untuk Project ChatGPT).
