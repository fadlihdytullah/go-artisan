# Roadmap 7 — Security, Authentication, and Production Safety

## Goal

Build an API that is safe enough for real users, payments, and customer data.

This roadmap focuses on practical security for a Go backend handling customers, orders, and payments.

---

## Chapter 1 — Password and Auth Security

### Primary Focus

Understand authentication risks.

### Summary

Learn:

- Password hashing
- Token expiration
- Refresh token strategy
- Login rate limiting
- Forgot password flow
- Account verification

### Student Outcome

The student can reason about secure login and account protection.

---

## Chapter 2 — JWT and Authorization

### Primary Focus

Protect routes and enforce permissions.

### Summary

Learn:

- JWT claims
- Middleware verification
- Current user context
- Customer route protection
- Admin route protection
- Role-based access control

### Student Outcome

The student can secure customer and admin APIs.

---

## Chapter 3 — Input Security

### Primary Focus

Prevent malicious input from damaging the system.

### Summary

Learn:

- Request validation
- SQL injection prevention
- XSS awareness
- File upload validation
- Image MIME validation
- Size limit

### Student Outcome

The student can safely handle user input and product image uploads.

---

## Chapter 4 — Payment Webhook Security

### Primary Focus

Secure external payment callbacks.

### Summary

Learn:

- Signature verification
- Replay protection
- Idempotency
- Event logging
- Rejecting invalid payloads

### Student Outcome

The student can safely process payment gateway webhooks.

---

## Chapter 5 — Secrets Management

### Primary Focus

Keep sensitive config out of source code.

### Summary

Learn:

- Environment variables
- Secret values
- Local secrets
- Production secrets
- Rotation concept
- Least privilege access

### Student Outcome

The student knows not to hardcode database URLs, JWT secrets, payment keys, or AWS credentials.
