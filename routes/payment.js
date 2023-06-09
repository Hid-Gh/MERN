const express = require('express')
const router = express.Router()

const { getPublishableKey, createPaymentIntent} = require('../controllers/payment')

router.route('/config').get(getPublishableKey)
router.route('/create-payment-intent').post(createPaymentIntent)

module.exports = router
