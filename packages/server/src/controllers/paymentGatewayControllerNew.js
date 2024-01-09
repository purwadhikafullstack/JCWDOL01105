const { Orders } = require('../models');
const axios = require('axios');
require('dotenv').config();
const midtrans = require('midtrans-client');

const snap = new midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const createPayment = async (req, res) => {
  try {
    const payload = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total,
      },
      customer_details: {
        name: req.body.name,
      },
    };

    const response = await axios.post(
      `${snap.apiBaseUrl}/snap/v1/transactions`,
      payload,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.MIDTRANS_SERVER_KEY + ':',
          ).toString('base64')}`,
        },
      },
    );

    console.log(response.data, 'Midtrans API Response');

    const paymentSuccess = true;
    if (paymentSuccess) {
      const updateResult = await Orders.update(
        {
          payment_status: 'ACCEPTED',
          booking_status: 'DONE',
        },
        {
          where: {
            id: req.body.order_id,
          },
        },
      );

      if (updateResult[0] === 1) {
        res.status(200).json({
          message:
            'Payment successful. Payment status updated to ACCEPTED, Booking status updated to DONE',
        });
      } else {
        res.status(404).json({
          message: 'Order not found or no changes made to the order status',
        });
      }
    } else {
      res.status(400).json({
        message: 'Payment failed. Unable to update status.',
      });
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Failed to initiate payment' });
  }
};

module.exports = { createPayment };
