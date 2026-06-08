export const meta = {
  name: 'super-refine-roadmap2',
  description: 'Super-refine 6 modul Roadmap 2 (r2c03-r2c08) Go Artisan: integrasi ke src/content/modules, perdalam, harmonisasi konvensi lintas modul, lalu kritik kontrak MDX per modul.',
  phases: [
    { title: 'Refine', detail: 'satu agen per modul menulis ulang .mdx world-class ke src/content/modules' },
    { title: 'Verifikasi', detail: 'kritik kontrak MDX + konvensi per modul' },
  ],
}

const BASE = '/Users/timses-234/Downloads/go-artisan'

const CONVENTIONS = [
  'PROYEK: backend online shop skincare (Go Artisan, Roadmap 2 - Go Web API). Enam modul r2c03..r2c08 adalah SATU proyek menerus; konsistensi lintas modul WAJIB. Ikuti spesifikasi kanonik ini PERSIS di semua modul.',
  '',
  'KONVENSI WAJIB:',
  '1. Go module path: github.com/kamu/skincare-backend (JANGAN skincare-api). go.mod deklarasikan go 1.26.',
  '2. Uang: field Go bernama PriceRupiah bertipe int64 dengan JSON tag price. Rupiah disimpan integer (tanpa float). Total order TotalRupiah int64 dengan JSON tag total.',
  '3. Import chi: github.com/go-chi/chi/v5 dan github.com/go-chi/chi/v5/middleware. Pakai versi dari blok FAKTA.',
  '4. Bahasa Indonesia penuh, tanpa em dash. Patuhi 100% writing contract (ai-instructions.md) + component-reference.txt. Gaya, kepadatan, dan pilihan komponen samakan dengan gold standard src/content/modules/r2c02-http-handler.mdx.',
  '5. Frontmatter: topSub "Go untuk Developer JavaScript & PHP"; target "Roadmap 2 · Go Web API" (pakai karakter middot literal di YAML); footerSub "Bagian dari jalur Go Artisan, dari fondasi sampai deploy ke AWS"; Hero eyebrow pakai entity "Roadmap 2 &middot; Web API". Chip HANYA di slot meta Hero.',
  '6. Diagram alur/arsitektur/urutan/state = fenced mermaid. Kode = fenced code block dengan title. JANGAN raw <table> (pakai CardGrid/Compare/Endpoint/Recap). JANGAN style=. JANGAN buat komponen baru atau menyentuh globals.css/index.ts/komponen lain; bila yakin perlu komponen baru, CATAT di concerns, JANGAN buat.',
  '7. Setiap konsep Go asing dijembatani dari React/JS/TS atau Laravel/PHP (Box variant bridge atau Compare). Jembatan dulu, definisi Go menyusul, lalu beda pentingnya.',
  '',
  'ENVELOPE RESPONSE (kontrak kanonik; DIDEFINISIKAN di r2c04, DIPAKAI r2c04..r2c08). Package internal/httpx.',
  'Bentuk JSON:',
  '  sukses tunggal: {"data": <obj>}',
  '  sukses list   : {"data": [...], "meta": {"page":1,"per_page":20,"total":135,"total_pages":7}}',
  '  error         : {"error": {"code":"snake_case_code","message":"pesan untuk manusia"}}',
  '  validation    : {"error": {"code":"validation_error","message":"Validasi gagal","fields":[{"field":"price","message":"harga harus lebih dari 0"}]}}',
  'Tipe & helper (signature persis):',
  '  type Meta struct { Page int (json page); PerPage int (json per_page); Total int64 (json total); TotalPages int (json total_pages) }',
  '  type FieldError struct { Field string (json field); Message string (json message) }',
  '  func JSON(w http.ResponseWriter, status int, payload any)            // low-level encode + set header',
  '  func Data(w http.ResponseWriter, status int, data any)               // {"data": ...}',
  '  func List(w http.ResponseWriter, status int, data any, meta Meta)    // {"data": ..., "meta": ...}',
  '  func Error(w http.ResponseWriter, status int, code, message string)  // {"error": {code, message}}',
  '  func ValidationFailed(w http.ResponseWriter, fields []FieldError)    // HTTP 422, code validation_error',
  'Kode error snake_case: invalid_json, validation_error, unauthorized, forbidden, not_found / product_not_found / order_not_found, conflict, internal_error.',
  'PENGECUALIAN r2c03 (routing) dan r2c02 (sudah rilis): keduanya MENDAHULUI r2c04, jadi pakai helper sederhana lokal: writeJSON(w, status, payload) menulis payload apa adanya, dan writeError(w, status, message string) menghasilkan {"error":"pesan"}. r2c03 TIDAK boleh mendahului envelope terstruktur; cukup Box note bahwa envelope data/meta/error yang konsisten dirancang di modul Desain Request & Response (berikutnya).',
  '',
  'VALIDASI (r2c06, dipakai ulang r2c08): hasil validasi = []httpx.FieldError lalu httpx.ValidationFailed. Validasi manual eksplisit di handler boundary (required via kesadaran zero-value + pointer untuk field opsional/patch; panjang string via utf8.RuneCountInString; email via net/mail.ParseAddress; angka & aturan domain). Tunjukkan juga opsi library github.com/go-playground/validator/v10 dan cara menerjemahkan ValidationErrors-nya ke []httpx.FieldError yang sama.',
  '',
  'AUTH (r2c07, dipakai ulang r2c08): library github.com/golang-jwt/jwt/v5. Package internal/auth.',
  '  type Claims struct { UserID int64 (json uid); Role string (json role); jwt.RegisteredClaims }',
  '  HS256, secret dari env AUTH_JWT_SECRET. Access token sekitar 15 menit, refresh token sekitar 168 jam (7 hari). Sebutkan opsi RS256 (asimetris).',
  '  Buat: jwt.NewWithClaims(jwt.SigningMethodHS256, claims) lalu SignedString([]byte(secret)). Verifikasi: jwt.ParseWithClaims(str, &Claims{}, keyfunc) dengan cek method HMAC + exp + issuer.',
  '  Middleware auth: baca header Authorization Bearer token, verifikasi, taruh *Claims di context lewat context key bertipe unexported (type ctxKey int). Getter auth.UserFrom(ctx) (*Claims, bool). Gagal -> httpx.Error 401 unauthorized.',
  '  Role-based: middleware RequireRole(role) -> 403 forbidden bila tidak cocok.',
  '  Password: golang.org/x/crypto/bcrypt (GenerateFromPassword cost 12, CompareHashAndPassword); sebut argon2id sebagai opsi lebih kuat. JANGAN simpan plaintext; Response DTO user JANGAN memuat hash (json tag minus).',
  '  Route auth di chi: r.Group(func(r chi.Router){ r.Use(authMiddleware); ... }) untuk route terlindungi; login/register/refresh/webhook publik.',
  '',
  'DOMAIN & PETA ENDPOINT KANONIK (konsisten di r2c03 peta, r2c07 route auth, r2c08 peta penuh):',
  '  Publik: GET /v1/products (filter kategori/q, pagination); GET /v1/products/{id}; POST /v1/auth/register; POST /v1/auth/login; POST /v1/auth/refresh; POST /v1/payments/webhook (publik, verifikasi signature provider, idempotent).',
  '  Customer (butuh login): GET /v1/cart; POST /v1/cart/items; PATCH /v1/cart/items/{id}; DELETE /v1/cart/items/{id}; POST /v1/checkout (cart -> order, satu transaksi); GET /v1/orders; GET /v1/orders/{id}.',
  '  Admin (RequireRole admin): POST /v1/admin/products; PUT /v1/admin/products/{id}; PATCH /v1/admin/products/{id}; DELETE /v1/admin/products/{id}.',
  '  Model inti: Product{ID int64, Name, Slug, Category, PriceRupiah int64 json price, Stock int, Description, Status string}; CartItem{ProductID int64, Quantity int, PriceRupiah int64}; Order{ID int64, Items, TotalRupiah int64 json total, Status string (pending/paid/shipped/cancelled), CreatedAt}; User{ID int64, Email, Role string (customer/admin), PasswordHash string json minus}.',
  '',
  'SAMBUNGAN MODUL: r2c03 routing -> r2c04 response -> r2c05 middleware -> r2c06 validasi -> r2c07 auth -> r2c08 peta API final yang merakit semuanya. Roadmap 3 = PostgreSQL + pgx (repository), Roadmap 4 = clean architecture (service layer). Saat contoh masih in-memory, sebut repository pgx datang di Roadmap 3.',
].join('\n')

const RESEARCH = [
  'FAKTA TERVERIFIKASI (Juni 2026; pakai versi & API ini, jangan menebak):',
  '- Go: stabil 1.26.4. go.mod deklarasikan go 1.26. Loop variable per-iterasi sejak 1.22; net/http ServeMux pola method+path sejak 1.22.',
  '- chi: github.com/go-chi/chi/v5 versi v5.3.0; subpackage middleware github.com/go-chi/chi/v5/middleware.',
  '  PENTING: middleware.RealIP kini DEPRECATED karena kerentanan IP spoofing (GHSA-3fxj-6jh8-hvhx, Critical). RealIP memutasi r.RemoteAddr dan memercayai header dari client. Pengganti = middleware eksplisit sesuai infrastruktur: ClientIPFromXFFTrustedProxies(numTrustedProxies int) bila di belakang proxy/ALB tepercaya, ClientIPFromXFF(trustedIPPrefixes ...string), ClientIPFromHeader(trustedHeader string), atau ClientIPFromRemoteAddr(next) bila terhubung langsung; ambil hasil via GetClientIP(ctx) atau GetClientIPAddr(ctx). RealIP masih ada untuk backward-compat TETAPI JANGAN ajarkan sebagai default; jelaskan deprecation-nya secara singkat.',
  '- CORS: github.com/go-chi/cors versi v1.2.2.',
  '- JWT: github.com/golang-jwt/jwt/v5 versi v5.3.1. Pakai jwt.RegisteredClaims, jwt.NewWithClaims(jwt.SigningMethodHS256, claims), SignedString([]byte(secret)), jwt.ParseWithClaims(str, &Claims{}, keyfunc) dengan validasi method HMAC + exp.',
  '- Validator: github.com/go-playground/validator/v10 versi v10.30.3.',
  '- Password hashing: golang.org/x/crypto/bcrypt (bcrypt.GenerateFromPassword cost 12, bcrypt.CompareHashAndPassword); opsi lebih kuat argon2id via golang.org/x/crypto/argon2.',
].join('\n')

const MODULES = [
  {
    slug: 'r2c03-routing-chi',
    src: BASE + '/completed-roadmap-materials/Roadmap 2/r2c03-routing-chi/content/modules/r2c03-routing-chi.mdx',
    out: BASE + '/src/content/modules/r2c03-routing-chi.mdx',
    order: 15,
    readingTime: '~60 menit baca',
    focus: 'Roadmap 2 Chapter 3 - Routing with chi (chi.NewRouter, route grouping, path parameter, middleware chain, mounting subrouters, versioned /v1).',
    brief: [
      'Fokus: ROUTING dengan chi. Perbaikan utama:',
      '1. Harmonisasi: module path -> github.com/kamu/skincare-backend; field Price -> PriceRupiah int64 (json price).',
      '2. Envelope: SEDERHANAKAN ke helper lokal seperti gold standard r2c02 (writeJSON menulis payload apa adanya; writeError(w,status,message) menghasilkan {"error":"pesan"}). JANGAN pakai {"data":...} atau {"error":{"code","message"}} di modul ini. Tambah Box note kecil bahwa envelope konsisten dirancang di modul berikutnya (Desain Request & Response).',
      '3. RealIP: JANGAN ajarkan middleware.RealIP sebagai default. Di contoh inti pakai RequestID + Logger + Recoverer (+ Timeout), dan beri Box warn singkat soal deprecation RealIP + arahan ClientIP eksplisit (lihat FAKTA).',
      '4. Tambah kedalaman yang hilang vs roadmap & kebutuhan production: custom NotFound dan MethodNotAllowed handler (balas JSON 404/405), middleware per-route via r.With(...), r.Group untuk middleware tanpa prefix, penjelasan tajam Route vs Mount, urutan middleware global.',
      '5. Student Outcome: tunjukkan struktur route /v1/products, /v1/cart, /v1/orders, dan /v1/payments/webhook (webhook publik). Tambahkan webhook ke peta route walau detail diserahkan ke r2c08.',
      '6. Bersihkan kalimat janggal dari sumber (mis. yang diawali "Box pentingnya sederhana:"). Hapus helper writeError bertanda tangan (code, message) milik generator; ganti yang konsisten r2c02.',
      'Pertahankan hands-on yang bisa di-run (go get chi v5.3.0, go run ./cmd/api, curl).',
    ].join('\n'),
  },
  {
    slug: 'r2c04-request-response',
    src: BASE + '/completed-roadmap-materials/Roadmap 2/r2c04-request-response/content/modules/r2c04-request-response.mdx',
    out: BASE + '/src/content/modules/r2c04-request-response.mdx',
    order: 16,
    readingTime: '~65 menit baca',
    focus: 'Roadmap 2 Chapter 4 - Request and Response Design (request DTO, response DTO, JSON tags, validation error response, success/error format, pagination).',
    brief: [
      'Fokus: DESAIN REQUEST & RESPONSE. Modul ini MENDEFINISIKAN envelope kanonik (package internal/httpx) yang dipakai r2c05..r2c08. Implementasikan PERSIS spec httpx di KONVENSI (tipe Meta, FieldError; fungsi JSON, Data, List, Error, ValidationFailed; bentuk JSON sukses/list/error/validation). Beri kode lengkap package internal/httpx.',
      'Cakup roadmap Chapter 4: Request DTO (terpisah dari domain model, JSON tags, pointer untuk field opsional/patch, DisallowUnknownFields, MaxBytesReader, helper decode), Response DTO (terpisah dari domain; jangan bocorkan field internal seperti PasswordHash), envelope sukses data+meta, envelope error stabil, validation error per field (bentuk fields[]), pagination response (page/per_page/total/total_pages, clamp page & per_page, hitung total_pages).',
      'Diagram mermaid: alur handler decode -> validate -> service -> encode.',
      'Jembatan: Laravel API Resource & Form Request, NestJS DTO/serialization, shape fetch/axios di React. Harmonisasi module path & PriceRupiah.',
    ].join('\n'),
  },
  {
    slug: 'r2c05-middleware',
    src: BASE + '/completed-roadmap-materials/Roadmap 2/r2c05-middleware-go-artisan/content/modules/r2c05-middleware.mdx',
    out: BASE + '/src/content/modules/r2c05-middleware.mdx',
    order: 17,
    readingTime: '~65 menit baca',
    focus: 'Roadmap 2 Chapter 5 - Middleware (request logging, recovery, request id, CORS, auth middleware, rate limiting concept, timeout).',
    brief: [
      'Fokus: MIDDLEWARE chi. Pakai envelope httpx (dari r2c04) untuk balasan error middleware (recover -> 500 internal_error; auth -> 401 unauthorized).',
      'Cakup: bentuk middleware Go (func(http.Handler) http.Handler) vs Express next(); cara chain bekerja (urutan masuk/keluar, model onion); middleware bawaan chi: RequestID, Logger, Recoverer, Timeout, Heartbeat, CleanPath, StripSlashes; CORS via github.com/go-chi/cors v1.2.2 (allowed origins/methods/headers, credentials, preflight; contoh untuk frontend React di localhost dan domain produksi); custom structured logging dengan slog (method, path, status, durasi, request_id) memakai middleware.WrapResponseWriter untuk menangkap status; recovery yang membalas JSON 500.',
      'RealIP: bahas deprecation (FAKTA) dan pakai ClientIP eksplisit + GetClientIP(ctx); JANGAN sajikan RealIP sebagai default.',
      'Auth middleware: tunjukkan BENTUK-nya (ekstrak Bearer, set context) tetapi forward-ref detail lengkap ke r2c07. Timeout & cancellation: middleware.Timeout vs http.TimeoutHandler, propagasi context, r.Context().Done(). Rate limiting: konsep + sebut github.com/go-chi/httprate.',
      'Section urutan middleware: jelaskan urutan benar dan ALASANNYA (RequestID dulu agar log berkorelasi; Recoverer cukup tinggi agar menangkap panic; Logger; Timeout; CORS sebelum route; auth per-group dekat handler). Diagram mermaid rantai/onion. Harmonisasi konvensi.',
    ].join('\n'),
  },
  {
    slug: 'r2c06-validasi-api',
    src: BASE + '/completed-roadmap-materials/Roadmap 2/r2c06-validasi-api/content/modules/r2c06-validasi-api.mdx',
    out: BASE + '/src/content/modules/r2c06-validasi-api.mdx',
    order: 18,
    readingTime: '~60 menit baca',
    focus: 'Roadmap 2 Chapter 6 - API Validation (required fields, string length, email format, numeric constraints, custom validation, validation response format).',
    brief: [
      'Fokus: VALIDASI INPUT. Hasil validasi = []httpx.FieldError lalu httpx.ValidationFailed (reuse dari r2c04).',
      'Cakup roadmap Chapter 6: required field & jebakan zero-value (bedakan absen vs nol -> pakai pointer di DTO opsional/patch), panjang string (utf8.RuneCountInString, bukan len), format email (net/mail.ParseAddress), nomor telepon Indonesia, constraint numerik & aturan domain (PriceRupiah > 0, Stock >= 0, Quantity 1..N), custom validation, format response validation per field.',
      'Reusable validate function pattern; lalu Section pilihan library: github.com/go-playground/validator/v10 v10.30.3 (struct tags, validate.Struct, terjemahkan ValidationErrors -> []httpx.FieldError yang sama).',
      'Validasi domain skincare: create product, checkout, registration (email + password), cart quantity, address.',
      'Jembatan: Laravel Form Request/rules, class-validator/zod. Diagram mermaid: validasi sebagai gerbang sebelum business logic. Harmonisasi konvensi.',
    ].join('\n'),
  },
  {
    slug: 'r2c07-autentikasi',
    src: BASE + '/completed-roadmap-materials/Roadmap 2/r2c07-autentikasi/content/modules/r2c07-autentikasi.mdx',
    out: BASE + '/src/content/modules/r2c07-autentikasi.mdx',
    order: 19,
    readingTime: '~75 menit baca',
    focus: 'Roadmap 2 Chapter 7 - Authentication Flow (session vs token, JWT, access/refresh token, auth middleware, current user context, role-based access).',
    brief: [
      'Fokus: AUTENTIKASI (alur). Pakai library & pola JWT dari KONVENSI + FAKTA (golang-jwt/jwt/v5 v5.3.1).',
      'Cakup roadmap Chapter 7: session vs token (Compare), struktur JWT (header.payload.signature, base64url, BUKAN enkripsi -> jangan taruh rahasia di payload), access vs refresh token (umur, rotasi, simpan refresh ter-hash server-side, revoke), membuat JWT di Go (Claims embeds jwt.RegisteredClaims + UserID int64 uid + Role string; NewWithClaims HS256; SignedString secret env AUTH_JWT_SECRET; sebut opsi RS256), verifikasi JWT di middleware (ParseWithClaims + cek method HMAC + exp + issuer), current user di context (context key unexported, auth.UserFrom(ctx)), role-based access (RequireRole admin -> 403 forbidden via httpx.Error), route auth di chi (r.Group + r.Use untuk route terlindungi; login/register/refresh/webhook publik).',
      'Password hashing bcrypt (cost 12) + sebut argon2id; Response DTO user tanpa hash (json tag minus). 401 unauthorized & 403 forbidden lewat httpx.Error.',
      'Diagram: sequence login -> terbit token; sequence request terlindungi -> verifikasi; state lifecycle token (issued/active/expired/refreshed/revoked). Jembatan: Laravel Sanctum/Passport, jsonwebtoken di JS, httpOnly cookie vs Authorization header. Catat Roadmap 7 memperdalam security (webhook signature, secrets, hardening).',
    ].join('\n'),
  },
  {
    slug: 'r2c08-api-ecommerce',
    src: BASE + '/completed-roadmap-materials/Roadmap 2/r2c08-api-ecommerce/content/modules/r2c08-api-ecommerce.mdx',
    out: BASE + '/src/content/modules/r2c08-api-ecommerce.mdx',
    order: 20,
    readingTime: '~75 menit baca',
    focus: 'Roadmap 2 Chapter 8 - REST API Design for E-Commerce (product listing/detail, cart, checkout, order history, admin product management, payment webhook).',
    brief: [
      'Fokus: DESAIN REST API E-COMMERCE (capstone Roadmap 2). WAJIB merakit SEMUA konvensi sebelumnya: envelope httpx, validasi []FieldError, auth middleware + RequireRole, struktur router chi, module path skincare-backend, PriceRupiah.',
      'Cakup roadmap Chapter 8 + Student Outcome: peta endpoint penuh /v1 (lihat KONVENSI: products publik, auth, cart customer, checkout, orders, admin products via RequireRole admin, payments/webhook publik).',
      'Prinsip REST untuk e-commerce: pemodelan resource, koleksi vs item, nesting wajar, idempotensi (checkout & webhook), status code tepat, filter/pagination, versioning.',
      'Router final chi: rakit subrouter domain dengan grup middleware (publik vs auth customer vs admin), mount webhook publik; tampilkan cmd/api/main.go + internal/router. FileTree struktur final modular.',
      'Webhook pembayaran: endpoint publik, verifikasi signature provider (konsep), idempotent (cek event id), balas 200 cepat.',
      'Diagram: arsitektur grup router (flowchart), sequence checkout, state machine order (pending/paid/shipped/cancelled). Endpoint components untuk seluruh permukaan. Forward-ref: Roadmap 3 (pgx repository) dan 4 (service layer) mengisi implementasi.',
    ].join('\n'),
  },
]

const REFINE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    wrote: { type: 'boolean', description: 'true bila file .mdx berhasil ditulis ke outPath' },
    summary: { type: 'string', description: '2-4 kalimat ringkasan apa yang dirombak/diperdalam' },
    depthAdded: { type: 'array', items: { type: 'string' }, description: 'daftar penambahan kedalaman/koreksi penting' },
    sectionsCount: { type: 'integer', description: 'jumlah Section pada file final' },
    concerns: { type: 'array', items: { type: 'string' }, description: 'hal yang perlu perhatian manusia (mis. usulan komponen baru, keraguan fakta)' },
  },
  required: ['slug', 'wrote', 'summary', 'depthAdded', 'sectionsCount', 'concerns'],
}

const CRITIC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    pass: { type: 'boolean', description: 'false bila ada issue blocker atau major' },
    tocInSync: { type: 'boolean', description: 'true bila toc 1:1 dengan Section (num/id/urutan)' },
    leakTagsOrStrayFences: { type: 'boolean', description: 'true bila ada tag bocor / fence nyasar / teks non-MDX setelah Section terakhir' },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          detail: { type: 'string' },
        },
        required: ['severity', 'detail'],
      },
    },
  },
  required: ['slug', 'pass', 'tocInSync', 'leakTagsOrStrayFences', 'issues'],
}

function refinePrompt(m) {
  return [
    'Kamu Go Backend Engineer senior sekaligus pengajar. Tugas: SUPER-REFINE satu modul belajar Go (MDX) hasil generator menjadi world-class, lalu TULIS file hasil ke path tujuan memakai tool Write (timpa bila ada).',
    '',
    'Audiens: developer berpengalaman (kuat React/JS/TS, pemula Laravel/PHP), bukan pemula ngoding. Jangan menggurui dasar pemrograman.',
    '',
    'LANGKAH:',
    '1. Baca PENUH file berikut sebelum menulis:',
    '   - Writing contract (patuhi 100%, terutama antara === MULAI === dan === SELESAI ===): ' + BASE + '/ai-instructions.md',
    '   - Komponen sah (prop/slot/varian/ikon): ' + BASE + '/component-reference.txt',
    '   - GOLD STANDARD gaya & kualitas (tiru pola, kepadatan, nada): ' + BASE + '/src/content/modules/r2c02-http-handler.mdx',
    '   - Roadmap kompas: ' + BASE + '/roadmap-md/02-go-web-api-with-chi.md (fokus: ' + m.focus + ')',
    '   - SUMBER yang direfine (hasil generator): ' + m.src,
    '2. Analisis gap antara sumber, roadmap, dan brief. Pertahankan struktur baik yang sudah ada; perdalam, perbaiki, dan harmonisasikan. Jangan menghapus konten bagus tanpa alasan.',
    '3. Tulis ULANG modul LENGKAP (frontmatter -> import -> Hero -> semua Section -> EOF) ke: ' + m.out,
    '',
    '=== KONVENSI PROYEK (WAJIB, identik di semua modul) ===',
    CONVENTIONS,
    '',
    '=== ' + RESEARCH + ' ===',
    '',
    '=== BRIEF KHUSUS MODUL INI (' + m.slug + ', order ' + m.order + ', readingTime ' + m.readingTime + ') ===',
    m.brief,
    '',
    '=== ATURAN OUTPUT KERAS ===',
    '- Frontmatter skema pasti (title, badge, topTitle, topSub, summary, order, target, readingTime, summaryHref, toc, footerTitle, footerSub) - JANGAN tambah/kurang field. order = ' + m.order + '. summaryHref = "#ringkasan".',
    '- toc 1:1 dengan tiap <Section num id title> (num, id, urutan identik). Section terakhir id "ringkasan" judul "Ringkasan & Poin Penting".',
    '- Tanpa <h1>/<h2> manual (judul lewat Hero title; sub-judul <h3>/<h4>). Tiap elemen daun berteks SATU baris (p, li, Box, Step, Chip, Def, Endpoint), KECUALI isi fenced code block, blok mermaid, dan prop tree FileTree.',
    '- Kurawal { dan } LITERAL di TEKS MDX di-escape jadi &#123; dan &#125;. Di DALAM fenced code block dan mermaid, kurawal LITERAL (JANGAN di-escape).',
    '- Tanpa em dash. Pakai &middot; dan &rarr; hanya di konteks set:html (Hero/Section title/sub, teks body). Di frontmatter YAML pakai karakter literal (mis. middot atau cukup tanda hubung).',
    '- Kode = fenced code block dengan title="path/file.go" (atau title="Terminal" untuk shell). Diagram alur = fenced mermaid (caption opsional <p class="fig-cap">). JANGAN raw <table>. JANGAN atribut style=.',
    '- Box hanya 5 varian (tip/analogy/warn/note/bridge). Chip HANYA di slot meta Hero; icon dari daftar sah. Import HANYA komponen yang dipakai dari @components. JANGAN import figure/SVG kecuali benar-benar membuat file figure (untuk modul ini, pakai mermaid, jangan SVG).',
    '- JANGAN tinggalkan tag bocor atau fence nyasar di akhir file (mis. penutup </content>, tag invoke, atau ``` berlebih). File diakhiri </Section> terakhir lalu satu newline. Tidak ada teks di luar struktur MDX.',
    '- JANGAN membuat komponen baru atau menyentuh file lain (globals.css, index.ts, modul lain). Bila yakin perlu komponen baru, CATAT di concerns dan pakai alternatif komponen yang ada.',
    '',
    'Idiomatik Go: error sebagai nilai dan SELALU dicek, gofmt, context sebagai parameter pertama saat relevan, accept interfaces/return structs. Semua contoh berlabuh ke domain online shop skincare dan harus bisa dikompilasi secara mental. Jembatani tiap konsep asing dari React/JS atau Laravel/PHP.',
    'Target kedalaman: setara atau di atas gold standard r2c02 (kaya, banyak "kenapa", hands-on, jebakan umum). Verifikasi mental setiap import path dan versi.',
    '',
    'Setelah file ditulis, kembalikan laporan terstruktur sesuai schema. Deliverable SEBENARNYA adalah file .mdx; laporan hanya ringkasan.',
  ].join('\n')
}

function criticPrompt(m) {
  return [
    'Kamu reviewer kontrak MDX yang sangat ketat untuk situs Astro "Go Artisan". Tugas: periksa SATU file modul hasil refine terhadap writing contract dan konvensi proyek. Jangan memperbaiki file; hanya laporkan temuan.',
    '',
    'Baca file hasil: ' + m.out,
    'Rujuk kontrak: ' + BASE + '/ai-instructions.md dan ' + BASE + '/component-reference.txt',
    '',
    'CHECKLIST (laporkan tiap pelanggaran sebagai issue dengan severity blocker/major/minor):',
    '- Frontmatter hanya field skema pasti (title, badge, topTitle, topSub, summary, order, target, readingTime, summaryHref, toc, footerTitle, footerSub). order = ' + m.order + '. target = "Roadmap 2 · Go Web API". summaryHref = "#ringkasan".',
    '- toc 1:1 dengan <Section num id title> (num/id/urutan identik). Section terakhir id "ringkasan" judul "Ringkasan & Poin Penting". Set tocInSync sesuai.',
    '- Tanpa <h1>/<h2> manual. Tiap elemen daun berteks satu baris kecuali isi fenced code/mermaid dan prop tree FileTree.',
    '- Kurawal { } di TEKS MDX harus di-escape &#123;/&#125;; di dalam fenced code/mermaid TIDAK di-escape. Laporkan kurawal mentah di teks MDX (penyebab build MDX gagal).',
    '- Tanpa em dash. Tanpa raw <table>. Tanpa atribut style=. Box hanya 5 varian sah. Chip hanya di slot meta Hero dengan icon sah. Import cocok dengan komponen yang dipakai dan semuanya terdaftar di component-reference.',
    '- KONVENSI: module path github.com/kamu/skincare-backend (BUKAN skincare-api); field uang PriceRupiah int64 json price; versi library benar (chi v5.3.0, jwt/v5 v5.3.1, validator v10.30.3, cors v1.2.2, go 1.26); middleware.RealIP TIDAK disajikan sebagai default (harus ada catatan deprecated bila disebut). Untuk r2c04..r2c08: envelope httpx sesuai spec (Data/List/Error/ValidationFailed, bentuk {data}/{data,meta}/{error:{code,message}}/validation fields). Untuk r2c03: helper sederhana writeJSON/writeError({"error":"pesan"}) dan TIDAK mendahului envelope terstruktur.',
    '- EOF bersih: TIDAK ada tag bocor (</content>, invoke), fence ``` nyasar/ganda, atau teks non-MDX setelah </Section> terakhir. Set leakTagsOrStrayFences sesuai (true bila ada).',
    '- Bahasa Indonesia penuh; ada jembatan dari JS/PHP; tiap diagram mermaid relevan dan punya caption.',
    '',
    'Gunakan Grep/Read untuk verifikasi konkret (mis. cari skincare-api, em dash, <table>, </content>, kurawal mentah). Set pass=false bila ada issue blocker atau major. Kembalikan hasil sesuai schema.',
  ].join('\n')
}

phase('Refine')
const results = await pipeline(
  MODULES,
  (m) => agent(refinePrompt(m), { label: 'refine:' + m.slug, phase: 'Refine', schema: REFINE_SCHEMA, agentType: 'general-purpose' }),
  (refine, m) => agent(criticPrompt(m), { label: 'kritik:' + m.slug, phase: 'Verifikasi', schema: CRITIC_SCHEMA, agentType: 'general-purpose' })
    .then((critic) => ({ slug: m.slug, out: m.out, refine, critic }))
)

return { results: results.filter(Boolean) }
