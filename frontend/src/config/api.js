// API Configuration
const API_BASE_URL = "https://event-booking-ticketing-system.onrender.com";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  EVENTS: {
    GET_ALL: `${API_BASE_URL}/api/events`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/events/${id}`,
  },
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/api/bookings`,
    GET_USER_BOOKINGS: `${API_BASE_URL}/api/bookings/user`,
  },
};

export default API_BASE_URL;
