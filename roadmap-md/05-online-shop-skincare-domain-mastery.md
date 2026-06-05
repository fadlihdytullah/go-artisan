# Roadmap 5 — Online Shop Skincare Backend Domain Mastery

## Goal

Understand the actual business domain deeply enough to build the real project.

This roadmap turns general backend knowledge into domain-specific online shop skincare backend capability.

---

## Chapter 1 — Product Catalog Domain

### Primary Focus

Model skincare-specific products.

### Summary

Learn:

- Product
- Brand
- Category
- Variant
- SKU
- Product image
- Skin type
- Skin concern
- Ingredients
- Usage instruction
- BPOM/registration number

### Student Outcome

The student can build a skincare catalog, not just a generic product table.

---

## Chapter 2 — Product Search and Filtering

### Primary Focus

Support real shopping behavior.

### Summary

Learn:

- Search by name
- Filter by brand
- Filter by category
- Filter by skin type
- Filter by skin concern
- Filter by price range
- Sort by newest, price, popularity
- Pagination

### Student Outcome

The student can build product discovery APIs.

---

## Chapter 3 — Cart Domain

### Primary Focus

Manage temporary purchase intent.

### Summary

Learn:

- Add item
- Update quantity
- Remove item
- Validate product status
- Validate stock
- Calculate subtotal

### Student Outcome

The student can build a reliable shopping cart.

---

## Chapter 4 — Checkout Domain

### Primary Focus

Convert cart into order safely.

### Summary

Learn:

- Checkout validation
- Address snapshot
- Price snapshot
- Discount snapshot
- Shipping cost snapshot
- Order number generation
- Stock reservation

### Student Outcome

The student can create orders without corrupting price, address, or stock history.

---

## Chapter 5 — Inventory Domain

### Primary Focus

Prevent overselling.

### Summary

Learn:

- Available stock
- Reserved stock
- Stock movement
- Stock adjustment
- Reservation expiry
- Safety stock

### Student Outcome

The student understands inventory consistency during checkout and payment.

---

## Chapter 6 — Payment Domain

### Primary Focus

Handle payment gateway integration safely.

### Summary

Learn:

- Payment intent
- Payment status
- Webhook
- Signature verification
- Idempotency
- Payment event log
- Reconciliation concept

### Student Outcome

The student can process payment success/failure without duplicate order updates.

---

## Chapter 7 — Order Lifecycle

### Primary Focus

Manage order state clearly.

### Summary

Learn order statuses:

- `pending_payment`
- `paid`
- `processing`
- `shipped`
- `delivered`
- `cancelled`
- `refunded`
- `failed`

### Student Outcome

The student can design safe order status transitions.

---

## Chapter 8 — Promotion and Voucher Domain

### Primary Focus

Build realistic discount logic.

### Summary

Learn:

- Fixed discount
- Percentage discount
- Minimum purchase
- Usage limit
- Per-user limit
- Expiry date
- Product/category-specific promo

### Student Outcome

The student can implement useful but controlled promotion rules.

---

## Chapter 9 — Review and Rating Domain

### Primary Focus

Manage customer-generated content.

### Summary

Learn:

- Product review
- Rating
- Verified purchase review
- Review moderation
- Review images
- Average rating calculation

### Student Outcome

The student can build trustworthy product reviews.

---

## Chapter 10 — Admin and Backoffice Domain

### Primary Focus

Support internal operations.

### Summary

Learn:

- Admin login
- Product management
- Stock adjustment
- Order management
- Payment inspection
- Customer support view
- Audit log

### Student Outcome

The student can support the business side of the online shop.
