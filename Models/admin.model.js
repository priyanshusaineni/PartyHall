const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: true,
  },
  admin_name: {
    type: String,
    required: true,
  },
  admin_email: {
    type: String,
    required: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
  admin_mobile_no: {
    type: String,
    required: true,
  },
  hall_id: {
    type: String,
    required: true,
  },
  hall_name: {
    type: String,
    required: true,
  },
  hall_address: {
    type: String,
    required: true,
  },
})

const AdminModel = mongoose.model('Admin', AdminSchema)

module.exports = AdminModel
