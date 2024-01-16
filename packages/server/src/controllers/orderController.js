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

const getOrder = async (req, res) => {
  const userId = req.user.id;
  const { sortBy, page = 1, limit = 10, booking_status } = req.query;

  try {
    let whereClause = { user_id: userId };
    if (booking_status) {
      whereClause = { ...whereClause, booking_status };
    }
    let includeClause = [
      {
        model: Room,
        as: 'rooms',
        attributes: ['room_information', 'type_room'],
        include: [
          {
            model: Properties,
            as: 'properties',
            attributes: ['name', 'address'],
            include: [
              {
                model: property_picture,
                as: 'propertyPictures',
                attributes: ['property_pictures'],
              },
            ],
          },
        ],
      },
      {
        model: User,
        attributes: ['name', 'email'],
      },
      {
        model: Reviews,
        attributes: ['rating', 'comment'],
      },
    ];

    const orders = await Orders.findAll({
      where: whereClause,
      include: includeClause,
      order: (() => {
        let orderArray = [];
        switch (sortBy) {
          case 'highestPrice':
            orderArray = [['price', 'DESC']];
            break;
          case 'lowestPrice':
            orderArray = [['price', 'ASC']];
            break;
          case 'alphabet':
            orderArray = [
              [
                {
                  model: Room,
                  as: 'rooms',
                  attributes: [],
                  include: [
                    {
                      model: Properties,
                      as: 'properties',
                      attributes: ['name'],
                    },
                  ],
                },
                'type_room',
                'ASC',
              ],
            ];
            break;
          case 'reverseAlphabet':
            orderArray = [
              [
                {
                  model: Room,
                  as: 'rooms',
                  attributes: ['type_room'],
                  include: [
                    {
                      model: Properties,
                      as: 'properties',
                      attributes: ['name'],
                    },
                  ],
                },
                'type_room',
                'DESC',
              ],
            ];
            break;

          default:
            orderArray = [];
        }
        return orderArray;
      })(),
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    const currentDate = new Date();
    for (const order of orders) {
      try {
        if (
          order.booking_status === 'WAITING_FOR_PAYMENT' &&
          new Date(order.check_in_date) < currentDate &&
          new Date(order.check_out_date) === currentDate
        ) {
          order.booking_status = 'CANCELED';
          await order.save();
        }
      } catch (error) {
        console.error('Error saving booking status:', error);
      }
    }

    const totalCount = await Orders.count({ where: whereClause });

    res.status(200).json({
      status: 'success get orders',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil pesanan pengguna.',
      error: error.message,
    });
  }
};

const payment_proof = async (req, res) => {
  const { order_id } = req.body;

  try {
    const order = await Orders.findOne({ where: { id: order_id } });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error('id card image is required');
    }
    const fileNewImage = file.filename;
    const basePath = `${req.protocol}://${req.get(
      'host',
    )}/src/public/payment_proof/${fileNewImage}`;

    order.payment_proof = basePath;
    if (order.booking_status === 'PROCESSING_PAYMENT') {
      return res.status(200).json({
        success: true,
        data: order.payment_proof,
        message:
          'Payment is being processed. Please wait for payment confirmation.',
      });
    }

    order.booking_status = 'PROCESSING_PAYMENT';
    await order.save();

    await order.save();
    res.status(200).json({
      success: true,
      data: order.payment_proof && order.booking_status,
      message: 'Payment proof uploaded successfully',
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user orders.',
      error: error.message,
    });
  }
};

const getPaymentProof = async (req, res) => {
  const { order_id } = req.params;
  if (!order_id) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid order ID' });
  }
  try {
    const order = await Orders.findOne({ where: { id: order_id } });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }
    const room = await Room.findOne({ where: { id: order.room_id } });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: 'Room not found' });
    }

    const property = await Properties.findOne({
      where: { id: room.property_id },
    });

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: 'Property not found' });
    }

    if (!property.tenant_id) {
      return res
        .status(404)
        .json({ success: false, message: 'Tenant not found' });
    }
    const id = req.user.id;

    if (property.tenant_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You are not the property owner.',
      });
    }
    return res.status(200).json({
      success: true,
      data: order.payment_proof,
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user orders.',
      error: error.message,
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
  getPaymentProof,
  createOrder,
  getAllOrders,
  confirmPayment,
  rejectPayment,
  cancelOrder,
};
