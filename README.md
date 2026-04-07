# 🏡 Airbnb Clone

A full-stack Airbnb-inspired web application that enables users to discover, list, and review rental properties. This project replicates core Airbnb functionalities while emphasizing scalable backend design, secure authentication, and cloud-based deployment.

🔗 **Live Demo:** https://major-project-1-s0d6.onrender.com

---

## 📌 Overview

This application allows users to:
- Browse property listings
- Create and manage listings
- Upload images to cloud storage
- Leave reviews and ratings
- Authenticate securely

The system is designed using RESTful architecture and follows MVC design principles.

---

## ⚙️ Tech Stack

### 🧠 Backend
- Node.js
- Express.js

### 🎨 Frontend
- EJS (Server-side rendering)
- HTML, CSS, JavaScript

### 🗄️ Database
- MongoDB Atlas (Cloud Database)

### ☁️ Cloud & Deployment
- Render (Backend Hosting)
- Cloudinary (Image Storage)

### 🔐 Authentication & Security
- Passport.js (Local Strategy)
- Express-session
- dotenv (Environment management)

---

## 🏗️ Architecture

- Follows MVC (Model-View-Controller) pattern
- RESTful API design
- Middleware-based request handling
- Separation of concerns for scalability

---

## ✨ Features

### 👤 Authentication
- User signup & login
- Session-based authentication
- Password hashing and secure storage

### 🏠 Listings
- Create, edit, delete property listings
- Upload multiple images via Cloudinary
- Location-based metadata

### ⭐ Reviews
- Add and delete reviews
- Rating system per listing

### 🔍 Search & UX
- Clean UI with responsive design
- Structured navigation for listings

---

## 📂 Project Structure

Airbnb-Clone/
│
├── controllers/     # Handles request logic and response flow
├── init/            # Initial data setup / database seeding
├── models/          # Mongoose schemas (User, Listing, Review, etc.)
├── routes/          # Express route definitions
├── utils/           # Utility/helper functions
├── public/          # Static assets (CSS, JS, images)
├── views/           # EJS templates (UI rendering)
│
├── app.js           # Main server entry point
├── middleware.js    # Custom middleware (auth, error handling)
├── cloudconfig.js   # Cloudinary configuration
├── schema.js        # Joi validation schemas
│
├── package.json     # Project dependencies and scripts
├── package-lock.json
├── .gitignore
