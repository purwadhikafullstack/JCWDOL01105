'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Orders, { foreignKey: 'order_id' });
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Review.init(
    {
      user_id: DataTypes.UUID,
      order_id: DataTypes.UUID,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Reviews',
    },
  );
  return Review;
};
