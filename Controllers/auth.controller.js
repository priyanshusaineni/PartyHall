const AdminModel = require('../Models/admin.model')
const UserModel = require('../Models/user.model')
const jwt = require('jsonwebtoken')
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
async function userLogin(req, res) {
  console.log("user login")
  const { user_id, user_password } = req.body
  const user = await UserModel.findOne({ user_id, user_password })
  if(!user) {
    res.status(404).send("no user found!")
    return
  }
  console.log(user_id)
  jwt.sign({ user_id }, 'secret', (err, token) => {
    res.status(200).send({ token })
  })
}

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(404).send('Please Login no token present')
    return
  }
  token = req.headers.authorization.split(' ')[1]
  req.token = token
  if (token) {
    // console.log(token)
    next()
  } else {
    res.status(404).send('No token found')
  }
  // token=
  // req.token=token;
  // next();
}

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

async function adminLogin(req, res) {
  const { admin_email } = req.body
  console.log(admin_email)
  jwt.sign({ admin_email }, 'secret', (err, token) => {
    res.send({ token })
  })
}

// async function addNewSuperAdmin() {}

async function superAdminLogin() {}

module.exports = {
  addNewUser,
  userLogin,
  isSuperAdmin,
  isAdmin,
  addNewAdmin,
  adminLogin,
  verifyToken,
  // addNewSuperAdmin,
  superAdminLogin,
}
