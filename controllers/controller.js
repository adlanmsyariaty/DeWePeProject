const { Concert, Ticket, User, Profile } = require('../models')

class Controller {
    static home(req, res) {
        const userId = req.session.userId
        res.render('home', {
            userId
        })
    }
}

module.exports = Controller