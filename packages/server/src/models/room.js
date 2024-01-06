'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Orders, {
        foreignKey: 'room_id',
      });
      Room.belongsTo(models.Properties, { foreignKey: 'property_id' });
    }
  }
  Room.init(
    {
      property_id: DataTypes.INTEGER,
      room_information: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      available: DataTypes.BOOLEAN,
      type_room: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
  return Room;
};
