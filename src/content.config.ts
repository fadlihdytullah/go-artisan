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

// Koleksi "courses": kelas backend mandiri yang TERPISAH dari roadmap modules.
// Memakai schema frontmatter yang sama agar bisa dirender lewat ModuleLayout.
const courses = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/courses' }),
  schema: lessonSchema,
});

// Koleksi "aws": track AWS (wrapper + lessons) yang TERPISAH dari 73 modul Go Luminas
// ('modules') dan dari 'courses'. Memakai lessonSchema yang sama karena frontmatter AWS
// sudah valid terhadapnya.
const aws = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/aws' }),
  schema: lessonSchema,
});

// Koleksi "roadmaps": jalur kurasi yang MEREFERENSIKAN course (bukan menulis ulang materi).
// Satu file .mdx per roadmap; body MDX opsional (intro). Data terstruktur di frontmatter.
const roadmaps = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/roadmaps' }),
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

export const collections = { modules, courses, aws, roadmaps };
