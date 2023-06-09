const express = require('express')
const router = express.Router()
const { register, login ,userUpdate,getUserAndDestination} = require('../controllers/auth')

router.route('/auth/register').post(register)
router.route('/auth/login').post(login)
router.route('/destination/:destinationId/user/:userId').get(getUserAndDestination).patch(userUpdate);
module.exports = router
