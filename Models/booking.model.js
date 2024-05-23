const mongoose = require("mongoose");

const bookingRecordSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
  },
  hall_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  booked_date: {
    type: Date,
    required: true,
  },
  duration_hours: {
    type: Number,
    required: true,
  },
  // cancellation_buffer_days: {
  //   type: Number,
  //   required: true,
  // },
  paid_amount_as_rent: {
    type: Number,
    required: true,
  },
  number_of_guests: {
    type: Number,
    required: true,
  },
  event_type: {
    type: String,
    required: true,
  },
  catering_amount_paid: {
    type: Number,
    required: true,
  },
  total_amount_paid: {
    type: Number,
    required: true,
  },
});

const calendarSchema = new mongoose.Schema({
  date: Date,
  halls_booked: [String],
  // expires: "6m",
});

const BookingsSchema = new mongoose.Schema({
  bookingRecords: [bookingRecordSchema],
  calendar: [calendarSchema],
});

const BookingsModel = mongoose.model("Bookings", BookingsSchema);

module.exports = BookingsModel;
