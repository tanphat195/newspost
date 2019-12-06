const router = module.exports = require('express').Router()
const { geoAction } = require('../../actions')

router.get('/', async (req, res) => {
  geoAction.getLocation(req.query.address)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err))
})