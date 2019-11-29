const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')

const getPostById = async (post_id) => {
  const postsString = await Caching.getLRange(CachingKey.POSTS_KEY, 0, -1)
  const posts = postsString.map(item => JSON.parse(item))
  return posts.find(item => item.id === post_id)
}

const getPostsRange = async (start, end) => {
  const postsString = await Caching.getLRange(CachingKey.POSTS_KEY, start, end)
  return postsString.map(item => JSON.parse(item))
}

const getPosts = async () => {
  const postsString = await Caching.getLRange(CachingKey.POSTS_KEY, 0, -1)
  return postsString.map(item => JSON.parse(item))
}

const getPostsByUserEmail = async (email) => {
  const postsString = await Caching.getLRange(CachingKey.POSTS_KEY, 0, -1)
  const posts = postsString.map(item => JSON.parse(item))
  return posts.filter(item => item.creator === email)
}

const createPost = async (post) => {
  return Caching.pushRightList(CachingKey.POSTS_KEY, JSON.stringify({...post, created_at: new Date()}))
}

const updatePost = async (post) => {
  // const get_post = await getPost(post.id);
  // return Caching.hset(CachingKey.POSTS_KEY, JSON.stringify({...get_post, ...post}))
}

const removePost = (post_id) => {
  return Caching.hdel(CachingKey.POSTS_KEY, post_id)
}

module.exports = {
  getPostById, getPostsRange, getPosts, getPostsByUserEmail, createPost, updatePost, removePost,
}