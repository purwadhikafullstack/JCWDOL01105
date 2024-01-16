const { Op } = require('sequelize');
const { Orders, Room, Properties, User, User_Profile } = require('../models');

const OrdersController = {
  async getOrdersByTenantId(req, res) {
    try {
      const tenantId = req.user.id;

      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ message: 'User not authenticated or missing ID.' });
      }

      const {
        propertyId,
        status,
        user,
        page = 1,
        limit = 10,
        check_in,
      } = req.query;

      let whereClause = {
        '$rooms.property.tenant_id$': tenantId,
        '$rooms->property.tenant_id$': tenantId,
      };

      if (propertyId) {
        whereClause['$rooms.property_id$'] = propertyId;
      }

      if (status) {
        whereClause.payment_status = status;
      }

      if (check_in) {
        whereClause.check_in_date = check_in;
      }

      let includeClause = [
        {
          model: Room,
          as: 'rooms',
          include: [
            {
              model: Properties,
              as: 'property',
              where: { tenant_id: tenantId },
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: User_Profile,
              attributes: ['profile_picture'],
            },
          ],
        },
      ];

      if (user) {
        includeClause[1].where = {
          name: user,
        };
      }

      const orders = await Orders.findAll({
        where: {
          [Op.and]: [
            whereClause,
            { payment_status: { [Op.not]: null } }, // payment_status tidak boleh null
          ],
        },
        include: includeClause,
        attributes: [
          'id',
          'user_id',
          'room_id',
          'check_in_date',
          'check_out_date',
          'guests',
          'booking_code',
          'price',
          'total_invoice',
          'payment_proof',
          'payment_status',
          'payment_date',
          'booking_status',
          'cancel_reason',
          'reject_reason',
          'createdAt',
          'updatedAt',
        ],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
      });

      let totalData = 0;
      if (orders.length > 0) {
        totalData = orders.reduce((total, order) => {
          if (order.payment_status === 'ACCEPTED') {
            return total + order.total_invoice;
          }
          return total;
        }, 0);
      }

      return res.status(200).json({
        orders,
        totalInvoiceAccepted: totalData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || 'Terjadi kesalahan saat mengambil data.',
      });
    }
  },
};

const getProperty = async (req, res) => {
  try {
    const tenantId = req.user.id;

    const properties = await Properties.findAll({
      where: { tenant_id: tenantId },
      attributes: ['id', 'name'],
    });

    return res.status(200).json({ properties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || 'Terjadi kesalahan saat mengambil data.',
    });
  }
};

const getUserByTenantId = async (req, res) => {
  try {
    const tenantId = req.user.id;

    const users = await Orders.findAll({
      attributes: ['user_id'],
      include: [
        {
          model: Room,
          as: 'rooms',
          attributes: ['property_id'],
          include: [
            {
              model: Properties,
              as: 'property',
              attributes: ['name'],
              where: { tenant_id: tenantId },
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: User_Profile,
              attributes: ['profile_picture'],
            },
          ],
        },
      ],
    });

    const userIds = users.map((user) => user.user_id);

    const userName = await User.findAll({
      attributes: ['id', 'name'],
      where: {
        id: { [Op.in]: userIds },
      },
    });

    return res.status(200).json({ userName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || 'Terjadi kesalahan saat mengambil data.',
    });
  }
};

module.exports = {
  getOrdersByTenantId: OrdersController.getOrdersByTenantId,
  getProperty: getProperty,
  getUserByTenantId: getUserByTenantId,
};
