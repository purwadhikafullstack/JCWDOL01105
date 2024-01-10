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

module.exports = {
  paymentGateway,
};
