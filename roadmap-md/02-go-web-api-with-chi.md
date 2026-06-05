# Roadmap 2 — Go Web API Development with net/http and chi

## Goal

Build REST APIs using Go’s HTTP standard library and chi.

This roadmap teaches the student how to expose backend functionality through clean, predictable, maintainable HTTP APIs.

---

## Chapter 1 — HTTP Fundamentals for Backend Developers

### Primary Focus

Understand the web protocol before using a framework.

### Summary

Learn:

- HTTP request and response
- Methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Status codes
- Headers
- Body
- Query parameters
- Path parameters
- JSON API basics

### Student Outcome

The student understands how frontend/mobile apps communicate with the backend.

---

## Chapter 2 — Building Basic HTTP Handlers in Go

### Primary Focus

Use Go’s standard `net/http`.

### Summary

Learn:

- `http.Handler`
- `http.HandlerFunc`
- `ResponseWriter`
- `Request`
- JSON encoding
- JSON decoding
- Returning status codes

### Student Outcome

The student can build a simple HTTP API without chi first.

---

## Chapter 3 — Routing with chi

### Primary Focus

Build clean REST routes using chi.

### Summary

Learn:

- `chi.NewRouter`
- Route grouping
- Path parameters
- Middleware chain
- Mounting subrouters
- Versioned routes: `/v1`

### Student Outcome

The student can structure routes like `/v1/products`, `/v1/cart`, `/v1/orders`, and `/v1/payments/webhook`.

---

## Chapter 4 — Request and Response Design

### Primary Focus

Design consistent API contracts.

### Summary

Learn:

- Request DTO
- Response DTO
- JSON tags
- Validation error response
- Success response format
- Error response format
- Pagination response

### Student Outcome

The student can create predictable API responses for frontend/mobile clients.

---

## Chapter 5 — Middleware

### Primary Focus

Add cross-cutting concerns cleanly.

### Summary

Learn:

- Request logging
- Recovery middleware
- Request ID
- CORS
- Authentication middleware
- Rate limiting concept
- Timeout middleware

### Student Outcome

The student can protect and observe API requests consistently.

---

## Chapter 6 — API Validation

### Primary Focus

Validate input before business logic.

### Summary

Learn:

- Required fields
- String length
- Email format
- Numeric constraints
- Custom validation
- Validation response format

### Student Outcome

The student can validate product creation, checkout, registration, cart quantity, and address input.

---

## Chapter 7 — Authentication Flow

### Primary Focus

Understand token-based authentication.

### Summary

Learn:

- Session vs token
- JWT concept
- Access token
- Refresh token
- Auth middleware
- Current user context
- Role-based access

### Student Outcome

The student can design protected routes for customers and admins.

---

## Chapter 8 — REST API Design for E-Commerce

### Primary Focus

Apply REST design to the skincare app.

### Summary

Learn:

- Product listing
- Product detail
- Add to cart
- Update cart item
- Checkout
- View order history
- Admin product management
- Payment webhook endpoint

### Student Outcome

The student can design the main API surface for the online shop backend.
