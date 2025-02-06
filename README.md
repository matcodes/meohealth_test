# Prime Number Checker API

A robust and efficient REST API built with TypeScript and Express.js for checking whether a number is prime. This service implements the Miller-Rabin probabilistic primality test algorithm to handle extremely large numbers efficiently.

## Features

### Advanced Prime Number Detection
- Implements the Miller-Rabin probabilistic primality test algorithm
- Efficiently handles massive numbers (using BigInt)
- Provides highly accurate results for large prime number verification

### Robust Architecture
- Built with TypeScript for type safety and better developer experience
- Modular code structure with clear separation of concerns
- Centralized error handling with consistent error responses
- Standardized API response format for consistency

### Security Features
- Rate limiting to prevent abuse (100 requests per 15 minutes per IP)
- Security headers implementation using Helmet
- Input validation and sanitization
- Error handling that doesn't expose sensitive information

## API Endpoints

### Check Prime Number
```
GET /api/is-prime?number={number}
```

#### Request
- Query Parameter: `number` (required) - The number to check for primality

#### Success Response
```json
{
  "data": {
    "type": "prime-check",
    "id": "123",
    "attributes": {
      "result": true
    }
  },
  "meta": {
    "timestamp": "2023-11-21T12:00:00Z",
    "requestId": "abc-123",
    "path": "/api/is-prime"
  }
}
```

#### Error Response
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "title": "Invalid input parameter",
    "details": [...]
  },
  "meta": {
    "timestamp": "2023-11-21T12:00:00Z",
    "requestId": "abc-123",
    "path": "/api/is-prime"
  }
}
```

## Technical Implementation

### Miller-Rabin Primality Test
The API uses the Miller-Rabin probabilistic primality test algorithm, which is:
- Extremely fast compared to deterministic methods
- Capable of handling very large numbers efficiently
- Provides a definitive "composite" result when a number is not prime
- Has an extremely high probability of correctness for "probably prime" results

### Error Handling
- Centralized error handling middleware
- Consistent error response structure
- Different error types with appropriate HTTP status codes
- Validation errors with detailed feedback

### Rate Limiting
- Implements Express Rate Limit
- 100 requests per 15 minutes per IP
- Helps prevent DoS attacks and abuse

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd meohealth_test
```

2. Install dependencies
```bash
npm install
```

### Development
Run the development server with hot-reload:
```bash
npm run dev
```

### Building for Production
Compile TypeScript to JavaScript:
```bash
npm run build
```

### Running in Production
Start the production server:
```bash
npm start
```

### Testing the API
Test the endpoint using curl:
```bash
curl "http://localhost:3000/api/is-prime?number=17"
```

Or using your preferred API client (like Postman):
```
GET http://localhost:3000/api/is-prime?number=17
```

## Error Codes
- `INVALID_INPUT`: Invalid or missing input parameters
- `RATE_LIMIT_EXCEEDED`: Too many requests from the same IP
- `INTERNAL_SERVER_ERROR`: Unexpected server error

## Development

### Project Structure
```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── interfaces/     # TypeScript interfaces
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── index.ts        # Application entry point
```