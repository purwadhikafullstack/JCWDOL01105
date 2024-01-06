'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user_id = 'affc26c3-0752-4b0e-9d9d-40577e57234a';
    // Menambahkan data order ke dalam tabel
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          user_id: user_id, // Ganti dengan ID user yang sesuai
          room_id: 1, // Ganti dengan ID room yang sesuai
          check_in_date: '2023-12-01',
          check_out_date: '2023-12-05',
          booking_code: 'BOOK1234', // Ganti dengan kode booking yang sesuai
          price: 1000,
          total_invoice: 1000,
          payment_proof: 'payment_proof.jpg', // Ganti dengan nama file bukti pembayaran
          payment_status: 'ACCEPTED',
          payment_date: new Date(),
          booking_status: 'DONE',
          cancel_reason: null,
          reject_reason: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: user_id, // Ganti dengan ID user yang sesuai
          room_id: 2, // Ganti dengan ID room yang sesuai
          check_in_date: '2023-12-10',
          check_out_date: '2023-12-15',
          booking_code: 'BOOK5678', // Ganti dengan kode booking yang sesuai
          price: 1500,
          total_invoice: 1500,
          payment_proof: 'payment_proof_2.jpg', // Ganti dengan nama file bukti pembayaran
          payment_status: 'ACCEPTED',
          payment_date: new Date(),
          booking_status: 'DONE',
          cancel_reason: null,
          reject_reason: null,
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
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
