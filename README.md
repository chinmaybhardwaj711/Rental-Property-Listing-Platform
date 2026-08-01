# 🏡 StayForge – Full Stack Property Rental Platform

StayForge is a production-oriented Airbnb-inspired property rental platform built with the MERN ecosystem. It enables users to discover, list, review, and book rental properties while demonstrating scalable backend architecture, caching, transaction-safe booking workflows, automated testing, containerization, and CI/CD.

🔗 **Live Demo:** https://major-project-1-s0d6.onrender.com

---

# 🚀 Features

## 👤 Authentication & Authorization

- User Registration & Login
- Secure session-based authentication using Passport.js
- Role-based authorization
- Protected routes
- Flash messages

---

## 🏡 Property Listings

- Create, Edit and Delete listings
- Search listings
- Category filtering
- Pagination
- Image uploads via Cloudinary
- Interactive location maps using Mapbox

---

## ⭐ Reviews

- Add Reviews
- Delete Reviews
- Rating system
- Review ownership validation

---

## 📅 Booking Engine

- Book available properties
- Booking availability validation
- Date overlap detection
- Transaction-safe booking creation
- Optimistic concurrency control
- Display unavailable booking dates

---

## ⚡ Performance Optimizations

- Redis cache for listing pages
- Redis cache for individual listings
- Automatic cache invalidation
- HTTP compression
- Request logging using Pino

---

## 🔒 Security

- Helmet security headers
- Session management
- Joi input validation
- Protected API routes
- Environment variable management using dotenv

---

## 🧪 Testing

- Unit testing with Jest
- Booking overlap validation tests
- Edge-case testing for booking logic

---

## 🐳 DevOps

- Dockerized application
- Docker Compose configuration
- GitHub Actions CI pipeline
- MongoDB Atlas integration
- Upstash Redis integration

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- Passport.js
- Joi

## Frontend

- EJS
- Bootstrap 5
- HTML
- CSS
- JavaScript

## Cloud Services

- MongoDB Atlas
- Cloudinary
- Mapbox
- Upstash Redis

## DevOps

- Docker
- Docker Compose
- GitHub Actions

## Testing

- Jest

---

# 🏗 Architecture

The application follows the MVC (Model-View-Controller) architecture.

```
Client
      │
      ▼
Express Routes
      │
      ▼
Controllers
      │
      ▼
Business Logic
      │
      ▼
MongoDB Atlas
      │
Redis Cache
```

---

# 📂 Project Structure

```
StayForge/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── middleware/
├── utils/
│
├── tests/
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
git clone https://github.com/chinmaybhardwaj711/MAJOR-PROJECT.git
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
npm start
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

# 📊 Key Engineering Highlights

- RESTful API architecture
- MVC design pattern
- Redis Cache-Aside strategy
- Automatic cache invalidation
- MongoDB ACID transactions
- Optimistic concurrency control for bookings
- Secure authentication using Passport.js
- Cloud image storage with Cloudinary
- Interactive maps with Mapbox
- Docker containerization
- GitHub Actions CI/CD
- Unit testing with Jest

---

# 📈 Future Improvements

- Flatpickr calendar with disabled booked dates
- Booking cancellation
- User booking dashboard
- Owner booking management
- Payment gateway integration (Stripe/Razorpay)
- Admin dashboard
- API documentation using Swagger
- Integration testing with Supertest

---

# 👨‍💻 Author

**Chinmay Bhardwaj**

GitHub: https://github.com/chinmaybhardwaj711
