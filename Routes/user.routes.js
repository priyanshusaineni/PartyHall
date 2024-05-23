const express = require('express')
const { addNewUser, userLogin } = require('../Controllers/auth.controller')
const {
  getUserBookings,
  bookHall,
  getProfile,
  getAvailableHalls,
  editProfile,
  addReview,
  deleteReview,
  editReview,
} = require('../Controllers/user.controller')
const { getHalls, getHallsById } = require('../Controllers/hall.controller')
const router = express.Router()

router.use(express.json())

router.post('/login', userLogin)
router.post('/signup', addNewUser)
router.get('/bookings', getUserBookings)
router.get('/getHalls', getHalls)
router.get('/getAvailableHalls/:date', getAvailableHalls)
router.get('/getHalls/:id', getHallsById)
router.post('/bookHall/:id', bookHall)
router.get('/getProfile/:id', getProfile)
router.put('/editProfile/:id', editProfile)

router.post('/review', addReview)
router.delete('/review/:id', deleteReview)
router.put('/review/:id', editReview)
module.exports = router
