# 🏡 StayForge — Property Rental & Booking Platform

StayForge is a production-oriented property rental and booking platform built with **Node.js, Express.js, MongoDB Atlas**, and a server-rendered **EJS** frontend. The project demonstrates scalable backend engineering through transaction-safe booking workflows, optimistic concurrency control, Redis cache-aside caching, MongoDB text-indexed search, automated testing, Docker containerization, and CI/CD using GitHub Actions.

🔗 **Live Demo:** https://major-project-1-s0d6.onrender.com

---

# 🚀 Features

## 👤 Authentication & Authorization

- User registration & login using Passport.js (Local Strategy)
- Secure session-based authentication with MongoDB-backed session storage
- Ownership-based authorization for listings and reviews
- Protected server routes using custom middleware
- Flash messages for authentication and CRUD operations

---

## 🏡 Property Listings

- Create, edit and delete rental property listings
- Upload property images to Cloudinary
- MongoDB full-text search using text indexes
- Category-based property filtering
- Pagination for scalable listing retrieval
- Interactive property maps using Mapbox

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
- Unit-tested overlap detection logic
- Transaction-safe booking creation using MongoDB Transactions
- Optimistic concurrency control preventing double booking
- Automatic booking price calculation
- Displays unavailable booking dates

---

## ⚡ Performance Optimizations

- Redis Cache-Aside Pattern
- Automatic cache invalidation after CRUD operations
- MongoDB text indexing
- Pagination
- HTTP Response Compression
- Structured Request Logging (Pino)
- Graceful fallback to MongoDB if Redis becomes unavailable

---

## 🔒 Security

- Helmet Security Headers
- Express Rate Limiting
- Joi Request Validation
- Secure Session Storage
- Environment Variable Management using dotenv

---

## 🧪 Testing

- Jest Unit Tests
- Booking overlap edge-case testing
- Back-to-back booking validation
- Supertest integration tests *(Planned)*

---

## 🐳 DevOps

- Dockerized application
- Docker Compose
- GitHub Actions Continuous Integration
- Deployment on Render
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
- Cloud-based Image Storage
- Managed Cloud Database

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM

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
- Supertest *(Planned)*

## Observability

- Pino (Structured Logging)

---

# 📊 Performance Benchmarks

Load tested using **Artillery**, ramping concurrent requests against the Listings endpoint.

| Metric | Baseline | Indexed + Pagination | + Redis Cache |
|---------|----------|----------------------|---------------|
| Requests | 300 | 600 | **To be updated** |
| Median | 47 ms | 96.6 ms | **To be updated** |
| Average | 119.7 ms | 190 ms | **To be updated** |
| p95 | 742.6 ms | 963 ms | **To be updated** |
| p99 | 1224.4 ms | 1525 ms | **To be updated** |
| Errors | 0 | 0 | **To be updated** |

> **Note:** The latency regression after introducing indexing and pagination was investigated using MongoDB Atlas Explain Plan. The query correctly used **IXSCAN** instead of **COLLSCAN**. The increased latency was attributed to Atlas's shared **M0 free-tier cluster**, not the application logic.

---

# 🧠 Engineering Decisions

This project intentionally prioritizes backend correctness over unnecessary complexity.

### Why Redis instead of Kafka/RabbitMQ?

The application has no event-streaming or multi-consumer requirements. Introducing a message broker would increase operational complexity without solving an actual problem.

---

### Why EJS instead of React?

The focus of this version was backend engineering:

- Transactions
- Redis Caching
- Database Indexing
- Authentication
- Deployment
- CI/CD

A React frontend is planned as a future enhancement without changing the backend architecture.

---

### Why Optimistic Concurrency?

A simple "check availability → create booking" workflow is vulnerable to race conditions.

StayForge solves this by forcing concurrent transactions to update the shared Listing document, allowing MongoDB to detect conflicts and automatically serialize concurrent booking attempts.

---

### Why MongoDB Transactions?

Booking creation spans multiple documents and must remain consistent under concurrent requests.

MongoDB Transactions guarantee atomicity.

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
├── benchmark/
├── .github/
│   └── workflows/
│
├── Dockerfile
├── docker-compose.yml
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/chinmaybhardwaj711/Rental-Property-Listing-Platform.git
cd Rental-Property-Listing-Platform
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

Run locally

```bash
node app.js
```

Run tests

```bash
npm test
```

Run with Docker

```bash
docker compose up --build
```

---

# 📸 Screenshots

> *(Screenshots will be added after the final frontend polish.)*

- Home Page
- Listing Details
- Booking System
- Search
- Authentication

---

# 💼 Engineering Concepts Demonstrated

- RESTful API Design
- MVC Architecture
- MongoDB Transactions
- Optimistic Concurrency Control
- Redis Cache-Aside Pattern
- MongoDB Text Indexing
- Session-based Authentication
- Cloud Storage Integration
- Docker Containerization
- Continuous Integration (GitHub Actions)
- Automated Unit Testing
- Structured Logging
- Pagination
- Secure Authentication & Authorization

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
- Supertest Integration Tests
- API Documentation (Swagger/OpenAPI)
- Async Background Jobs using BullMQ

---

# 👨‍💻 Author

**Chinmay Bhardwaj**

- GitHub: https://github.com/chinmaybhardwaj711
- LinkedIn: *(Add your LinkedIn profile here)*

---

## 📄 License

This project is developed for educational, portfolio, and learning purposes.
