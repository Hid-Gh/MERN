
const express = require('express')
const router = express.Router()

const { getAllFlights, createFlight, deleteFlights} = require('../backend/controllers/flight')

router.route('/:id').get(getAllFlights).post(createFlight).delete(deleteFlights)

module.exports = router
