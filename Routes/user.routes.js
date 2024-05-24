const express = require("express");
const { addNewUser, userLogin } = require("../Controllers/auth.controller");
const multer = require("multer");

const {
  getUserBookings,
  bookHall,
  getProfile,
  getAvailableHalls,
  editProfile,
  addReview,
  deleteReview,
  editReview,
  getReview,
} = require("../Controllers/user.controller");
const {
  getHalls,
  getHallsById,
  uploadHallImage,
  getHallImage,
  updateHallImage,
} = require("../Controllers/hall.controller");
const router = express.Router();

router.use(express.json());

router.post("/login", userLogin);
router.post("/signup", addNewUser);
router.get("/bookings", getUserBookings);
router.get("/getHalls", getHalls);
router.get("/getAvailableHalls/:date", getAvailableHalls);
router.get("/getHalls/:id", getHallsById);
router.post("/bookHall/:id", bookHall);
router.get("/getProfile/:id", getProfile);
router.put("/editProfile/:id", editProfile);

router.post("/review", addReview);
router.delete("/review/:id", deleteReview);
router.put("/review/:id", editReview);
router.get("/review/:id", getReview);

const upload = multer({ storage: multer.memoryStorage() });
router.post("/uploadImage/:id", upload.single("image"), uploadHallImage);
router.post("/updateImage/:id", upload.single("image"), updateHallImage);
router.get("/image/:id", getHallImage);
module.exports = router;
