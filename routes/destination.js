const express = require('express')
const router = express.Router()

const {getAllDestinations,createDestination} = require('../controllers/destination')

router.route('/').get(getAllDestinations).post(createDestination)
//router.route('/:id/user/:userId').get(getDestination)
module.exports = router
