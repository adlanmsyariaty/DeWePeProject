function generateUserCode(instance) {
    return `${instance.seatNumber}_${instance.type}_USER_ID_${instance.UserId}_CONCERT_ID_${instance.ConcertId}`
}

module.exports = generateUserCode