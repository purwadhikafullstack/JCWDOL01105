'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Rooms', 'startDate', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.addColumn('Rooms', 'endDate', {
      type: Sequelize.DATEONLY,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Rooms', 'startDate');
    await queryInterface.removeColumn('Rooms', 'endDate');
  },
};
