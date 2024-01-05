const { Orders } = require('../models');

const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      room_id,
      check_in_date,
      check_out_date,
      guests,
      booking_code,
      price,
      total_invoice,
      payment_proof,
      payment_status,
      payment_date,
      booking_status,
      cancel_reason,
      reject_reason,
    } = req.body;

    const order = await Orders.create({
      user_id,
      room_id,
      check_in_date,
      check_out_date,
      guests,
      booking_code,
      price,
      total_invoice,
      payment_proof,
      payment_status,
      payment_date,
      booking_status,
      cancel_reason,
      reject_reason,
    });

    if (!res.headersSent) {
      res.status(201).json({
        status: 'success',
        data: {
          order,
        },
      });
    }
  } catch (error) {
    console.error('Error creating order:', error);

    if (!res.headersSent) {
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while creating an order',
      });
    }
  }
};

module.exports = { createOrder };
