// Helps the admin to save the new halls in the database
const HallModel = require("../Models/hall.model");
const { isSuperAdmin } = require("../Controllers/auth.controller");
async function addHall(hall1, req, res) {
  if (isSuperAdmin()) {
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
    } = hall1;

    //if the hall id is repeated reject the request
    const hall = await HallModel.findOne({ hall_id: hall_id });
    if (hall) {
      res.status(404).send("Hall id is taken!");
      return;
    }

    if (
      hall_id ||
      hall_name ||
      hall_image ||
      hall_address ||
      admin_id ||
      status ||
      hall_rental_cost ||
      hall_max_capacity ||
      hall_price_per_plate ||
      hall_catering ||
      hall_duration
    ) {
      const hall = await HallModel.create({
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
      });
      res.status(200).json(hall);
      return;
    }
    res.status(404).json({ message: "Enter all the required fields" });
    return;
  }
  res.status(404).send("You do not have acess to save the hall");
}

// //Helps the admin to edit the details of the halls and save it again in the database

async function editHall(req, res) {
  // const hall = await hallModel.findByIdAndUpdate(hallID, req.body)
  // if (!hall) {
  //   res.status(200).send({ message: 'Error! Invalid Hall ID' })
  // } else {
  //   const updateHall = await hallModel.findById(hallID)
  //   res.status(200).json(updateHall)
  // }
}

async function getHalls() {}

async function getHallsById() {}

async function getAvailableHalls() {}

async function deleteHall() {}

module.exports = {
  addHall,
  getHalls,
  editHall,
  deleteHall,
  getAvailableHalls,
  getHallsById,
};
