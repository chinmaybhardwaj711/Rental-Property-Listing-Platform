# 🏡 StayForge — Property Rental & Booking Platform



StayForge is a production-oriented property rental and booking platform built with **Node.js, Express.js, MongoDB Atlas**, and a server-rendered **EJS** frontend. The project demonstrates scalable backend engineering through transaction-safe booking workflows, optimistic concurrency control, Redis cache-aside caching, MongoDB text-indexed search, automated testing, Docker containerization, and CI/CD using GitHub Actions.

🔗 **Live Demo:** https://major-project-1-s0d6.onrender.com

---

# 🚀 Features

## 👤 Authentication & Authorization

- User registration & login using Passport.js (Local Strategy)
- Secure session-based authentication with MongoDB-backed session storage
- Ownership-based authorization for listings and reviews
- Protected routes using custom middleware
- Flash messages for authentication and CRUD operations

---

## 🏡 Property Listings

- Create, edit, and delete rental property listings
- Upload property images to Cloudinary
- MongoDB full-text search using text indexes
- Category-based filtering
- Pagination for scalable listing retrieval
- Interactive property maps using Mapbox Geocoding

---

## ⭐ Reviews & Ratings

- Five-star rating system
- Add and delete reviews
- Review ownership verification
- Automatic author population using Mongoose

---

## 📅 Booking Engine

- Date-range booking system
- Booking availability validation
- Transaction-safe booking creation using MongoDB Transactions
- Optimistic concurrency control preventing double booking
- Automatic booking price calculation
- Displays unavailable booking dates
- Booking overlap validation

---

## ⚡ Performance Optimizations

- Redis Cache-Aside Pattern
- Automatic cache invalidation after CRUD operations
- MongoDB Text Indexes
- Server-side Pagination
- HTTP Response Compression
- Structured Logging using Pino
- Graceful fallback when Redis is unavailable

---

## 🔒 Security

- Helmet Security Headers (CSP configured for Mapbox)
- Express Rate Limiting
- Joi Request Validation
- Secure Session Storage
- Environment Variable Management using dotenv

---

## 🧪 Testing

- Jest Unit Tests
- Supertest Integration Tests
- MongoDB Memory Server
- Authentication Flow Testing
- Protected Route Testing
- Booking Overlap Validation
- Listing Route Integration Tests

---

## 🐳 DevOps

- Dockerized Application
- Docker Compose
- GitHub Actions CI
- Render Deployment
- MongoDB Atlas
- Upstash Redis

---

# 🏛 Architecture

```text
                 Client (Browser)
                        │
                        ▼
              EJS + Bootstrap Frontend
                        │
                        ▼
              Express.js Application
                        │
      ┌─────────────────┼─────────────────┐
      ▼                 ▼                 ▼
MongoDB Atlas      Redis (Upstash)    Cloudinary
      │                                   │
      ▼                                   ▼
 Property Data                     Image Storage

                    ▼
                Mapbox API
            (Maps & Geocoding)
```

### Architecture Highlights

- MVC Architecture
- RESTful Routing
- Server-side Rendering (SSR)
- Redis Cache-Aside Pattern
- MongoDB Transactions
- Optimistic Concurrency Control
- Cloud Image Storage
- Managed Cloud Database

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Frontend

- EJS
- Bootstrap 5
- HTML5
- CSS3
- JavaScript (ES6)

## Caching

- Redis (Upstash)
- ioredis

## Authentication & Security

- Passport.js
- Express Session
- connect-mongo
- Joi
- Helmet
- Express Rate Limit

## Cloud Services

- Cloudinary
- Mapbox

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Render

## Testing

- Jest
- Supertest
- MongoDB Memory Server

## Observability

- Pino Structured Logging

---

# 📊 Performance Benchmarks

Load tested using **Artillery** against the Listings endpoint.

| Metric | Baseline | Indexed + Pagination | Redis Cache (Final) |
|---------|----------|----------------------|----------------------|
| Requests | 300 | 600 | **4500** |
| Median | 47 ms | 96.6 ms | **77.5 ms** |
| Average | 119.7 ms | 190 ms | **124.6 ms** |
| p95 | 742.6 ms | 963 ms | **333.7 ms** |
| p99 | 1224.4 ms | 1525 ms | **1408.4 ms** |
| Errors | 0 | 0 | **0** |

> **Observations**
>
> - Redis cache significantly reduced p95 latency.
> - Zero failed requests during load testing.
> - Occasional p99 spikes are consistent with MongoDB Atlas M0 shared-tier latency.
> - Query execution was verified using MongoDB Atlas Explain Plan (IXSCAN, not COLLSCAN).

📄 Detailed benchmark results are available in **BENCHMARKS.md**.

---

# 🧠 Engineering Decisions

This project intentionally prioritizes backend correctness, scalability, and maintainability over unnecessary architectural complexity.

## Why Redis instead of Kafka/RabbitMQ?

The application has no event-streaming or multi-consumer requirements. Introducing a message broker would add operational complexity without solving a real problem.

---

## Why EJS instead of React?

The primary focus of this version was backend engineering:

- Authentication
- Authorization
- MongoDB Transactions
- Redis Caching
- Database Indexing
- CI/CD
- Deployment
- Performance Optimization

A React frontend can be added later without changing the backend architecture.

---

## Why Optimistic Concurrency?

A naïve booking flow:

```
Check Availability
↓

Create Booking
```

is vulnerable to race conditions.

StayForge prevents concurrent booking conflicts by forcing competing transactions to update the shared Listing document, allowing MongoDB to detect write conflicts automatically.

---

## Why MongoDB Transactions?

Booking creation spans multiple operations that must either succeed together or fail together.

MongoDB Transactions guarantee atomicity and consistency under concurrent requests.

---

# 📂 Project Structure

```text
StayForge/
│
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── tests/
├── utils/
├── views/
│
├── .github/
│   └── workflows/
│
├── BENCHMARKS.md
├── README.md
├── Dockerfile
├── docker-compose.yml
├── app.js
├── server.js
├── package.json
└── package-lock.json
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/chinmaybhardwaj711/Property-Rental-Booking-Platform.git

cd Property-Rental-Booking-Platform
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
ATLASDB_URL=
REDIS_URL=
MAP_TOKEN=
SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

Start the application

```bash
npm start
```

Run tests

```bash
npm test
```

Run using Docker

```bash
docker compose up --build
```

---

# 📸 Screenshots

*(To be updated after final UI polish.)*

- Home Page
- Listing Details
- Booking Flow
- Search & Pagination
- Authentication
- Mobile View

---

# 💼 Engineering Concepts Demonstrated

- RESTful API Design
- MVC Architecture
- MongoDB Transactions
- Optimistic Concurrency Control
- Redis Cache-Aside Pattern
- MongoDB Text Indexing
- Server-side Pagination
- Session-based Authentication
- Authorization
- Cloud Storage Integration
- Docker Containerization
- GitHub Actions CI
- Automated Integration Testing
- Structured Logging
- Secure Backend Engineering

---

# 🚀 Future Improvements

- React Frontend (MERN Migration)
- Booking Cancellation
- User Booking Dashboard
- Host Dashboard
- Wishlist / Favorites
- Stripe / Razorpay Integration
- Calendar-based Booking UI
- Email Notifications
- Admin Dashboard
- End-to-End Testing (Playwright/Cypress)
- Swagger / OpenAPI Documentation
- Async Background Jobs (BullMQ)

---

# 👨‍💻 Author

**Chinmay Bhardwaj**

- GitHub: https://github.com/chinmaybhardwaj711
- LinkedIn: https://www.linkedin.com/in/chinmay-bhardwaj-0b9a36316/

---

# 📄 License

This project is developed for educational, portfolio, and learning purposes.
