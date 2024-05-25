// Helps the admin to save the new halls in the database
const HallModel = require("../Models/hall.model");
const { isSuperAdmin } = require("../Controllers/auth.controller");
// const { verify } = require('jsonwebtoken')
const { verify1 } = require("./user.controller");
const SuperAdminModel = require("../Models/superAdmin.model");

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
    if (hall_rating > 5 || hall_rating < 0) {
      res.status(404).send("Hall rating is not in acceptable range!");
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
  const { id } = req.params;
  const hall = await HallModel.findOneAndUpdate({ hall_id: id }, req.body);
  if (!hall) {
    res.status(200).send({ message: "Error! Invalid Hall ID" });
  } else {
    const updateHall = await HallModel.findOne({ hall_id: id });
    res.status(200).json(updateHall);
  }
}

async function getHalls(req, res) {
  const halls = await HallModel.find({});
  if (halls) {
    res.status(200).json(halls);
    return;
  }
}

async function getHallsById(req, res) {
  const { id } = req.params;
  console.log(id);
  const hall = await HallModel.findOne({ hall_id: id });
  if (!hall) {
    res.status(404).json({ message: "Error! Invalid Hall ID" });
  } else {
    res.status(200).json(hall);
  }
}

async function deleteHall(req, res) {
  let err = await verify1(req);
  if (err == 1) {
    res.status(404).send({ message: "Token mismatch" });
    return;
  }
  const { hall_id } = req.params;
  console.log(hall_id);
  const hall = await HallModel.findOneAndDelete(hall_id);
  if (!hall) {
    res.status(200).json({ message: "Error! Invalid Hall ID" });
  } else {
    res.status(200).json({ message: "Hall Deleted With Given Id" });
  }
}

async function uploadHallImage(req, res) {
  const hall_id = req.params.id;
  const hall = await HallModel.findOne({ hall_id: hall_id });
  console.log(hall);
  if (!hall) {
    res.status(404).json({ message: "NO Hall Found!" });
    return;
  }
  // if (hall.hall_image) {
  //   return res.status(404).send("Image Already uploaded.");
  // }

  console.log("uploading image");
  try {
    const newImage = {
      hall_id: hall_id,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    await HallModel.updateOne({ hall_id: hall_id }, { hall_image: newImage });
    res.send("Image uploaded successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error uploading image.");
  }
}

async function uploadHallImageReq(req, res) {
  const hall_id = req.params.id;
  const superAdmin = await SuperAdminModel.findOne({});
  let reqs = superAdmin.requests_pending_to_add_hall;
  const hall = reqs.find((hall) => hall.hall_id === hall_id);
  console.log(hall);
  const index1 = reqs.indexOf(hall);

  if (!hall) {
    res.status(404).json({ message: "NO Hall Found!" });
    return;
  }
  // if (hall.hall_image) {
  //   return res.status(404).send("Image Already uploaded.");
  // }

  console.log("uploading image");
  try {
    const newImage = {
      hall_id: hall_id,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    hall.hall_image = newImage;
    reqs[index1] = hall;
    await SuperAdminModel.findOneAndUpdate({
      requests_pending_to_add_hall: reqs,
    });
    res.send("Image uploaded successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error uploading image.");
  }
}

async function getHallImage(req, res) {
  const hall_id = req.params.id;
  try {
    const hall = await HallModel.findOne({ hall_id: hall_id });
    if (!hall) {
      res.status(404).json({ message: "NO Hall Found!" });
      return;
    }

    console.log(hall_id);
    const image = hall.hall_image;
    if (!image) {
      return res.status(404).send("Image not found.");
    }
    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
}

async function updateHallImage(req, res) {
  uploadHallImage(req, res);
  // const hall_id = req.params.id;
  // const hall = await HallModel.findOne({ hall_id: hall_id });
  // if (!hall) {
  //   res.status(404).json({ message: "NO Hall Found!" });
  //   return;
  // }

  // console.log("updating image");
  // try {
  //   await Image.updateOne(
  //     { hall_id: hall_id },
  //     { data: req.file.buffer, contentType: req.file.mimetype }
  //   );
  //   res.send("Image updated successfully!");
  // } catch (error) {
  //   res.status(400).send("Error uploading image.");
  // }
}

module.exports = {
  addHall,
  getHalls,
  editHall,
  deleteHall,
  getHallsById,
  uploadHallImage,
  getHallImage,
  updateHallImage,
  uploadHallImageReq,
};
