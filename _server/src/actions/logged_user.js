const { LoggedUser } = require('../models')

const create = (email, callback) => {
  LoggedUser.getLoggedUser(email)
    .then(res => {
      callback(null, res)
    })
    .catch(err => {
      const newLoggedUser = LoggedUser.createLoggedUser(email)
      if (newLoggedUser) {
        callback(null, newLoggedUser)
      } else {
        callback({status: 500, msg: err})
      }
    })
}

module.exports = {
  create,
}