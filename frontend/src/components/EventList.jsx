import EventCard from "./EventCard";

const EventList = ({
  events,
  userBookings,
  onBookNow,
  loading,
  error,
  isAdmin,
  onEditEvent,
  onDeleteEvent,
}) => {
  const isEventBooked = (eventId) => {
    return userBookings.some((booking) => booking.event._id === eventId);
  };

  const getUserBookingForEvent = (eventId) => {
    return userBookings.find((booking) => booking.event._id === eventId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
              Loading Events
            </h2>
            <p className="text-gray-600">
              Please wait while we fetch the latest events...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and book tickets for the most exciting events happening near
            you
          </p>

          {/* Stats */}
          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {events.length}
              </div>
              <div className="text-sm text-gray-500">Available Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userBookings.length}
              </div>
              <div className="text-sm text-gray-500">Your Bookings</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Error:</span>
              <span className="ml-1">{error}</span>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Events Available
            </h3>
            <p className="text-gray-600 mb-4">
              There are no events available at the moment. Please check back
              later!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <>
            {/* Filter/Sort Bar */}
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Showing {events.length} events
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
                    <option>Date</option>
                    <option>Price</option>
                    <option>Popularity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  isBooked={isEventBooked(event._id)}
                  userBooking={getUserBookingForEvent(event._id)}
                  onBookNow={onBookNow}
                  isAdmin={isAdmin}
                  onEdit={onEditEvent}
                  onDelete={onDeleteEvent}
                />
              ))}
            </div>

            {/* Load More Button (for future pagination) */}
            <div className="text-center">
              <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                Load More Events
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventList;
