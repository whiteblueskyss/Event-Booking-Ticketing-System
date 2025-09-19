import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export const useBookingLogic = (
  events,
  updateEventSeats,
  fetchUserBookings
) => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to book an event");
        return;
      }

      // Backend expects only these fields
      const payload = {
        eventId: bookingData.event,
        numberOfTickets: bookingData.numberOfTickets,
        attendeeInfo: bookingData.attendeeInfo,
      };

      const response = await axios.post(
        API_ENDPOINTS.BOOKINGS.CREATE,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        // Update the events list to show decreased seats using context
        updateEventSeats(bookingData.event, bookingData.numberOfTickets);

        // Update user bookings
        await fetchUserBookings();

        // Prepare booking details for confirmation modal
        const bookingInfo = {
          bookingReference: response.data._id || `BK-${Date.now()}`,
          eventTitle: bookingData.eventTitle || selectedEvent?.title,
          numberOfTickets: bookingData.numberOfTickets,
          totalAmount: bookingData.totalAmount,
        };

        // Close booking modal and show thank you modal
        setShowBookingModal(false);
        setBookingDetails(bookingInfo);
        setShowThankYouModal(true);
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      // You can implement a toast notification or error modal here instead of alert
      // For now, we'll keep minimal error handling
    }
  };

  const handleCloseModals = () => {
    setShowBookingModal(false);
    setShowThankYouModal(false);
    setSelectedEvent(null);
    setBookingDetails(null);
  };

  return {
    selectedEvent,
    showBookingModal,
    showThankYouModal,
    bookingDetails,
    handleBookNow,
    handleBookingConfirm,
    handleCloseModals,
  };
};
