import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import EventList from "../components/EventList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ThankYouModal from "../components/ThankYouModal";
import { useBookingLogic } from "../hooks/useBookingLogic";
import { useEventContext } from "../hooks/useEventContext";

const Events = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {
    events,
    userBookings,
    loading,
    updateEventSeats,
    fetchUserBookings,
    deleteEvent,
  } = useEventContext();

  const {
    selectedEvent,
    showBookingModal,
    showThankYouModal,
    bookingDetails,
    handleBookNow,
    handleBookingConfirm,
    handleCloseModals,
  } = useBookingLogic(events, updateEventSeats, fetchUserBookings);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleEditEvent = (event) => {
    // Navigate to admin dashboard with edit mode
    navigate("/admin", { state: { editEvent: event } });
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://event-booking-ticketing-system.onrender.com/api/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        deleteEvent(eventId);
        toast.success("Event deleted successfully!");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <EventList
          events={events}
          userBookings={userBookings}
          onBookNow={handleBookNow}
          loading={loading}
          isAdmin={user?.role === "admin"}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </main>

      <Footer />

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
