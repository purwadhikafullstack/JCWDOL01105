'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      // define association here
      this.belongsTo(models.Room, { foreignKey: 'room_id' });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Reviews, { foreignKey: 'order_id' });
    }
  }
  Orders.init(
    {
      user_id: DataTypes.UUID,
      room_id: DataTypes.INTEGER,
      check_in_date: DataTypes.DATEONLY,
      check_out_date: DataTypes.DATEONLY,
      guests: DataTypes.INTEGER,
      booking_code: DataTypes.STRING,
      price: DataTypes.INTEGER,
      total_invoice: DataTypes.INTEGER,
      payment_proof: DataTypes.STRING,
      payment_status: DataTypes.ENUM('ACCEPTED', 'DECLINED'),
      payment_date: DataTypes.DATE,
      booking_status: DataTypes.ENUM(
        'WAITING_FOR_PAYMENT',
        'PROCESSING_PAYMENT',
        'DONE',
        'CANCELED',
        'IN PROGRESS',
      ),
      cancel_reason: {
        type: DataTypes.STRING,
      },
      reject_reason: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Orders',
    },
  );
  return Orders;
};
