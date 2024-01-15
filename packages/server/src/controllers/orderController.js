const { Orders, User } = require('../models');

const createOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
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

    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({
      status: 'error',
      message: 'An error to make an order',
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json({
      status: 'success get orders',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error while fetching orders',
    });
  }
};

const confirmPayment = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({ payment_status: 'ACCEPTED', booking_status: 'DONE' });

    res.status(200).json({ message: 'Payment confirmed successfully' });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const rejectPayment = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({
      payment_status: 'DECLINED',
      booking_status: 'CANCELED',
    });

    res.status(200).json({ message: 'Payment rejected' });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({
      payment_status: 'DECLINED',
      booking_status: 'CANCELED',
    });
    res.status(200).json({ message: 'Order Canceled' });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  confirmPayment,
  rejectPayment,
  cancelOrder,
};
