# Event Booking & Ticketing System

A modern full-stack web application built with the MERN stack for seamless event booking and ticket management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Event Booking & Ticketing System allows users to browse events, book tickets, and manage their bookings through an intuitive web interface. Administrators can create and manage events through a dedicated admin panel. The application features secure authentication, real-time seat selection, and responsive design.

## Features

### Core Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Event Management**: Browse, search, and filter events by category and date
- **Ticket Booking**: Complete booking workflow with seat selection
- **User Dashboard**: Personal dashboard showing booking history and profile management
- **Admin Panel**: Administrative interface for event creation and management
- **Responsive Design**: Mobile-first approach ensuring compatibility across devices

### Technical Features

- **RESTful API**: Well-structured backend API with proper HTTP methods
- **Data Validation**: Client-side and server-side input validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Security**: Password hashing, protected routes, and CORS configuration
- **Real-time Updates**: Dynamic seat availability and booking status

## Technologies Used

### Frontend

- **React 19** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Toast notifications for user feedback

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JSON Web Tokens (JWT)** - Secure authentication mechanism
- **bcryptjs** - Password hashing library
- **Express Validator** - Input validation and sanitization

### Development Tools

- **ESLint** - Code linting and style enforcement
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management

## Setup Instructions

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (usually comes with Node.js)
- **MongoDB** (local installation) or **MongoDB Atlas** account
- **Git** for cloning the repository

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/whiteblueskyss/Event-Booking-Ticketing-System.git
   cd Event-Booking-Ticketing-System
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/event-booking
   JWT_SECRET=EventBooking2025_SuperSecret_RandomKey_12345!@#$%
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   ```

   **For MongoDB Atlas (Cloud Database):**

   If you prefer to use MongoDB Atlas instead of local MongoDB:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/event-booking?retryWrites=true&w=majority
   ```

   Replace `username`, `password`, and the cluster URL with your actual MongoDB Atlas credentials.

4. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend for Local Development**

   The frontend is currently configured to use the production API URLs. For local development, you need to update the API endpoints:

   **Option A: Create Environment Variables (Recommended)**

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Then update the frontend files to use this environment variable instead of hardcoded URLs.

   **Option B: Manually Update API URLs**

   Update the following files to use `http://localhost:3000` instead of the production URL:

   - `src/context/EventContext.jsx` - Line 6: Update `API_BASE_URL`
   - `src/pages/Login.jsx` - Update fetch URLs
   - `src/pages/Register.jsx` - Update fetch URLs
   - `src/pages/Booking.jsx` - Update fetch URLs
   - `src/pages/Events.jsx` - Update fetch URLs
   - `src/pages/AdminDashboard.jsx` - Update fetch URLs
   - `src/hooks/useBookingLogic.js` - Update fetch URLs
   - `src/hooks/useEventsData.js` - Update fetch URLs

   **Example for EventContext.jsx:**

   ```javascript
   // Change this line
   const API_BASE_URL = "https://event-booking-ticketing-system.onrender.com";

   // To this for local development
   const API_BASE_URL = "http://localhost:3000";
   ```

6. **Start MongoDB (if using local MongoDB)**

   Make sure MongoDB is running on your system:

   ```bash
   # On macOS with Homebrew
   brew services start mongodb/brew/mongodb-community

   # On Ubuntu/Linux
   sudo systemctl start mongod

   # On Windows
   net start MongoDB
   ```

7. **Start the Application**

   Open two terminal windows:

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   npm start
   # or for development with auto-restart
   npm run dev
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

8. **Seed the Database**

   To populate the database with sample data:

   ```bash
   cd backend
   node seeder.js
   ```

   This will create sample users, events, and bookings for testing.

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Important Notes for Local Development

1. **CORS Configuration**: The backend is configured to allow requests from `http://localhost:5173` for local development.

2. **Database Connection**: If you encounter database connection issues, ensure:

   - MongoDB is running (for local setup)
   - Your MongoDB Atlas credentials are correct (for cloud setup)
   - Network access is properly configured in MongoDB Atlas

3. **Port Conflicts**: If port 3000 or 5173 are already in use, you can:

   - Change the backend port in `.env` file (`PORT=3001`)
   - The frontend port can be changed in `vite.config.js`

4. **Production vs Development**: The current codebase is configured for production deployment. For local development, you must update the API URLs as described in step 5 above.

### Switching Between Local and Production

To switch your frontend between local development and production:

**For Local Development:**

- Update all `https://event-booking-ticketing-system.onrender.com` URLs to `http://localhost:3000`

**For Production:**

- Revert all API URLs back to `https://event-booking-ticketing-system.onrender.com`
- Commit and push changes to trigger automatic deployment on Render

## Demo Credentials

For testing purposes, you can use these pre-seeded accounts (after running the seeder):

### Regular User Account

- **Email**: `user@example.com`
- **Password**: `password123`
- **Permissions**: Browse events, make bookings, view personal dashboard

### Administrator Account

- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Permissions**: All user permissions plus event management and admin dashboard access

## Project Structure

```
Event-Booking-Ticketing-System/
├── backend/                    # Node.js backend application
│   ├── config/
│   │   └── database.js         # Database connection configuration
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── models/
│   │   ├── User.js             # User data model
│   │   ├── Event.js            # Event data model
│   │   └── Booking.js          # Booking data model
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── events.js           # Event management routes
│   │   └── bookings.js         # Booking management routes
│   ├── .env                    # Environment variables (create this)
│   ├── server.js               # Express server entry point
│   ├── seeder.js               # Database seeding script
│   └── package.json            # Backend dependencies
├── frontend/                   # React frontend application
│   ├── public/
│   │   ├── _redirects          # Routing configuration for deployment
│   │   ├── 404.html            # SPA fallback page
│   │   ├── .htaccess           # Apache routing configuration
│   │   └── event.png           # Application favicon
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventList.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── ThankYouModal.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/              # Main page components
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/            # React Context for state management
│   │   │   ├── EventContext.jsx
│   │   │   └── eventContextInstance.js
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useEventsData.js
│   │   │   ├── useEventContext.js
│   │   │   └── useBookingLogic.js
│   │   ├── assets/             # Static assets
│   │   │   └── react.svg
│   │   ├── App.jsx             # Main application component
│   │   ├── main.jsx            # React application entry point
│   │   ├── App.css             # Application styles
│   │   └── index.css           # Global styles
│   ├── .env                    # Environment variables (create this for local dev)
│   ├── vite.config.js          # Vite configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── README.md               # Frontend documentation
│   └── package.json            # Frontend dependencies
├── render.yaml                 # Render deployment configuration
├── DEPLOYMENT.md               # Detailed deployment instructions
├── FREE-DEPLOYMENT.md          # Free tier deployment guide
└── README.md                   # This file
```

**Key Files for Local Development:**

- **Backend `.env`**: Database connection and JWT configuration
- **Frontend API URLs**: Hardcoded in components (need manual update for local dev)
- **seeder.js**: Populates database with sample data
- **vite.config.js**: Frontend build and development configuration

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return JWT token

### Events

- `GET /api/events` - Retrieve all events
- `GET /api/events/:id` - Retrieve specific event by ID
- `POST /api/events` - Create new event (Admin only)
- `PUT /api/events/:id` - Update existing event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/user` - Get current user's bookings
- `GET /api/bookings/:id` - Get specific booking details

**Developed by [whiteblueskyss](https://github.com/whiteblueskyss)**

For questions or support, please open an issue on GitHub.
