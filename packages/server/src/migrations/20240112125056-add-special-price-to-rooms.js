'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('rooms', 'specialPrice', {
      type: Sequelize.FLOAT, // Sesuaikan tipe data dengan kebutuhan Anda
      allowNull: true, // Sesuaikan sesuai kebutuhan
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('rooms', 'specialPrice');
  },
};
