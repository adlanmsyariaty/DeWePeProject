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
    dateFormatter() {
      return `${(this.performanceDate).toLocaleDateString('en-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    }
    dateFormatterEditForm() {
      return `${this.performanceDate.toISOString().substring(0, 10)}`
    }
    static countConcert() {
      return Concert.sum('totalAudience')
    }
  }
  Concert.init({
    guestStar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Insert Guest Star Name'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    },
    performanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Select performance date'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    },
    totalAudience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Insert maximum total audience'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Insert performance location'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }

    }
  }, {
    sequelize,
    modelName: 'Concert',
  });
  return Concert;
};