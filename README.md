EasyGenerator Backend
Welcome to the EasyGenerator backend repository! This project is a NestJS application that provides RESTful API services for user authentication, weather information, and content generation using GPT technology.
Backend URL: https://easygenerator-my-backend.onrender.com
Table of Contents

Features
Getting Started

Prerequisites
Installation
Running the Application


Project Structure
Available Scripts
Environment Variables
API Documentation
Security Measures
Future Enhancements
License

Features

User Authentication:

Sign Up with password validation
Sign In with JWT token generation
JWT Authentication for protected routes


User Management:

Fetch user details by ID


Weather Service:

Public endpoint to fetch current weather information


Content Generation:

EasyGeneratorGPT for content creation


Error Handling:

Consistent error responses with appropriate HTTP status codes


Logging and Monitoring:

Console logging for requests and errors



Getting Started
Prerequisites

Node.js (version 14.x or higher)
npm or yarn
MongoDB instance (local or hosted)

Installation

Clone the repository:
bashCopygit clone https://github.com/yourusername/easygenerator-backend.git
cd easygenerator-backend

Install dependencies:
bashCopynpm install
# or
yarn install


Running the Application

Set up environment variables:
Create a .env file in the root directory with the following content:
CopyPORT=5000
MONGO_URI=mongodb://localhost:27017/easygenerator
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_openweather_api_key
FRONTEND_URL=https://easygenerator-my-app.vercel.app

Start the development server:
bashCopynpm run start:dev
# or
yarn start:dev

The backend should now be running on http://localhost:5000.

Project Structure
Copysrc/
├── auth/
├── user/
├── weather/
├── generate/
├── app.module.ts
└── main.ts
Available Scripts

npm run start: Run the app in production mode
npm run start:dev: Run the app in development mode with hot reload
npm run build: Build the app for production
npm run test: Run the test suite
npm run lint: Lint the codebase using ESLint

Environment Variables

PORT: Server port (default: 5000)
MONGO_URI: MongoDB connection string
JWT_SECRET: Secret key for JWT tokens
WEATHER_API_KEY: OpenWeatherMap API key
FRONTEND_URL: Frontend application URL for CORS

API Documentation
Authentication Endpoints

POST /user/signup: Register a new user
POST /user/signin: Authenticate a user

User Endpoints

GET /user/:id: Retrieve user details by ID

Weather Endpoint

GET /weather: Fetch current weather information for a city

Content Generation Endpoint

POST /generate: Generate content using GPT technology

For detailed request/response formats, please refer to the full API documentation.
Security Measures

JWT Authentication
Password validation
Input validation
CORS configuration
Secure error handling

Future Enhancements

Forgot Password functionality
Rate limiting
Swagger API documentation
Advanced logging and monitoring
Comprehensive testing

License
This project is licensed under the MIT License.