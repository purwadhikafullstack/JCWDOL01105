const { Orders, Room, User, Properties } = require('../models');
const midtransaction = require('midtrans-client');

const snap = new midtransaction.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const paymentGateway = async (req, res) => {
  try {
    const transactionDetails = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total,
      },
      customer_details: {
        name: req.body.name,
      },
    };

    console.log(transactionDetails);

    const transaction = await snap.createTransaction(transactionDetails);
    const snapToken = transaction.token;

    res.status(200).json({
      success: true,
      message: 'Payment gateway success',
      data: snapToken,
    });
  } catch (error) {
    console.error('Error in paymentGateway:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment gateway failed',
      error: error.message,
    });
  }
};

const updateStatusPayment = async (order_id, res) => {
  try {
    const updateResult = await Orders.update(
      {
        payment_status: 'ACCEPTED',
        booking_status: 'DONE',
      },
      {
        where: {
          id: order_id,
        },
      },
    );
    return updateResult;
  } catch (error) {
    console.error('Error in updateStatusPayment:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment gateway failed',
      error: error.message,
    });
  }
};

const trxNotif = async (req, res) => {
  try {
    const data = req.body;

    // Cari transaksi berdasarkan ID yang diterima dari notifikasi
    const transaction = await Orders.findOne({ where: { id: data.order_id } });

    if (transaction) {
      const result = await updateStatusPayment(transaction.id, data);
      console.log('Result:', result);

      res.status(200).json({
        status: 'success',
        message: 'OK',
      });
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Transaksi tidak ditemukan',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan dalam memproses notifikasi',
    });
  }
};

module.exports = {
  paymentGateway,
  trxNotif,
};
