const { Concert, Ticket, User, Profile } = require('../models')
const bcrypt = require('bcryptjs')
class ControllerUser {
    static registerForm(req, res) {
        const userId = req.session.userId
        res.render('users/registerForm', {userId})
    }

    static register(req, res) {

        const { fullName, age, gender, email, password } = req.body
        User.create({
            fullName, age, gender, email, password
        })
            .then(() => {
                // console.log('add customer');
                res.redirect('/users/login')
            })
            .catch(error => {
                res.send(error)
            })
    }

    static loginForm(req, res) {
        const error = req.query.error
        const userId = req.session.userId
        console.log(error)
        res.render('users/loginForm', { error, userId })
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
                        // console.log(user, '<<<<<')
                        // console.log(req.session, '>>>>>>>>');

                        return res.render(`home`, { user, userId })
                    } else {
                        const err = 'Invalid email or password'
                        console.log('gagal login invalid pass or email')
                        return res.redirect(`/users/login?error=${err}`)
                    }
                } else {
                    const err = 'user not found , please register first'
                    console.log('gagal login user tidak ada')
                    return res.redirect(`/users/login?error=${err}`)
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
        User.findByPk(id)
            .then(user => {
                console.log(user);
                res.render('users/editForm', { user })
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
                res.send(error)
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