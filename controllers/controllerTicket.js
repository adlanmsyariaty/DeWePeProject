const { Concert, Ticket, User, Profile } = require('../models')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')

class ControllerTicket {
    static bookingTicket(req, res) {
        const userId = req.session.userId
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
        const { seatNumber, type } = req.body
        const concertId = +req.params.concertId
        const userId = req.session.userId
        Ticket.create({
            seatNumber,
            type,
            UserId: userId,
            ConcertId: concertId
        })
            .then((result) => {
                // send ticket
                const testEmail = `ichbindimas@gmail.com`
                let transporter = nodemailer.createTransport({
                    service: "hotmail",
                    auth: {
                        user: "team15pp22@outlook.co.id",
                        pass: "DimKur123"
                    }
                });

                let mailOptions = {
                    from: 'team15pp22@outlook.co.id',
                    to: testEmail,
                    subject: 'Test masuk nodemailer',
                    text: `Akun anda adalah: test masuk, password: Tolong jangan bagikan ke orang lain.`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.log(err);
                });

                console.log('success send email from nodemailer')

                res.redirect(`/concerts?notif=success`)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message)
                }
                res.redirect(`/tickets/booking/${concertId}?errors=${err}`)
            })
    }
    static cancel(req, res) {
        const userId = req.session.userId
        const concertId = +req.params.concertId
        Ticket.destroy({
            where: {
                [Op.and]: [
                    { UserId: userId },
                    { ConcertId: concertId }
                ]
            }
        })
            .then(() => {
                res.redirect(`/concerts?notif=cancel`)
            })
            .catch(err => {
                res.send(err)
            })
    }
    static changeTicket(req, res) {
        const userId = +req.session.userId
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
        const userId = +req.session.userId
        const { ticketId } = req.params
        const { concertId, seatNumber, type } = req.body
        Ticket.update({
            seatNumber,
            type,
            UserId: userId,
            ConcertId: concertId
        }, {
            where: {
                id: ticketId
            },
            individualHooks: true
        })
            .then(() => {
                res.redirect(`/concerts/?notif=update`)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message)
                }
                res.redirect(`/tickets/change/${ticketId}?errors=${err}`)
            })
    }
}

module.exports = ControllerTicket