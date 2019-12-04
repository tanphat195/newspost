const { User } = require('../models')

const getUsers = () => {
  return User.getUsers()
}

const getUserByEmail = (email) => {
  return User.getUser(email)
}

const updateProfile = (user) => {
  return User.updateUser(user);
}

module.exports = {
  getUsers,
  getUserByEmail,
  updateProfile,
}