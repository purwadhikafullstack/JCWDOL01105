'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'confirm_password', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'phone_number', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'confirm_password');
    await queryInterface.removeColumn('Users', 'phone_number');
  },
};
