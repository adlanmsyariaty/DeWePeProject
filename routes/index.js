const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const userRouter = require('./user')
const profileRouter = require('./profle')
const concertRouter = require('./concert')
const ticketRouter = require('./ticket')

router.get('/', Controller.home)
router.use('/users', userRouter)
router.use('/profiles', profileRouter)
router.use('/concerts', concertRouter)
router.use('/tickets', ticketRouter)

module.exports = router