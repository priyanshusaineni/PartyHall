const AdminModel = require('../Models/admin.model')
const UserModel = require('../Models/user.model')

//auth controller
async function isSuperAdmin() {
  // token based auth is required
  return true
}

async function isAdmin() {
  // token based auth is required
  return true
}

async function addNewUser(req, res) {
  const {
    user_id,
    user_name,
    user_email,
    user_password,
    user_age,
    user_mobile_no,
  } = req.body

  const user = await UserModel.findOne({ user_id: user_id })
  if (user) {
    res
      .status(404)
      .json({ message: 'User already exists kindly please login !' })
  } else {
    if (user_id || user_name || user_email || user_password || user_mobile_no) {
      const user = await UserModel.create({
        user_id,
        user_name,
        user_email,
        user_password,
        user_age,
        user_mobile_no,
      })
      res.status(201).json(user)
      return
    } else {
      res.status(400).json({ message: 'Please enter all details' })
      return
    }
  }
}

async function userLogin(req, res) {}

async function addNewAdmin(req, res) {
  const { admin_id, admin_name, admin_email, admin_password, admin_mobile_no } =
    req.body

  const admin = await AdminModel.findOne({ admin_id: admin_id })
  if (admin) {
    res.status(404).json({ message: 'Admin already exists please login' })
    return
  } else {
    if (
      admin_id ||
      admin_name ||
      admin_email ||
      admin_password ||
      admin_mobile_no
    ) {
      const admin = await AdminModel.create({
        admin_id,
        admin_name,
        admin_email,
        admin_password,
        admin_mobile_no,
      })
      res.status(201).json(admin)
      return
    } else {
      res.status(404).json({ message: 'Please enter all the required details' })
    }
  }
}

async function adminLogin() {}

// async function addNewSuperAdmin() {}

async function superAdminLogin() {}

module.exports = {
  addNewUser,
  userLogin,
  isSuperAdmin,
  isAdmin,
  addNewAdmin,
  adminLogin,
  // addNewSuperAdmin,
  superAdminLogin,
}
