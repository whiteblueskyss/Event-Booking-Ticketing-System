import { useEffect, useState } from "react";
import { EventContext } from "./eventContextInstance";

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log(
        "Fetching events from:",
        "https://event-booking-ticketing-system.onrender.com/api/events"
      );
      const response = await fetch(
        "https://event-booking-ticketing-system.onrender.com/api/events"
      );
      const data = await response.json();

      if (response.ok) {
        setEvents(data);
        setError("");
      } else {
        setError("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user bookings
  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserBookings([]);
        return;
      }

      const response = await fetch(
        "https://event-booking-ticketing-system.onrender.com/api/bookings/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUserBookings(data);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  // Update event available seats after booking
  const updateEventSeats = (eventId, numberOfTickets) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId
          ? {
              ...event,
              availableSeats: event.availableSeats - numberOfTickets,
            }
          : event
      )
    );
  };

  // Add new event (for admin)
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Update existing event (for admin)
  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  // Delete event (for admin)
  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== eventId)
    );
  };

  // Get user booking for specific event
  const getUserBookingForEvent = (eventId) => {
    return userBookings.find((booking) => booking.event._id === eventId);
  };

  // Check if user has booked an event
  const isEventBooked = (eventId) => {
    return userBookings.some((booking) => booking.event._id === eventId);
  };

  // Get event by ID
  const getEventById = (eventId) => {
    return events.find((event) => event._id === eventId);
  };

  // Refresh all data
  const refreshData = async () => {
    await Promise.all([fetchEvents(), fetchUserBookings()]);
  };

  // Initialize data on mount
  useEffect(() => {
    fetchEvents();
    fetchUserBookings();
  }, []);

  const value = {
    // State
    events,
    userBookings,
    loading,
    error,

    // Actions
    fetchEvents,
    fetchUserBookings,
    updateEventSeats,
    addEvent,
    updateEvent,
    deleteEvent,
    refreshData,

    // Utilities
    getUserBookingForEvent,
    isEventBooked,
    getEventById,

    // Setters (for backwards compatibility)
    setEvents,
    setUserBookings,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export default EventProvider;
