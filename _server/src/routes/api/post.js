const router = module.exports = require('express').Router()
const { postAction } = require('../../actions')

router.get('/', (req, res, next) => {
  const { start, end } = req.query
  if (start || end) {
    postAction.getPostsRange(start, end)
    .then(posts => {
      return res.json({posts})
    })
    .catch(next)
  } else {
    postAction.getPosts()
    .then(posts => {
      return res.json({posts})
    })
    .catch(next)
  }
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