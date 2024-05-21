const mongoose = require('mongoose')

const SuperAdminSchema = new mongoose.Schema({
  super_admin_id: {
    type: String,
    required: true,
  },
  super_admin_name: {
    type: String,
    required: true,
  },
  super_admin_email: {
    type: String,
    required: true,
  },
  super_admin_password: {
    type: String,
    required: true,
  },
  super_admin_mobile_no: {
    type: String,
    required: true,
  },
  requests_pending_to_add_hall : {
    type : [HallModel],
  }
})

const SuperAdminModel = mongoose.model('SuperAdmin', SuperAdminSchema)
module.exports = SuperAdminModel
