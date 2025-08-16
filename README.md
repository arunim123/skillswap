

SkillSwap Platform

A platform for users to exchange and learn skills from each other. Built with Node.js/Express backend and React frontend.

Project Structure

skillswap/
├── backend/
│   ├── config/        # Database configuration
│   ├── controllers/   # Route controllers
│   ├── models/        # Sequelize models
│   ├── routes/        # API routes
│   ├── server.js      # Express app entry
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
└── package.json        # Root config

Features

🔑 Authentication (Login, Signup, JWT-based sessions)

📋 Skill Listings (Add, browse, and search skills)

🔄 Skill Swap Requests (Request exchanges between users)

💬 Messaging System

📅 Scheduling Support

⭐ User Ratings & Reviews

📊 Dashboard

⚡ Real-time updates (via WebSockets)

🌍 Geolocation Support

🎥 Video Conferencing


Installation

Backend Setup

cd backend
npm install
npx sequelize-cli db:migrate
npm run dev

Frontend Setup

cd frontend
npm install
npm start

Environment Variables

Create a .env file in the backend/ directory with the following:

PORT=5000
DB_NAME=skillswap
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret

Usage

1. Start the backend server (npm run dev in /backend)


2. Start the frontend (npm start in /frontend)


3. Open http://localhost:3000



Screenshots

Add your project screenshots here

 

Tech Stack

Frontend: React, Material-UI, Redux

Backend: Node.js, Express

Database: Sequelize, SQLite (dev) / PostgreSQL (prod)

Others: WebSockets, JWT Auth, Docker (for deployment)


License

This project is licensed under the MIT License. 

