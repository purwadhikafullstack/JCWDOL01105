const { Properties, Room, Orders, sequelize } = require('../models');

const getSalesReport = async (req, res) => {
  try {
    const { propertyId, sortBy } = req.query;

    const salesReport = await Properties.findAll({
      attributes: [
        'id',
        'name',
        [
          sequelize.fn('SUM', sequelize.col('Rooms.Orders.price')),
          'total_sales',
        ],
      ],
      include: [
        {
          model: Room,
          attributes: [],
          include: [
            {
              model: Orders,
              attributes: [],
              where: {
                booking_status: 'DONE',
              },
            },
          ],
        },
      ],
      where: {
        id: propertyId,
      },
      group: ['Properties.id'],
      order:
        sortBy === 'total_sales' ? sequelize.literal('total_sales DESC') : [],
    });

    res.status(200).json({ success: true, data: salesReport });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch sales report' });
  }
};

module.exports = { getSalesReport };
