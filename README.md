# 🏡 StayForge — Property Rental & Booking Platform


StayForge is a production-oriented property rental and booking platform built with Node.js, Express.js, MongoDB Atlas, and an EJS frontend. It showcases transaction-safe booking, optimistic concurrency control, Redis cache-aside caching, MongoDB text-indexed search, Docker, CI/CD, and automated testing.

Live Demo: https://major-project-1-s0d6.onrender.com

🚀 Features

Authentication

Passport.js Local Authentication

Session-based login

MongoDB session store

Protected routes

Ownership authorization

Property Listings

CRUD listings

Cloudinary uploads

Full-text search

Category filters

Pagination

Mapbox integration

Booking

Date-range booking

Availability validation

MongoDB Transactions

Optimistic concurrency control

Double-booking prevention

Price calculation

Reviews

Ratings

Add/Delete reviews

Ownership checks

Performance

Redis Cache-Aside

Cache invalidation

MongoDB indexing

Compression

Pino logging

Security

Helmet

Joi Validation

Express Rate Limiting

dotenv

Testing

Jest

Supertest

MongoDB Memory Server

Auth & Listing Integration Tests

Booking Validation Tests

DevOps

Docker

Docker Compose

GitHub Actions

Render

MongoDB Atlas

Upstash Redis

📊 Performance Benchmarks

Metric

Baseline

Indexed + Pagination

Redis Cache

Requests

300

600

4500

Median

47 ms

96.6 ms

77.5 ms

Average

119.7 ms

190 ms

124.6 ms

p95

742.6 ms

963 ms

333.7 ms

p99

1224.4 ms

1525 ms

1408.4 ms

Errors

0

0

0

See BENCHMARKS.md for detailed results.

🛠 Tech Stack

Backend: Node.js, Express.js, MongoDB Atlas, Mongoose

Frontend: EJS, Bootstrap 5, HTML, CSS, JavaScript

Caching: Redis (Upstash), ioredis

Security: Passport.js, Helmet, Joi, express-session, connect-mongo

Cloud: Cloudinary, Mapbox

DevOps: Docker, Docker Compose, GitHub Actions, Render

Testing: Jest, Supertest, MongoDB Memory Server

⚙️ Installation

git clone https://github.com/chinmaybhardwaj711/Property-Rental-Booking-Platform.git
cd Property-Rental-Booking-Platform
npm install

Create a .env file:

ATLASDB_URL=
REDIS_URL=
MAP_TOKEN=
SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

Run:

npm start

Tests:

npm test

Docker:

docker compose up --build

📂 Project Structure

StayForge/
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── tests/
├── utils/
├── views/
├── .github/workflows/
├── BENCHMARKS.md
├── README.md
├── Dockerfile
├── docker-compose.yml
├── app.js
├── server.js
└── package.json

🚀 Future Improvements

React Frontend

Booking Dashboard

Host Dashboard

Stripe/Razorpay

Email Notifications

Swagger/OpenAPI

Playwright/Cypress

👨‍💻 Author

Chinmay Bhardwaj

GitHub: https://github.com/chinmaybhardwaj711

LinkedIn: https://www.linkedin.com/in/chinmay-bhardwaj-0b9a36316/

📄 License

Educational and portfolio purposes.
