const { Concert, Ticket, User, Profile } = require('../models')

class ControllerConcert {
    static showConcerts(req, res) {
        const userId = req.session.userId
        const notif = req.query.notif
        let result = []
        Concert.findAll()
            .then(data => {
                result.push(data)
                return User.findOne({
                    where: {
                        id: userId
                    },
                    include: [Ticket]
                })
            })
            .then(data => {
                result.push(data)
                res.render('concerts/showConcerts', {
                    result,
                    notif
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static concertEditForm(req, res) {
        const { concertId } = req.params
        const error = req.query.errors
        Concert.findByPk(concertId)
            .then(concert => {
                res.render('concerts/concertEditForm', { concert, error })
            })
            .catch(error => {
                res.send(error)
            })
    }

    static concertEdit(req, res) {
        const { concertId } = req.params
        const { guestStar, totalAudience, location, performanceDate } = req.body
        Concert.update({ guestStar, totalAudience, location, performanceDate }, {
            where: {
                id: concertId
            }
        })
            .then(() => {
                res.redirect(`/concerts`)
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    error = error.errors.map(el => el.message)
                }
                res.redirect(`/concerts/edit/${concertId}?errors=${error}`)
            })
    }

    static concertForm(req, res) {
        const errors = req.query.errors
        res.render('concerts/concertAddForm', { errors })
    }

    static addNewGS(req, res) {

        const { guestStar, totalAudience, location, performanceDate } = req.body
        Concert.create({ guestStar, totalAudience, location, performanceDate })
            .then(() => {
                res.redirect('/concerts')
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    error = error.errors.map(el => el.message)
                }
                res.redirect(`/concerts/add?errors=${error}`)
            })
    }

    static deleteConcert(req, res) {
        const { concertId } = req.params
        Concert.destroy({
            where: {
                id: concertId
            }
        })
            .then(() => {
                res.redirect(`/concerts`)
            })
            .catch(error => {
                res.send(error)
            })
    }

}


module.exports = ControllerConcert