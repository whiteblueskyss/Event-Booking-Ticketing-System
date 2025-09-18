import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: [true, "Please specify number of tickets"],
    min: [1, "Number of tickets must be at least 1"],
    max: [10, "Cannot book more than 10 tickets at once"],
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount must be positive"],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "confirmed",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed"],
    default: "paid",
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true,
  },
  attendeeInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  // For seat selection feature (bonus)
  selectedSeats: [
    {
      seatNumber: String,
      seatRow: String,
    },
  ],
  qrCode: {
    type: String, // QR code for ticket verification
  },
});

// Generate booking reference before saving
bookingSchema.pre("save", function (next) {
  if (this.isNew) {
    this.bookingReference =
      "BK" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// Add indexes for better query performance
bookingSchema.index({ user: 1, bookingDate: -1 });
bookingSchema.index({ event: 1 });

export default mongoose.model("Booking", bookingSchema);
