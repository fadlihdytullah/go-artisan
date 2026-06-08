# Prompt per Chapter — Go Artisan

Semua prompt di bawah diasumsikan ChatGPT sudah memuat file-file ini sebagai
Project Instructions / Attachment:

- `instructions.txt` (System Prompt utama)
- `ai-instructions.md` (writing contract)
- `component-reference.txt` (komponen + aturan code block/mermaid)

Copy prompt satu chapter → paste ke ChatGPT → minta output berupa satu blok kode
diawali path file, siap di-extract ke repo.

---

## Roadmap 1 — Go Programming Foundations

---

### R1.C1 · Pengenalan Go dan Pola Pikir Backend Developer

```
Tulis modul lengkap untuk Roadmap 1, Chapter 1.

Judul: Pengenalan Go dan Pola Pikir Backend Developer
File: src/content/modules/r1c01-pengenalan-go.mdx

Fokus: Apa itu Go, kenapa dipilih untuk backend sistem, dan kenapa cocok untuk proyek online shop skincare kita — bukan Node.js atau PHP.

Topik:
- Apa itu Go (compiled, statically typed, opinionated)
- Kenapa Go populer: simplicity, performance, concurrency built-in, fast compile
- Compiled vs interpreted — bandingkan dengan Node.js
- Static typing vs dynamic typing — bridge dari TypeScript (yang sudah dikenal)
- Filosofi simplicity-first: satu cara melakukan sesuatu
- Backend use cases: REST API, background job, worker, CLI, infrastructure tooling
- Posisi Go di stack online shop skincare kita (API layer + worker layer)

Bridge utama: "Kamu sudah nyaman dengan TypeScript yang statically typed — Go lebih strict lagi, tidak ada any."

Sertakan diagram Mermaid yang menunjukkan posisi Go API + Worker di stack backend (React frontend → Go API → PostgreSQL, dengan Go Worker di samping).

Frontmatter: roadmap: 1, chapter: 1
```

---

### R1.C2 · Setup Go dan Developer Workflow

```
Tulis modul lengkap untuk Roadmap 1, Chapter 2.

Judul: Setup Go dan Developer Workflow
File: src/content/modules/r1c02-setup-go.mdx

Fokus: Install Go dan kenali alur kerja development sehari-hari — dari go mod init sampai go build.

Topik:
- Install Go (brew/apt/manual, verifikasi go version)
- GOPATH vs Go Modules — bridge: "mirip node_modules, tapi Go pakai module cache global di ~/go/pkg"
- go mod init github.com/username/skincare-api
- Struktur file go.mod dan go.sum (bridge: mirip package.json + package-lock.json)
- go run — eksekusi langsung (mirip node index.js)
- go build — hasilkan binary (beda dari Node: output berupa executable tunggal)
- go test — testing bawaan tanpa library tambahan
- go fmt — formatter wajib, tidak ada debat gaya
- go vet — static analysis bawaan
- Struktur folder minimal proyek Go pertama

Gunakan FileTree untuk menunjukkan struktur folder proyek awal.
Gunakan code block dengan title="go.mod" dan title="main.go".
Sertakan terminal chrome untuk perintah CLI.

Frontmatter: roadmap: 1, chapter: 2
```

---

### R1.C3 · Variabel, Konstanta, Tipe, dan Zero Value

```
Tulis modul lengkap untuk Roadmap 1, Chapter 3.

Judul: Variabel, Konstanta, Tipe, dan Zero Value
File: src/content/modules/r1c03-variabel-tipe.mdx

Fokus: Sistem tipe Go — cara mendeklarasikan variabel dan memahami zero value, konsep yang tidak ada padanannya di JavaScript.

Topik:
- var vs := (dan aturan: := hanya dalam fungsi)
- const — bridge: mirip const JS tapi tidak ada object/array const
- Tipe dasar: string, int, int64, float64, bool
- Zero value — bridge: "Di JS, variabel yang belum diisi = undefined. Di Go, semua tipe punya nilai awal yang aman: int=0, string='', bool=false, pointer=nil"
- Type conversion eksplisit (tidak ada implicit coercion — bridge: beda total dari JS)
- Custom type: type ProductStatus string
- Type alias: type UserID = int64
- Contoh domain: Price (float64), Quantity (int), ProductStatus (string), IsActive (bool)

Gunakan Compare untuk tunjukkan JS vs Go deklarasi variabel.
Gunakan Box bridge untuk zero value.

Frontmatter: roadmap: 1, chapter: 3
```

---

### R1.C4 · Control Flow

```
Tulis modul lengkap untuk Roadmap 1, Chapter 4.

Judul: Control Flow di Go
File: src/content/modules/r1c04-control-flow.mdx

Fokus: Cara Go mengambil keputusan dan mengulang — mirip JS secara sintaks tapi ada idiom penting yang berbeda.

Topik:
- if / else — tanpa tanda kurung wajib di kondisi (bridge: beda dari JS)
- if dengan inisialisasi: if err := ...; err != nil { }
- switch — tidak perlu break, fallthrough eksplisit (bridge: beda dari JS)
- for loop satu-satunya: for i := 0; i < n; i++ (tidak ada while/do-while)
- for sebagai while: for condition { }
- for range atas slice dan map
- Early return style — Go sangat mendorong ini
- Guard clause pattern — bridge: "Di React kamu sering if (!user) return null — di Go sama persis, tapi untuk error"
- Contoh domain: ValidateStock, ApplyDiscount, cek status produk

Gunakan Compare untuk tunjukkan JS forEach vs Go range.

Frontmatter: roadmap: 1, chapter: 4
```

---

### R1.C5 · Fungsi dan Pola Error Return

```
Tulis modul lengkap untuk Roadmap 1, Chapter 5.

Judul: Fungsi dan Pola Error Return
File: src/content/modules/r1c05-fungsi-error.mdx

Fokus: Desain fungsi Go dan cara Go menangani error — ini adalah perbedaan paling fundamental dari JS/PHP.

Topik:
- Deklarasi fungsi: func NamaFungsi(param tipe) hasilTipe
- Multiple return values — bridge: "JS tidak bisa return dua nilai, Go bisa. Ini fondasi error handling Go"
- Error sebagai nilai — bridge: "Di JS error di-throw, di Go error di-return. Tidak ada try/catch"
- Idiom if err != nil — kenapa terlihat repetitif tapi justru eksplisit
- errors.New("pesan") untuk membuat error
- fmt.Errorf("konteks: %w", err) untuk wrap error dengan konteks
- Error wrapping dan errors.Is / errors.As (brief)
- Named return values — kapan pakai, kapan hindari
- Contoh domain: CalculateCartTotal, ValidateStock, CreateOrder — semuanya return (hasil, error)

Box bridge wajib: "throw vs return error — perubahan pola pikir terbesar di Go".
Gunakan Compare untuk JS async/catch vs Go if err != nil.

Frontmatter: roadmap: 1, chapter: 5
```

---

### R1.C6 · Struct dan Method

```
Tulis modul lengkap untuk Roadmap 1, Chapter 6.

Judul: Struct dan Method
File: src/content/modules/r1c06-struct-method.mdx

Fokus: Cara Go memodelkan entitas backend menggunakan struct — pengganti class di JS/PHP.

Topik:
- struct — bridge: "Mirip interface/type di TypeScript tapi hanya data, bukan class"
- Method: func (p Product) NamaMethod() tipe
- Pointer receiver vs value receiver — kapan pakai masing-masing
- Embedded struct — bridge: "Mirip extends tapi composition, bukan inheritance"
- JSON tags: json:"field_name,omitempty" — bridge: mirip serialization annotation di PHP
- DTO vs domain model — kenapa beda
- Contoh domain: struct User, Product, CartItem, Order, Payment, Inventory
- Menunjukkan JSON tag dan pointer receiver pada struct Order

Gunakan FileTree untuk tunjukkan di mana file struct ini biasanya ditaruh (internal/domain/).
Gunakan Compare untuk TypeScript interface vs Go struct.

Frontmatter: roadmap: 1, chapter: 6
```

---

### R1.C7 · Pointer dan Dasar Memori

```
Tulis modul lengkap untuk Roadmap 1, Chapter 7.

Judul: Pointer dan Dasar Memori
File: src/content/modules/r1c07-pointer.mdx

Fokus: Pointer Go secukupnya untuk backend — tidak perlu masuk ke C-level memory management, cukup untuk paham mutasi, nilai opsional, dan hasil repository.

Topik:
- Apa itu pointer: & (address) dan * (dereference)
- Pass by value vs pass by reference — bridge: "Di JS, object selalu pass by reference. Di Go, struct di-copy kecuali kamu pakai pointer"
- nil pointer — bridge: mirip null di JS tapi lebih eksplisit
- Pointer untuk mutasi: kenapa method perlu pointer receiver
- Pointer untuk optional value: *string untuk field yang bisa kosong
- Hasil dari repository biasanya *Product bukan Product — kenapa
- Kesalahan umum: nil dereference panic

Box bridge: "Kapan pakai pointer? Kalau struct besar (efisiensi), butuh mutasi, atau nilai bisa tidak ada."

Frontmatter: roadmap: 1, chapter: 7
```

---

### R1.C8 · Slice, Map, dan Koleksi

```
Tulis modul lengkap untuk Roadmap 1, Chapter 8.

Judul: Slice, Map, dan Koleksi
File: src/content/modules/r1c08-slice-map.mdx

Fokus: Koleksi data di Go untuk kebutuhan API dan bisnis logic — daftar produk, item cart, lookup table.

Topik:
- Array vs slice — bridge: "Array Go fixed-length mirip typed array JS, slice yang kamu pakai sehari-hari"
- Membuat slice: var s []Product vs s := []Product{} vs make([]Product, 0)
- append — dan kapan slice tiba-tiba berbagi backing array (gotcha penting)
- len dan cap
- range atas slice — bridge: mirip forEach/map JS tapi versi for
- Map: map[string]Product — bridge: mirip Object/Map di JS
- Map lookup dengan ok pattern: val, ok := m[key]
- Grouping data: dari []OrderItem ke map[productID][]OrderItem
- Contoh domain: daftar produk, item cart, order item, lookup stok

Gunakan Compare untuk JS Array.map vs Go for range dengan append.
Sertakan Def untuk "backing array" — konsep yang bikin bug kalau tidak paham.

Frontmatter: roadmap: 1, chapter: 8
```

---

### R1.C9 · Interface dan Desain Dependensi

```
Tulis modul lengkap untuk Roadmap 1, Chapter 9.

Judul: Interface dan Desain Dependensi
File: src/content/modules/r1c09-interface.mdx

Fokus: Interface Go untuk arsitektur yang bersih — ini fondasi dari testable backend.

Topik:
- Interface Go: implicit implementation (tidak perlu implements keyword) — bridge: "Di TypeScript kamu deklarasi implements, di Go interface dipenuhi secara diam-diam"
- Interface kecil: satu-dua method (io.Reader sebagai contoh idiom standar)
- Interface sebagai behavior, bukan taksonomi — bridge: "Di PHP interface biasanya hirarki class, di Go interface adalah kontrak perilaku"
- Dependency injection manual: service menerima interface, bukan concrete struct
- Mocking melalui interface: buat fake/stub untuk testing
- Contoh domain: ProductRepository interface yang dipakai ProductService, dengan dua implementasi (PostgresProductRepository untuk prod, FakeProductRepository untuk test)

Diagram Mermaid: tunjukkan hubungan interface → service → repository.
Box bridge wajib untuk "implicit interface".

Frontmatter: roadmap: 1, chapter: 9
```

---

### R1.C10 · Package dan Organisasi Proyek

```
Tulis modul lengkap untuk Roadmap 1, Chapter 10.

Judul: Package dan Organisasi Proyek
File: src/content/modules/r1c10-package.mdx

Fokus: Cara memecah kode Go menjadi package yang rapi — fondasi untuk modular monolith di Roadmap 4.

Topik:
- package main vs package lain
- Exported name (kapital) vs unexported (kecil) — bridge: "Mirip public/private di JS class tapi berlaku di level package"
- Folder internal/ — hanya bisa diimpor dari dalam modul yang sama
- Folder cmd/ — entry point binary (cmd/api/main.go, cmd/worker/main.go)
- Aturan import: path modul, bukan nama file
- Menghindari circular dependency — bridge: "Di Node.js bisa circular require, di Go compile error"
- Contoh domain: internal/product/, internal/order/, internal/payment/ dsb.

FileTree wajib: tunjukkan struktur cmd/ + internal/ proyek skincare.
Sertakan Def untuk "unexported" vs "private".

Frontmatter: roadmap: 1, chapter: 10
```

---

### R1.C11 · Context Package

```
Tulis modul lengkap untuk Roadmap 1, Chapter 11.

Judul: Context Package
File: src/content/modules/r1c11-context.mdx

Fokus: context.Context untuk cancellation dan timeout — wajib dipahami sebelum menyentuh net/http dan pgx.

Topik:
- Apa itu context.Context — bridge: "Tidak ada padanannya langsung di JS, tapi bayangkan AbortController yang diteruskan ke semua layer"
- context.Background() vs context.TODO()
- context.WithTimeout — batas waktu untuk query database
- context.WithCancel — membatalkan operasi
- Propagasi context: HTTP handler → service → repository → pgx query
- Request lifecycle: context dibatalkan saat client disconnect
- Aturan penting: context selalu parameter pertama, nama ctx
- Contoh domain: GetProductByID(ctx, id) sampai ke pgx QueryRow(ctx, ...)

Diagram Mermaid: alur context dari http.Request ke pgx query.

Frontmatter: roadmap: 1, chapter: 11
```

---

### R1.C12 · Concurrency Dasar

```
Tulis modul lengkap untuk Roadmap 1, Chapter 12.

Judul: Concurrency Dasar di Go
File: src/content/modules/r1c12-concurrency.mdx

Fokus: Goroutine dan channel di level praktis backend — cukup untuk memahami background job, bukan untuk tuning advanced.

Topik:
- Goroutine: go func() — bridge: "Lebih ringan dari Promise/async, bukan thread OS"
- Channel: komunikasi antar goroutine (bridge: mirip EventEmitter tapi typed dan blocking)
- select: menunggu beberapa channel — brief
- sync.WaitGroup: tunggu semua goroutine selesai
- sync.Mutex: proteksi shared state — bridge: "Seperti lock di database"
- Race condition: kenapa terjadi, cara detect (go test -race)
- Kapan TIDAK pakai goroutine: jangan pakai untuk semua hal asinkron
- Contoh domain: mengirim notifikasi email di background saat order dibuat

Box bridge: "Go async vs JS async — goroutine bukan Promise."
Tambahkan note kapan pakai channel vs mutex.

Frontmatter: roadmap: 1, chapter: 12
```

---

## Roadmap 2 — Go Web API dengan net/http dan chi

---

### R2.C1 · Fundamental HTTP untuk Backend Developer

```
Tulis modul lengkap untuk Roadmap 2, Chapter 1.

Judul: Fundamental HTTP untuk Backend Developer
File: src/content/modules/r2c01-http-fundamental.mdx

Fokus: Protokol HTTP dari sudut pandang backend developer — sebelum menyentuh framework.

Topik:
- Request dan response: apa yang dikirim browser/React app ke backend
- HTTP methods: GET, POST, PUT, PATCH, DELETE dan semantiknya
- Status codes yang penting: 200, 201, 400, 401, 403, 404, 409, 422, 500
- Headers: Content-Type, Authorization, X-Request-ID
- Request body dan query parameters
- Path parameters: /products/:id
- JSON API basics: format request dan response
- Contoh domain: endpoint produk, cart, order, payment webhook

Gunakan komponen Endpoint untuk tunjukkan daftar endpoint utama skincare API.
Diagram Mermaid: alur request dari React frontend → Go API → PostgreSQL.

Frontmatter: roadmap: 2, chapter: 1
```

---

### R2.C2 · Membangun HTTP Handler di Go

```
Tulis modul lengkap untuk Roadmap 2, Chapter 2.

Judul: Membangun HTTP Handler dengan net/http
File: src/content/modules/r2c02-http-handler.mdx

Fokus: Buat API sederhana dengan standard library net/http tanpa chi dulu — paham dasarnya.

Topik:
- http.Handler interface vs http.HandlerFunc convenience
- ResponseWriter: menulis response (status code + body)
- *http.Request: membaca method, URL, header, body
- json.NewEncoder(w).Encode() untuk respons JSON
- json.NewDecoder(r.Body).Decode() untuk request JSON
- Mengembalikan status code: w.WriteHeader(http.StatusCreated)
- http.ListenAndServe: menjalankan server
- Kenapa chi dibutuhkan: keterbatasan ServeMux standar (path params, middleware)

Compare: net/http handler vs Express.js route handler.
code block title="handler.go" untuk contoh lengkap handler produk.

Frontmatter: roadmap: 2, chapter: 2
```

---

### R2.C3 · Routing dengan chi

```
Tulis modul lengkap untuk Roadmap 2, Chapter 3.

Judul: Routing dengan chi
File: src/content/modules/r2c03-routing-chi.mdx

Fokus: Bangun routing REST yang bersih menggunakan chi — pengganti Express Router untuk Go.

Topik:
- chi.NewRouter() — bridge: "Mirip express.Router() tapi stateless"
- r.Get, r.Post, r.Put, r.Patch, r.Delete
- chi.URLParam(r, "id") untuk mengambil path parameter
- Route grouping: r.Route("/v1", func(r chi.Router) { })
- Mounting subrouter: r.Mount("/products", productRouter)
- Middleware chain: r.Use(middleware)
- Versioned routes: /v1/products, /v1/cart, /v1/orders
- Struktur router proyek skincare

FileTree: tunjukkan internal/product/handler.go + internal/router/router.go.
Gunakan beberapa Endpoint component untuk daftar route yang dibuat.

Frontmatter: roadmap: 2, chapter: 3
```

---

### R2.C4 · Desain Request dan Response

```
Tulis modul lengkap untuk Roadmap 2, Chapter 4.

Judul: Desain Request dan Response API
File: src/content/modules/r2c04-request-response.mdx

Fokus: Kontrak API yang konsisten dan dapat diprediksi oleh frontend/mobile client.

Topik:
- Request DTO struct dengan JSON tags
- Response DTO struct — pisahkan dari domain model
- Format respons sukses: { data: ..., meta: ... }
- Format respons error: { error: { code, message, details } }
- Validation error response: daftar field yang bermasalah
- Pagination response: { data: [], meta: { total, page, per_page } }
- Contoh domain: CreateProductRequest, ProductResponse, CartItemResponse, PaginatedProductResponse

Compare: DTO di TypeScript vs Go struct dengan JSON tags.
Note tentang omitempty untuk field opsional.

Frontmatter: roadmap: 2, chapter: 4
```

---

### R2.C5 · Middleware

```
Tulis modul lengkap untuk Roadmap 2, Chapter 5.

Judul: Middleware di chi
File: src/content/modules/r2c05-middleware.mdx

Fokus: Cross-cutting concerns yang berlaku di semua request — logging, recovery, auth, CORS.

Topik:
- Apa itu middleware di Go: func(next http.Handler) http.Handler
- Bridge: "Mirip middleware Express.js — tapi lebih eksplisit karena Next() adalah parameter, bukan callback"
- Request logging dengan chi/middleware.Logger
- Recovery middleware: tangkap panic, kembalikan 500
- RequestID: chi/middleware.RequestID
- CORS: github.com/go-chi/cors
- Auth middleware: cek JWT, taruh user di context
- Timeout middleware: context.WithTimeout per request
- Urutan middleware: mana yang harus duluan

Diagram Mermaid: alur request melewati middleware chain sampai ke handler.
code block title="middleware/auth.go" untuk contoh auth middleware.

Frontmatter: roadmap: 2, chapter: 5
```

---

### R2.C6 · Validasi API

```
Tulis modul lengkap untuk Roadmap 2, Chapter 6.

Judul: Validasi Input API
File: src/content/modules/r2c06-validasi-api.mdx

Fokus: Validasi request sebelum masuk ke business logic — ini pintu pertama keamanan.

Topik:
- Kenapa validasi di handler layer, bukan service layer
- Required fields: cek zero value
- String length: len(s) untuk byte, utf8.RuneCountInString untuk karakter
- Validasi email, nomor telepon sederhana
- Validasi numeric: harga > 0, quantity >= 1
- Custom validation: stok tidak boleh negatif, diskon 0-100%
- Format respons validation error: list field + pesan
- Pilihan library validasi: go-playground/validator (brief)
- Contoh domain: validasi CreateProductRequest, AddToCartRequest, CheckoutRequest

code block untuk contoh validate function yang reusable.

Frontmatter: roadmap: 2, chapter: 6
```

---

### R2.C7 · Alur Autentikasi

```
Tulis modul lengkap untuk Roadmap 2, Chapter 7.

Judul: Alur Autentikasi: Session vs JWT
File: src/content/modules/r2c07-autentikasi.mdx

Fokus: Token-based auth yang cocok untuk REST API — access token + refresh token.

Topik:
- Session vs token — bridge: "Laravel pakai session by default, REST API pakai token"
- JWT: header.payload.signature — baca payload tanpa library
- Access token (short-lived) + refresh token (long-lived)
- Membuat JWT di Go: github.com/golang-jwt/jwt/v5
- Verifikasi JWT di middleware
- Menyimpan current user di context: ctx = context.WithValue(ctx, userKey, user)
- Mengambil current user dari context di handler
- Role-based access: customer vs admin route
- Contoh domain: POST /v1/auth/login → {access_token, refresh_token}

Endpoint component untuk route auth.
Diagram Mermaid: alur login → JWT → protected route.

Frontmatter: roadmap: 2, chapter: 7
```

---

### R2.C8 · Desain REST API untuk E-Commerce

```
Tulis modul lengkap untuk Roadmap 2, Chapter 8.

Judul: Desain REST API untuk Online Shop Skincare
File: src/content/modules/r2c08-api-ecommerce.mdx

Fokus: Terapkan semua yang dipelajari di Roadmap 2 ke permukaan API nyata proyek skincare.

Topik:
- Product listing: GET /v1/products (filter, sort, paginate)
- Product detail: GET /v1/products/{id}
- Add to cart: POST /v1/cart/items
- Update cart item: PATCH /v1/cart/items/{id}
- Checkout: POST /v1/orders
- View order history: GET /v1/orders
- Admin product management: POST/PUT/DELETE /v1/admin/products
- Payment webhook: POST /v1/webhooks/payment

Gunakan banyak Endpoint component.
FileTree untuk tunjukkan struktur final folder internal/ + router.
Ini chapter ringkasan — tunjukkan peta lengkap API yang akan dibangun.

Frontmatter: roadmap: 2, chapter: 8
```

---

## Roadmap 3 — PostgreSQL dan pgx

---

### R3.C1 · Fundamental Basis Data Relasional

```
Tulis modul lengkap untuk Roadmap 3, Chapter 1.

Judul: Fundamental Basis Data Relasional
File: src/content/modules/r3c01-relational-db.mdx

Fokus: Konsep relasional yang wajib dipahami sebelum menyentuh SQL dan pgx.

Topik:
- Tabel, baris, kolom — bridge: "Bayangkan spreadsheet tapi dengan aturan ketat"
- Primary key: identitas unik setiap baris
- Foreign key: relasi antar tabel
- Constraints: NOT NULL, UNIQUE, CHECK
- Index: kenapa query bisa lambat tanpa index
- Relasi: one-to-one, one-to-many, many-to-many
- Kenapa PostgreSQL cocok untuk online shop skincare (ACID, JSON support, full-text search)

Diagram Mermaid ERD sederhana: users → orders → order_items → products.

Frontmatter: roadmap: 3, chapter: 1
```

---

### R3.C2 · SQL Dasar

```
Tulis modul lengkap untuk Roadmap 3, Chapter 2.

Judul: SQL Dasar untuk Backend Developer
File: src/content/modules/r3c02-sql-dasar.mdx

Fokus: Query SQL yang langsung berguna untuk API produk, cart, dan order.

Topik:
- SELECT kolom FROM tabel WHERE kondisi
- INSERT INTO ... VALUES ... RETURNING id
- UPDATE ... SET ... WHERE
- DELETE FROM ... WHERE (dan soft delete pattern)
- ORDER BY, LIMIT, OFFSET untuk pagination
- INNER JOIN dan LEFT JOIN — contoh products JOIN product_variants
- GROUP BY dengan COUNT dan SUM — contoh total order per user
- Parameterized query: $1, $2 (PostgreSQL style) — bridge: "Bukan ?, itu MySQL"

Compare: ORM Eloquent Laravel vs raw SQL di Go.
Jelaskan kenapa Go developer cenderung pakai raw SQL atau sqlc daripada ORM berat.

Frontmatter: roadmap: 3, chapter: 2
```

---

### R3.C3 · Pemodelan Data Online Shop

```
Tulis modul lengkap untuk Roadmap 3, Chapter 3.

Judul: Pemodelan Data Online Shop Skincare
File: src/content/modules/r3c03-data-modeling.mdx

Fokus: Rancang skema PostgreSQL lengkap untuk proyek skincare — ini blueprint yang dipakai sepanjang roadmap.

Topik:
Tunjukkan DDL (CREATE TABLE) dan tujuan dari:
- users + addresses
- products + product_variants + categories + brands
- inventories (stok)
- carts + cart_items
- orders + order_items
- payments
- shipments
- reviews
- promotions

Fokus pada keputusan desain: kenapa price di order_items di-snapshot, bukan foreign key ke products.

Diagram Mermaid ERD lengkap (pakai layout elk untuk ERD yang banyak entitas).
code block title="schema.sql" untuk DDL utama.

Frontmatter: roadmap: 3, chapter: 3
```

---

### R3.C4 · Database Migrations

```
Tulis modul lengkap untuk Roadmap 3, Chapter 4.

Judul: Database Migration yang Aman
File: src/content/modules/r3c04-migration.mdx

Fokus: Kelola perubahan skema database dengan versi — wajib untuk staging dan production.

Topik:
- Kenapa migration penting: tidak boleh ALTER TABLE manual di production
- Up migration + down migration
- Versi file: 001_create_users.up.sql, 001_create_users.down.sql
- Tool golang-migrate/migrate — cara pakai CLI dan embedded
- Strategi migration di staging vs production
- Tidak boleh hapus kolom langsung (additive migration)
- Bridge: "Laravel artisan migrate — di Go pakai golang-migrate yang konsepnya sama"

FileTree: tunjukkan folder db/migrations/.
code block untuk contoh up+down migration tabel products.

Frontmatter: roadmap: 3, chapter: 4
```

---

### R3.C5 · Koneksi Go ke PostgreSQL dengan pgx

```
Tulis modul lengkap untuk Roadmap 3, Chapter 5.

Judul: Koneksi Go ke PostgreSQL dengan pgx
File: src/content/modules/r3c05-koneksi-pgx.mdx

Fokus: Setup pgxpool — connection pool yang efisien untuk API backend.

Topik:
- Kenapa pgxpool, bukan pgx.Connect: connection pooling untuk API yang handle banyak request
- Import: github.com/jackc/pgx/v5/pgxpool
- pgxpool.New(ctx, connString)
- Connection string format: postgres://user:pass@host:port/dbname?sslmode=...
- pool.Ping(ctx) untuk verifikasi koneksi saat startup
- MaxConns, MinConns, MaxConnLifetime — konfigurasi pool
- Meneruskan pool ke repository via dependency injection
- Bridge: "Mirip connection pool di Laravel (database.php maxConnections)"

code block title="internal/database/postgres.go" untuk setup pool.
Box note: jangan buat koneksi baru per request.

Frontmatter: roadmap: 3, chapter: 5
```

---

### R3.C6 · Membaca Data dengan pgx

```
Tulis modul lengkap untuk Roadmap 3, Chapter 6.

Judul: Membaca Data dari PostgreSQL dengan pgx
File: src/content/modules/r3c06-query-pgx.mdx

Fokus: Implementasi query SELECT dan mapping ke Go struct.

Topik:
- pool.QueryRow(ctx, sql, args...) untuk satu baris
- row.Scan(&field1, &field2) — bridge: "Beda dari ORM: mapping manual, eksplisit"
- Menangani pgx.ErrNoRows — kembalikan nil, nil atau domain error
- pool.Query(ctx, sql, args...) untuk banyak baris
- rows.Next() + rows.Scan() dalam for loop
- Menutup rows: defer rows.Close()
- Memetakan hasil ke []Product
- Contoh domain: GetProductByID, ListProducts (dengan filter slug/category)

code block untuk contoh repository method lengkap.

Frontmatter: roadmap: 3, chapter: 6
```

---

### R3.C7 · Menulis Data dengan pgx

```
Tulis modul lengkap untuk Roadmap 3, Chapter 7.

Judul: Menulis Data ke PostgreSQL dengan pgx
File: src/content/modules/r3c07-write-pgx.mdx

Fokus: INSERT, UPDATE, DELETE dari Go ke PostgreSQL.

Topik:
- pool.Exec(ctx, sql, args...) untuk operasi yang tidak return data
- INSERT ... RETURNING id — ambil ID yang baru dibuat
- pool.QueryRow untuk INSERT RETURNING
- UPDATE dengan RETURNING updated_at
- Soft delete: UPDATE SET deleted_at = NOW()
- Cek affected rows: commandTag.RowsAffected()
- created_at + updated_at dengan default NOW() di PostgreSQL
- Contoh domain: CreateCartItem, UpdateProductStock, SoftDeleteProduct, CreateOrder

Frontmatter: roadmap: 3, chapter: 7
```

---

### R3.C8 · Transaksi di pgx

```
Tulis modul lengkap untuk Roadmap 3, Chapter 8.

Judul: Transaksi Database untuk Operasi Kritis
File: src/content/modules/r3c08-transaksi.mdx

Fokus: Proteksi operasi bisnis kritis dengan transaksi — checkout adalah contoh utama.

Topik:
- Apa itu transaksi ACID — bridge: "Laravel DB::transaction() sama konsepnya"
- pool.Begin(ctx) → tx pgx.Tx
- tx.Commit(ctx) dan tx.Rollback(ctx)
- Pattern defer tx.Rollback: rollback otomatis kalau tidak di-commit
- Batas transaksi: satu HTTP request = satu transaksi checkout
- Operasi dalam satu transaksi checkout: kurangi stok, buat order, buat order items, buat payment record
- Kenapa kita tidak commit di tengah
- Repository yang menerima tx (pgx.Tx implements pgx.Querier)

Diagram Mermaid: alur transaksi checkout.
code block title="internal/order/checkout.go" untuk contoh transaksi lengkap.

Frontmatter: roadmap: 3, chapter: 8
```

---

### R3.C9 · Indexing dan Performa Query

```
Tulis modul lengkap untuk Roadmap 3, Chapter 9.

Judul: Indexing dan Performa Query
File: src/content/modules/r3c09-indexing.mdx

Fokus: Buat query umum menjadi cepat dengan index yang tepat.

Topik:
- B-tree index: default PostgreSQL index
- CREATE INDEX idx_products_category_id ON products(category_id)
- UNIQUE INDEX: email di users, slug di products
- Composite index: (user_id, created_at) untuk order history
- EXPLAIN ANALYZE: cara baca query plan
- N+1 problem — bridge: "Masalah klasik di Eloquent/ActiveRecord, Go juga bisa kena"
- Pagination performance: keytime pagination vs OFFSET besar
- Index untuk kolom filter/sort yang sering: product listing, order history

Contoh EXPLAIN ANALYZE output dan cara bacanya.

Frontmatter: roadmap: 3, chapter: 9
```

---

### R3.C10 · Repository Pattern dengan pgx

```
Tulis modul lengkap untuk Roadmap 3, Chapter 10.

Judul: Repository Pattern dengan pgx
File: src/content/modules/r3c10-repository-pattern.mdx

Fokus: Organisasi akses database yang bersih dan testable — ini menghubungkan pgx dengan arsitektur di Roadmap 4.

Topik:
- Repository interface: ProductRepository, CartRepository, OrderRepository
- PostgreSQL implementation: pgxProductRepository
- Memisahkan SQL dari handler — handler tidak boleh tahu ada PostgreSQL
- Dependency injection: service menerima interface, bukan concrete struct
- Testable: bisa diganti FakeProductRepository di test
- Contoh lengkap: interface + struct + semua method (List, GetByID, Create, Update, Delete) untuk ProductRepository

FileTree: tunjukkan internal/product/ dengan repository.go, service.go, handler.go.
Diagram Mermaid: handler → service → repository interface → pgx implementation.

Frontmatter: roadmap: 3, chapter: 10
```

---

## Roadmap 4 — Clean Backend Architecture

---

### R4.C1 · Layered Architecture

```
Tulis modul lengkap untuk Roadmap 4, Chapter 1.

Judul: Layered Architecture: Handler, Service, Repository
File: src/content/modules/r4c01-layered-architecture.mdx

Fokus: Pisahkan tanggung jawab dengan jelas — handler untuk HTTP, service untuk bisnis, repository untuk data.

Topik:
- Handler layer: hanya urusan HTTP (parse request, call service, write response)
- Service/usecase layer: business logic murni, tidak tahu HTTP dan tidak tahu PostgreSQL
- Repository layer: hanya urusan SQL dan pgx
- Domain model: struct entitas yang tidak punya annotation HTTP/SQL
- DTO: request/response struct untuk layer boundary
- Dependency: handler punya service, service punya repository — tidak boleh terbalik
- Bridge: "Mirip MVC Laravel tapi lebih eksplisit: Controller=Handler, Model=Domain+Repository, tidak ada yang bercampur"

Diagram Mermaid: tunjukkan dependency flow handler → service → repository.
Box bridge wajib untuk perbandingan dengan MVC.

Frontmatter: roadmap: 4, chapter: 1
```

---

### R4.C2 · Struktur Modular Monolith

```
Tulis modul lengkap untuk Roadmap 4, Chapter 2.

Judul: Modular Monolith: Organisasi Folder by Domain
File: src/content/modules/r4c02-modular-monolith.mdx

Fokus: Atur folder by business domain — bukan by technical layer.

Topik:
- Kenapa by-domain, bukan by-layer (tidak ada folder controllers/ global)
- internal/product/, internal/cart/, internal/order/, internal/payment/ dst.
- internal/shared/ untuk kode bersama (errors, response, middleware)
- cmd/api/main.go sebagai entry point
- cmd/worker/main.go untuk background worker
- Batasan antar domain: product tidak boleh import internal/order
- Shared domain object: UserID, ProductID sebagai custom type
- Kenapa bukan microservices dulu: deployment, debugging, latency

FileTree lengkap untuk proyek skincare.
Box note: "Modular monolith lebih mudah di-split ke microservice nanti daripada monolith acak."

Frontmatter: roadmap: 4, chapter: 2
```

---

### R4.C3 · Manajemen Konfigurasi

```
Tulis modul lengkap untuk Roadmap 4, Chapter 3.

Judul: Manajemen Konfigurasi
File: src/content/modules/r4c03-konfigurasi.mdx

Fokus: Kelola config dengan aman di berbagai environment — local, staging, production.

Topik:
- Environment variable sebagai sumber konfigurasi (twelve-factor app)
- Config struct: type Config struct { DBUrl, JWTSecret, Port, ... }
- Membaca env var: os.Getenv, os.LookupEnv
- Library populer: github.com/joho/godotenv untuk .env di local
- .env file hanya untuk local, tidak pernah di-commit
- Contoh config: DB_URL, JWT_SECRET, JWT_EXPIRY, AWS_REGION, STRIPE_KEY
- Config yang aman: secrets vs non-secrets
- Bridge: "Mirip .env di Laravel/Next.js tapi tanpa php.ini magic"

code block title=".env.example" dan title="internal/config/config.go".

Frontmatter: roadmap: 4, chapter: 3
```

---

### R4.C4 · Error Handling Strategy

```
Tulis modul lengkap untuk Roadmap 4, Chapter 4.

Judul: Error Handling Strategy yang Konsisten
File: src/content/modules/r4c04-error-handling.mdx

Fokus: Buat error terstruktur yang bisa dipetakan ke HTTP response yang bersih.

Topik:
- Domain error types: ErrNotFound, ErrUnauthorized, ErrConflict, ErrValidation, ErrInternal
- Sentinal errors dengan errors.New
- Custom error struct yang implements error interface
- Wrapping error dengan konteks: fmt.Errorf("createOrder: %w", err)
- Error handler terpusat di layer handler
- Mapping domain error ke HTTP status code
- Tidak boleh leak stack trace ke client
- Contoh: checkout gagal karena stok kurang → ErrConflict → 409

code block title="internal/shared/errors.go" untuk domain error types.
Diagram Mermaid: error dari repository → service → handler → HTTP response.

Frontmatter: roadmap: 4, chapter: 4
```

---

### R4.C5 · Logging Strategy

```
Tulis modul lengkap untuk Roadmap 4, Chapter 5.

Judul: Logging yang Observable
File: src/content/modules/r4c05-logging.mdx

Fokus: Log terstruktur yang memudahkan debugging di staging dan production.

Topik:
- Standard log vs structured log — kenapa structured penting di production
- Library: log/slog (standard library Go 1.21+)
- Log levels: Debug, Info, Warn, Error
- Structured fields: request_id, user_id, order_id, duration
- Request ID di setiap log line — cara inject dari middleware
- Error context: log error dengan konteks yang cukup
- Hindari log data sensitif: password, token, nomor kartu
- Bridge: "Mirip Monolog di Laravel tapi dengan format JSON untuk CloudWatch"

code block untuk setup slog dengan JSON handler.
Note: format JSON memudahkan log query di CloudWatch (Roadmap 8).

Frontmatter: roadmap: 4, chapter: 5
```

---

### R4.C6 · Validasi dan Business Rules

```
Tulis modul lengkap untuk Roadmap 4, Chapter 6.

Judul: Validasi Input vs Business Rules
File: src/content/modules/r4c06-validasi-business-rules.mdx

Fokus: Bedakan validasi format dari validasi domain — keduanya error tapi beda lapisan.

Topik:
- Input validation (di handler): format email, required field, tipe data
- Business rule validation (di service): stok cukup?, produk aktif?, voucher valid?
- Contoh: harga produk > 0 adalah input validation, stok tersedia adalah business rule
- Stock availability check sebelum add to cart dan sebelum checkout
- Produk aktif vs diarsipkan
- Validasi voucher: belum expired, belum habis kuota, minimum pembelian
- Order status transition: tidak bisa dari "cancelled" ke "paid"

Diagram Mermaid: alur checkout dengan semua validation checkpoint.

Frontmatter: roadmap: 4, chapter: 6
```

---

### R4.C7 · Idempotency

```
Tulis modul lengkap untuk Roadmap 4, Chapter 7.

Judul: Idempotency: Operasi yang Aman Diulang
File: src/content/modules/r4c07-idempotency.mdx

Fokus: Cegah duplikasi order dan payment dari network retry.

Topik:
- Apa itu idempotency: operasi yang diulang menghasilkan efek yang sama
- Idempotency key: client kirim header X-Idempotency-Key
- Menyimpan idempotency key di database dengan UNIQUE constraint
- Duplicate checkout: cek key sebelum buat order baru
- Payment webhook idempotency: cek payment ID sebelum update order
- Safe retry: GET selalu idempotent, POST tidak — kecuali ada idempotency key
- Contoh domain: cegah double order dari double submit, cegah double stock deduction dari double webhook

Diagram Mermaid: alur cek idempotency key.

Frontmatter: roadmap: 4, chapter: 7
```

---

### R4.C8 · Background Worker Architecture

```
Tulis modul lengkap untuk Roadmap 4, Chapter 8.

Judul: Background Worker Architecture
File: src/content/modules/r4c08-background-worker.mdx

Fokus: Pindahkan operasi lambat keluar dari HTTP request ke worker proses terpisah.

Topik:
- API process vs worker process: kenapa dipisah
- Job queue concept: API enqueue, worker dequeue
- Contoh slow operation: kirim email, generate invoice PDF, push notifikasi
- Retry strategy: exponential backoff
- Dead-letter queue: job yang gagal terus-menerus
- Contoh domain: after order created → enqueue send_confirmation_email
- SQS sebagai queue (preview, detail di Roadmap 8)
- Struktur cmd/worker/main.go

Diagram Mermaid: API → SQS → Worker → Email Service.
Box note: "Jangan kirim email di dalam HTTP handler."

Frontmatter: roadmap: 4, chapter: 8
```

---

## Roadmap 5 — Online Shop Skincare Domain Mastery

---

### R5.C1 · Domain Katalog Produk

```
Tulis modul lengkap untuk Roadmap 5, Chapter 1.

Judul: Domain Katalog Produk Skincare
File: src/content/modules/r5c01-katalog-produk.mdx

Fokus: Model produk skincare yang spesifik — bukan produk generik, tapi dengan atribut skincare.

Topik:
- Entitas: Product, Brand, Category, ProductVariant
- SKU (Stock Keeping Unit) — satu produk bisa punya banyak variant (ukuran, varian)
- Product image: URL CDN, bukan binary
- Atribut skincare: skin_type (oily, dry, combination, sensitive), skin_concern, ingredients, usage_instruction
- Nomor BPOM sebagai kolom penting di pasar Indonesia
- Status: active, inactive, archived
- Slug untuk URL SEO-friendly
- Contoh: Wardah Hydrating Toner 100ml vs 200ml = satu produk, dua variant

Diagram Mermaid ERD: Product → ProductVariant, Product → Brand, Product → Category.
Def untuk SKU dan BPOM.

Frontmatter: roadmap: 5, chapter: 1
```

---

### R5.C2 · Pencarian dan Filter Produk

```
Tulis modul lengkap untuk Roadmap 5, Chapter 2.

Judul: Pencarian dan Filter Produk
File: src/content/modules/r5c02-search-filter.mdx

Fokus: API discovery produk yang mendukung perilaku belanja nyata.

Topik:
- Search by name: ILIKE '%keyword%' di PostgreSQL
- Filter by brand, category (ID)
- Filter by skin_type, skin_concern (array overlap atau join)
- Filter by price range: harga_min, harga_max
- Sort: newest (created_at DESC), price_asc, price_desc, popular (order_count)
- Pagination: page + per_page, response meta total
- Query builder pattern di Go: bangun SQL dinamis dengan safety
- Index yang dibutuhkan untuk performa filter

code block untuk contoh query builder dengan parameterized query.
Endpoint: GET /v1/products?category_id=1&skin_type=oily&sort=price_asc&page=1

Frontmatter: roadmap: 5, chapter: 2
```

---

### R5.C3 · Domain Cart

```
Tulis modul lengkap untuk Roadmap 5, Chapter 3.

Judul: Domain Cart: Mengelola Niat Beli
File: src/content/modules/r5c03-cart.mdx

Fokus: Cart adalah state sementara — rancang dengan benar agar tidak jadi sumber bug.

Topik:
- Satu user = satu cart aktif (upsert cart)
- CartItem: cart_id, product_variant_id, quantity
- Add item: upsert (tambah quantity kalau sudah ada, insert kalau belum)
- Update quantity: set, bukan increment
- Remove item
- Validasi sebelum add: produk aktif?, stok tersedia?
- Hitung subtotal: sum(quantity * price) dari product_variants
- Cart tidak menyimpan harga — harga diambil real-time dari produk
- Contoh: add 2 Wardah Toner ke cart, update jadi 3, remove

Endpoint untuk cart CRUD.

Frontmatter: roadmap: 5, chapter: 3
```

---

### R5.C4 · Domain Checkout

```
Tulis modul lengkap untuk Roadmap 5, Chapter 4.

Judul: Domain Checkout: Dari Cart ke Order
File: src/content/modules/r5c04-checkout.mdx

Fokus: Konversi cart menjadi order dengan snapshot harga dan alamat — poin paling kritis di bisnis.

Topik:
- Snapshot harga di order_items: harga pada saat checkout, bukan harga produk saat ini
- Snapshot alamat di orders: alamat saat checkout, bukan alamat user saat ini
- Snapshot diskon: voucher yang dipakai dan nilainya
- Biaya pengiriman: kalkulasi atau input dari user
- Nomor order: format unik yang mudah dibaca (INV-20260101-XXXX)
- Reservasi stok: kurangi available_stock dalam transaksi yang sama dengan buat order
- Validasi checkout: semua item masih ada dan stok cukup
- Order status awal: pending_payment

Diagram Mermaid: alur checkout lengkap dari POST /v1/orders.

Frontmatter: roadmap: 5, chapter: 4
```

---

### R5.C5 · Domain Inventory

```
Tulis modul lengkap untuk Roadmap 5, Chapter 5.

Judul: Domain Inventory: Cegah Overselling
File: src/content/modules/r5c05-inventory.mdx

Fokus: Konsistensi stok di bawah beban concurrent checkout.

Topik:
- available_stock: stok yang bisa dibeli
- reserved_stock: stok yang sudah dipesan tapi belum dibayar
- sold_stock: stok yang sudah dibayar dan diproses
- Stock movement log: semua perubahan stok tercatat kenapa
- Reservasi saat checkout: available -= qty, reserved += qty
- Konfirmasi saat payment success: reserved -= qty, sold += qty
- Release reservasi saat order dibatalkan atau payment timeout
- Safety stock: stok minimum yang tidak boleh dijual
- Row locking untuk concurrent checkout: SELECT ... FOR UPDATE

Diagram Mermaid: state stok dari checkout → pembayaran → pengiriman.
Def untuk available_stock, reserved_stock.

Frontmatter: roadmap: 5, chapter: 5
```

---

### R5.C6 · Domain Payment

```
Tulis modul lengkap untuk Roadmap 5, Chapter 6.

Judul: Domain Payment: Integrasi Payment Gateway yang Aman
File: src/content/modules/r5c06-payment.mdx

Fokus: Handle payment gateway webhook dengan benar — idempotent, terverifikasi, logged.

Topik:
- Payment intent: buat catatan payment sebelum redirect ke gateway
- Payment status: pending → paid → failed / refunded
- Webhook dari gateway (Midtrans/Xendit/Nicepay): POST ke /v1/webhooks/payment
- Verifikasi signature webhook: validasi HMAC/hash sebelum proses
- Idempotency di webhook: cek transaction_id sebelum update order
- Payment event log: simpan semua webhook yang masuk (raw payload)
- Rekonsiliasi: bandingkan payment record vs gateway report
- Contoh: Midtrans notification_key, order_id, transaction_status

Diagram Mermaid: alur dari checkout → gateway → webhook → order update.

Frontmatter: roadmap: 5, chapter: 6
```

---

### R5.C7 · Order Lifecycle

```
Tulis modul lengkap untuk Roadmap 5, Chapter 7.

Judul: Order Lifecycle: Status dan Transisi
File: src/content/modules/r5c07-order-lifecycle.mdx

Fokus: Desain state machine order yang mencegah transisi tidak valid.

Topik:
Status yang perlu di-cover:
pending_payment → paid → processing → shipped → delivered
pending_payment → cancelled (timeout/dibatalkan user)
paid → refunded (setelah complaint)
paid → failed (rare edge case)

- State machine pattern di Go
- Validasi transisi: tidak bisa dari "shipped" ke "pending_payment"
- Trigger otomatis: payment success → auto ke "paid", konfirmasi pengiriman → ke "shipped"
- Notifikasi per transisi: email/push notification
- Audit log: siapa yang ubah status dan kapan

Diagram Mermaid state diagram untuk order lifecycle.

Frontmatter: roadmap: 5, chapter: 7
```

---

### R5.C8 · Domain Promosi dan Voucher

```
Tulis modul lengkap untuk Roadmap 5, Chapter 8.

Judul: Domain Promosi dan Voucher
File: src/content/modules/r5c08-promosi-voucher.mdx

Fokus: Implementasi diskon yang realistis dan tidak bisa dieksploitasi.

Topik:
- Tipe diskon: fixed amount, percentage
- Minimum purchase: voucher tidak berlaku kalau subtotal < minimum
- Usage limit: total penggunaan maksimum
- Per-user limit: satu user maksimal 1x atau Nx pakai
- Expiry date: tidak bisa dipakai setelah tanggal expired
- Scope: specific product atau specific category
- Apply voucher di checkout: validasi semua aturan sebelum apply
- Snapshot diskon di order

code block untuk fungsi ApplyVoucher yang memvalidasi semua kondisi.

Frontmatter: roadmap: 5, chapter: 8
```

---

### R5.C9 · Domain Review dan Rating

```
Tulis modul lengkap untuk Roadmap 5, Chapter 9.

Judul: Domain Review dan Rating Produk
File: src/content/modules/r5c09-review-rating.mdx

Fokus: Review yang terpercaya — hanya pembeli yang bisa review, dan rata-rata yang akurat.

Topik:
- Verified purchase review: hanya bisa review kalau punya order item dengan produk itu
- Rating 1-5 bintang
- Review moderation: pending → approved / rejected
- Review images: array URL gambar
- Menghitung rata-rata rating: aggregate query dengan rounding
- Menampilkan review: paginated, bisa difilter by rating
- Menghindari review spam: one review per order item
- Bridge: "Mirip review di Tokopedia/Shopee"

Endpoint untuk GET /v1/products/{id}/reviews dan POST /v1/reviews.

Frontmatter: roadmap: 5, chapter: 9
```

---

### R5.C10 · Domain Admin dan Backoffice

```
Tulis modul lengkap untuk Roadmap 5, Chapter 10.

Judul: Domain Admin dan Backoffice
File: src/content/modules/r5c10-admin-backoffice.mdx

Fokus: Operasi internal yang mendukung bisnis — route admin yang terproteksi dengan role.

Topik:
- Admin login: endpoint terpisah atau dengan role check
- Product management: CRUD produk, variant, stok adjustment
- Order management: lihat semua order, update status manual
- Payment inspection: lihat payment log, trigger refund
- Customer support view: cari order by user/email/nomor order
- Audit log: semua tindakan admin tercatat (siapa, apa, kapan)
- Route protection: middleware AdminOnly

FileTree: tunjukkan struktur internal/admin/.
Gunakan beberapa Endpoint untuk route admin.

Frontmatter: roadmap: 5, chapter: 10
```

---

## Roadmap 6 — Testing Go Backend

---

### R6.C1 · Unit Testing Dasar

```
Tulis modul lengkap untuk Roadmap 6, Chapter 1.

Judul: Unit Testing Dasar di Go
File: src/content/modules/r6c01-unit-testing.mdx

Fokus: Test pure Go logic — tanpa database, tanpa HTTP.

Topik:
- Package testing bawaan Go: tidak perlu library eksternal
- Nama test: TestNamaFungsi(t *testing.T)
- t.Errorf vs t.Fatalf
- Table-driven tests: []struct{ input, expected } — idiom paling umum di Go
- go test ./... untuk jalankan semua test
- go test -v untuk output verbose
- go test -run TestNamaSpesifik
- Test coverage: go test -cover
- Contoh: TestCalculateCartTotal, TestApplyVoucher, TestValidateStock

Compare: Jest describe/it vs Go table-driven test.
code block untuk contoh table-driven test yang idiomatik.

Frontmatter: roadmap: 6, chapter: 1
```

---

### R6.C2 · Testing HTTP Handler

```
Tulis modul lengkap untuk Roadmap 6, Chapter 2.

Judul: Testing HTTP Handler dengan httptest
File: src/content/modules/r6c02-testing-handler.mdx

Fokus: Test API behavior tanpa menjalankan server sungguhan.

Topik:
- httptest.NewRecorder() sebagai pengganti ResponseWriter
- httptest.NewRequest() untuk buat test request
- Jalankan handler langsung: handler.ServeHTTP(w, r)
- Cek status code: w.Code
- Cek response body: w.Body.String()
- Cek JSON body: json.Unmarshal ke struct
- Mock service layer dengan interface
- Contoh: test handler GET /v1/products/{id} — success + not found

code block untuk contoh lengkap handler test.

Frontmatter: roadmap: 6, chapter: 2
```

---

### R6.C3 · Testing Service Layer

```
Tulis modul lengkap untuk Roadmap 6, Chapter 3.

Judul: Testing Service Layer dengan Mock Repository
File: src/content/modules/r6c03-testing-service.mdx

Fokus: Test business logic dengan fake dependency — isolasi service dari database.

Topik:
- Mock repository: implementasi interface dengan struct fake
- Fake ProductRepository yang simpan data di memory (map)
- Testing happy path: checkout sukses
- Testing failure path: checkout gagal karena stok kurang
- Testing edge case: checkout dengan voucher yang expired
- Mengapa interface membuat testing mudah
- Pilihan: tulis mock manual vs github.com/stretchr/testify/mock (brief)

code block untuk FakeProductRepository dan contoh test service checkout.

Frontmatter: roadmap: 6, chapter: 3
```

---

### R6.C4 · Integration Testing dengan PostgreSQL

```
Tulis modul lengkap untuk Roadmap 6, Chapter 4.

Judul: Integration Testing dengan Database PostgreSQL Nyata
File: src/content/modules/r6c04-integration-testing.mdx

Fokus: Verifikasi bahwa pgx repository bekerja dengan database sungguhan.

Topik:
- Test database terpisah: TEST_DB_URL di env
- Jalankan migration di test setup
- Transaction rollback per test: buat tx di awal, rollback di akhir → tidak ada side effect
- Seed data: insert minimal data yang dibutuhkan test
- Testing SQL query nyata: GetProductByID, ListProducts dengan filter
- Docker Compose untuk PostgreSQL di CI
- Bridge: "Beda dari PHPUnit dengan in-memory database — Go lebih mendorong test dengan database nyata"

code block untuk setup test database dengan transaction per test.

Frontmatter: roadmap: 6, chapter: 4
```

---

### R6.C5 · End-to-End API Testing

```
Tulis modul lengkap untuk Roadmap 6, Chapter 5.

Judul: End-to-End API Testing
File: src/content/modules/r6c05-e2e-testing.mdx

Fokus: Test seluruh sistem sebagai black box — dari HTTP request sampai database.

Topik:
- Jalankan server di goroutine dalam test: httptest.NewServer(router)
- http.DefaultClient untuk call endpoint
- Test database nyata
- Simulasi customer journey: register → login → browse products → add to cart → checkout
- Simulasi payment webhook: POST ke /v1/webhooks/payment dengan payload + signature
- Verifikasi state akhir: order status berubah ke "paid", stok berkurang
- Teardown: clear test data setelah selesai

Diagram Mermaid: alur test end-to-end checkout flow.

Frontmatter: roadmap: 6, chapter: 5
```

---

## Roadmap 7 — Security, Authentication, Production Safety

---

### R7.C1 · Password dan Auth Security

```
Tulis modul lengkap untuk Roadmap 7, Chapter 1.

Judul: Password dan Auth Security
File: src/content/modules/r7c01-password-security.mdx

Fokus: Keamanan login yang layak untuk aplikasi dengan data pelanggan dan pembayaran.

Topik:
- Password hashing dengan bcrypt: golang.org/x/crypto/bcrypt
- Kenapa bcrypt, bukan MD5/SHA (adaptive cost factor)
- Token expiration: access token 15 menit, refresh token 7 hari
- Refresh token strategy: simpan hash refresh token di database
- Login rate limiting: chi/middleware.Throttle atau Redis counter
- Forgot password flow: token di database + email link
- Account verification: email verification sebelum bisa login
- Bridge: "bcrypt_password() di PHP = bcrypt.GenerateFromPassword di Go"

code block untuk hashing dan verifikasi password.

Frontmatter: roadmap: 7, chapter: 1
```

---

### R7.C2 · JWT dan Otorisasi

```
Tulis modul lengkap untuk Roadmap 7, Chapter 2.

Judul: JWT dan Otorisasi Route
File: src/content/modules/r7c02-jwt-otorisasi.mdx

Fokus: Proteksi route dan enforce permission berdasarkan peran.

Topik:
- JWT claims: sub (user_id), role, exp, iat
- Library: github.com/golang-jwt/jwt/v5
- Signing dengan HMAC-SHA256 (HS256)
- Verifikasi di middleware: parse token, cek signature, cek expiry
- Menyimpan user di context: type contextKey struct{}
- Mengambil user dari context di handler dan service
- CustomerOnly middleware vs AdminOnly middleware
- Role-based access: customer tidak bisa akses /v1/admin/*

code block title="middleware/jwt.go" untuk middleware lengkap.

Frontmatter: roadmap: 7, chapter: 2
```

---

### R7.C3 · Input Security

```
Tulis modul lengkap untuk Roadmap 7, Chapter 3.

Judul: Keamanan Input
File: src/content/modules/r7c03-input-security.mdx

Fokus: Cegah input berbahaya dari merusak sistem.

Topik:
- SQL injection prevention: parameterized query dengan pgx ($1, $2) — tidak pernah string concat
- XSS awareness: Go tidak render HTML dari API, tapi tunjukkan jika ada text field yang di-display
- File upload validation: cek MIME type (bukan hanya extension)
- Validasi MIME type: http.DetectContentType untuk gambar produk
- Size limit: batasi body request (http.MaxBytesReader)
- Path traversal: jangan pakai input user sebagai nama file langsung
- Bridge: "Di Laravel ada Request::validate — di Go validasi manual tapi lebih eksplisit"

Sertakan contoh upload produk image yang aman.

Frontmatter: roadmap: 7, chapter: 3
```

---

### R7.C4 · Payment Webhook Security

```
Tulis modul lengkap untuk Roadmap 7, Chapter 4.

Judul: Keamanan Webhook Pembayaran
File: src/content/modules/r7c04-webhook-security.mdx

Fokus: Webhook payment harus diverifikasi, idempotent, dan logged — ini menyangkut uang.

Topik:
- Signature verification: HMAC-SHA512 dengan secret key dari gateway
- Contoh Midtrans: signature_key = SHA512(order_id + status_code + gross_amount + server_key)
- Tolak semua webhook dengan signature tidak valid (return 400)
- Replay protection: cek timestamp (tolak webhook > 5 menit)
- Idempotency: cek transaction_id unik sebelum proses
- Log semua webhook masuk (sebelum validasi) ke payment_events table
- Tidak pernah percaya amount dari webhook — ambil dari database sendiri

code block untuk fungsi VerifyMidtransSignature.

Frontmatter: roadmap: 7, chapter: 4
```

---

### R7.C5 · Manajemen Secrets

```
Tulis modul lengkap untuk Roadmap 7, Chapter 5.

Judul: Manajemen Secrets yang Aman
File: src/content/modules/r7c05-secrets-management.mdx

Fokus: Simpan credential sensitif dengan aman di semua environment.

Topik:
- Apa yang dimaksud secret: DB_URL, JWT_SECRET, PAYMENT_KEY, AWS credentials
- Tidak pernah hardcode secret di kode — tidak pernah commit ke git
- .env untuk local development: gitignore wajib
- AWS Secrets Manager untuk production (preview, detail di Roadmap 8)
- Rotation: cara rotate secret tanpa downtime (brief)
- Least privilege: setiap service hanya punya akses ke secret yang dibutuhkan
- Audit: log akses ke secret (AWS CloudTrail)

code block untuk pattern LoadConfig yang aman dari env + AWS Secrets Manager.
Box note: "Satu kali hardcode secret = audit finding permanen di git history."

Frontmatter: roadmap: 7, chapter: 5
```

---

## Roadmap 8 — Docker, CI/CD, dan AWS Deployment

---

### R8.C1 · Docker untuk Go

```
Tulis modul lengkap untuk Roadmap 8, Chapter 1.

Judul: Containerize Go API dengan Docker
File: src/content/modules/r8c01-docker-go.mdx

Fokus: Buat Docker image Go yang kecil dan aman menggunakan multi-stage build.

Topik:
- Dockerfile untuk Go: FROM golang:1.26-alpine AS builder
- Multi-stage build: build stage + final stage (FROM scratch atau alpine)
- Kenapa multi-stage: image final tidak perlu Go toolchain (lebih kecil, lebih aman)
- COPY go.mod go.sum lalu go mod download (cache layer)
- CGO_ENABLED=0 untuk static binary
- Non-root user di final image
- Environment variables via -e atau .env
- Menjalankan API container: docker run -p 8080:8080 skincare-api
- Bridge: "Dockerfile Go jauh lebih sederhana dari PHP-FPM setup"

code block title="Dockerfile" untuk multi-stage build lengkap.

Frontmatter: roadmap: 8, chapter: 1
```

---

### R8.C2 · Docker Compose untuk Development

```
Tulis modul lengkap untuk Roadmap 8, Chapter 2.

Judul: Docker Compose untuk Local Development Stack
File: src/content/modules/r8c02-docker-compose.mdx

Fokus: Jalankan seluruh stack lokal dengan satu perintah.

Topik:
- Services: api, worker, postgres, redis (kalau ada)
- Depends_on dengan healthcheck: api menunggu postgres ready
- Volume untuk postgres data (persistent)
- Environment file: .env terbaca otomatis
- Network: semua service dalam satu internal network
- Port mapping: 8080:8080 untuk api, 5432:5432 untuk postgres (hanya dev)
- docker compose up --build, docker compose down
- Bridge: "Mirip Laravel Sail tapi lebih vanilla"

code block title="docker-compose.yml" yang siap pakai.
FileTree: tunjukkan posisi docker-compose.yml di root proyek.

Frontmatter: roadmap: 8, chapter: 2
```

---

### R8.C3 · CI Pipeline

```
Tulis modul lengkap untuk Roadmap 8, Chapter 3.

Judul: CI Pipeline: Cegah Code Rusak Masuk ke Staging
File: src/content/modules/r8c03-ci-pipeline.mdx

Fokus: Otomasi lint, test, build image saat setiap push ke repository.

Topik:
- GitHub Actions sebagai contoh CI
- Job: lint (golangci-lint), format check (gofmt -l), vet
- Job: unit test dan integration test (dengan PostgreSQL service container)
- Job: build Docker image
- Job: push image ke ECR (hanya kalau di main branch)
- go test -race untuk detect race condition
- Fail fast: kalau lint gagal, jangan lanjut ke test
- Bridge: "Mirip GitHub Actions untuk Node.js tapi dengan service postgres bawaan"

code block title=".github/workflows/ci.yml" untuk CI pipeline lengkap.

Frontmatter: roadmap: 8, chapter: 3
```

---

### R8.C4 · AWS Foundation untuk Backend

```
Tulis modul lengkap untuk Roadmap 8, Chapter 4.

Judul: AWS Foundation: Layanan yang Dipakai Backend Skincare
File: src/content/modules/r8c04-aws-foundation.mdx

Fokus: Peta layanan AWS yang dipakai — bukan deep dive, cukup untuk bisa diskusi arsitektur.

Topik:
- VPC: jaringan terisolasi di AWS
- Public subnet (ALB) vs private subnet (ECS, RDS)
- Security group: firewall level instance
- IAM role: permission untuk ECS task
- ECR: Docker registry AWS (tempat push image)
- ECS Fargate: container tanpa manage server
- ALB: load balancer untuk API
- RDS PostgreSQL: database managed
- S3: penyimpanan gambar produk
- CloudWatch: logs dan metrics
- Secrets Manager: secrets production
- SQS: queue untuk background job

Diagram Mermaid arsitektur AWS lengkap proyek skincare.

Frontmatter: roadmap: 8, chapter: 4
```

---

### R8.C5 · Deploy Go API ke ECS Fargate

```
Tulis modul lengkap untuk Roadmap 8, Chapter 5.

Judul: Deploy Go API ke ECS Fargate
File: src/content/modules/r8c05-deploy-ecs.mdx

Fokus: Push image ke ECR dan jalankan di ECS Fargate.

Topik:
- Build image dan tag: docker build -t skincare-api .
- Authenticate ke ECR: aws ecr get-login-password | docker login
- Push ke ECR: docker push
- ECS task definition: JSON config (image, CPU, memory, env, secrets)
- ECS service: berapa task yang berjalan, rolling update
- ALB target group dan health check: GET /health
- Environment variables dari Secrets Manager di task definition
- Rolling deployment: ECS update-service tanpa downtime
- Bridge: "Mirip deploy ke GCP Cloud Run tapi dengan lebih banyak kontrol"

code block title="task-definition.json" untuk ECS task definition.

Frontmatter: roadmap: 8, chapter: 5
```

---

### R8.C6 · Deploy Worker Service

```
Tulis modul lengkap untuk Roadmap 8, Chapter 6.

Judul: Deploy Background Worker ke ECS
File: src/content/modules/r8c06-deploy-worker.mdx

Fokus: Jalankan worker terpisah dari API — consumer SQS yang reliable.

Topik:
- Worker sebagai ECS service terpisah (bukan task API)
- SQS consumer loop: poll → process → delete message
- Retry logic: SQS automatic retry dengan visibility timeout
- Dead-letter queue: setelah N kali gagal, kirim ke DLQ
- Scaling worker: tambah task ECS kalau queue panjang (SQS metric)
- Graceful shutdown: tangani SIGTERM, selesaikan pesan yang sedang diproses
- CloudWatch alarm kalau DLQ tidak kosong

Diagram Mermaid: API enqueue → SQS → Worker → downstream services.

Frontmatter: roadmap: 8, chapter: 6
```

---

### R8.C7 · Database di AWS RDS

```
Tulis modul lengkap untuk Roadmap 8, Chapter 7.

Judul: PostgreSQL di AWS RDS
File: src/content/modules/r8c07-rds-postgresql.mdx

Fokus: Jalankan PostgreSQL yang aman dan reliable di production.

Topik:
- RDS PostgreSQL: managed, tidak perlu patch OS
- Private subnet: RDS tidak boleh punya public IP
- Security group: hanya ECS task yang bisa konek ke RDS (port 5432)
- Automatic backup: retention 7-30 hari
- Parameter group: max_connections, shared_buffers (brief)
- Migration strategy di production: jalankan golang-migrate sebelum deploy API baru
- Connection pool sizing: ECS tasks × pool size < max_connections RDS
- Read replica untuk query berat (brief)

Diagram Mermaid: ECS API → Security Group → RDS di private subnet.

Frontmatter: roadmap: 8, chapter: 7
```

---

### R8.C8 · S3 dan CloudFront untuk Gambar Produk

```
Tulis modul lengkap untuk Roadmap 8, Chapter 8.

Judul: S3 dan CloudFront untuk Gambar Produk
File: src/content/modules/r8c08-s3-cloudfront.mdx

Fokus: Upload dan serve gambar produk tanpa menyimpan file di database.

Topik:
- S3 bucket untuk product images: private bucket
- Pre-signed upload URL: API generate URL, client upload langsung ke S3 (tidak lewat API)
- Kenapa pre-signed: API tidak perlu buffer file besar
- Object key convention: products/{productID}/{filename}
- CloudFront distribution di depan S3: CDN untuk serve gambar ke user
- Menyimpan URL CloudFront (bukan S3) di kolom image_url di PostgreSQL
- IAM role ECS task: hanya bisa s3:PutObject dan s3:GetObject di bucket produk
- Resizing gambar: brief mention Lambda@Edge atau S3 batch

Diagram Mermaid: client → GET presigned URL dari API → upload ke S3 → CloudFront → user.

Frontmatter: roadmap: 8, chapter: 8
```

---

### R8.C9 · Observability di AWS

```
Tulis modul lengkap untuk Roadmap 8, Chapter 9.

Judul: Observability: Monitor Backend di Production
File: src/content/modules/r8c09-observability.mdx

Fokus: Deteksi masalah production sebelum pelanggan komplain.

Topik:
- CloudWatch Logs: log dari ECS task otomatis masuk (awslogs driver)
- Log Insights: query log JSON dengan CloudWatch Logs Insights
- CloudWatch Metrics: CPU, memory, request count dari ECS dan ALB
- Custom metrics dari aplikasi: order count, payment success rate
- Alarms:
  - ECS CPU > 80% → scale out atau alert
  - ALB 5xx > 1% → alert
  - RDS connection > 80% → alert
  - SQS queue depth > 100 → alert
- Notification: alarm → SNS → email/Slack
- Bridge: "Mirip Datadog/New Relic tapi native AWS dan lebih hemat"

Diagram Mermaid: ECS → CloudWatch Logs + Metrics → Alarm → SNS.

Frontmatter: roadmap: 8, chapter: 9
```

---

## Roadmap 9 — Advanced Backend Engineering for Scaling

### R9.C1 · Performance Profiling

```
Tulis modul lengkap untuk Roadmap 9, Chapter 1.

Judul: Performance Profiling Go Backend
File: src/content/modules/r9c01-profiling.mdx

Fokus: Temukan bottleneck dengan data, bukan asumsi.

Topik:
- net/http/pprof: tambahkan endpoint profiling ke server
- CPU profiling: go tool pprof http://localhost:6060/debug/pprof/profile
- Memory profiling: heap allocation yang tidak perlu
- Goroutine profiling: cek goroutine leak
- Flame graph: cara baca dan interpretasi
- Slow SQL: cari query lambat di PostgreSQL dengan pg_stat_statements
- N+1 query problem: detect lewat query count per request
- Connection pool exhaustion: monitor pgxpool stats

Box note: "Jangan optimasi sebelum profil — ini berlaku double di Go."

Frontmatter: roadmap: 9, chapter: 1
```

---

## Roadmap 9 — Advanced Backend Engineering for Scaling

### R9.C2 · Caching Strategy

```
Tulis modul lengkap untuk Roadmap 9, Chapter 2.

Judul: Caching Strategy dengan Redis
File: src/content/modules/r9c02-caching.mdx

Fokus: Tambah cache di tempat yang tepat — bukan semua query di-cache.

Topik:
- Cache-aside pattern: cek cache dulu, kalau miss baru ke database
- Redis sebagai cache: github.com/redis/go-redis/v9
- Cache product detail: key product:{id}, TTL 5 menit
- Cache category list: key categories, TTL 1 jam
- Cache invalidation: hapus cache saat produk diupdate
- Stampede protection: single-flight (golang.org/x/sync/singleflight)
- TTL yang tepat: data statis vs data dinamis
- Apa yang TIDAK boleh di-cache: data inventory, cart, order status

Compare: caching manual Go vs Laravel Cache facade.
Diagram Mermaid: request flow dengan cache.

Frontmatter: roadmap: 9, chapter: 2
```

---

## Roadmap 9 — Advanced Backend Engineering for Scaling

### R9.C3 · Search Optimization

```
Tulis modul lengkap untuk Roadmap 9, Chapter 3.

Judul: Optimasi Pencarian Produk
File: src/content/modules/r9c03-search-optimization.mdx

Fokus: Buat pencarian produk lebih cepat dan relevan.

Topik:
- PostgreSQL full-text search: to_tsvector + to_tsquery
- GIN index untuk tsvector
- tsvector dari banyak kolom: nama produk + brand + deskripsi
- Ranking hasil: ts_rank
- Filter + search bersamaan: WHERE ... AND ts @@ query
- Pagination performa dengan full-text: OFFSET besar lambat → keyset pagination
- Kapan perlu OpenSearch: >1 juta produk, multi-language, fuzzy search
- Bridge: "Mirip LIKE tapi jauh lebih powerful dan cepat"

code block untuk tsvector setup dan query full-text search.

Frontmatter: roadmap: 9, chapter: 3
```

---

## Roadmap 9 — Advanced Backend Engineering for Scaling

### R9.C4 · Event-Driven Architecture

```
Tulis modul lengkap untuk Roadmap 9, Chapter 4.

Judul: Event-Driven Architecture dengan SQS
File: src/content/modules/r9c04-event-driven.mdx

Fokus: Pisahkan side effect dari core flow dengan domain events.

Topik:
- Domain event: OrderCreated, PaymentSucceeded, StockReserved, NotificationRequested
- Event publisher: after create order → publish ke SQS
- Event subscriber: worker listen ke SQS, proses event
- Keuntungan: core flow lebih cepat, error di downstream tidak memblokir order
- Outbox pattern: simpan event di database dulu, baru publish (prevent data loss)
- EventBridge untuk routing event ke multiple subscriber
- Contoh: PaymentSucceeded → [update order] + [send email] + [update inventory] + [trigger shipping]

Diagram Mermaid: Order Service → SQS → beberapa worker consumer.

Frontmatter: roadmap: 9, chapter: 4
```

---

## Roadmap 9 — Advanced Backend Engineering for Scaling

### R9.C5 · Advanced Order dan Inventory Consistency

```
Tulis modul lengkap untuk Roadmap 9, Chapter 5.

Judul: Konsistensi Order dan Inventory di High Traffic
File: src/content/modules/r9c05-advanced-consistency.mdx

Fokus: Cegah overselling saat ratusan user checkout bersamaan.

Topik:
- Race condition di checkout: dua user checkout produk terakhir bersamaan
- Optimistic locking: UPDATE inventories SET available_stock = available_stock - $1, version = version + 1 WHERE version = $2
- Pessimistic locking: SELECT ... FOR UPDATE SKIP LOCKED
- Pilih mana: optimistic untuk low conflict, pessimistic untuk high conflict (flash sale)
- Reservation expiry: cancel reservasi yang tidak dibayar dalam 30 menit (cron job atau SQS delayed message)
- Payment timeout: auto-cancel order setelah batas waktu
- Load test sederhana: k6 atau hey untuk simulasi concurrent checkout

Diagram Mermaid: concurrent checkout race condition → solution.

Frontmatter: roadmap: 9, chapter: 5
```

---

## Roadmap 9 — Advanced Backend Engineering for Scaling

### R9.C6 · Dari Modular Monolith ke Microservices

```
Tulis modul lengkap untuk Roadmap 9, Chapter 6.

Judul: Kapan dan Bagaimana Split ke Microservices
File: src/content/modules/r9c06-monolith-to-microservices.mdx

Fokus: Tahu kapan modular monolith tidak cukup lagi — dan cara split yang tidak merusak bisnis.

Topik:
- Kapan TIDAK pakai microservices: team kecil, traffic masih bisa di-handle monolith
- Signal untuk split: deployment frequency berbeda, scaling requirement berbeda, tim yang berbeda
- Service boundary: domain yang paling independen adalah kandidat pertama (notification, search)
- Database ownership: setiap service punya database sendiri setelah split
- API contract: definisikan interface service sebelum pisah
- Async communication: service berkomunikasi via event, bukan direct HTTP call
- Strangler fig pattern: pisahkan satu domain per waktu, bukan big bang rewrite
- Bridge: "Microservices bukan tentang teknologi, tapi tentang ownership tim"

Diagram Mermaid: modular monolith → step-by-step extract payment service.

Frontmatter: roadmap: 9, chapter: 6
```
