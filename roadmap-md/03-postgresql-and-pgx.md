# Roadmap 3 — PostgreSQL and pgx for Go Backend

## Goal

Learn relational database design and use PostgreSQL from Go using pgx.

This roadmap focuses on database fundamentals, SQL, schema modeling, pgx usage, transactions, and repository design.

---

## Chapter 1 — Relational Database Fundamentals

### Primary Focus

Understand how relational data works.

### Summary

Learn:

- Tables
- Rows
- Columns
- Primary keys
- Foreign keys
- Constraints
- Indexes
- Relationships

### Student Outcome

The student understands why PostgreSQL is suitable for products, orders, payments, and inventory.

---

## Chapter 2 — SQL Basics

### Primary Focus

Write basic SQL queries.

### Summary

Learn:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- `WHERE`
- `ORDER BY`
- `LIMIT` / `OFFSET`
- `JOIN`
- `GROUP BY`

### Student Outcome

The student can query product catalog, cart items, order history, and customer data.

---

## Chapter 3 — Data Modeling for Online Shop

### Primary Focus

Design the database schema for the skincare project.

### Summary

Learn the purpose of these tables:

- `users`
- `addresses`
- `products`
- `product_variants`
- `categories`
- `brands`
- `inventories`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `payments`
- `shipments`
- `reviews`
- `promotions`

### Student Outcome

The student can model the core skincare online shop database.

---

## Chapter 4 — Database Migrations

### Primary Focus

Manage schema changes safely.

### Summary

Learn:

- Why migrations matter
- Up migration
- Down migration
- Versioned schema
- Migration strategy for staging and production

### Student Outcome

The student can evolve the database without manually changing production tables.

---

## Chapter 5 — Connecting Go to PostgreSQL with pgx

### Primary Focus

Use pgx connection pool.

### Summary

Learn:

- `pgxpool`
- Connection string
- Connection timeout
- Ping database
- Acquire/release concept
- Passing context to queries

### Student Outcome

The student can connect the Go backend to PostgreSQL using pgx.

---

## Chapter 6 — Querying Data with pgx

### Primary Focus

Read data from PostgreSQL into Go structs.

### Summary

Learn:

- `QueryRow`
- `Query`
- `Scan`
- `rows.Next`
- Handling no rows
- Mapping SQL result to struct

### Student Outcome

The student can implement product listing, product detail, and order detail queries.

---

## Chapter 7 — Writing Data with pgx

### Primary Focus

Insert and update business data.

### Summary

Learn:

- `INSERT RETURNING`
- `UPDATE`
- `DELETE`
- Soft delete
- Timestamps
- Affected rows

### Student Outcome

The student can create cart items, orders, reviews, and payment records.

---

## Chapter 8 — Transactions

### Primary Focus

Protect critical business operations.

### Summary

Learn:

- Begin
- Commit
- Rollback
- Transaction boundaries
- Checkout transaction
- Stock reservation
- Order creation
- Payment record creation

### Student Outcome

The student can implement safe checkout logic.

---

## Chapter 9 — Indexing and Query Performance

### Primary Focus

Make common queries fast.

### Summary

Learn:

- B-tree indexes
- Unique indexes
- Composite indexes
- Query planning basics
- Pagination performance
- Search/filter indexes

### Student Outcome

The student can optimize product listing, order lookup, and user order history.

---

## Chapter 10 — Repository Pattern with pgx

### Primary Focus

Organize database access cleanly.

### Summary

Learn:

- Repository interface
- PostgreSQL implementation
- Separating SQL from handlers
- Dependency injection
- Testable database access

### Student Outcome

The student can build maintainable database modules for product, cart, order, inventory, and payment.
