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

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eventbooking
   JWT_SECRET=your-very-long-and-secure-jwt-secret-key
   FRONTEND_URL=http://localhost:5173
   ```

4. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend Environment**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

6. **Start the Application**

   Open two terminal windows:

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

7. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Demo Credentials

For testing purposes, you can use these pre-seeded accounts:

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
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Express server entry point
│   ├── seeder.js               # Database seeding script
│   └── package.json            # Backend dependencies
├── frontend/                   # React frontend application
│   ├── public/
│   │   ├── _redirects          # Routing configuration for deployment
│   │   └── event.png           # Application assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── EventCard.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Main page components
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/            # React Context for state management
│   │   │   └── EventContext.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useEventsData.js
│   │   │   └── useBookingLogic.js
│   │   ├── config/
│   │   │   └── api.js          # API configuration
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # React application entry point
│   ├── .env.example            # Environment variables template
│   └── package.json            # Frontend dependencies
├── render.yaml                 # Render deployment configuration
├── DEPLOYMENT.md               # Detailed deployment instructions
├── FREE-DEPLOYMENT.md          # Free tier deployment guide
└── README.md                   # This file
```

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
