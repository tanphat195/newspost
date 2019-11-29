const { Post } = require('../models')

const getPostById = (post_id) => {
  return Post.getPostById(post_id)
}

const getPostsRange = (start, end) => {
  return Post.getPostsRange(start, end)
}

const getPosts = () => {
  return Post.getPosts()
}

const getPostsByUserEmail = (email) => {
  return Post.getPostsByUserEmail(email)
}

const createPost = post => {
  return Post.createPost(post)
}

module.exports = {
  getPostById,
  getPostsRange,
  getPosts,
  getPostsByUserEmail,
  createPost,
}