import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Redirect to login if not authenticated
        navigate("/login");
      }
    };

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `https://event-booking-ticketing-system.onrender.com/api/events/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setEvent(data);
        } else {
          setError("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
    if (id) {
      fetchEventDetails();
    }
  }, [id, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (numberOfTickets > event.availableSeats) {
      setError(`Only ${event.availableSeats} seats available`);
      return;
    }

    setBookingLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://event-booking-ticketing-system.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: id,
            numberOfTickets: numberOfTickets,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Successfully booked ${numberOfTickets} ticket(s)!`);
        // Update event available seats
        setEvent((prev) => ({
          ...prev,
          availableSeats: prev.availableSeats - numberOfTickets,
        }));
        setNumberOfTickets(1);

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const getTotalPrice = () => {
    return event ? event.price * numberOfTickets : 0;
  };

  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <main>
          <h2>Please Login</h2>
          <p>You need to be logged in to book events.</p>
        </main>
        <footer>
          <p>&copy; 2025 Event Booking System</p>
        </footer>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <h2>Loading Event Details...</h2>
        </main>
        <footer>
          <p>&copy; 2025 Event Booking System</p>
        </footer>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div>
        <Header />
        <main>
          <h2>Event Not Found</h2>
          <p>The event you're trying to book doesn't exist.</p>
          <button onClick={() => navigate("/events")}>← Back to Events</button>
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
        <button onClick={() => navigate("/events")}>← Back to Events</button>

        <h1>Book Event: {event?.title}</h1>

        {error && <div>{error}</div>}
        {success && <div>{success}</div>}

        {event && (
          <div>
            <h3>Event Details</h3>
            <p>
              <strong>Event:</strong> {event.title}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(event.date)}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>Address:</strong> {event.address}
            </p>
            <p>
              <strong>Price per ticket:</strong> {formatPrice(event.price)}
            </p>
            <p>
              <strong>Available Seats:</strong> {event.availableSeats}
            </p>
          </div>
        )}

        {event?.availableSeats > 0 ? (
          <form onSubmit={handleBooking}>
            <h3>Booking Information</h3>

            <div>
              <label htmlFor="numberOfTickets">Number of Tickets:</label>
              <select
                id="numberOfTickets"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                required
              >
                {[...Array(Math.min(event.availableSeats, 10))].map(
                  (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <p>
                <strong>Total Price:</strong> {formatPrice(getTotalPrice())}
              </p>
            </div>

            <div>
              <h4>Booking Summary</h4>
              <p>Event: {event.title}</p>
              <p>Date: {formatDate(event.date)}</p>
              <p>Tickets: {numberOfTickets}</p>
              <p>Total: {formatPrice(getTotalPrice())}</p>
            </div>

            <button type="submit" disabled={bookingLoading}>
              {bookingLoading
                ? "Processing..."
                : `Book ${numberOfTickets} Ticket(s) - ${formatPrice(
                    getTotalPrice()
                  )}`}
            </button>
          </form>
        ) : (
          <div>
            <h3>Sold Out</h3>
            <p>Sorry, this event is fully booked.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
