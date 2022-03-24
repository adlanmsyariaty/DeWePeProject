const { Concert, Ticket, User, Profile } = require('../models')

class ControllerConcert {
    static showConcerts(req, res) {
        const userId = +req.params.userId
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
}

module.exports = ControllerConcert