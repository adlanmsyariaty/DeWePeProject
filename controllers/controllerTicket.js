const { Concert, Ticket, User, Profile } = require('../models')
const { Op } = require('sequelize')
class ControllerTicket {
    static bookingTicket(req, res) {
        const userId = +req.params.userId
        const concertId = +req.params.concertId
        const errors = req.query.errors
        Concert.findByPk(concertId)
            .then(result => {
                res.render('tickets/bookingTicketForm', {
                    result,
                    userId,
                    errors
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static saveBookingTicket(req, res) {
        const {seatNumber, type} = req.body
        const concertId = +req.params.concertId
        const userId = +req.params.userId
        Ticket.create({
            seatNumber,
            type,
            UserId: userId,
            ConcertId: concertId
        })
            .then(() => {
                res.redirect(`/concerts/${userId}?notif=success`)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message)
                }
                res.redirect(`/tickets/${userId}/booking/${concertId}?errors=${err}`)
            })
    }
    static cancel(req, res) {
        const userId = +req.params.userId
        const concertId = +req.params.concertId
        Ticket.destroy({
            where: {
                [Op.and] : [
                    {UserId: userId},
                    {ConcertId: concertId}
                ]
            }
        })
            .then(() => {
                res.redirect(`/concerts/${userId}?notif=cancel`)
            })
            .catch(err => {
                res.send(err)
            })
    }
    static changeTicket(req, res) {
        const userId = +req.params.userId
        const errors = req.query.errors
        let result = []
        Ticket.findOne({
            where: {
                UserId: userId
            },
            include: [User, Concert]
        })
            .then(data => {
                result.push(data)
                return Concert.findAll()
            })
            .then(data => {
                result.push(data)
                res.render('tickets/changeTicket', {
                    result,
                    errors
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static saveChangedTicket(req, res) {
        const {userId, ticketId} = req.params
        const {concertId, seatNumber, type} = req.body
        console.log(req.body)
        console.log(req.params)
        Ticket.update({
            seatNumber,
            type,
            UserId: userId,
            ConcertId: concertId
        }, {
            where: {
                id: ticketId
            }
        })
            .then(() => {
                res.redirect(`/concerts/${userId}?notif=update`)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message)
                }
                res.redirect(`/tickets/${userId}/change?errors=${err}`)
            })
    }
}

module.exports = ControllerTicket