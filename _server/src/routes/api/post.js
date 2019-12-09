const router = module.exports = require('express').Router()
const { postAction } = require('../../actions')
const { google_geo_key } = require('../../../config')
const Axios = require('axios')
const { multer, storage, imageFilter } = require('../../utils/storage')
const FormData = require('form-data')
const { getFormData } = require('../../utils')
const fs = require('fs')
const _Blob = require('cross-blob')

router.get('/', (req, res, next) => {
  postAction.getPosts(req.query)
    .then(data => res.json(data))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  postAction.getPostById(req.params.id)
    .then(post => res.json(post))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})

router.post('/', (req, res, next) => {
  let upload = multer({ storage, fileFilter: imageFilter }).single('photo')

  const formData = new FormData(req.body.form)
  const form = getFormData(formData)
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

  postAction.createPost(form)
    .then(post => res.json(post))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})

router.put('/', (req, res, next) => {
  postAction.updatePost(req.body)
    .then(post => res.json(post))
    .catch(errors => res.status(404).json({errors}))
})

router.delete('/:id', (req, res, next) => {
  postAction.deletePost(req.params.id)
    .then(post => res.json(post))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})