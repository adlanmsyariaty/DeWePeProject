'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Concert)
      Ticket.belongsTo(models.User)
    }
  }
  Ticket.init({
    seatNumber: DataTypes.STRING,
    type: DataTypes.STRING,
    code: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ConcertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};