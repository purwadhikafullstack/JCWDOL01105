'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Confirmation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Confirmation.init(
    {
      order_id: DataTypes.INTEGER,
      confirmation_status: DataTypes.STRING,
      confirmation_time: DataTypes.DATE,
      tenant_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order_Confirmation',
    },
  );
  return Confirmation;
};
