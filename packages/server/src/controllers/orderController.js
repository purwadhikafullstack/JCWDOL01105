const { Orders, Room, User, Properties, Reviews } = require('../models');

const getOrder = async (req, res) => {
  const userId = req.user.id;
  const { sortBy, page = 1, limit = 5 } = req.query;

  try {
    let whereClause = { user_id: userId };
    let includeClause = [
      {
        model: Room,
        attributes: ['room_information', 'price', 'type_room'],
        include: [
          {
            model: Properties,
            attributes: ['name', 'address'],
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
                  include: [{ model: Properties, attributes: [] }],
                },
                Properties,
                'name',
                'ASC',
              ],
            ];
            break;
          case 'reverseAlphabet':
            orderArray = [
              [
                {
                  model: Room,
                  include: [{ model: Properties, attributes: [] }],
                },
                Properties,
                'name',
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

    const totalCount = await Orders.count({ where: whereClause });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tidak ada pesanan ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
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
    console.log('id usr', id);
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

const confirmPayment = async (req, res) => {
  const { order_id } = req.params;

  try {
    // Ambil order berdasarkan order_id
    const order = await Orders.findOne({ where: { id: order_id } });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    // Ambil room terkait dari pesanan
    const room = await Room.findOne({ where: { id: order.room_id } });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: 'Room not found' });
    }

    // Ambil properti terkait dari room
    const property = await Properties.findOne({
      where: { id: room.property_id },
    });

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: 'Property not found' });
    }

    // Verifikasi apakah tenant adalah pemilik properti yang terkait dengan pesanan
    if (property.tenant_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You are not the property owner.',
      });
    }

    if (order.booking_status !== 'PROCESSING_PAYMENT') {
      return res.status(400).json({
        success: false,
        message: 'Payment cannot be confirmed, because the order not yet paid.',
      });
    }

    // Lakukan konfirmasi pembayaran karena tenant adalah pemilik properti yang valid
    order.booking_status = 'DONE';
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: 'Payment confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to confirm payment.',
      error: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  const { order_id } = req.params;
  const { cancel_reason } = req.body;

  try {
    const order = await Orders.findByPk(order_id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    order.booking_status = 'CANCELED';
    order.cancel_reason = cancel_reason;
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
    });
  } catch (error) {
    console.error('Error canceling order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel order.',
      error: error.message,
    });
  }
};

module.exports = {
  getOrder,
  payment_proof,
  confirmPayment,
  getPaymentProof,
  cancelOrder,
};
