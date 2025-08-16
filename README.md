# SkillSwap Platform

A platform for users to exchange and learn skills from each other. Built with Node.js/Express backend and React frontend.

## Project Structure

```
skillswap/
├── backend/
│   ├── config/        # Database and other configuration
│   ├── middleware/    # Express middleware
│   ├── models/        # Sequelize models
│   ├── routes/        # API routes
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   └── store/        # Redux store
│   └── package.json
├── package.json
└── README.md
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Configure environment variables:
   - Create `.env` file in the backend directory
   - Add required environment variables:
     ```
     PORT=5000
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASS=your_db_password
     DB_NAME=skillswap
     JWT_SECRET=your_jwt_secret
     ```

3. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm run dev

   # Start backend only
   npm run dev:backend

   # Start frontend only
   npm run dev:frontend
   ```

## Features

- User authentication (register/login)
- Skill management (add/edit/delete skills)
- Skill exchange requests
- User ratings and reviews
- Profile management

## Tech Stack

- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize ORM
  - JWT Authentication

- Frontend:
  - React
  - Material-UI
  - Redux Toolkit
  - React Router
  - Axios

## API Documentation

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user profile
- PUT /api/users/:id - Update user profile

### Skills
- GET /api/skills - Get all skills
- POST /api/skills - Add new skill
- PUT /api/skills/:id - Update skill
- DELETE /api/skills/:id - Delete skill

### Skill Requests
- GET /api/requests - Get all requests
- POST /api/requests - Create new request
- PUT /api/requests/:id - Update request status
- DELETE /api/requests/:id - Delete request 