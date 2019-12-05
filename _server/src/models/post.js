const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')

const getPostById = async (post_id) => {
  const postsString = await Caching.hget(CachingKey.POSTS_KEY, post_id)
  return JSON.parse(postsString)
}

const getPosts = async () => {
  const postsString = await Caching.hgetall(CachingKey.POSTS_KEY)
  const posts = Object.values(postsString || '').reduce((prev, value) => ([
    ...prev,
    JSON.parse(value),
  ]), [])
  return posts
}

const getPostsByUserEmail = async (email) => {
  const posts = await getPosts()
  return posts.filter(item => item.creator === email)
}

const getsetNextId = async () => {
  const getCurrentIdString = await Caching.hget(CachingKey.COUNTER_KEY, 'posts')
  const currentId = parseInt(JSON.parse(getCurrentIdString || 0))
  await Caching.hset(CachingKey.COUNTER_KEY, 'posts', JSON.stringify(currentId + 1))
  return currentId + 1
}

const createPost = async (post) => {
  const id = await getsetNextId()
  const finalPost = {
    ...post,
    id,
    comments: [],
    favorited: [],
    created_at: new Date(),
  }
  return Caching.hset(CachingKey.POSTS_KEY, id, JSON.stringify(finalPost))
}

const updatePost = async (post) => {
  const get_post = await getPostById(post.id)
  if (get_post) {
    return Caching.hset(CachingKey.POSTS_KEY, post.id, JSON.stringify({...get_post, ...post}))
  } else {
    return Promise.reject('Post not exists')
  }
}

const deletePost = (post_id) => {
  return Caching.hdel(CachingKey.POSTS_KEY, post_id)
}

module.exports = {
  getPostById,
  getPosts,
  getPostsByUserEmail,
  createPost,
  updatePost,
  deletePost,
}