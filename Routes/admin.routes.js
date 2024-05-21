const express = require('express')
const router = express.Router()

router.use(express.json())
const {
  getAdminProfile,
  editAdminProfile,
  requestToAddHall,
} = require('../Controllers/admin.controller')

const { addNewAdmin, adminLogin } = require('../Controllers/auth.controller')
const {
  getHalls,
  editHall,
  deleteHall,
} = require('../Controllers/hall.controller')

// router.get('/:id', getAdmin)
router.post('/signup', addNewAdmin)
router.post('/login', adminLogin)
router.get('/dashboard', getHalls)
router.put('/editHall/:id', editHall)
router.delete('/deleteHall/:id', deleteHall)
router.get('/profile/:id', getAdminProfile)
router.put('/editProfile/:id', editAdminProfile)
router.post('/addHall', requestToAddHall)

module.exports = router
