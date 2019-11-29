const { User } = require('../models')

const getUsers = () => {
  return User.getUsers()
}

const getUserByEmail = (email) => {
  return User.getUser(email)
}

module.exports = {
  getUsers,
  getUserByEmail,
}