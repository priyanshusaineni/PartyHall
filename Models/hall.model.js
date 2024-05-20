const mongoose = require('mongoose')

const HallSchema = new mongoose.Schema({
  hall_id: {
    type: String,
    required: true,
  },
  hall_no: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

const HallModel = mongoose.model('halls', HallSchema)

module.exports = HallModel
