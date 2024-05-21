//user controller
const BookingsModel = require('../Models/booking.model')
const UserModel = require('../Models/user.model')

async function getUserBookings(req, res) {
  let { id } = req.params
  let user_booking = await BookingsModel.find({ user_id: id })
  if (user_booking) {
    res.status(200).json(user_booking)
  } else {
    res.status(404).json({ message: 'No Bookings done by user' })
  }
}

async function bookHall() {}

async function getProfile(req, res) {
  let { id } = req.params
  const user = await UserModel.findOne({ user_id: id })
  if (!user) {
    res.status(404).json({ message: 'User not found OR Invalid User' })
  } else {
    res.status(200).json(user)
  }
}

async function editProfile(req, res) {
  let { id } = req.params
  const user = await UserModel.findOneAndUpdate({ user_id: id }, req.body)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    const user = await UserModel.findOne({ user_id: id })
    res.status(200).json(user)
  }
}

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
