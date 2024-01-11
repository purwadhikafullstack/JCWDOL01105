'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Properties');

    if (!tableInfo['categories']) {
      await queryInterface.addColumn('Properties', 'categories', {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await queryInterface.sequelize.query(
        'UPDATE `Properties` SET `categories` = `category_id`',
      );

      await queryInterface.removeColumn('Properties', 'category_id');
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Properties');

    if (!tableInfo['category_id']) {
      await queryInterface.addColumn('Properties', 'category_id', {
        type: Sequelize.UUID,
        allowNull: true,
      });

      await queryInterface.sequelize.query(
        'UPDATE `Properties` SET `category_id` = `categories`',
      );

      await queryInterface.removeColumn('Properties', 'categories');
    }
  },
};
