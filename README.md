# 🔄 SkillSwap Platform

> A modern platform for users to exchange and learn skills from each other

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)

---

## 📦 Project Structure

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

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2. Configure environment variables

- In the `backend` directory, create a `.env` file:
  ```
  PORT=5000
  JWT_SECRET=your_jwt_secret
  NODE_ENV=development
  ```
  *(For SQLite, no DB_* variables are needed by default.)*

### 3. Start the development servers

```bash
# In backend/
npm run dev

# In frontend/
npm start
```

---

## ✨ Features

- User authentication (register/login)
- Skill management (add/edit/delete skills)
- Skill exchange requests
- User profiles
- Search and browse skills
- Responsive, modern UI

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Sequelize ORM, SQLite (default)
- **Frontend:** React, Material-UI, Redux Toolkit, Axios

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — User login

### Users
- `GET /api/users` — Get all users
- `GET /api/users/:id` — Get user profile
- `PUT /api/users/:id` — Update user profile

### Skills
- `GET /api/skills` — Get all skills
- `POST /api/skills` — Add new skill
- `PUT /api/skills/:id` — Update skill
- `DELETE /api/skills/:id` — Delete skill

### Requests
- `GET /api/requests` — Get all requests
- `POST /api/requests` — Create new request
- `PUT /api/requests/:id` — Update request status
- `DELETE /api/requests/:id` — Delete request

---

## 📝 License

&copy; 2025 arunim. All rights reserved.

---