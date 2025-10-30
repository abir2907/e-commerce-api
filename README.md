# E-Commerce API

A full-featured RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. Supports user authentication, product management, reviews, and order processing.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/abir2907/e-commerce-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](package.json)
[![MongoDB](https://img.shields.io/badge/mongodb-8.19.1-green)](package.json)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Key Endpoints](#key-endpoints)
  - [Auth](#auth-endpoints)
  - [Users](#user-endpoints)
  - [Products](#product-endpoints)
  - [Reviews](#review-endpoints)
  - [Orders](#order-endpoints)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Security](#security)
- [Docker](#docker)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- 🔐 **JWT Authentication** with secure HTTP-only cookies
- 👥 **User Management** with role-based access control (admin/user)
- 🛍️ **Product CRUD** with image upload support
- ⭐ **Review System** with ratings and comments
- 🛒 **Order Management** with payment intent simulation
- 🔒 **Security** features: helmet, rate limiting, XSS protection, MongoDB sanitization
- 📄 **API Documentation** with interactive interface
- 🚀 **Production-ready** with error handling and validation

---

## Tech Stack

- **Runtime:** Node.js 20.x
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, CORS, XSS-Clean, Express Rate Limit, Express Mongo Sanitize
- **File Upload:** Express File Upload
- **Validation:** Joi
- **Password Hashing:** bcryptjs

---

## Demo

🔗 **Live API:** [https://e-commerce-api-indol-pi.vercel.app](https://e-commerce-api-indol-pi.vercel.app)  
📖 **API Documentation:** [https://e-commerce-api-indol-pi.vercel.app](https://e-commerce-api-indol-pi.vercel.app)

---

## Prerequisites

- **Node.js** >= 20.0.0
- **MongoDB** instance (local or cloud)
- **npm** or **yarn** package manager

---

## Installation

1. **Clone the repository:**

```bash
   git clone git@github.com:abir2907/e-commerce-api.git
   cd e-commerce-api
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Set up environment variables:**

```bash
   cp .env.example .env
   # Edit .env with your configuration
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
MONGO_URL=mongodb://localhost:27017/e-commerce-api
# Or use MongoDB Atlas:
# MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/e-commerce?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_LIFETIME=30d

# Cookie
COOKIE_SECRET=your_cookie_secret_key_here
```

⚠️ **Important:** Never commit `.env` file to version control. Use strong, randomly generated secrets in production.

---

## Running the Application

### Development Mode

```bash
npm start
```

Server runs at `http://localhost:3000` with auto-reload via nodemon.

### Production Mode

```bash
NODE_ENV=production node app.js
```

---

## API Documentation

The API documentation is available at the root endpoint when the server is running:

🔗 **Local:** [http://localhost:3000](http://localhost:3000)  
🔗 **Production:** [https://e-commerce-api-indol-pi.vercel.app](https://e-commerce-api-indol-pi.vercel.app)

The documentation provides:

- Complete endpoint reference
- Request/response examples
- Authentication requirements
- Interactive testing interface

---

## Authentication

This API uses **JWT tokens** stored in **HTTP-only signed cookies** for authentication.

### Obtaining a Token

**1. Register a new user:**

```bash
curl -X POST https://e-commerce-api-indol-pi.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123"
  }'
```

**2. Login:**

```bash
curl -X POST https://e-commerce-api-indol-pi.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

**Response:**

```json
{
  "user": {
    "name": "John Doe",
    "userId": "68f34a1eae9576f644d10841",
    "role": "user"
  }
}
```

The JWT token is automatically stored in an HTTP-only cookie. Include `-b cookies.txt` in subsequent requests.

### Using the Token

```bash
curl -X GET https://e-commerce-api-indol-pi.vercel.app/api/v1/users/showMe \
  -b cookies.txt
```

---

## Key Endpoints

### Auth Endpoints

#### Register User

```bash
POST /api/v1/auth/register
```

**Request:**

```json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "password": "mypassword123"
}
```

**Response (201):**

```json
{
  "user": {
    "name": "Alice Smith",
    "userId": "68f34a1eae9576f644d10841",
    "role": "user"
  }
}
```

---

#### Login

```bash
POST /api/v1/auth/login
```

**Request:**

```json
{
  "email": "alice@example.com",
  "password": "mypassword123"
}
```

**Response (200):**

```json
{
  "user": {
    "name": "Alice Smith",
    "userId": "68f34a1eae9576f644d10841",
    "role": "user"
  }
}
```

---

#### Logout

```bash
GET /api/v1/auth/logout
```

**Response (200):**

```json
{
  "msg": "user logged out"
}
```

---

### User Endpoints

#### Get All Users (Admin Only)

```bash
GET /api/v1/users
```

**Authentication:** Required (Admin)

**Response (200):**

```json
{
  "users": [
    {
      "_id": "68f34a1eae9576f644d10841",
      "name": "Alice Smith",
      "email": "alice@example.com",
      "role": "user"
    }
  ]
}
```

---

#### Show Current User

```bash
GET /api/v1/users/showMe
```

**Authentication:** Required

**Response (200):**

```json
{
  "user": {
    "name": "Alice Smith",
    "userId": "68f34a1eae9576f644d10841",
    "role": "user"
  }
}
```

---

#### Update User

```bash
PATCH /api/v1/users/updateUser
```

**Authentication:** Required

**Request:**

```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com"
}
```

**Response (200):**

```json
{
  "user": {
    "name": "Alice Johnson",
    "userId": "68f34a1eae9576f644d10841",
    "role": "user"
  }
}
```

---

#### Update User Password

```bash
PATCH /api/v1/users/updateUserPassword
```

**Authentication:** Required

**Request:**

```json
{
  "oldPassword": "mypassword123",
  "newPassword": "newSecurePass456"
}
```

**Response (200):**

```json
{
  "msg": "Success! Password Updated"
}
```

---

### Product Endpoints

#### Get All Products

```bash
GET /api/v1/products
```

**Authentication:** Not required

**Response (200):**

```json
{
  "products": [
    {
      "_id": "68f4ef86154b0801d781c0e2",
      "name": "Modern Office Chair",
      "price": 15999,
      "description": "Ergonomic office chair with lumbar support",
      "image": "https://example.com/images/chair.jpg",
      "category": "office",
      "company": "ikea",
      "colors": ["#000000", "#ffffff"],
      "featured": true,
      "freeShipping": false,
      "inventory": 25,
      "averageRating": 4,
      "numOfReviews": 12,
      "user": "68f34a1eae9576f644d10841",
      "createdAt": "2025-10-21T10:30:00.000Z",
      "updatedAt": "2025-10-22T02:14:53.000Z"
    }
  ],
  "count": 1
}
```

---

#### Get Single Product

```bash
GET /api/v1/products/:id
```

**Authentication:** Not required

**Example:**

```bash
curl https://e-commerce-api-indol-pi.vercel.app/api/v1/products/68f4ef86154b0801d781c0e2
```

**Response (200):**

```json
{
  "product": {
    "_id": "68f4ef86154b0801d781c0e2",
    "name": "Modern Office Chair",
    "price": 15999,
    "description": "Ergonomic office chair with lumbar support",
    "image": "https://example.com/images/chair.jpg",
    "category": "office",
    "company": "ikea",
    "colors": ["#000000", "#ffffff"],
    "reviews": [
      {
        "_id": "68f538b68b14b1b68034bc91",
        "rating": 5,
        "title": "Great chair!",
        "comment": "Very comfortable for long work hours"
      }
    ]
  }
}
```

---

#### Create Product (Admin Only)

```bash
POST /api/v1/products
```

**Authentication:** Required (Admin)

**Request:**

```json
{
  "name": "Wooden Desk",
  "price": 29999,
  "image": "https://example.com/images/desk.jpg",
  "colors": ["#8B4513", "#D2691E"],
  "company": "marcos",
  "description": "Solid oak desk with spacious workspace",
  "category": "office"
}
```

**Response (201):**

```json
{
  "product": {
    "_id": "68f4fad5f3541f9e1d6e5136",
    "name": "Wooden Desk",
    "price": 29999,
    "description": "Solid oak desk with spacious workspace",
    "image": "https://example.com/images/desk.jpg",
    "category": "office",
    "company": "marcos",
    "colors": ["#8B4513", "#D2691E"],
    "featured": false,
    "freeShipping": false,
    "inventory": 15,
    "averageRating": 0,
    "numOfReviews": 0,
    "user": "68f34a1eae9576f644d10841",
    "createdAt": "2025-10-22T02:14:53.000Z",
    "updatedAt": "2025-10-22T02:14:53.000Z"
  }
}
```

---

#### Update Product (Admin Only)

```bash
PATCH /api/v1/products/:id
```

**Authentication:** Required (Admin)

**Request:**

```json
{
  "price": 24999,
  "featured": true
}
```

**Response (200):**

```json
{
  "product": {
    "_id": "68f4fad5f3541f9e1d6e5136",
    "name": "Wooden Desk",
    "price": 24999,
    "featured": true
  }
}
```

---

#### Delete Product (Admin Only)

```bash
DELETE /api/v1/products/:id
```

**Authentication:** Required (Admin)

**Response (200):**

```json
{
  "msg": "Success! Product removed."
}
```

---

#### Upload Product Image (Admin Only)

```bash
POST /api/v1/products/uploadImage
```

**Authentication:** Required (Admin)

**Request:** Multipart form data with `image` field

```bash
curl -X POST https://e-commerce-api-indol-pi.vercel.app/api/v1/products/uploadImage \
  -b cookies.txt \
  -F "image=@/path/to/image.jpg"
```

**Response (200):**

```json
{
  "image": "/uploads/image-1234567890.jpg"
}
```

---

### Review Endpoints

#### Get All Reviews

```bash
GET /api/v1/reviews
```

**Authentication:** Not required

**Response (200):**

```json
{
  "reviews": [
    {
      "_id": "68f538b68b14b1b68034bc91",
      "rating": 5,
      "title": "Excellent product",
      "comment": "Exactly as described. Very happy!",
      "user": "68f34a1eae9576f644d10841",
      "product": {
        "_id": "68f4ef86154b0801d781c0e2",
        "name": "Modern Office Chair",
        "company": "ikea",
        "price": 15999
      },
      "createdAt": "2025-10-21T15:20:30.000Z"
    }
  ],
  "count": 1
}
```

---

#### Create Review

```bash
POST /api/v1/reviews
```

**Authentication:** Required

**Request:**

```json
{
  "product": "68f4ef86154b0801d781c0e2",
  "rating": 4,
  "title": "Good quality",
  "comment": "Solid product, would recommend"
}
```

**Response (201):**

```json
{
  "review": {
    "_id": "68f63a14d71d768a45c8fa45",
    "rating": 4,
    "title": "Good quality",
    "comment": "Solid product, would recommend",
    "user": "68f34a1eae9576f644d10841",
    "product": "68f4ef86154b0801d781c0e2",
    "createdAt": "2025-10-22T02:14:53.000Z"
  }
}
```

---

#### Update Review

```bash
PATCH /api/v1/reviews/:id
```

**Authentication:** Required (Own review only)

**Request:**

```json
{
  "rating": 5,
  "title": "Excellent product",
  "comment": "Changed my mind - it's perfect!"
}
```

**Response (200):**

```json
{
  "review": {
    "_id": "68f63a14d71d768a45c8fa45",
    "rating": 5,
    "title": "Excellent product",
    "comment": "Changed my mind - it's perfect!"
  }
}
```

---

#### Delete Review

```bash
DELETE /api/v1/reviews/:id
```

**Authentication:** Required (Own review only)

**Response (200):**

```json
{
  "msg": "Review deleted successfully!"
}
```

---

### Order Endpoints

#### Create Order

```bash
POST /api/v1/orders
```

**Authentication:** Required

**Request:**

```json
{
  "tax": 499,
  "shippingFee": 799,
  "items": [
    {
      "name": "Modern Office Chair",
      "price": 15999,
      "image": "https://example.com/images/chair.jpg",
      "amount": 2,
      "product": "68f4ef86154b0801d781c0e2"
    },
    {
      "name": "Wooden Desk",
      "price": 24999,
      "image": "https://example.com/images/desk.jpg",
      "amount": 1,
      "product": "68f4fad5f3541f9e1d6e5136"
    }
  ]
}
```

**Response (201):**

```json
{
  "order": {
    "_id": "68f6a421b89c234d56e78f90",
    "tax": 499,
    "shippingFee": 799,
    "subtotal": 56997,
    "total": 58295,
    "orderItems": [
      {
        "name": "Modern Office Chair",
        "price": 15999,
        "image": "https://example.com/images/chair.jpg",
        "amount": 2,
        "product": "68f4ef86154b0801d781c0e2"
      },
      {
        "name": "Wooden Desk",
        "price": 24999,
        "image": "https://example.com/images/desk.jpg",
        "amount": 1,
        "product": "68f4fad5f3541f9e1d6e5136"
      }
    ],
    "status": "pending",
    "user": "68f34a1eae9576f644d10841",
    "clientSecret": "someRandomValue",
    "createdAt": "2025-10-22T02:14:53.000Z"
  },
  "clientSecret": "someRandomValue"
}
```

---

#### Get All Orders (Admin Only)

```bash
GET /api/v1/orders
```

**Authentication:** Required (Admin)

**Response (200):**

```json
{
  "orders": [
    {
      "_id": "68f6a421b89c234d56e78f90",
      "tax": 499,
      "shippingFee": 799,
      "subtotal": 56997,
      "total": 58295,
      "status": "pending",
      "user": "68f34a1eae9576f644d10841"
    }
  ],
  "count": 1
}
```

---

#### Get Current User Orders

```bash
GET /api/v1/orders/showAllMyOrders
```

**Authentication:** Required

**Response (200):**

```json
{
  "orders": [
    {
      "_id": "68f6a421b89c234d56e78f90",
      "tax": 499,
      "shippingFee": 799,
      "subtotal": 56997,
      "total": 58295,
      "status": "pending",
      "orderItems": [
        {
          "name": "Modern Office Chair",
          "price": 15999,
          "amount": 2
        }
      ]
    }
  ],
  "count": 1
}
```

---

#### Get Single Order

```bash
GET /api/v1/orders/:id
```

**Authentication:** Required (Own order or Admin)

**Response (200):**

```json
{
  "order": {
    "_id": "68f6a421b89c234d56e78f90",
    "tax": 499,
    "shippingFee": 799,
    "subtotal": 56997,
    "total": 58295,
    "status": "pending",
    "user": "68f34a1eae9576f644d10841",
    "orderItems": [
      {
        "name": "Modern Office Chair",
        "price": 15999,
        "image": "https://example.com/images/chair.jpg",
        "amount": 2,
        "product": "68f4ef86154b0801d781c0e2"
      }
    ],
    "createdAt": "2025-10-22T02:14:53.000Z"
  }
}
```

---

#### Update Order

```bash
PATCH /api/v1/orders/:id
```

**Authentication:** Required (Own order or Admin)

**Request:**

```json
{
  "paymentIntentId": "pi_abc123xyz456"
}
```

**Response (200):**

```json
{
  "order": {
    "_id": "68f6a421b89c234d56e78f90",
    "status": "paid",
    "paymentIntentId": "pi_abc123xyz456"
  }
}
```

---

## Error Handling

All errors follow a consistent format:

**Example Error Response (400):**

```json
{
  "msg": "Please provide email and password"
}
```

**Example Error Response (401):**

```json
{
  "msg": "Authentication Invalid"
}
```

**Example Error Response (404):**

```json
{
  "msg": "No product with id: 68f4ef86154b0801d781c0e2"
}
```

**Common Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthenticated
- `403` - Unauthorized/Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

_Note: Test suite to be implemented._

---

## Security

This API implements multiple security measures:

- ✅ **Rate Limiting:** Max 100 requests per 15 minutes per IP
- ✅ **Helmet:** Sets secure HTTP headers
- ✅ **CORS:** Controlled cross-origin resource sharing
- ✅ **XSS Protection:** Sanitizes user input
- ✅ **NoSQL Injection Prevention:** MongoDB sanitization
- ✅ **HTTP-Only Cookies:** JWT stored securely
- ✅ **Password Hashing:** bcrypt with salt rounds

**Best Practices:**

- Always use HTTPS in production
- Never commit `.env` files
- Rotate JWT secrets regularly
- Implement additional validation for sensitive operations
- Monitor rate limit violations

---

## Docker

### Build Docker Image

```bash
docker build -t e-commerce-api .
```

### Run with Docker

```bash
docker run -p 3000:3000 --env-file .env e-commerce-api
```

### Docker Compose

```bash
docker-compose up
```

_Note: Dockerfile to be created._

---

## Deployment

### Vercel Deployment

1. Install Vercel CLI:

```bash
   npm i -g vercel
```

2. Deploy:

```bash
   vercel --prod
```

3. Set environment variables in Vercel dashboard

### Heroku Deployment

1. Create Heroku app:

```bash
   heroku create your-app-name
```

2. Set environment variables:

```bash
   heroku config:set MONGO_URL=<your_mongo_url>
   heroku config:set JWT_SECRET=<your_jwt_secret>
```

3. Deploy:

```bash
   git push heroku main
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. Create a **feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] No console.log statements in production code
- [ ] All tests pass (when implemented)

---

## Contact

**Maintainer:** Abir Chodha  
**Email:** abirchodha1@gmail.com  
**GitHub:** [@abir2907](https://github.com/abir2907)  
**Issues:** [Report a bug](https://github.com/abir2907/e-commerce-api/issues)

---

**If you find any errors or want features added, open an issue or PR!** ⭐

---
