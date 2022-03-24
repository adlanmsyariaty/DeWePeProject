const express = require('express')
const router = express.Router()
const ControllerConcert = require('../controllers/controllerConcert')

// router.get('/:concertId/booking', ControllerConcert.bookingConcert)
router.get('/:userId', ControllerConcert.showConcerts)

module.exports = router