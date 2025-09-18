import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add an event title"],
    trim: true,
    maxlength: [100, "Title can not be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [1000, "Description can not be more than 1000 characters"],
  },
  date: {
    type: Date,
    required: [true, "Please add an event date"],
  },
  time: {
    type: String,
    required: [true, "Please add an event time"],
  },
  venue: {
    type: String,
    required: [true, "Please add a venue"],
    trim: true,
    maxlength: [200, "Venue can not be more than 200 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
    maxlength: [300, "Address can not be more than 300 characters"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: ["conference", "concert", "sports", "theater", "workshop", "other"],
  },
  price: {
    type: Number,
    required: [true, "Please add a ticket price"],
    min: [0, "Price must be a positive number"],
  },
  totalSeats: {
    type: Number,
    required: [true, "Please add total seats"],
    min: [1, "Total seats must be at least 1"],
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "default-event.jpg",
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Set available seats to total seats before saving (for new events)
eventSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

// Add index for better query performance
eventSchema.index({ date: 1, category: 1 });
eventSchema.index({ title: "text", description: "text" });

export default mongoose.model("Event", eventSchema);
