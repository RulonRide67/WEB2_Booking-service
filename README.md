# Booking Service API

## Description

This is a RESTful API for a booking service built with Node.js, Express, and MongoDB. The application allows users to manage bookings and services. It includes a secure authentication system with Role-Based Access Control (RBAC), where only admin users can create, update, or delete data. Read operations are available to all users.

## Technologies Used

- Node.js
- Express.js
- MongoDB (local instance)
- Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT authorization)

## Project Structure

```
booking-api/
├── models/
│   ├── Booking.js
│   ├── Service.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── bookings.js
│   └── services.js
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   └── serviceController.js
├── middleware/
│   ├── auth.js
│   └── roleCheck.js
├── public/
│   └── index.html
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Steps

1. Clone the repository
```
git clone https://github.com/RulonRide67/WEB2_Assignment3.git
cd WEB2_Assignment3
```

2. Install dependencies
```
npm install
```

3. Create a .env file in the root directory
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookingDB
JWT_SECRET=my-super-secret-key-12345
```

4. Make sure MongoDB is running locally

5. Start the server
```
npm run dev
```

The server will run on http://localhost:3000

## Database Schema

### Booking

- customerName (String, required)
- serviceName (String, required, must be one of: Haircut, Massage, Consultation, Manicure, Training)
- bookingDate (Date, required)
- duration (Number, required, minimum 15)
- price (Number, required, minimum 0)
- status (String, default: pending, must be one of: pending, confirmed, cancelled)
- customerEmail (String, required)
- notes (String, optional)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-generated)

### Service

- name (String, required, unique)
- description (String, required)
- basePrice (Number, required, minimum 0)
- defaultDuration (Number, required)
- category (String, required)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-generated)

### User

- email (String, required, unique)
- password (String, required, minimum 6 characters, hashed with bcrypt before saving)
- role (String, must be one of: user, admin, default: user)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-generated)

## How Roles Work

The application uses two roles: user and admin.

- user: Can only read data (GET requests). Cannot create, update, or delete bookings or services.
- admin: Has full access. Can create, update, and delete bookings and services.

When a user registers, the default role is set to user. To create an admin account, the role field must be explicitly set to admin during registration.

When a user logs in, a JWT token is generated containing the user's ID and role. This token must be included in the Authorization header of every protected request. The middleware checks the token first, then verifies whether the user has the required role.

## API Routes

### Auth Routes

- POST /auth/register - Register a new user
- POST /auth/login - Login and receive a JWT token

### Bookings Routes

- GET /bookings - Get all bookings (public)
- GET /bookings/:id - Get a booking by ID (public)
- POST /bookings - Create a booking (admin only)
- PUT /bookings/:id - Update a booking (admin only)
- DELETE /bookings/:id - Delete a booking (admin only)

### Services Routes

- GET /services - Get all services (public)
- GET /services/:id - Get a service by ID (public)
- POST /services - Create a service (admin only)
- PUT /services/:id - Update a service (admin only)
- DELETE /services/:id - Delete a service (admin only)

## How to Test with Postman

### 1. Register an admin account

POST http://localhost:3000/auth/register

```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

### 2. Register a regular user account

POST http://localhost:3000/auth/register

```json
{
  "email": "user@test.com",
  "password": "user123"
}
```

### 3. Login as admin

POST http://localhost:3000/auth/login

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

Copy the token from the response.

### 4. Create a booking as admin

POST http://localhost:3000/bookings

Add the following header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Body:
```json
{
  "customerName": "John Doe",
  "serviceName": "Haircut",
  "bookingDate": "2026-03-25T14:00:00Z",
  "duration": 60,
  "price": 25,
  "customerEmail": "john@example.com"
}
```

Expected result: 201 Created

### 5. Try to create a booking as a regular user

Login as user@test.com, copy the token, and repeat the request above with the user token.

Expected result: 403 Forbidden

### 6. Try to create a booking without a token

Repeat the POST request without the Authorization header.

Expected result: 401 Unauthorized

### 7. Read bookings without a token

GET http://localhost:3000/bookings

No Authorization header needed.

Expected result: 200 OK

## Error Codes

- 200 OK - Successful GET, PUT, DELETE requests
- 201 Created - Successful POST requests
- 400 Bad Request - Validation errors or duplicate entries
- 401 Unauthorized - No token provided or invalid token
- 403 Forbidden - User does not have the required role
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server errors