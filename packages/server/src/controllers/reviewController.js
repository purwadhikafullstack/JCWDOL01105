const { Orders, Reviews, Room } = require('../models');

const createAndUpdate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { order_id, rating, comment } = req.body;

    const order = await Orders.findOne({
      where: { id: order_id, user_id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    let existingReview = await Reviews.findOne({
      where: { order_id, user_id },
    });
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
      return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
      });
    } else {
      await Reviews.create({
        order_id,
        user_id,
        rating,
        comment,
      });
      return res.status(200).json({
        success: true,
        message: 'Review created successfully',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: error.message,
    });
  }
};

const getAverageRatingRoom = async (req, res) => {
  try {
    const { room_id } = req.params;

    const avgRatingRoom = await Reviews.findOne({
      attributes: [
        [
          Reviews.sequelize.fn('AVG', Reviews.sequelize.col('rating')),
          'averageRating',
        ],
      ],
      where: { '$Order.room_id$': room_id },
      include: [
        {
          model: Orders,
          attributes: [], // Tidak perlu mengambil atribut Order karena hanya ingin melakukan agregasi
        },
      ],
      raw: true,
      group: ['Order.room_id'], // Mengelompokkan berdasarkan room_id
    });

    const averageRatingRoom = avgRatingRoom
      ? parseFloat(avgRatingRoom.averageRating)
      : 0;

    return res.status(200).json({
      success: true,
      data: averageRatingRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get average rating room',
      error: error.message,
    });
  }
};

const getAverageRatingProperty = async (req, res) => {
  try {
    const { property_id } = req.params;

    const avgRatingPerProperty = await Review.findOne({
      attributes: [
        [
          Review.sequelize.fn('AVG', Review.sequelize.col('rating')),
          'avgRating',
        ],
      ],
      include: [
        {
          model: Order,
          include: {
            model: Room,
            where: { property_id },
          },
        },
      ],
      raw: true,
    });

    const averageRatingPerProperty = avgRatingPerProperty
      ? parseFloat(avgRatingPerProperty.avgRating)
      : 0;

    return res.status(200).json({ averageRatingPerProperty });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAndUpdate,
  getAverageRatingRoom,
  getAverageRatingProperty,
};
