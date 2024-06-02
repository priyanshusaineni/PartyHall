const express = require("express");
const router = express.Router();

router.use(express.json());
const {
  getAdminProfile,
  editAdminProfile,
  requestToAddHall,
  getHallsByAdmin,
} = require("../Controllers/admin.controller");

const {
  addNewAdmin,
  adminLogin,
  verifyToken,
} = require("../Controllers/auth.controller");
const {
  getHalls,
  editHall,
  deleteHall,
} = require("../Controllers/hall.controller");

router.get("/halls/:id", getHallsByAdmin);
router.post("/signup", addNewAdmin);
router.post("/login", adminLogin);
router.get("/dashboard", getHalls);
router.put("/editHall/:id", verifyToken, editHall);
router.delete("/deleteHall/:id", verifyToken, deleteHall);
router.get("/profile/:id", verifyToken, getAdminProfile);
router.put("/editProfile/:id", verifyToken, editAdminProfile);
router.post("/addHall", verifyToken, requestToAddHall);

module.exports = router;
