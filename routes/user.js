const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/controllerUser')

router.get('/register', ControllerUser.registerForm)
router.post('/register', ControllerUser.register)
router.get('/login', ControllerUser.loginForm)
router.post('/login', ControllerUser.login)
router.get('/logout', ControllerUser.logout)

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = 'Please login first'
        res.redirect(`/users/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/detail', ControllerUser.customerDetail)
router.get('/edit', ControllerUser.customerEditForm)
router.post('/:customerId/edit', ControllerUser.customerEdit)
router.get('/logout', ControllerUser.logout)
router.get('/delete', ControllerUser.deleteAccount)

module.exports = router