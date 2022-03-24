'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Concert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Concert.hasMany(models.Ticket)
    }
  }
  Concert.init({
    guestStar: DataTypes.STRING,
    performanceDate: DataTypes.DATE,
    totalAudience: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Concert',
  });
  return Concert;
};