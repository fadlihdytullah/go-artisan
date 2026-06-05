# Roadmap 6 — Testing Go Backend Applications

## Goal

Build confidence that the backend works before deployment.

This roadmap teaches the student how to test Go backend code from small business rules to full API flows.

---

## Chapter 1 — Unit Testing Basics

### Primary Focus

Test pure Go logic.

### Summary

Learn:

- `testing` package
- Table-driven tests
- Test naming
- Assert style
- Testing business rules

### Student Outcome

The student can test discount calculation, stock validation, and order status transitions.

---

## Chapter 2 — Testing HTTP Handlers

### Primary Focus

Test API behavior.

### Summary

Learn:

- `httptest`
- Test request
- Test response
- Test status code
- Test JSON body
- Mock service layer

### Student Outcome

The student can test product, cart, and order API endpoints.

---

## Chapter 3 — Testing Services

### Primary Focus

Test business usecases.

### Summary

Learn:

- Mock repositories
- Fake dependencies
- Testing success path
- Testing failure path
- Testing edge cases

### Student Outcome

The student can test checkout, payment webhook, and inventory logic.

---

## Chapter 4 — Integration Testing with PostgreSQL

### Primary Focus

Test real database behavior.

### Summary

Learn:

- Test database
- Migrations in test
- Transaction rollback in test
- Seed data
- Testing SQL queries

### Student Outcome

The student can verify pgx repositories with a real PostgreSQL database.

---

## Chapter 5 — End-to-End API Testing

### Primary Focus

Test the app as a complete system.

### Summary

Learn:

- Start API
- Call endpoints
- Use test database
- Simulate checkout flow
- Simulate payment webhook

### Student Outcome

The student can test the main customer journey from product browsing to payment confirmation.
