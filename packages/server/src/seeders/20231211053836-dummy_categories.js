'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Menambahkan data kategori ke dalam tabel
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Nama Kategori 1',
          description: 'Deskripsi Kategori 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nama Kategori 2',
          description: 'Deskripsi Kategori 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Tambahkan entri lain jika diperlukan
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data yang telah dimasukkan sebelumnya
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
