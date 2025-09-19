# Event Booking System - Frontend

A modern React application for browsing, booking, and managing events built with Vite and Tailwind CSS.

## 🚀 Features

- **Event Browsing**: View and search through available events
- **User Authentication**: Register and login functionality
- **Event Booking**: Book tickets for events with real-time seat availability
- **User Dashboard**: View personal bookings and event history
- **Admin Panel**: Manage events, view bookings, and admin controls
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hot Toast** - Elegant toast notifications
- **Axios** - HTTP client for API requests

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context for state management
├── hooks/              # Custom React hooks
├── pages/              # Page components and routes
├── assets/             # Static assets
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🌐 Deployment

This application is configured for deployment on Render.com with:

- Automatic builds on git push
- SPA routing support with `_redirects` file
- Environment variable configuration
- Production-optimized builds

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run clean` - Clean build directory

## 🔧 Configuration

The application uses the following environment variables:

- `VITE_API_URL` - Backend API URL (configured in build process)

## 📱 Features Overview

### User Features

- Browse events with filtering and search
- User registration and authentication
- Book events with seat selection
- View personal booking history
- Responsive design for all devices

### Admin Features

- Create, edit, and delete events
- View all bookings and user data
- Manage event capacity and pricing
- Admin dashboard with analytics

## 🎨 UI Components

- **EventCard**: Displays event information with booking options
- **BookingModal**: Modal for booking confirmation
- **Header/Footer**: Navigation and site information
- **ThankYouModal**: Confirmation after successful booking
- **ScrollToTop**: Smooth page navigation

Built with modern React patterns and production-ready code quality.
