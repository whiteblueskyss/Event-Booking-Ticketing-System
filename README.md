# Event Booking & Ticketing System

A full-stack MERN application for event booking and ticket management.

## 🚀 Features

### Core Features

- ✅ User Authentication (JWT)
- ✅ Event List Page with filtering
- ✅ Event Detail Page with booking
- ✅ Booking System with seat management
- ✅ User Dashboard for ticket history
- ✅ Backend API with CRUD operations
- ✅ MongoDB database integration

### Bonus Features

- 🎯 Seat selection UI
- 👨‍💼 Admin role-based access
- 📧 Email confirmations (mocked)
- 🌐 Deployed on Render

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI Library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
event-booking-system/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # Node.js + Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── server.js           # Entry point
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ LTS)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd event-booking-system
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

## 📱 Demo Credentials

### User Account

- Email: `user@example.com`
- Password: `password123`

### Admin Account

- Email: `admin@example.com`
- Password: `admin123`

## 🚀 Deployment

### Backend (Render)

1. Connect GitHub repository
2. Set environment variables
3. Deploy as Web Service

### Frontend (Render)

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy as Static Site

## 📋 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/:id` - Get booking details

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

Built with ❤️ for the Event Booking Assignment
