'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tenant_id = '5a7ff583-b3a5-4236-84fa-e79879a33c81'; // Tenant ID yang diberikan

    // Menambahkan data Property ke dalam tabel
    await queryInterface.bulkInsert(
      'Properties',
      [
        {
          tenant_id: tenant_id,
          category_id: 2, // Ganti dengan ID kategori yang sesuai
          name: 'Nama Properti Anda',
          address: 'Alamat Properti Anda',
          pictures: 'gambar1.jpg,gambar2.jpg', // Daftar gambar pisahkan dengan koma
          description: 'Deskripsi Properti Anda',
          avg_rating: 0.0, // Rating awal, misalnya 0.0
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
    await queryInterface.bulkDelete('Properties', null, {});
  },
};
