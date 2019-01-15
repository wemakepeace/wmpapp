'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('age_groups', [
        {
            name: '8-10 years',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: '11-13 years',
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
