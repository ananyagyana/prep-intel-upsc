# Prep-Intel Backend API Documentation

## Overview
Prep-Intel is a Node.js + Express backend for an educational platform that helps students prepare for exams through topic recommendations, progress tracking, and PYQ (Previous Year Questions) management.

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication APIs

### POST /api/auth/register
Register a new user account.

**Auth Required:** No

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /api/auth/login
Authenticate user and get JWT token.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "jwt_token_here"
  }
}
```

---

## Data Retrieval APIs

### GET /api/topics
Retrieve all available topics.

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "topic_id",
      "subject": "Mathematics",
      "topicName": "Calculus",
      "priorityScore": 95,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### GET /api/pyqs
Retrieve all PYQ (Previous Year Questions).

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "pyq_id",
      "questionText": "What is the derivative of x^2?",
      "year": 2023,
      "subject": "Mathematics",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### GET /api/recommendations
Get personalized topic recommendations sorted by priority.

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "message": "Recommendations retrieved successfully",
  "data": [
    {
      "_id": "topic_id",
      "subject": "Mathematics",
      "topicName": "Calculus",
      "priorityScore": 95,
      "confidence": 0.8
    }
  ],
  "count": 1
}
```

---

## Mapping APIs

### POST /api/mappings
Create a mapping between a topic and a PYQ.

**Auth Required:** No

**Request Body:**
```json
{
  "topicId": "topic_id_here",
  "pyqId": "pyq_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mapping created successfully",
  "data": {
    "_id": "mapping_id",
    "topicId": {
      "_id": "topic_id",
      "subject": "Mathematics",
      "topicName": "Calculus"
    },
    "pyqId": {
      "_id": "pyq_id",
      "questionText": "What is the derivative of x^2?",
      "year": 2023,
      "subject": "Mathematics"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/mappings/topic/:topicId
Get all PYQs mapped to a specific topic.

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "mapping_id",
      "topicId": "topic_id",
      "pyqId": {
        "_id": "pyq_id",
        "questionText": "What is the derivative of x^2?",
        "year": 2023,
        "subject": "Mathematics"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1,
  "topic": {
    "id": "topic_id",
    "subject": "Mathematics",
    "topicName": "Calculus"
  }
}
```

### GET /api/mappings/pyq/:pyqId
Get all topics mapped to a specific PYQ.

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "mapping_id",
      "topicId": {
        "_id": "topic_id",
        "subject": "Mathematics",
        "topicName": "Calculus",
        "priorityScore": 95
      },
      "pyqId": "pyq_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1,
  "pyq": {
    "id": "pyq_id",
    "questionText": "What is the derivative of x^2?",
    "year": 2023,
    "subject": "Mathematics"
  }
}
```

---

## Progress Tracking APIs

### POST /api/progress
Create or update user progress for a topic.

**Auth Required:** Yes

**Request Body:**
```json
{
  "userId": "user_id_here",
  "topicId": "topic_id_here",
  "completionPercentage": 75,
  "status": "in_progress"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progress updated successfully",
  "data": {
    "_id": "progress_id",
    "userId": "user_id",
    "topicId": {
      "_id": "topic_id",
      "subject": "Mathematics",
      "topicName": "Calculus"
    },
    "completionPercentage": 75,
    "status": "in_progress",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/progress/:userId
Get all progress entries for a specific user.

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "progress_id",
      "userId": "user_id",
      "topicId": {
        "_id": "topic_id",
        "subject": "Mathematics",
        "topicName": "Calculus",
        "priorityScore": 95
      },
      "completionPercentage": 75,
      "status": "in_progress",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

## Error Responses
All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error