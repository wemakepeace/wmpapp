'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('terms', { name: 'Fall 2019' })
      .then(x => {
        queryInterface.bulkInsert('terms', [{ name: 'Spring 2019', createdAt: new Date(), updatedAt: new Date() }])
      })
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
