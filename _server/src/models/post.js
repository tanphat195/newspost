const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')

const getPostById = async (post_id) => {
  const postsString = await Caching.hget(CachingKey.POSTS_KEY, post_id)
  return JSON.parse(postsString)
}

const getPosts = async () => {
  const postsString = await Caching.hgetall(CachingKey.POSTS_KEY)
  const posts = Object.values(postsString).reduce((prev, value) => ([
    ...prev,
    JSON.parse(value),
  ]), [])
  return posts
}

const getPostsByUserEmail = async (email) => {
  const posts = await getPosts()
  return posts.filter(item => item.creator === email)
}

const createPost = async (post) => {
  return Caching.hset(CachingKey.POSTS_KEY, post.id, JSON.stringify({...post, created_at: new Date()}))
}

const updatePost = async (post) => {
  // const get_post = await getPost(post.id);
  // return Caching.hset(CachingKey.POSTS_KEY, JSON.stringify({...get_post, ...post}))
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