const SuperAdminModel = require('../Models/superAdmin.model')
const HallModel = require('../Models/hall.model')
const AdminModel = require('../Models/admin.model')
const UserModel = require('../Models/user.model')
const { addHall } = require('../Controllers/hall.controller')

async function deleteAdmin(req, res) {
  const { id } = req.params
  console.log(id)
  const admin = await AdminModel.findOneAndDelete({ admin_id: id })
  if (!admin) {
    res.status(200).json({ message: 'Error! Invalid Admin ID' })
  } else {
    res.status(200).json({ message: 'Admin Deleted With Given Id' })
  }
}
async function deleteUser(req, res) {
  const { id } = req.params
  // console.log(user_id)
  const user = await UserModel.findOneAndDelete({ user_id: id })
  if (!user) {
    res.status(200).json({ message: 'Error! Invalid User ID' })
  } else {
    res.status(200).json({ message: 'User Deleted With Given Id' })
  }
}
async function getBookings() {}

async function acceptRequest(req, res) {
  const { hall_id } = req.body
  const superAdmin = await SuperAdminModel.findOne({})
  let reqs = superAdmin.requests_pending_to_add_hall
  let hall1 = await HallModel.findOne({ hall_id: hall_id })
  if (hall1 != null) {
    res.status(404).send('Hall id is taken!')
    return
  }

  hall1 = reqs.find((hall) => hall.hall_id == hall_id)

  if (!hall1) {
    res.status(404).send('NO hall found!')
    return
  }
  console.log(hall1)

  reqs = reqs.filter((hall) => hall.hall_id != hall_id)
  const requsts = await SuperAdminModel.findOneAndUpdate({
    requests_pending_to_add_hall: reqs,
  })

  await addHall(hall1, req, res)
}

module.exports = {
  deleteAdmin,
  deleteUser,
  getBookings,
  acceptRequest,
}
