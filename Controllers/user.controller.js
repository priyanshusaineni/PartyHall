//user controller
const BookingsModel = require('../Models/booking.model')

async function getUserBookings() {}

async function bookHall() {}

async function getProfile() {}

async function editProfile() {}

async function getBookingsCalendar(req, res) {
  const calendar = BookingsModel.calendar
  if (calendar) {
    res.status(200).send(calendar)
    return
  }
  res.status(404).send('No calendar found!')
}

module.exports = {
  getUserBookings,
  bookHall,
  getProfile,
  editProfile,
  getBookingsCalendar,
}
