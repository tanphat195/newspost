const router = module.exports = require('express').Router()
const { postAction } = require('../../actions')
const { google_geo_key } = require('../../../config')
const Axios = require('axios')

router.get('/', (req, res, next) => {
  postAction.getPosts()
    .then(posts => {
      return res.json({posts})
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  postAction.getPostById(req.params.id)
    .then(post => res.json(post))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})

router.post('/', (req, res, next) => {
  postAction.createPost(req.body)
    .then(result => res.json(result))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})

router.put('/', (req, res, next) => {
  postAction.updatePost(req.body)
    .then(result => res.json(result))
    .catch(errors => res.status(404).json({errors}))
})

router.delete('/:id', (req, res, next) => {
  postAction.deletePost(req.params.id)
    .then(post => res.json(post))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})

router.post('/geo', (req, res) => {
  const { address } = req.query
  if (address) {
    Axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${google_geo_key}`)
      .then(res => {
        console.log(res.data)
        res.json(res)
      })
      .catch(err => {
        res.status(403).json({ errors: err })
      })
  } else {
    res.status(403).json({ errors: 'Address is required'})
  }
})