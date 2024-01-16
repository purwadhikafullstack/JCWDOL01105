const { Orders, Room, User, Properties } = require('../models');
const midtransaction = require('midtrans-client');

const snap = new midtransaction.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const paymentGateway = async (req, res) => {
  try {
    const { order_id, total, name } = req.body;

    const transactionDetails = {
      transaction_details: {
        order_id: order_id, // Gunakan order_id dari request body
        gross_amount: total,
      },
      customer_details: {
        name: name, // Gunakan name dari request body
      },
      finish_redirect_url: 'https://your-app.com/payment/complete',
    };

    const transaction = await snap.createTransaction(transactionDetails);
    const snapToken = transaction.token;

    await Orders.update(
      { booking_status: 'DONE', payment_status: 'ACCEPTED' },
      { where: { id: order_id } },
    );

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

const midtransCallback = async (req, res) => {
  try {
    // Verifikasi tanda tangan dari Midtrans menggunakan x-veritrans-signature header
    const signatureKey = process.env.MIDTRANS_SERVER_KEY;
    const { 'x-veritrans-signature': veritransSignature } = req.headers;

    const notification = snap.verifyNotification(
      req.rawBody,
      veritransSignature,
    );

    // Proses notifikasi dan lakukan pembaruan pada basis data Anda
    const orderId = notification.transaction_order_id;
    const paymentStatus = notification.transaction_status;

    if (paymentStatus === 'capture') {
      // Pembayaran berhasil
      // Lakukan pembaruan pada basis data (misalnya, mengubah status pesanan menjadi selesai)
      // ...
    } else if (paymentStatus === 'settlement') {
      // Pembayaran telah diselesaikan
      // ...
    } else if (
      paymentStatus === 'cancel' ||
      paymentStatus === 'deny' ||
      paymentStatus === 'expire'
    ) {
      // Pembayaran dibatalkan, ditolak, atau kedaluwarsa
      // ...
    }

    // Kirim respons ke Midtrans untuk mengonfirmasi penerimaan notifikasi
    res.status(200).end();
  } catch (error) {
    console.error('Error in midtransCallback:', error);
    return res.status(500).json({
      success: false,
      message: 'Midtrans callback failed',
      error: error.message,
    });
  }
};

module.exports = {
  paymentGateway,
  midtransCallback,
};
