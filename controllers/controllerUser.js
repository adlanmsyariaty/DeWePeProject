const { Concert, Ticket, User, Profile } = require('../models')
const bcrypt = require('bcryptjs')
class ControllerUser {
    static registerForm(req, res) {
        const userId = req.session.userId
        const errors = req.query.errors
        res.render('users/registerForm', { errors, userId })
    }

    static register(req, res) {

        const { fullName, age, gender, email, password } = req.body
        User.create({
            fullName, age, gender, email, password
        })
            .then(() => {
                res.redirect('/users/login')
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    error = error.errors.map(el => el.message)
                }
                res.redirect(`/users/register?errors=${error}`)
            })
    }

    static loginForm(req, res) {
        const errors = req.query.errors
        const userId = req.session.userId

        res.render('users/loginForm', { errors, userId })
    }

    static login(req, res) {

        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (user) {
                    const validPassword = bcrypt.compareSync(password, user.password)

                    if (validPassword) {

                        req.session.userId = user.id
                        const userId = req.session.userId
                        console.log('berhasil login')
                        return res.render(`home`, { user, userId })
                    } else {
                        const error = 'Invalid email or password'
                        console.log('gagal login invalid pass or email')
                        return res.redirect(`/users/login?errors=${error}`)
                    }
                } else {
                    const error = 'user not found , please register first'
                    console.log('gagal login user tidak ada')
                    return res.redirect(`/users/login?errors=${error}`)
                }
            })
            .catch(error => { res.send(error) })
    }

    static customerDetail(req, res) {
        const id = req.session.userId
        User.findByPk(id)
            .then(user => {
                res.render('users/usersDetail', { user, userId: id })
            })
            .catch(error => {
                res.send(error)
            })
    }

    static customerEditForm(req, res) {
        const id = req.session.userId
        const error = req.query.errors
        User.findByPk(id)
            .then(user => {
                console.log(user);
                res.render('users/editForm', { user, error })
            })
            .catch(error => {
                res.send(error)
            })
    }

    static customerEdit(req, res) {

        const { customerId } = req.params
        const { fullName, age, gender, email } = req.body
        User.update({ fullName, age, gender, email }, {
            where: {
                id: customerId
            }
        })
            .then(() => {
                res.redirect('/users/detail')
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    error = error.errors.map(el => el.message)
                }
                res.redirect(`/users/edit?errors=${error}`)
            })
    }

    static deleteAccount(req, res) {
        const id = req.session.userId
        User.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                req.session.destroy()
                res.redirect('/')
            })
            .catch(error => {
                res.send(error)
            })
    }

    static logout(req, res) {

        req.session.destroy()
        res.redirect('/')
    }

}

module.exports = ControllerUser