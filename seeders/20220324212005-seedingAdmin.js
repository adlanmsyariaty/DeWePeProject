'use strict';
const bcryptjs = require('bcryptjs')
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [{
      email: 'admin@gmail.com',
      password: bcryptjs.hashSync('herokupp', 10),
      role: 'admin',
      fullName: 'admin',
      gender: 'male',
      age: 53,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    return queryInterface.bulkInsert('Users', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
