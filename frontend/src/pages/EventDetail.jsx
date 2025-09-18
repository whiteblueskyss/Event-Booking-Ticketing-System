import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ThankYouModal from "../components/ThankYouModal";
import { useBookingLogic } from "../hooks/useBookingLogic";
import { useEventContext } from "../hooks/useEventContext";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    events,
    getEventById,
    updateEventSeats,
    fetchUserBookings,
    isEventBooked,
    getUserBookingForEvent,
  } = useEventContext();
  const [loading, setLoading] = useState(true);

  // Use the same booking logic as Events page
  const {
    showBookingModal,
    showThankYouModal,
    bookingDetails,
    handleBookNow,
    handleBookingConfirm,
    handleCloseModals,
  } = useBookingLogic(events, updateEventSeats, fetchUserBookings);

  // Get event from context
  const event = getEventById(id);

  // Check if user has booked this event
  const userBooking = getUserBookingForEvent(id);
  const isBooked = isEventBooked(id);

  useEffect(() => {
    // No need to fetch individual event since context provides it
    // Just update loading state based on whether event exists
    if (event || !id) {
      setLoading(false);
    }
  }, [event, id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const handleEventBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Prevent booking if user has already booked this event
    if (isBooked) {
      toast.error("You have already booked this event!");
      return;
    }

    // Use the hook's handleBookNow function
    handleBookNow(event);
  };

  const handleBackToEvents = () => {
    navigate("/events");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Loading Event Details...
            </h2>
          </div>
        </main>
      </div>
    );
  }

  if (!loading && !event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The event you're looking for doesn't exist or may have been
              removed.
            </p>
            <button
              onClick={handleBackToEvents}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Events
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { date, time } = formatDate(event.date);
  const soldPercentage =
    ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackToEvents}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                <div className="text-center text-white p-6">
                  <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                  <div className="flex items-center justify-center space-x-6 text-blue-100">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{time}</span>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Event Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Date & Time</p>
                      <p className="text-gray-600">{date}</p>
                      <p className="text-gray-600">{time}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Venue</p>
                      <p className="text-gray-600">{event.venue}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Ticket Price
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatPrice(event.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-orange-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM8 8a2 2 0 114 0 2 2 0 01-4 0zM12 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Category</p>
                      <p className="text-gray-600">{event.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {formatPrice(event.price)}
                </p>
                <p className="text-gray-600">per ticket</p>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Seats Available
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {event.availableSeats}/{event.totalSeats}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${soldPercentage}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-500">
                  {event.totalSeats - event.availableSeats} tickets sold
                </p>
              </div>

              {/* Booking Action */}
              {event.availableSeats > 0 ? (
                <div className="space-y-4">
                  {isBooked ? (
                    <div className="w-full bg-green-100 border-2 border-green-300 text-green-800 py-3 px-6 rounded-lg font-medium text-lg text-center">
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Already Booked
                        {userBooking && (
                          <span className="ml-2 text-sm">
                            ({userBooking.numberOfTickets} ticket
                            {userBooking.numberOfTickets > 1 ? "s" : ""})
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleEventBookNow}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-lg"
                    >
                      Book Now
                    </button>
                  )}

                  {event.availableSeats <= 10 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-amber-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-amber-700 text-sm font-medium">
                          Hurry! Only {event.availableSeats} seats left
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-red-100 text-red-800 py-3 px-6 rounded-lg font-medium mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>SOLD OUT</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    This event is fully booked.
                  </p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Event Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event ID:</span>
                  <span className="font-mono text-gray-900 text-xs">
                    {event._id.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">
                    {formatDate(event.createdAt).date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        event={event}
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

export default EventDetail;
