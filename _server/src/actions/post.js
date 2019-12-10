const { Post } = require('../models')
const { multer, storage, imageFilter } = require('../utils/storage')
const FormData = require('form-data')
const { getFormData } = require('../utils')
const fs = require('fs')
const _Blob = require('cross-blob')

const getPostById = (post_id) => {
  return Post.getPostById(post_id)
}

const getPosts = (query) => {
  return Post.getPosts(query)
}

const getPostsByUserEmail = (email) => {
  return Post.getPostsByUserEmail(email)
}

const createPost = (body, user) => {
  // let upload = multer({ storage, fileFilter: imageFilter }).single('photo')

  const formData = new FormData(body.form)
  const post = getFormData(formData)
  // const photo = new _Blob([getFormData(formData).photo], {lastModified: Date.now()})

  // console.log(formData);
  // upload(req, res, (err) => {
  //   console.log(req.body);
  //   if (req.fileValidationError) {
  //     return res.send(req.fileValidationError);
  //   }
  //   else if (!req.file) {
  //     return res.send('Please select an image to upload');
  //   }
  //   else if (err instanceof multer.MulterError) {
  //     return res.send(err);
  //   }
  //   else if (err) {
  //     return res.send(err);
  //   }
  //   return res.send('hello')
  // })
  return Post.createPost({...post, creator: user.email})
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