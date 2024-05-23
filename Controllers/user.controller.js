//user controller
const HallModel = require("../Models/hall.model");
const BookingsModel = require("../Models/booking.model");
const UserModel = require("../Models/user.model");
const { getBookings } = require("../Controllers/superadmin.controller");

async function getUserBookings(req, res) {
  let { id } = req.params;
  let user_booking = await BookingsModel.find({ user_id: id });
  if (user_booking) {
    res.status(200).json(user_booking);
  } else {
    res.status(404).json({ message: "No Bookings done by user" });
  }
}

function isPaymentDone() {
  return true;
}

function generateRandomId() {
  function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }

  const part1 = generateRandomString(4);
  const part2 = generateRandomString(4);
  const part3 = generateRandomString(4);

  const randomId = `${part1}-${part2}-${part3}`;

  return randomId;
}

async function bookHall(req, res) {
  if (!isPaymentDone) {
    res.status(404).send("Payment is pending!");
    return;
  }
  const { id } = req.params;
  const {
    user_id,
    booked_date,
    duration_hours,
    // cancellation_buffer_days,
    paid_amount_as_rent,
    number_of_guests,
    event_type,
    catering_amount_paid,
    total_amount_paid,
  } = req.body;

  let booking_id = generateRandomId();
  const bookings = await BookingsModel.findOne({});
  let bookingRecords = bookings.bookingRecords;

  let repeatedId = bookingRecords.filter(
    (bookingRecord) => bookingRecord.booking_id === booking_id
  );
  while (repeatedId.length !== 0) {
    booking_id = generateRandomId();
    repeatedId = bookingRecords.filter(
      (bookingRecord) => bookingRecord.booking_id === booking_id
    );
  }

  //check if hall id ,user id is valid or not
  const halls = await HallModel.find({});
  const users = await UserModel.find({});
  const hallExists = halls.find((hall) => hall.hall_id === id);
  const userExists = users.find((user) => user.user_id === user_id);

  if (hallExists || userExists) {
    console.log("Both hall and user exist.");
  } else {
    res.status(404).send("Hall or user does not exist!");
    return;
  }

  let cal = bookings.calendar;
  //calendar is an array which has dates array
  //check if the cal already has a entry on the booked_date
  const bookedDate = new Date(booked_date);
  let particularDate = cal.find(
    (dateObj) => dateObj.date.getTime() === bookedDate.getTime()
  );

  let halls_booked = [];
  if (particularDate) halls_booked = particularDate.halls_booked;

  let contains = halls_booked.find((hall_id) => hall_id === id);
  if (contains) {
    res.status(404).send("The date is already booked for this hall!");
    return;
  }

  halls_booked.push(id);

  const obj = { date: bookedDate, halls_booked: halls_booked };
  cal.push(obj);
  //if it has push the hall_id onto the booked_halls array of the given date
  //if the hall_id is already present in the booked_halls array then return the date is already booked

  if (
    booking_id ||
    id ||
    user_id ||
    booked_date ||
    duration_hours ||
    // cancellation_buffer_days ||
    paid_amount_as_rent ||
    number_of_guests ||
    event_type ||
    catering_amount_paid ||
    total_amount_paid
  ) {
    let newRecord = {
      booking_id,
      user_id,
      hall_id: id,
      booked_date,
      duration_hours,
      // cancellation_buffer_days,
      paid_amount_as_rent,
      number_of_guests,
      event_type,
      catering_amount_paid,
      total_amount_paid,
    };
    bookingRecords.push(newRecord);

    //To clear the database
    // bookingRecords = [];
    // cal = [];

    const booking = await BookingsModel.updateOne({
      bookingRecords: bookingRecords,
      calendar: cal,
    });
    res.status(200).json(booking);
    return;
  }

  res.status(200).send("Hall is booked!");
}

async function getAvailableHalls(req, res) {
  let date = req.params.date;
  const bookings = await BookingsModel.findOne({});
  let cal = bookings.calendar;

  const bookedDate = new Date(date);
  let particularDate = cal.find(
    (dateObj) => dateObj.date.getDate() === bookedDate.getDate()
  );

  // console.log(bookedDate, particularDate);
  let halls_booked = [];
  if (particularDate) halls_booked = particularDate.halls_booked;

  const halls = await HallModel.find({});
  console.log("halls booked : ", halls_booked, halls);
  let unbooked = halls.filter((hall) => !halls_booked.includes(hall.hall_id));

  res.status(200).send(unbooked);
}

async function getProfile(req, res) {
  let { id } = req.params;
  const user = await UserModel.findOne({ user_id: id });
  if (!user) {
    res.status(404).json({ message: "User not found OR Invalid User" });
  } else {
    res.status(200).json(user);
  }
}

async function editProfile(req, res) {
  let { id } = req.params;
  const user = await UserModel.findOneAndUpdate({ user_id: id }, req.body);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    const user = await UserModel.findOne({ user_id: id });
    res.status(200).json(user);
  }
}

async function getBookingsCalendar(req, res) {
  const calendar = BookingsModel.calendar;
  if (calendar) {
    res.status(200).send(calendar);
    return;
  }
  res.status(404).send("No calendar found!");
}

module.exports = {
  getUserBookings,
  bookHall,
  getProfile,
  editProfile,
  getBookingsCalendar,
  getAvailableHalls,
};
