import express from "express";
import { protect } from "../middleware/auth.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

const router = express.Router();

// Create booking (authenticated users)
router.post("/", protect, async (req, res) => {
  try {
    const { eventId, numberOfTickets, attendeeInfo } = req.body;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check seat availability
    if (event.availableSeats < numberOfTickets) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Calculate total amount
    const totalAmount = event.price * numberOfTickets;

    // Generate booking reference
    const bookingReference =
      "BK" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      numberOfTickets,
      totalAmount,
      bookingReference,
      attendeeInfo,
    });

    // Update available seats
    event.availableSeats -= numberOfTickets;
    await event.save();

    // Populate booking with event details
    await booking.populate("event", "title date venue");

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's bookings
router.get("/user", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event", "title date venue price")
      .sort({ bookingDate: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single booking
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("event", "title date venue price address")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
