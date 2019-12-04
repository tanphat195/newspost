const router = module.exports = require('express').Router()
const { postAction } = require('../../actions')

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