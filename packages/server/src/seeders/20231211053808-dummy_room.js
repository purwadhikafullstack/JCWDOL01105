'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Menambahkan data kamar ke dalam tabel
    await queryInterface.bulkInsert(
      'Rooms',
      [
        {
          property_id: 1, // Ganti dengan ID properti yang sesuai
          room_information: 'Informasi Kamar 1',
          price: 100.0,
          available: true,
          type_room: 'Single', // Ganti dengan tipe kamar yang sesuai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          property_id: 2, // Ganti dengan ID properti yang sesuai
          room_information: 'Informasi Kamar 2',
          price: 150.0,
          available: false,
          type_room: 'Double', // Ganti dengan tipe kamar yang sesuai
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
    await queryInterface.bulkDelete('Rooms', null, {});
  },
};
