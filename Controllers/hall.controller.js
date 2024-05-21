// Helps the admin to save the new halls in the database
const HallModel = require('../Models/hall.model')
const { isSuperAdmin } = require('../Controllers/auth.controller')
async function addHall(req, res) {
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
    } = req.body

    //if the hall id is repeated reject the request
    const hall = await HallModel.findOne({ hall_id: hall_id })
    if (hall) {
      res.status(404).send('Hall id is taken!')
      return
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
      })
      res.status(200).json(hall)
      return
    }
    res.status(404).json({ message: 'Enter all the required fields' })
    return
  }
  res.status(404).send('You do not have acess to save the hall')
}

// //Helps the admin to edit the details of the halls and save it again in the database

async function editHall(req, res) {
  const {id}=req.params
  const hall = await HallModel.findOneAndUpdate({hall_id:id}, req.body)
  if (!hall) {
    res.status(200).send({ message: 'Error! Invalid Hall ID' })
  } else {
    const updateHall = await HallModel.findOne({hall_id:id})
    res.status(200).json(updateHall)
  }
}

async function getHalls(req,res) {
   const halls=await HallModel.find({})
   if(halls){
    res.status(200).json(halls)   
    return;
  }
}

async function getHallsById(req,res) {
  const {id}=req.params
  console.log(id)
  const hall=await HallModel.findOne({hall_id:id})
  if(!hall){
     res.status(404).json({ message: 'Error! Invalid Hall ID' })
  }else{
     res.status(200).json(hall)
  }
}

async function getAvailableHalls(req,res) {
  const halls=await HallModel.find({})
  const availableHalls=halls.filter((hall)=>(hall.status==="Available"))
  if (availableHalls.length > 0) {
    res.status(200).json(availableHalls);
  } else {
    res.status(404).json({ message: 'Halls Are Not Available' });
 }
  
}

async function deleteHall(req,res) {
  const {hall_id}=req.params
  console.log(hall_id)
  const hall=await HallModel.findOneAndDelete(hall_id)
  if(!hall){
     res.status(200).json({ message: 'Error! Invalid Hall ID' })
  }else{
     res.status(200).json({ message: 'Hall Deleted With Given Id' })
  }
}

module.exports = {
  addHall,
  getHalls,
  editHall,
  deleteHall,
  getAvailableHalls,
  getHallsById,
}
