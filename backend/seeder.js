import dotenv from "dotenv";
import mongoose from "mongoose";
import Booking from "./models/Booking.js";
import Event from "./models/Event.js";
import User from "./models/User.js";

dotenv.config();

const users = [
  {
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "user",
    phone: "+1234567890",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    phone: "+1234567891",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
    phone: "+1234567892",
  },
];

const events = [
  {
    title: "Tech Conference 2025",
    description:
      "Annual technology conference featuring the latest innovations in AI, blockchain, and web development.",
    date: new Date("2025-12-15"),
    time: "09:00 AM",
    venue: "Convention Center",
    address: "123 Tech Street, Silicon Valley, CA",
    category: "conference",
    price: 299,
    totalSeats: 500,
    availableSeats: 500,
    image: "tech-conference.jpg",
  },
  {
    title: "Summer Music Festival",
    description:
      "Three-day music festival featuring top artists from around the world.",
    date: new Date("2025-07-20"),
    time: "06:00 PM",
    venue: "Central Park",
    address: "Central Park, New York, NY",
    category: "concert",
    price: 150,
    totalSeats: 2000,
    availableSeats: 2000,
    image: "music-festival.jpg",
  },
  {
    title: "Basketball Championship",
    description: "City basketball championship finals. Don't miss the action!",
    date: new Date("2025-06-10"),
    time: "07:30 PM",
    venue: "Sports Arena",
    address: "456 Sports Ave, Los Angeles, CA",
    category: "sports",
    price: 75,
    totalSeats: 15000,
    availableSeats: 15000,
    image: "basketball.jpg",
  },
  {
    title: "Web Development Workshop",
    description: "Hands-on workshop on modern React and Node.js development.",
    date: new Date("2025-05-25"),
    time: "10:00 AM",
    venue: "Learning Center",
    address: "789 Education Blvd, Boston, MA",
    category: "workshop",
    price: 99,
    totalSeats: 50,
    availableSeats: 50,
    image: "workshop.jpg",
  },
  {
    title: "Shakespeare in the Park",
    description:
      "Classic theater performance of Hamlet in the beautiful outdoor setting.",
    date: new Date("2025-08-15"),
    time: "08:00 PM",
    venue: "Park Theater",
    address: "Shakespeare Garden, London, UK",
    category: "theater",
    price: 45,
    totalSeats: 300,
    availableSeats: 300,
    image: "theater.jpg",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();
    await Booking.deleteMany();
    console.log("Cleared existing data");

    // Create users
    const createdUsers = await User.create(users);
    console.log("Users created");

    // Create events with admin as organizer
    const adminUser = createdUsers.find((user) => user.role === "admin");
    const eventsWithOrganizer = events.map((event) => ({
      ...event,
      organizer: adminUser._id,
    }));

    const createdEvents = await Event.create(eventsWithOrganizer);
    console.log("Events created");

    // Create sample bookings
    const regularUser = createdUsers.find((user) => user.role === "user");
    const sampleBookings = [
      {
        user: regularUser._id,
        event: createdEvents[0]._id,
        numberOfTickets: 2,
        totalAmount: createdEvents[0].price * 2,
        bookingReference: "BK" + Date.now() + "DEMO1",
        attendeeInfo: {
          name: regularUser.name,
          email: regularUser.email,
          phone: regularUser.phone,
        },
      },
      {
        user: regularUser._id,
        event: createdEvents[1]._id,
        numberOfTickets: 1,
        totalAmount: createdEvents[1].price,
        bookingReference: "BK" + (Date.now() + 1000) + "DEMO2",
        attendeeInfo: {
          name: regularUser.name,
          email: regularUser.email,
          phone: regularUser.phone,
        },
      },
    ];

    await Booking.create(sampleBookings);
    console.log("Sample bookings created");

    console.log("Database seeded successfully!");
    console.log("\nDemo Credentials:");
    console.log("User: user@example.com / password123");
    console.log("Admin: admin@example.com / admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
