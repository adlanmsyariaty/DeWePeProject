'use strict';

module.exports = {
  up(queryInterface, Sequelize) {

    return queryInterface.addColumn('Tickets', 'ConcertId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Concerts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
  },

  down(queryInterface, Sequelize) {

    return queryInterface.removeColumn('Tickets', 'ConcertId', {});
  }
};
