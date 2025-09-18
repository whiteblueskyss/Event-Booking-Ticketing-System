import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import Header from "../components/Header";
import ThankYouModal from "../components/ThankYouModal";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

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

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserBookings(token);
    }
  };

  const fetchUserBookings = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const response = await fetch("http://localhost:3000/api/events");
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

  const isEventBooked = (eventId) => {
    return userBookings.some((booking) => booking.event._id === eventId);
  };

  const getUserBookingForEvent = (eventId) => {
    return userBookings.find((booking) => booking.event._id === eventId);
  };

  const handleBookNow = (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = async (bookingData) => {
    console.log("Received booking data in Events:", bookingData); // Debug log

    try {
      const token = localStorage.getItem("token");

      console.log("Sending to API:", JSON.stringify(bookingData, null, 2)); // Debug log

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: bookingData.event, // Changed back to eventId
          numberOfTickets: bookingData.numberOfTickets,
          attendeeInfo: bookingData.attendeeInfo,
          totalAmount: bookingData.totalAmount,
          status: bookingData.status,
        }),
      });

      const data = await response.json();
      console.log("API response:", data); // Debug log

      if (response.ok) {
        // Update event available seats
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === bookingData.event // Keep this as .event since that's what we get from modal
              ? {
                  ...event,
                  availableSeats:
                    event.availableSeats - bookingData.numberOfTickets,
                }
              : event
          )
        );

        // Update user bookings
        const userData = localStorage.getItem("user");
        if (userData) {
          const token = localStorage.getItem("token");
          await fetchUserBookings(token);
        }

        // Show success modal
        setBookingDetails({
          bookingReference: bookingData.bookingReference,
          eventTitle: selectedEvent.title,
          numberOfTickets: bookingData.numberOfTickets,
          totalAmount: selectedEvent.price * bookingData.numberOfTickets,
        });

        setShowBookingModal(false);
        setShowThankYouModal(true);
      } else {
        alert(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const handleCloseModals = () => {
    setShowBookingModal(false);
    setShowThankYouModal(false);
    setSelectedEvent(null);
    setBookingDetails(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <h2>Events</h2>
          <p>Loading events...</p>
        </main>
        <footer>
          <p>&copy; 2025 Event Booking System</p>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <main>
        <h2>Available Events</h2>

        {error && <div>{error}</div>}

        {events.length === 0 ? (
          <p>No events available at the moment.</p>
        ) : (
          <div>
            {events.map((event) => (
              <div key={event._id}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong> {formatDate(event.date)}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Price:</strong> {formatPrice(event.price)}
                </p>
                <p>
                  <strong>Available Seats:</strong> {event.availableSeats} /{" "}
                  {event.totalSeats}
                </p>
                <p>
                  <strong>Category:</strong> {event.category}
                </p>

                {event.availableSeats > 0 ? (
                  <div>
                    <Link to={`/events/${event._id}`}>View Details</Link>
                    <span> | </span>
                    {isEventBooked(event._id) ? (
                      <span>
                        <strong>BOOKED</strong> (
                        {getUserBookingForEvent(event._id)?.numberOfTickets}{" "}
                        tickets)
                      </span>
                    ) : (
                      <button onClick={() => handleBookNow(event)}>
                        Book Now
                      </button>
                    )}
                  </div>
                ) : (
                  <p>
                    <strong>SOLD OUT</strong>
                  </p>
                )}

                <hr />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2025 Event Booking System</p>
      </footer>

      <BookingModal
        event={selectedEvent}
        isOpen={showBookingModal}
        onClose={handleCloseModals}
        onConfirm={handleBookingConfirm}
      />

      <ThankYouModal
        isOpen={showThankYouModal}
        bookingDetails={bookingDetails}
        onClose={handleCloseModals}
      />
    </div>
  );
};

export default Events;
