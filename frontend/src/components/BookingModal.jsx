import { useEffect, useState } from "react";

const BookingModal = ({ event, isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfTickets: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Get user data from localStorage and pre-fill form
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: "",
          numberOfTickets: 1,
        });
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const getTotalPrice = () => {
    return event ? event.price * formData.numberOfTickets : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      event: event._id,
      numberOfTickets: parseInt(formData.numberOfTickets),
      attendeeInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
    };

    await onConfirm(bookingData);
    setLoading(false);
  };

  if (!isOpen || !event) return null;

  const { date, time } = formatDate(event.date);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-2">Book Your Tickets</h2>
          <p className="text-blue-100">
            Complete your booking for this amazing event
          </p>
        </div>

        <div className="p-6">
          {/* Event Details Card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {event.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">{date}</div>
                  <div className="text-gray-600">{time}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Venue</div>
                  <div className="text-gray-600">{event.venue}</div>
                  <div className="text-gray-500 text-sm">{event.address}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-400"
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
                <div>
                  <div className="font-medium text-gray-900">
                    Price per ticket
                  </div>
                  <div className="text-gray-600">
                    {formatPrice(event.price)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM8 8a2 2 0 114 0 2 2 0 01-4 0zM12 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">
                    Available seats
                  </div>
                  <div className="text-gray-600">
                    {event.availableSeats} remaining
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attendee Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="numberOfTickets"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Tickets *
                  </label>
                  <select
                    id="numberOfTickets"
                    name="numberOfTickets"
                    value={formData.numberOfTickets}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {[...Array(Math.min(event.availableSeats, 10))].map(
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} {index === 0 ? "ticket" : "tickets"}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Booking Summary
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-medium text-gray-900">
                    {event.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-900">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tickets:</span>
                  <span className="font-medium text-gray-900">
                    {formData.numberOfTickets}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total Price:</span>
                    <span className="text-blue-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Confirm Booking - ${formatPrice(getTotalPrice())}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
