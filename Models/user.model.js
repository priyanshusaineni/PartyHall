const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_age: {
    type: String,
  },
  user_mobile_no: {
    type: String,
    required: true,
  },
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel
