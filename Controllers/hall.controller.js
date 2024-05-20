// Helps the admin to save the new halls in the database
async function saveHall(req, res) {
  const { hallID, hallNo, adminID, status, price, type } = req.body
  const hall = await hallModel.create({
    hallID,
    hallNo,
    adminID,
    status,
    price,
    type,
  })
  res.status(200).json(hall)
}

//Helps the admin to edit the details of the halls and save it again in the database

async function editHall(req, res) {
  const hall = await hallModel.findByIdAndUpdate(hallID, req.body)
  if (!hall) {
    res.status(200).send({ message: 'Error! Invalid Hall ID' })
  } else {
    const updateHall = await hallModel.findById(hallID)
    res.status(200).json(updateHall)
  }
}
