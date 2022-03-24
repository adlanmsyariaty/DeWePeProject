'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Concerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guestStar: {
        type: Sequelize.STRING
      },
      performanceDate: {
        type: Sequelize.DATE
      },
      totalAudience: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Concerts');
  }
};