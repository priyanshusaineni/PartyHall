//auth controller
async function isSuperAdmin() {
  // token based auth is required
  return true
}

async function isAdmin() {
  // token based auth is required
  return true
}

async function addNewUser() {}

async function userLogin() {}

async function addNewAdmin() {}

async function adminLogin() {}

async function addNewSuperAdmin() {}

async function superAdminLogin() {}

module.exports = {
  addNewUser,
  userLogin,
  isSuperAdmin,
  isAdmin,
  addNewAdmin,
  adminLogin,
  addNewSuperAdmin,
  superAdminLogin,
}
