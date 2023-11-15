'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCancellation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderCancellation.init(
    {
      order_id: DataTypes.INTEGER,
      cancellation_reason: DataTypes.STRING,
      cancellation_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order_Cancellation',
    },
  );
  return OrderCancellation;
};
