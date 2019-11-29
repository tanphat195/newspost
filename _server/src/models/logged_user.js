const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')

const getLoggedUser = async (email) => {
  const logged = await Caching.hget(CachingKey.LOGGED_USERS_KEY, email)
  return JSON.parse(logged)
}

const getLoggedUsers = async () => {
  const loggedsString = await Caching.hgetall(CachingKey.LOGGED_USERS_KEY)
  const loggeds = Object.values(loggedsString || '').reduce((prev, key) => ([
    ...prev,
    JSON.parse(key),
  ]), [])
  return loggeds
}

const createLoggedUser = async (email) => {
  return await Caching.hset(CachingKey.LOGGED_USERS_KEY, email, JSON.stringify(new Date()))
}

const updateLoggedUser = async (email) => {
  return await Caching.hset(CachingKey.LOGGED_USERS_KEY, email, JSON.stringify(new Date()))
}

const removeLoggedUser = (email) => {
  Caching.hdel(CachingKey.LOGGED_USERS_KEY, email)
}

module.exports = {
  getLoggedUser, getLoggedUsers, createLoggedUser, updateLoggedUser, removeLoggedUser,
}