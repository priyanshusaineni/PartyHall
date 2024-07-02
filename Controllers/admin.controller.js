const AdminModel = require("../Models/admin.model");
const HallModel = require("../Models/hall.model");
const SuperAdminModel = require("../Models/superAdmin.model");
const { verify1 } = require("./user.controller");
//admin controller
async function isAdmin(req, res) {
  const { id } = req.params;
  console.log(id);
  const admin = await AdminModel.findOne({ admin_id: id });
  if (admin) {
    //If admin is found,return true
    return true;
  } else {
    //if admin is not found ,return message
    return false;
  }
}

async function getHallsByAdmin(req, res) {
  const { id } = req.params;
  const admin = await AdminModel.findOne({ admin_id: id });
  if (admin) {
    const halls = await HallModel.find({ admin_id: id });

    //If admin is found,return true
    res.status(200).send(halls);
    return;
  } else {
    //if admin is not found ,return message
    res.status(400).send("NO admin found!");
  }
}

async function getAdminProfile(req, res) {
  let err = await verify1(req);
  console.log("hello");
  if (err == 1) {
    res.status(404).send({ message: "Token mismatch" });
    return;
  }
  const { id } = req.params;
  const isAdminFound = await isAdmin(req, res);
  console.log(isAdminFound, id);

  if (isAdminFound) {
    // If admin is found, return all details
    const adminDetails = await AdminModel.findOne({ admin_id: id });
    console.log(adminDetails);
    res.status(200).json(adminDetails);
  } else {
    // If admin is not found, return message
    res.status(404).json({ message: "Error!Admin Not Found" });
  }
}

async function editAdminProfile(req, res) {
  console.log("hii", req.body);
  let err = await verify1(req);
  if (err == 1) {
    res.status(404).send({ message: "Token mismatch" });
    return;
  }
  const { id } = req.params;
  const isAdminFound = await isAdmin(req, res);
  if (isAdminFound) {
    const admin = await AdminModel.findOneAndUpdate(
      { admin_id: id },
      {
        admin_name: req.body.name,
        admin_email: req.body.email,
        admin_mobile_no: req.body.mobileNumber,
      }
    );
    console.log("hdfh", admin);
    if (admin) {
      const updatedAdmin = await AdminModel.findOne({ admin_id: id });
      console.log(updatedAdmin);
      res.status(200).json(updatedAdmin);
    } else {
      res.status(404).json({ message: "Error!Admin Not Found to Edit" });
    }
  } else {
    res.status(404).json({ message: "Error!Admin Not Found" });
  }
}

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

async function requestToAddHall(req, res) {
  let err = await verify1(req);
  if (err == 1) {
    res.status(404).send({ message: "Token mismatch" });
    return;
  }

  const {
    hall_id,
    hall_name,
    hall_image,
    hall_address,
    admin_id,
    status,
    hall_rental_cost,
    hall_max_capacity,
    hall_price_per_plate,
    hall_catering,
    hall_duration,
    hall_rating,
  } = req.body;

  console.log(req.body, "Request body received"); // Log entire request body
  console.log(hall_image, "Received hall image");

  const hall = {
    hall_id,
    hall_name,
    hall_image,
    hall_address,
    admin_id,
    status,
    hall_rental_cost,
    hall_max_capacity,
    hall_price_per_plate,
    hall_catering,
    hall_duration,
    hall_rating,
  };

  let hall1 = await HallModel.findOne({ hall_id: hall_id });
  console.log(hall1);
  if (hall1) {
    res.status(404).send("Hall id is taken!");
    return;
  }

  const superAdmin = await SuperAdminModel.findOne({});
  const reqs = superAdmin.requests_pending_to_add_hall;
  const hall2 = reqs.find((h) => h.hall_id == hall_id);
  if (hall2) {
    res.status(404).send("Hall id is taken!");
    return;
  }

  reqs.push(hall);
  console.log(hall, "hall");

  await superAdmin.updateOne({ requests_pending_to_add_hall: reqs });
  res.status(200).send("hello");
}
module.exports = {
  isAdmin,
  getAdminProfile,
  editAdminProfile,
  requestToAddHall,
  getHallsByAdmin,
};
