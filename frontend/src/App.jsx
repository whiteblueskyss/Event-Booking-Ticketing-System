import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Components
import ScrollToTop from "./components/ScrollToTop";

// Context
import EventProvider from "./context/EventContext";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import EventDetail from "./pages/EventDetail";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

/**
 * Main App Component
 * Provides routing and global context for the Event Booking System
 */
function App() {
  return (
    <EventProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </div>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              style: {
                background: "#10B981",
                color: "#fff",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#EF4444",
                color: "#fff",
              },
            },
          }}
        />
      </Router>
    </EventProvider>
  );
}

export default App;
