# 🔄 SkillSwap Platform

> A modern platform for users to exchange and learn skills from each other

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)

---

## 📸 Platform Showcase

<div align="center">

### Dashboard Overview
<img width="1275" height="913" alt="Main Dashboard" src="https://github.com/user-attachments/assets/d9a1d70c-8002-4f8b-bd74-fc174dbb0bde" />

### Skill Discovery  
<img width="1861" height="909" alt="Skill Browse Page" src="https://github.com/user-attachments/assets/a9de8c96-18ab-4257-afea-1aa1ff8e78f9" />

### User Profile
<img width="1833" height="830" alt="Profile Management" src="https://github.com/user-attachments/assets/14273a89-ecfc-4376-ad67-826cd9fe0b09" />

### Mobile Experience
<img width="812" height="402" alt="Mobile View" src="https://github.com/user-attachments/assets/7031eadb-12fd-48d9-ac04-cb58e2b6f4ce" />

### Skill Exchange Flow
<img width="886" height="794" alt="Exchange Interface" src="https://github.com/user-attachments/assets/67885d41-fccc-45fa-ada3-3cc18c6c1558" />

### Authentication
<img width="1918" height="913" alt="Login Interface" src="https://github.com/user-attachments/assets/4ff91c4c-c271-46c1-a55b-62b294590b9c" />

</div>

---

## 📂 Project Structure

**📁 Backend (`backend/`)**
- `config/` → Database and environment configuration
- `middleware/` → Express middleware (auth, validation, etc.)
- `models/` → Sequelize ORM models  
- `routes/` → RESTful API endpoints
- `package.json` → Backend dependencies
- `server.js` → Express server entry point

**📁 Frontend (`frontend/`)**
- `src/` → Source code directory
  - `components/` → Reusable React components
  - `services/` → API integration services
  - `store/` → Redux state management
- `package.json` → Frontend dependencies

**📁 Root**
- `package.json` → Root workspace configuration
- `README.md` → Project documentation

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### 1️⃣ Clone & Install
```bash
# Clone the repository
git clone https://github.com/arunim123/skillswap.git
cd skillswap

# Install all dependencies (backend + frontend)
npm run install:all
```
###2️⃣ Environment Setup
 Create a .env file in the backend/ directory:
 ```env# Server Configuration
 PORT=5000
 NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=skillswap

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Optional: Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```
3️⃣ Database Setup
```bash# Navigate to backend directory
cd backend

# Run database migrations
npx sequelize-cli db:migrate

# Seed initial data (optional)
npx sequelize-cli db:seed:all
```
4️⃣ Start Development Servers
```bash# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm run dev:backend    # Backend only (port 5000)
npm run dev:frontend   # Frontend only (port 3000)
```
🎉 Success! Your platform should be running at:

Frontend: http://localhost:3000
Backend API: http://localhost:5000


✨ Core Features
FeatureDescriptionStatus🔐 AuthenticationSecure user registration and login with JWT✅ Complete👤 Profile ManagementComprehensive user profiles with skills & bio✅ Complete🛠️ Skill ManagementAdd, edit, delete, and categorize skills✅ Complete🔄 Exchange RequestsSend and manage skill exchange proposals✅ Complete⭐ Rating SystemRate and review skill exchanges✅ Complete🔍 Advanced SearchFilter skills by category, location, rating✅ Complete📱 Responsive DesignMobile-first responsive interface✅ Complete🔔 Real-time NotificationsInstant updates for requests and messages🚧 In Progress💬 In-app MessagingDirect communication between users📋 Planned

🛠️ Technology Stack
Backend Infrastructure

Runtime: Node.js with Express.js framework
Database: PostgreSQL with Sequelize ORM
Authentication: JWT-based stateless authentication
Validation: Express-validator for input sanitization
Security: Helmet, CORS, rate limiting

Frontend Architecture

Framework: React 18+ with functional components
State Management: Redux Toolkit for predictable state
UI Framework: Material-UI (MUI) for consistent design
Routing: React Router v6 for client-side navigation
HTTP Client: Axios with interceptors for API calls

Development Tools

Linting: ESLint + Prettier for code quality
Testing: Jest + React Testing Library
Build: Create React App with custom webpack config


📡 API Reference
🔑 Authentication Endpoints
httpPOST   /api/auth/register          # Register new user
POST   /api/auth/login             # User login
POST   /api/auth/refresh           # Refresh JWT token
POST   /api/auth/logout            # User logout
POST   /api/auth/forgot-password   # Password reset request
👥 User Management
 httpGET    /api/users                  # Get all users (paginated)
 GET    /api/users/:id              # Get specific user profile
 PUT    /api/users/:id              # Update user profile
 DELETE /api/users/:id              # Delete user account
 GET    /api/users/:id/skills       # Get user's skills
🛠️ Skills Management
httpGET    /api/skills                 # Get all skills (with filters)
POST   /api/skills                 # Create new skill
GET    /api/skills/:id             # Get specific skill details
PUT    /api/skills/:id             # Update skill information
DELETE /api/skills/:id             # Delete skill
GET    /api/skills/categories      # Get all skill categories
🔄 Exchange Requests
httpGET    /api/requests               # Get user's requests
POST   /api/requests               # Create exchange request
GET    /api/requests/:id           # Get request details
PUT    /api/requests/:id           # Update request status
DELETE /api/requests/:id           # Cancel/delete request
POST   /api/requests/:id/accept    # Accept request
POST   /api/requests/:id/decline   # Decline request
⭐ Reviews & Ratings
httpGET    /api/reviews/user/:userId   # Get user's reviews
POST   /api/reviews                # Submit review
PUT    /api/reviews/:id            # Update review
DELETE /api/reviews/:id            # Delete review

🧪 Testing
bash# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run all tests with coverage
npm run test:coverage

🚀 Deployment
Production Build
bash# Build frontend for production
npm run build

# Start production server
npm run start:prod
Environment Variables (Production)
envNODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://host:port
Docker Deployment
bash# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request

Development Guidelines

Follow the existing code style and conventions
Write meaningful commit messages
Add tests for new features
Update documentation as needed
Ensure all tests pass before submitting


📈 Roadmap

 v2.0: Real-time messaging system
 v2.1: Video call integration for skill sessions
 v2.2: Mobile app development (React Native)
 v2.3: AI-powered skill matching algorithms
 v2.4: Gamification and achievement system
 v3.0: Multi-language support


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments

Thanks to all contributors who helped build this platform
Special thanks to the open-source community for the amazing tools
Inspired by the sharing economy and peer-to-peer learning principles


<div align="center">
Built with ❤️ by Arunim Parashar
🌐 Live Demo • 📧 Contact • 🐛 Report Bug
</div>'''
