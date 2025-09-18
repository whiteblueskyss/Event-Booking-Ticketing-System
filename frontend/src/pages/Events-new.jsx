import BookingModal from "../components/BookingModal";
import EventList from "../components/EventList";
import Header from "../components/Header";
import ThankYouModal from "../components/ThankYouModal";
import { useBookingLogic } from "../hooks/useBookingLogic";
import { useEventsData } from "../hooks/useEventsData";

const Events = () => {
  const { events, setEvents, userBookings, loading, error, fetchUserBookings } =
    useEventsData();

  const {
    selectedEvent,
    showBookingModal,
    showThankYouModal,
    bookingDetails,
    handleBookNow,
    handleBookingConfirm,
    handleCloseModals,
  } = useBookingLogic(events, setEvents, userBookings, fetchUserBookings);

  return (
    <div>
      <Header />

      <main>
        <EventList
          events={events}
          userBookings={userBookings}
          onBookNow={handleBookNow}
          loading={loading}
          error={error}
        />
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
