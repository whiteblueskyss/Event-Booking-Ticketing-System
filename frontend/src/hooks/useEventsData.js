import { useEffect, useState } from "react";

export const useEventsData = () => {
  const [events, setEvents] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        fetchUserBookings(token);
      }
    };

    checkAuthStatus();
    fetchEvents();
  }, []);

  const fetchUserBookings = async (token) => {
    try {
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

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://event-booking-ticketing-system.onrender.com/api/events"
      );
      const data = await response.json();

      if (response.ok) {
        setEvents(data);
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

  return {
    events,
    setEvents,
    userBookings,
    loading,
    error,
    fetchUserBookings,
  };
};
