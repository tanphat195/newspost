const router = module.exports = require('express').Router()
const { postAction, authAction } = require('../../actions')

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
  authAction.authenticate(req, (err, user) => {
    if (!err) {
      postAction.createPost(req.body, user)
      .then(post => res.json(post))
      .catch(errors => res.status(402).json({errors}))
    } else {
      res.status(401).json({errors: 'Not authenticated'})
    }
  })
})

router.put('/', (req, res, next) => {
  authAction.authenticate(req, (err, user) => {
    if (!err) {
      postAction.updatePost(req.body)
        .then(post => res.json(post))
        .catch(errors => res.status(404).json({errors}))
    } else {
      res.status(401).json({errors: 'Not authenticated'})
    }
  })
})

router.delete('/:id', (req, res, next) => {
  authAction.authenticate(req, (err, user) => {
    if (!err) {
      postAction.deletePost(req.params.id)
        .then(post => res.json(post))
        .catch(errors => res.status(404).json({errors}))
    } else {
      res.status(401).json({errors: 'Not authenticated'})
    }
  })
})