import { useEffect } from "react";

const ThankYouModal = ({ isOpen, bookingDetails, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000); // Increased to 8 seconds for better readability

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">🎉 Booking Confirmed!</h2>
          <p className="text-green-100">Thank you for your booking!</p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {bookingDetails && (
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Booking Reference:
                    </span>
                    <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                      {bookingDetails.bookingReference}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Event:</span>
                    <span className="font-semibold text-gray-900">
                      {bookingDetails.eventTitle}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Tickets:</span>
                    <span className="font-semibold text-gray-900">
                      {bookingDetails.numberOfTickets}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-600 font-medium">
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      ${bookingDetails.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-blue-800 font-medium text-sm">
                  A confirmation email has been sent to your email address.
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Please save your booking reference for future inquiries.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">
              This window will close automatically in 8 seconds...
            </p>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Close Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
