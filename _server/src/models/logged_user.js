const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')

const getLoggedUser = async (email) => {
  const loggedString = await Caching.hget(CachingKey.LOGGED_USERS_KEY, email)
  const logged = JSON.parse(loggedString)
  return logged
}

const getLoggedUsers = async () => {
  const loggedsString = await Caching.hgetall(CachingKey.LOGGED_USERS_KEY)
  const loggeds = Object.values(loggedsString || '').reduce((prev, key) => ([
    ...prev,
    JSON.parse(key),
  ]), [])
  return loggeds
}

const createLoggedUser = async ({ email, token }) => {
  const data = {
    email, token, created_at: new Date(),
  }
  return await Caching.hset(CachingKey.LOGGED_USERS_KEY, email, JSON.stringify(data))
}

const updateLoggedUser = async (email, token) => {
  const data = {
    email, token, created_at: new Date(),
  }
  return await Caching.hset(CachingKey.LOGGED_USERS_KEY, email, JSON.stringify(data))
}

const removeLoggedUser = (email) => {
  Caching.hdel(CachingKey.LOGGED_USERS_KEY, email)
}

module.exports = {
  getLoggedUser, getLoggedUsers, createLoggedUser, updateLoggedUser, removeLoggedUser,
}