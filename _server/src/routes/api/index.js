const router = module.exports = require('express').Router()

router.use('/users', require('./users'))
router.use('/auth', require('./auth'))
router.use('/posts', require('./post'))
router.use('*', (req, res) => {
  res.status(404).send({msg: 'Api method not found'})
})