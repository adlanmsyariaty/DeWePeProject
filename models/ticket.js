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
    seatNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Seat number is required'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Ticket type is required'
        }
      }
    },
    code: {
      type:DataTypes.STRING,
      unique: true,
    },
    UserId: DataTypes.INTEGER,
    ConcertId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance) {
        instance.code = `${instance.seatNumber}_${instance.type}`
      },
      beforeUpdate(instance) {
        instance.code = `${instance.seatNumber}_${instance.type}`
      },
    },
    modelName: 'Ticket',
  });
  return Ticket;
};