const mongoose = require("mongoose");
const HallModel = require("./hall.model");

const IdArray = new mongoose.Schema({
  hall_id: {
    type: String,
    required: true,
  },
});

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
  hall_ids: {
    type: [String],
  },
  requests_to_add_hall: {
    type: [HallModel.schema],
  },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
