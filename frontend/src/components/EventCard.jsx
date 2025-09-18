import { Link } from "react-router-dom";

const EventCard = ({
  event,
  isBooked,
  userBooking,
  onBookNow,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
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

  const { date, time } = formatDate(event.date);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Card Header with Category Badge */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-2 px-4">
              {event.title}
            </h3>
            <div className="text-blue-100 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-4 h-4"
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
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-4 left-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit(event);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full text-xs transition-colors"
              title="Edit Event"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(event._id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-xs transition-colors"
              title="Delete Event"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details Grid */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-700">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
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

          <div className="flex items-center text-sm text-gray-700">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM8 8a2 2 0 114 0 2 2 0 01-4 0zM12 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>
                {event.availableSeats}/{event.totalSeats} seats
              </span>
            </div>

            <div className="text-xl font-bold text-blue-600">
              {formatPrice(event.price)}
            </div>
          </div>
        </div>

        {/* Progress Bar for Seats */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((event.totalSeats - event.availableSeats) /
                    event.totalSeats) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {event.totalSeats - event.availableSeats} tickets sold
          </div>
        </div>

        {/* Action Buttons */}
        {event.availableSeats > 0 ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/events/${event._id}`}
              className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              View Details
            </Link>

            {isBooked ? (
              <div className="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center font-medium">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Booked ({userBooking?.numberOfTickets} tickets)</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onBookNow(event)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium group-hover:shadow-lg"
              >
                Book Now
              </button>
            )}
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-center font-medium">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>SOLD OUT</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
