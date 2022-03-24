'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Ticket)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Insert your active email'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        },
        isEmail: {
          args: true,
          msg: 'Please insert corect for format email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Insert your password'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    },
    role: DataTypes.STRING,
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Insert your fullname'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Insert your curent age'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Select your gender'
        },
        notNull: {
          args: true,
          msg: "Can't allow null"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (User) => {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(User.password, salt);
        User.password = hash
        User.role = 'customer'

      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};