import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import mermaid from 'astro-mermaid';
import tailwindcss from '@tailwindcss/vite';

// Bahasa yang ditampilkan dengan chrome "terminal" (tiga titik + label Terminal).
const TERMINAL_LANGS = new Set([
  'bash', 'sh', 'shell', 'zsh', 'console', 'shellscript', 'shell-session',
]);

// Label bahasa yang lebih rapi untuk header code block.
const LANG_LABEL = {
  go: 'Go', sql: 'SQL', json: 'JSON', yaml: 'YAML', yml: 'YAML',
  dockerfile: 'Dockerfile', docker: 'Dockerfile', toml: 'TOML', ini: 'env',
  makefile: 'Makefile', html: 'HTML', css: 'CSS', js: 'JavaScript',
  ts: 'TypeScript', tsx: 'TSX', text: 'teks',
};

// Helper kecil untuk membangun node HAST tanpa dependency tambahan.
const el = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });
const txt = (value) => ({ type: 'text', value });

// Transformer Shiki: baca meta code-fence (mis. ```go title="main.go") lewat
// this.options.meta.__raw, lalu sisipkan header (nama file + label bahasa + tombol
// salin) sebagai anak pertama <pre>. CSS menata header, skrip kecil di ModuleLayout
// menyalakan tombol Salin.
// Catatan: di Astro v5 hook `postprocess` TIDAK jalan untuk .md/.mdx — pakai pre().
const codeFenceMeta = {
  name: 'go-artisan:code-fence-meta',
  pre(node) {
    const lang = this.options.lang || 'text';
    const raw = this.options.meta?.__raw ?? '';
    const m = raw.match(/title="([^"]+)"/);
    const title = m ? m[1] : '';
    const isTerm = TERMINAL_LANGS.has(lang);

    node.properties['data-lang'] = lang;
    if (title) node.properties['data-title'] = title;
    if (isTerm) node.properties['data-term'] = 'true';

    const leftLabel = title || (isTerm ? 'Terminal' : (LANG_LABEL[lang] || lang));

    const header = el('div', { className: ['cb-head'] }, [
      el('span', { className: ['cb-dots'], 'aria-hidden': 'true' }, [el('span', {}), el('span', {}), el('span', {})]),
      el('span', { className: ['cb-name'] }, [txt(leftLabel)]),
      el('button', { type: 'button', className: ['cb-copy'], 'data-cb-copy': 'true', 'aria-label': 'Salin kode' }, [txt('Salin')]),
    ]);
    node.children.unshift(header);
  },
};

// https://astro.build/config
export default defineConfig({
  // mermaid() WAJIB sebelum mdx(): rehype plugin-nya mengubah ```mermaid jadi
  // <pre class="mermaid"> sebelum MDX/Shiki memproses halaman. autoTheme mengikuti
  // html[data-theme] (light -> default, dark -> dark, sepia -> fallback `theme`).
  integrations: [
    mermaid({ theme: 'default', autoTheme: true }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({ gfm: true, smartypants: true }),
    // Code block: satu tema gelap konsisten (permukaan kode selalu gelap di semua
    // tema baca, seperti terminal). Warna permukaan dioverride ke --code-bg via CSS.
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
      transformers: [codeFenceMeta],
    },
  },
});
