const express = require('express')
const router = express.Router()
const ControllerTicket = require('../controllers/controllerTicket')

// to => /tickets
router.get('/:userId/booking/:concertId', ControllerTicket.bookingTicket)
router.post('/:userId/booking/:concertId', ControllerTicket.saveBookingTicket)
router.get('/:userId/cancel/:concertId', ControllerTicket.cancel)
router.get('/:userId/change/:ticketId', ControllerTicket.changeTicket)
router.post('/:userId/change/:ticketId', ControllerTicket.saveChangedTicket)

module.exports = router