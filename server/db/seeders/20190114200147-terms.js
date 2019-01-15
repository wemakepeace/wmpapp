'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('terms', [
        {
          name: 'Spring 2019',
          expires: new Date('May 15, 2019'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('terms', null, {});
  }
};
