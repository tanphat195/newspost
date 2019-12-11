const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')

const userToJSON = user => ({
  email: user.email,
  full_name: user.full_name,
  gender: user.gender,
  avatar: user.avatar,
  phone_number: user.phone_number,
  birthday: user.birthday,
})

const getUser = async (email) => {
  const user = await Caching.hget(CachingKey.USERS_KEY, email)
  return JSON.parse(user)
}

const getUsers = async () => {
  const usersString = await Caching.hgetall(CachingKey.USERS_KEY)
  const users = Object.values(usersString || '').reduce((prev, value) => ([
    ...prev,
    JSON.parse(value),
  ]), [])
  return users
}

const createUser = async (user) => {
  return Caching.hset(CachingKey.USERS_KEY, user.email, JSON.stringify(user))
}

const updateUser = async (user) => {
  const get_user = await getUser(user.email);
  await Caching.hset(CachingKey.USERS_KEY, user.email, JSON.stringify({...get_user, ...user}))
  return userToJSON({...get_user, ...user})
}

const removeUser = (email) => {
  return Caching.hdel(CachingKey.USERS_KEY, email)
}

module.exports = {
  getUser, getUsers, createUser, updateUser, removeUser, userToJSON,
}