# WEB2_Assignment3# Booking Service API

## Description

This is a RESTful API for a booking service that allows users to create, view, update, and delete bookings and services. The application uses Node.js, Express, and MongoDB for data persistence.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Steps

1. Clone the repository or download the project files

2. Navigate to the project directory
```
cd booking-api
```

3. Install dependencies
```
npm install
```

4. Create a .env file in the root directory with the following content
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookingDB
```

5. Start the server
```
npm run dev
```

The server will run on http://localhost:3000

## API Routes

### Test Routes

- GET / - Returns server status message
- GET /hello - Returns JSON greeting message
- GET /time - Returns current server time
- GET /status - Returns server and database status

### Bookings API

- POST /bookings - Create a new booking
- GET /bookings - Get all bookings
- GET /bookings/:id - Get a booking by ID
- PUT /bookings/:id - Update a booking by ID
- DELETE /bookings/:id - Delete a booking by ID

### Services API

- POST /services - Create a new service
- GET /services - Get all services
- GET /services/:id - Get a service by ID
- PUT /services/:id - Update a service by ID
- DELETE /services/:id - Delete a service by ID

## Database Schema

### Booking Schema

- customerName (String, required)
- serviceName (String, required, enum)
- bookingDate (Date, required)
- duration (Number, required, minimum 15)
- price (Number, required, minimum 0)
- status (String, enum, default: pending)
- customerEmail (String, required)
- notes (String, optional)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-generated)

### Service Schema

- name (String, required, unique)
- description (String, required)
- basePrice (Number, required, minimum 0)
- defaultDuration (Number, required)
- category (String, required)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-generated)

## Postman Testing Examples

### Create Booking (POST /bookings)

Request body:
```json
{
  "customerName": "John Doe",
  "serviceName": "Haircut",
  "bookingDate": "2026-01-25T14:00:00Z",
  "duration": 60,
  "price": 25,
  "customerEmail": "john@example.com",
  "notes": "First time customer"
}
```

[INSERT SCREENSHOT HERE - POST /bookings]

### Get All Bookings (GET /bookings)

[INSERT SCREENSHOT HERE - GET /bookings]

### Get Booking by ID (GET /bookings/:id)

[INSERT SCREENSHOT HERE - GET /bookings/:id]

### Update Booking (PUT /bookings/:id)

Request body:
```json
{
  "status": "confirmed",
  "price": 30
}
```

[INSERT SCREENSHOT HERE - PUT /bookings/:id]

### Delete Booking (DELETE /bookings/:id)

[INSERT SCREENSHOT HERE - DELETE /bookings/:id]

### Create Service (POST /services)

Request body:
```json
{
  "name": "Premium Haircut",
  "description": "Professional haircut with styling",
  "basePrice": 50,
  "defaultDuration": 90,
  "category": "Beauty"
}
```

[INSERT SCREENSHOT HERE - POST /services]

### Get All Services (GET /services)

[INSERT SCREENSHOT HERE - GET /services]

## Project Structure

```
booking-api/
├── models/
│   ├── Booking.js
│   └── Service.js
├── routes/
│   ├── bookings.js
│   └── services.js
├── public/
│   └── index.html
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## Front-End Interface

A simple HTML interface is available at http://localhost:3000 after starting the server. It allows users to create new bookings and view the list of all bookings.

## Error Handling

The API returns appropriate HTTP status codes:
- 200 OK - Successful GET, PUT, DELETE requests
- 201 Created - Successful POST requests
- 400 Bad Request - Validation errors
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server errors
