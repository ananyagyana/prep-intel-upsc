# Prep-Intel: Intelligent Decision Support System for UPSC Preparation

Prep-Intel is a full-stack decision support system designed to help UPSC aspirants study smarter by identifying and prioritizing important topics using Previous Year Questions (PYQs), progress tracking, and recommendation logic.

The project combines backend APIs, structured data handling, recommendation support, and cloud/deployment readiness to create a practical academic project with real usability.

## Team
- Aahaan Sethi
- Ananya Gyana

## Project Objective
The main goal of Prep-Intel is to support UPSC preparation through a structured and intelligent system that can:

- organize UPSC topics and PYQs
- map questions to relevant topics
- track learner progress
- recommend priority topics
- support future ML-based scoring improvements
- demonstrate cloud and deployment concepts for academic review

Instead of preparing in a random order, the system helps users identify what to study first based on available question trends and topic relevance.

## Problem Statement
UPSC preparation involves a huge syllabus, repeated revision, and analysis of previous year questions. Students often struggle with:

- understanding which topics are most important
- organizing PYQs efficiently
- tracking preparation progress
- planning study order in a data-driven way

Prep-Intel addresses this by creating a centralized system that manages topics, PYQs, mappings, progress, and intelligent recommendations.

## Key Features

### Backend Features
- user authentication
- topic management APIs
- PYQ management APIs
- topic–PYQ mapping
- user progress tracking
- recommendation endpoint
- validation and secure route protection

### Decision Support Features
- structured topic prioritization
- recommendation flow through service logic
- support for future ML integration
- ranked topic output for study planning

### Review / Deployment Features
- MongoDB Atlas integration
- API documentation
- Postman collection for testing
- environment configuration template
- support for Docker and cloud deployment

## System Workflow
The overall system flow is:

1. store structured UPSC topics
2. store previous year questions
3. map PYQs to relevant topics
4. analyze topic relevance through recommendation logic
5. track student progress on topics
6. return prioritized topics for study
7. display useful outputs through frontend/dashboard integration

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

### Frontend
- React.js

### Tools and Dev Workflow
- GitHub
- Postman
- VS Code
- Docker
- GitHub Actions

### Cloud / Deployment
- AWS EC2
- MongoDB Atlas

## Project Architecture
The backend is organized into the following layers:

- **models** — database schemas
- **routes** — API endpoint definitions
- **controllers** — request handling logic
- **services** — recommendation / ML support logic
- **config** — database and environment configuration

This layered design helps keep the project modular, readable, and scalable.

## Core Modules

### 1. Authentication Module
Handles:
- user registration
- user login
- JWT-based protected routes

### 2. Topics Module
Stores and retrieves UPSC topics by subject and topic name.

### 3. PYQ Module
Stores and retrieves previous year questions with metadata such as subject and year.

### 4. Mapping Module
Links PYQs to specific topics so that topic-level analysis becomes possible.

### 5. Progress Module
Tracks how much of a topic a user has completed.

### 6. Recommendation Module
Generates prioritized topic recommendations using service logic and structured topic/PYQ information.

## Recommendation / ML Perspective
The recommendation component is the core of the decision support system.

It is intended to:
- analyze topic relevance
- support priority scoring
- guide study order
- serve as the basis for future ML enhancements

For Review-2, the recommendation flow can work with mock or rule-based scoring.

In later versions, this can be extended to:
- frequency analysis
- recurrence-based scoring
- recency weighting
- lightweight ML models for topic prioritization

## Current Scope
The project currently focuses on:
- backend implementation
- database integration
- API testing
- progress tracking
- topic/PYQ mappings
- recommendation support
- review-ready documentation and cloud readiness

## Future Enhancements
Possible future improvements include:
- automatic topic scoring using stronger ML models
- OCR-based ingestion of PYQ documents
- advanced dashboard visualizations
- user-specific study plans
- revision reminders
- analytics-based preparation insights

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Topics
- `GET /api/topics`

### PYQs
- `GET /api/pyqs`

### Recommendations
- `GET /api/recommendations`

### Mappings
- `POST /api/mappings`
- `GET /api/mappings/topic/:topicId`
- `GET /api/mappings/pyq/:pyqId`

### Progress
- `POST /api/progress`
- `GET /api/progress/:userId`

## Security Practices
The project includes secure backend practices such as:
- password hashing with bcrypt
- JWT-based authentication
- protected routes
- request validation
- proper error handling
- environment variable usage for secrets

## Folder Structure
```text
Prep-Intel/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── API_DOC.md
│   ├── package.json
│   └── server.js
│
├── frontend/   # to be developed / integrated
│
└── README.md
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd Prep-Intel
```
### 2. Install backend dependencies
```
cd backend
npm install
```
### 3. Create .env

Create a .env file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### 4. Start the backend server
```
npm start
```
The backend should run on:
```
http://localhost:5000
```
## Sample Demo Flow

1.A basic demo flow for the project is:

2.register/login user

3.fetch topics

4.fetch PYQs

5.create topic–PYQ mappings

6.create/update progress

7.fetch recommendations

8.display prioritized topics on the dashboard

## Cloud Readiness

The project is designed to support cloud deployment using:

MongoDB Atlas for database hosting

AWS EC2 for backend deployment

Docker for containerization

GitHub Actions for CI workflow support

## Academic Relevance

This project is suitable for demonstrating concepts from:

Web Development

Machine Learning (decision support / scoring logic)

Cloud Computing

Secure Coding Practices

Software Engineering and Collaboration

## License

This project is developed for academic and educational purposes.
