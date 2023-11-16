'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    order_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    payment_proof: DataTypes.STRING,
    payment_due_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};