# Prep-Intel Backend Setup Guide

## Overview
Prep-Intel is a Node.js + Express backend for an educational platform that provides topic recommendations, progress tracking, and PYQ management for exam preparation.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Postman (for API testing)

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
- Copy the example environment file:
```bash
cp .env.example .env
```

- Edit `.env` and add your actual values:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### 3. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string from Atlas dashboard
3. Replace `<username>`, `<password>`, and `<database>` in the URI
4. Update `MONGO_URI` in your `.env` file

### 4. Start the Server
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Testing with Postman

### Import Collection
Use the following endpoints for testing:

#### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login and get JWT token

#### Data Retrieval
- **GET** `/api/topics` - Get all topics
- **GET** `/api/pyqs` - Get all PYQs
- **GET** `/api/recommendations` - Get topic recommendations

#### Mappings
- **POST** `/api/mappings` - Create topic-PYQ mapping
- **GET** `/api/mappings/topic/:topicId` - Get PYQs for topic
- **GET** `/api/mappings/pyq/:pyqId` - Get topics for PYQ

#### Progress Tracking
- **POST** `/api/progress` - Update user progress (requires auth)
- **GET** `/api/progress/:userId` - Get user progress (requires auth)

### Authentication Headers
For protected endpoints, add header:
```
Authorization: Bearer <your_jwt_token>
```

## Sample Data
Make sure to insert sample topics and PYQs into your MongoDB database for testing.

## Troubleshooting
- **Server won't start**: Check if PORT 5000 is available
- **Database connection failed**: Verify MONGO_URI in .env
- **Authentication errors**: Check JWT_SECRET and token format

## Project Structure
```
backend/
├── controllers/     # Route handlers
├── models/         # Mongoose schemas
├── routes/         # Express routes
├── services/       # Business logic services
├── middleware/     # Custom middleware
├── config/         # Database configuration
├── API_DOC.md      # API documentation
├── SETUP.md        # This file
└── server.js       # Main application file
```

## Next Steps
1. Test all endpoints with Postman
2. Add sample data to MongoDB
3. Verify authentication flow
4. Check recommendation algorithm
5. Test progress tracking features

For detailed API documentation, see `API_DOC.md`.