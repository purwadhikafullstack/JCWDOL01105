'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Tenants', 'is_verified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });

    await queryInterface.addColumn('Tenants', 'verification_code', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Tenants', 'verification_expires', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Tenants', 'verification_attempts', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
    await queryInterface.addColumn('Tenants', 'reset_password_token', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Tenants', 'reset_password_expires', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Tenants', 'new_password', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [6],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Tenants', 'is_verified');
    await queryInterface.removeColumn('Tenants', 'verification_code');
    await queryInterface.removeColumn('Tenants', 'verification_expires');
    await queryInterface.removeColumn('Tenants', 'verification_attempts');
    await queryInterface.removeColumn('Tenants', 'reset_password_token');
    await queryInterface.removeColumn('Tenants', 'reset_password_expires');
    await queryInterface.removeColumn('Tenants', 'new_password');
  },
};
