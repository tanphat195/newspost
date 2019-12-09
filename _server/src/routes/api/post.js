const router = module.exports = require('express').Router()
const { postAction } = require('../../actions')
const { google_geo_key } = require('../../../config')
const Axios = require('axios')

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
  postAction.createPost(req.body)
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