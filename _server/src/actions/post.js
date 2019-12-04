const { Post } = require('../models')

const getPostById = (post_id) => {
  return Post.getPostById(post_id)
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

const updatePost = post => {
  return Post.updatePost(post)
}

const deletePost = (post_id) => {
  return Post.deletePost(post_id)
}

module.exports = {
  getPostById,
  getPosts,
  getPostsByUserEmail,
  createPost,
  updatePost,
  deletePost,
}