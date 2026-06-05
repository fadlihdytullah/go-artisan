# Roadmap 8 — Docker, CI/CD, and AWS Deployment

## Goal

Deploy the Go backend safely to AWS.

This roadmap prepares the student to package, deploy, monitor, and operate the skincare backend in a production-style AWS environment.

---

## Chapter 1 — Docker for Go Applications

### Primary Focus

Containerize the backend.

### Summary

Learn:

- Dockerfile
- Multi-stage build
- Small final image
- Environment variables
- Running Go API in container
- Running worker in container

### Student Outcome

The student can package the Go API and worker as Docker images.

---

## Chapter 2 — Docker Compose for Local Development

### Primary Focus

Run the full local stack.

### Summary

Learn:

- API container
- Worker container
- PostgreSQL container
- Redis container
- Environment file
- Local networking

### Student Outcome

The student can run the backend stack locally like a real system.

---

## Chapter 3 — CI Pipeline

### Primary Focus

Automate checks before deployment.

### Summary

Learn:

- Lint
- Format check
- Unit test
- Integration test
- Build Docker image
- Push image

### Student Outcome

The student can prevent broken code from reaching staging or production.

---

## Chapter 4 — AWS Foundation

### Primary Focus

Understand the AWS services used by the backend.

### Summary

Learn:

- VPC
- Public subnet
- Private subnet
- Security group
- IAM role
- ECR
- ECS Fargate
- ALB
- RDS PostgreSQL
- S3
- CloudWatch
- Secrets Manager
- SQS

### Student Outcome

The student understands how the Go backend runs on AWS infrastructure.

---

## Chapter 5 — Deploying Go API to ECS Fargate

### Primary Focus

Run the containerized API on AWS.

### Summary

Learn:

- Build image
- Push to ECR
- ECS task definition
- ECS service
- ALB target group
- Health check
- Environment variables
- Secrets injection

### Student Outcome

The student can deploy the Go API to ECS Fargate.

---

## Chapter 6 — Deploying Worker Service

### Primary Focus

Run background processing separately.

### Summary

Learn:

- Worker task definition
- SQS consumer
- Retry logic
- Dead-letter queue
- Scaling workers

### Student Outcome

The student can process payment events and notifications asynchronously.

---

## Chapter 7 — Database on AWS RDS

### Primary Focus

Run PostgreSQL safely in production.

### Summary

Learn:

- RDS PostgreSQL
- Private subnet
- Security group access
- Backup
- Parameter group basics
- Migration strategy
- Connection pool sizing

### Student Outcome

The student can connect ECS service to RDS securely.

---

## Chapter 8 — S3 and CloudFront for Product Images

### Primary Focus

Store and serve product images.

### Summary

Learn:

- S3 bucket
- Object key
- Private vs public bucket
- Pre-signed upload URL
- CloudFront distribution
- Image metadata in PostgreSQL

### Student Outcome

The student can support product images without storing files in the database.

---

## Chapter 9 — Observability on AWS

### Primary Focus

Monitor the system.

### Summary

Learn:

- CloudWatch Logs
- Structured logs
- Metrics
- Alarms
- ECS CPU/memory alarm
- RDS connection alarm
- ALB 5xx alarm
- SQS backlog alarm

### Student Outcome

The student can detect production issues early.
