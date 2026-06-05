# Roadmap 1 — Go Programming Foundations for Backend Developers

## Goal

Understand Go syntax, idioms, project structure, and how to think like a Go backend developer.

This roadmap builds the foundation required before touching HTTP APIs, PostgreSQL, chi, pgx, Docker, or AWS.

---

## Chapter 1 — Introduction to Go and Backend Mindset

### Primary Focus

Understand what Go is good for and why it is commonly used for APIs, workers, CLIs, and infrastructure tooling.

### Summary

Learn:

- What Go is
- Why Go is popular for backend systems
- Compiled language vs interpreted language
- Static typing
- Simplicity-first design
- Backend use cases: APIs, jobs, workers, services

### Student Outcome

The student understands why Go is suitable for the skincare online shop backend.

---

## Chapter 2 — Go Setup and Developer Workflow

### Primary Focus

Install Go and understand the basic development workflow.

### Summary

Learn:

- Installing Go
- `GOPATH` vs Go Modules
- `go mod init`
- `go run`
- `go build`
- `go test`
- `go fmt`
- `go vet`
- Basic project folder structure

### Student Outcome

The student can create, run, build, format, and test a basic Go project.

---

## Chapter 3 — Variables, Constants, Types, and Zero Values

### Primary Focus

Build strong understanding of Go’s type system.

### Summary

Learn:

- `var` and `:=`
- `const`
- `string`, `int`, `bool`, `float`
- Zero values
- Type conversion
- Custom types
- Type aliases

### Student Outcome

The student can model simple values like price, quantity, status, and product names safely.

---

## Chapter 4 — Control Flow

### Primary Focus

Understand decision-making and loops in Go.

### Summary

Learn:

- `if` / `else`
- `switch`
- `for` loops
- `range`
- Early return style
- Guard clauses

### Student Outcome

The student can write readable business logic such as stock validation and discount rules.

---

## Chapter 5 — Functions and Error Return Pattern

### Primary Focus

Learn how Go handles function design and errors.

### Summary

Learn:

- Function parameters
- Return values
- Multiple return values
- Named return values
- Error as value
- `errors.New`
- `fmt.Errorf`
- Error wrapping

### Student Outcome

The student can write functions like `CalculateCartTotal()`, `ValidateStock()`, and `CreateOrder()` using Go’s error style.

---

## Chapter 6 — Structs and Methods

### Primary Focus

Model backend entities using structs.

### Summary

Learn:

- `struct`
- Methods
- Pointer receiver vs value receiver
- Embedded structs
- JSON tags
- DTO vs domain model

### Student Outcome

The student can model `User`, `Product`, `CartItem`, `Order`, `Payment`, and `Inventory` entities.

---

## Chapter 7 — Pointers and Memory Basics

### Primary Focus

Understand pointer usage without overcomplicating it.

### Summary

Learn:

- What pointers are
- Passing by value
- Passing by reference
- `nil`
- Pointer receiver
- Common pointer mistakes

### Student Outcome

The student understands when to use pointers for mutation, optional values, and repository results.

---

## Chapter 8 — Slices, Maps, and Collections

### Primary Focus

Work with collections used in APIs and business logic.

### Summary

Learn:

- Arrays vs slices
- `append`
- `len` and `cap`
- `range` over slice
- Maps
- Map lookup
- Grouping data

### Student Outcome

The student can process product lists, cart items, order items, and lookup tables.

---

## Chapter 9 — Interfaces and Dependency Design

### Primary Focus

Understand Go interfaces for clean backend architecture.

### Summary

Learn:

- Interface basics
- Small interfaces
- Interface as behavior
- Dependency injection manually
- Mocking through interfaces

### Student Outcome

The student can separate service layer from database layer using repository interfaces.

---

## Chapter 10 — Packages and Project Organization

### Primary Focus

Learn how to split Go code properly.

### Summary

Learn:

- `package main`
- `internal` package
- `cmd` folder
- Import rules
- Exported vs unexported names
- Avoiding circular dependencies

### Student Outcome

The student can organize a backend into modules like product, order, payment, and inventory.

---

## Chapter 11 — Context Package

### Primary Focus

Learn request-scoped cancellation and timeouts.

### Summary

Learn:

- `context.Context`
- `context.WithTimeout`
- Context cancellation
- Passing context to database calls
- Request lifecycle

### Student Outcome

The student can pass context from HTTP request to service and database layers.

---

## Chapter 12 — Basic Concurrency

### Primary Focus

Understand goroutines and channels at a practical backend level.

### Summary

Learn:

- Goroutines
- Channels
- `select`
- Wait groups
- Mutex basics
- Race conditions
- When not to use concurrency

### Student Outcome

The student can safely understand background jobs, parallel tasks, and worker behavior.
