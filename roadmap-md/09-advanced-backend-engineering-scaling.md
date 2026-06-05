# Roadmap 9 — Advanced Backend Engineering for Scaling

## Goal

Prepare the student for growth-stage backend problems.

This roadmap should be studied after the student can already build and deploy the modular monolith backend.

---

## Chapter 1 — Performance Profiling

### Primary Focus

Understand bottlenecks.

### Summary

Learn:

- `pprof` basics
- CPU profiling
- Memory profiling
- Slow SQL
- N+1 query problem
- Connection pool tuning

### Student Outcome

The student can diagnose performance issues in Go and PostgreSQL.

---

## Chapter 2 — Caching Strategy

### Primary Focus

Add cache where it makes sense.

### Summary

Learn:

- Redis
- Cache-aside pattern
- Product cache
- Category cache
- Cache invalidation
- TTL

### Student Outcome

The student can improve read performance without corrupting business data.

---

## Chapter 3 — Search Optimization

### Primary Focus

Improve product discovery.

### Summary

Learn:

- PostgreSQL search basics
- Filtering strategy
- Sorting strategy
- Full-text search
- When to use OpenSearch

### Student Outcome

The student can support more advanced product search.

---

## Chapter 4 — Event-Driven Architecture

### Primary Focus

Decouple side effects.

### Summary

Learn:

- Domain events
- `OrderCreated`
- `PaymentSucceeded`
- `StockReserved`
- `NotificationRequested`
- EventBridge concept
- SQS integration

### Student Outcome

The student can move from direct service calls to event-based workflows when needed.

---

## Chapter 5 — Advanced Order and Inventory Consistency

### Primary Focus

Handle race conditions and high traffic checkout.

### Summary

Learn:

- Row locking
- Optimistic locking
- Pessimistic locking
- Stock reservation
- Reservation expiry
- Payment timeout

### Student Outcome

The student can prevent overselling during concurrent checkout.

---

## Chapter 6 — Modular Monolith to Microservices Readiness

### Primary Focus

Know when and how to split services.

### Summary

Learn:

- When not to use microservices
- Service boundary
- Database ownership
- API contract
- Async communication
- Migration strategy

### Student Outcome

The student knows how to evolve the skincare backend without premature over-engineering.
