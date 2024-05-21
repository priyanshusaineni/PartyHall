// const express = require('express')
// let router = express.Router();
// const {saveHall}=require("../Controllers/hall.controller")
// router.use(express.json())
// const
// router.post("/",saveHall)

// module.exports = router

const express = require("express");
const router = express.Router();

router.use(express.json());
const { addHall, deleteHall } = require("../Controllers/hall.controller");
const {
  deleteAdmin,
  deleteUser,
  getBookings,
  acceptRequest,
} = require("../Controllers/superadmin.controller");
const { superAdminLogin } = require("../Controllers/auth.controller");

router.post("/halls", acceptRequest); //this accepts the request sent by admin
router.delete("/deleteAdmin/:id", deleteAdmin);
router.delete("/deleteUser/:id", deleteUser);
router.get("/bookings", getBookings);
router.delete("/deleteHall/:id", deleteHall);
router.post("/login", superAdminLogin);
// router.post("/signup", addNewSuperAdmin);

module.exports = router;
