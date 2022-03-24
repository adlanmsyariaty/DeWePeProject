const express = require('express')
const router = express.Router()
const ControllerConcert = require('../controllers/controllerConcert')

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = 'Please login first'
        res.redirect(`/users/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/', ControllerConcert.showConcerts)
router.get('/add', ControllerConcert.concertForm)
router.post('/add', ControllerConcert.addNewGS)
router.get('/edit/:concertId', ControllerConcert.concertEditForm)
router.post('/edit/:concertId', ControllerConcert.concertEdit)
router.get('/delete/:concertId', ControllerConcert.deleteConcert)


module.exports = router