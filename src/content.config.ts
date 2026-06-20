import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema frontmatter bersama untuk semua koleksi materi (modul & course).
// Schema HANYA memvalidasi frontmatter (metadata), bukan isi body —
// jadi menambah jenis komponen baru di body tidak akan pernah merusak materi lama.
const lessonSchema = z.object({
  title: z.string(), // judul tab/<title>
  badge: z.string(), // teks logo-badge di topbar (mis. "GO", "API", "PG")
  topTitle: z.string(), // judul utama topbar
  topSub: z.string(), // subjudul topbar
  summary: z.string(), // ringkasan singkat untuk halaman indeks
  order: z.number().default(99), // urutan tampil di indeks
  target: z.string().optional(), // mis. "Roadmap 1 · Fondasi" atau "Proyek: Online Shop"
  readingTime: z.string().optional(), // mis. "~75 menit baca"
  // Daftar isi sidebar. Tambah/kurang section = ubah array ini saja.
  toc: z.array(
    z.object({
      num: z.string(),
      id: z.string(),
      title: z.string(),
    })
  ),
  summaryHref: z.string().default('#ringkasan'),
  footerTitle: z.string(),
  footerSub: z.string(),
});

// Koleksi "modules": tiap file .mdx di src/content/modules = satu modul belajar
// (kurikulum roadmap berurutan untuk online shop skincare).
const modules = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/modules' }),
  schema: lessonSchema,
});

// Koleksi "luminas": kelas backend mandiri yang TERPISAH dari expedition modules.
// Memakai schema frontmatter yang sama agar bisa dirender lewat ModuleLayout.
const luminas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/luminas' }),
  schema: lessonSchema,
});

// Koleksi "aws": track AWS (wrapper + lessons) yang TERPISAH dari 73 modul Go Luminas
// ('modules') dan dari 'courses'. Memakai lessonSchema yang sama karena frontmatter AWS
// sudah valid terhadapnya.
const aws = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/aws' }),
  schema: lessonSchema,
});

// Koleksi "git": course Git yang sudah di-chunk dari monolit courses/git.mdx menjadi
// 7 chapter berchapter (busur belajar) di src/content/git. TERPISAH dari 'courses'
// (yang kini hanya menyimpan entry tipis git.mdx sebagai sumber hero katalog) dan dari
// 'aws'. Memakai lessonSchema yang sama; dirender lewat src/pages/git/[...slug].astro.
const git = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/git' }),
  schema: lessonSchema,
});

// Koleksi "docker": course Docker yang sudah di-chunk dari monolit courses/docker.mdx
// menjadi 6 chapter (busur belajar) di src/content/docker. TERPISAH dari 'courses'
// (yang kini hanya menyimpan entry tipis docker.mdx sebagai sumber hero katalog), dari
// 'aws', dan dari 'git'. Memakai lessonSchema yang sama; dirender lewat
// src/pages/docker/[...slug].astro.
const docker = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/docker' }),
  schema: lessonSchema,
});

// Koleksi "redis": course Redis yang sudah di-chunk dari monolit courses/redis.mdx
// menjadi 6 chapter (busur belajar) di src/content/redis. TERPISAH dari 'courses'
// (yang kini hanya menyimpan entry tipis redis.mdx sebagai sumber hero katalog), dari
// 'aws', 'git', dan 'docker'. Memakai lessonSchema yang sama; dirender lewat
// src/pages/redis/[...slug].astro.
const redis = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/redis' }),
  schema: lessonSchema,
});

const webvitals = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/web-vitals' }),
  schema: lessonSchema,
});

const pictos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pictos' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(), // GO | GIT | HTTP | REDIS | DOCKER
    dek: z.string(),
    icon: z.string(),
    readTime: z.string(),
    date: z.string(),
    order: z.number().default(99),
    luminaHref: z.string().optional(),
    luminaDesc: z.string().optional(),
    luminaLabel: z.string().optional(),
  }),
});

// Koleksi "expeditions": jalur kurasi yang MEREFERENSIKAN lumina (bukan menulis ulang materi).
// Satu file .mdx per expedition; body MDX opsional (intro). Data terstruktur di frontmatter.
const expeditions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/expeditions' }),
  schema: z.object({
    title: z.string(), // mis. "Backend Artisan"
    badge: z.string(), // mis. "BACKEND"
    summary: z.string(), // ringkasan 1-2 kalimat (kartu/indeks)
    hero: z.string(), // headline besar di halaman roadmap
    desc: z.string(), // paragraf deskripsi hero
    cover: z.string(), // path banner landscape di public/, mis. "/backend-artisan.png"
    order: z.number().default(99), // urutan di /roadmaps
    courses: z.array(z.string()).min(1), // daftar URUT course.id yang direferensikan
    level: z.string().optional(), // mis. "Pemula sampai mahir"
    outcome: z.string().optional(), // mis. "Siap bangun backend Go produksi"
  }),
});

export const collections = { modules, luminas, aws, git, docker, redis, expeditions, webvitals, pictos };
