const express = require('express')
const router = express.Router()
const ControllerTicket = require('../controllers/controllerTicket')

// to => /tickets
router.get('/booking/:concertId', ControllerTicket.bookingTicket)
router.post('/booking/:concertId', ControllerTicket.saveBookingTicket)
router.get('/cancel/:concertId', ControllerTicket.cancel)
router.get('/change/:ticketId', ControllerTicket.changeTicket)
router.post('/change/:ticketId', ControllerTicket.saveChangedTicket)

module.exports = router