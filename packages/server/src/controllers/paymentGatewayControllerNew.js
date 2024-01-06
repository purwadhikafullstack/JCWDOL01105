const { Orders, Room, User, Properties } = require('../models');
const midtransaction = require('midtrans-client');

const snap = new midtransaction.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  originUrl: process.env.CLIENT_URL,
  MIDTRANS_APP_URL: process.env.MIDTRANS_APP_URL,
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
      callbacks: {
        finish: `${originUrl}/booking_status?order_id=${order_id}`,
        error: `${originUrl}/booking_status?order_id=${order_id}`,
        cancel: `${originUrl}/booking_status?order_id=${order_id}`,
        pending: `${originUrl}/booking_status?order_id=${order_id}`,
      },
    };

    console.log(transactionDetails);

    const transaction = await snap.createTransaction(transactionDetails);
    const snapToken = transaction.token;

    const data = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + MIDTRANS_SERVER_KEY,
      },
      body: JSON.stringify(transactionDetails),
    });

    const dataJson = await data.json();

    if (response.status != 200) {
      return res.status(500).json({
        success: false,
        message: 'Payment gateway failed',
        error: response.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment gateway success',
      data: dataJson,
    });
  } catch (error) {
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
