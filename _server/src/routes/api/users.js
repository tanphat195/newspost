const router = module.exports = require('express').Router()
const { userAction, postAction } = require('../../actions')

router.get('/', (req, res, next) => {
  userAction.getUsers()
    .then(users => {
      return res.json({users})
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  userAction.getUserById(req.params.id)
    .then(user => res.json(user))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})

router.get('/:id/posts', (req, res, next) => {
  postAction.getPostsByUserEmail(req.params.id)
    .then(posts => res.json({posts}))
    .catch(errors => res.status(404).json({errors: 'Not found'}))
})