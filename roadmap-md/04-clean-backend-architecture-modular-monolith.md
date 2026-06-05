# Roadmap 4 — Clean Backend Architecture with Modular Monolith

## Goal

Build a maintainable Go backend that is not over-engineered but ready to grow.

This roadmap teaches the student how to structure a production-style backend without jumping too early into microservices.

---

## Chapter 1 — Layered Architecture

### Primary Focus

Separate responsibilities.

### Summary

Learn:

- Handler layer
- Service/usecase layer
- Repository layer
- Domain model
- DTO
- Infrastructure layer

### Student Outcome

The student knows where to put HTTP code, business logic, and SQL code.

---

## Chapter 2 — Modular Monolith Structure

### Primary Focus

Organize the app by business domain.

### Summary

Example structure:

```text
internal/
  product/
  cart/
  order/
  payment/
  inventory/
  user/
  promotion/
  review/
  notification/
```

Learn:

- Domain-first folder structure
- Internal packages
- API process and worker process
- Shared package boundaries
- Avoiding dependency cycles
- Keeping modules independent

### Student Outcome

The student can keep the app modular without prematurely using microservices.

---

## Chapter 3 — Configuration Management

### Primary Focus

Manage environment-specific settings.

### Summary

Learn:

- Environment variables
- Config struct
- Local config
- Staging config
- Production config
- Secrets vs normal config

### Student Outcome

The student can manage DB URL, JWT config, AWS config, and payment gateway config safely.

---

## Chapter 4 — Error Handling Strategy

### Primary Focus

Make errors predictable and clean.

### Summary

Learn:

- Domain errors
- Validation errors
- Not found errors
- Unauthorized errors
- Conflict errors
- Internal errors
- Mapping errors to HTTP status codes

### Student Outcome

The student can return clean API errors without leaking internal details.

---

## Chapter 5 — Logging Strategy

### Primary Focus

Make backend behavior observable.

### Summary

Learn:

- Structured logging
- Log levels
- Request ID
- User ID in logs
- Error context
- Avoiding sensitive data in logs

### Student Outcome

The student can debug production issues more easily.

---

## Chapter 6 — Validation and Business Rules

### Primary Focus

Separate input validation from domain validation.

### Summary

Learn:

- Request validation
- Business rule validation
- Stock availability
- Product active/inactive
- Voucher validity
- Payment status rules
- Order status transition rules

### Student Outcome

The student can prevent invalid checkout, invalid discounts, and invalid order transitions.

---

## Chapter 7 — Idempotency

### Primary Focus

Prevent duplicate operations.

### Summary

Learn:

- Idempotency key
- Duplicate checkout prevention
- Payment webhook idempotency
- Safe retry behavior
- Unique constraints for protection

### Student Outcome

The student can safely handle network retries and repeated payment webhook calls.

---

## Chapter 8 — Background Worker Architecture

### Primary Focus

Move slow tasks out of HTTP requests.

### Summary

Learn:

- API process vs worker process
- Job queue concept
- Retry strategy
- Dead-letter queue concept
- Email notification job
- Payment processing job

### Student Outcome

The student can design API + worker deployment for order and notification workflows.
