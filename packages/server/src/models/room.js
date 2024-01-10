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
      this.belongsTo(models.Properties, {
        foreignKey: 'property_id',
        as: 'property',
      });
    }
  }
  Room.init(
    {
      property_id: DataTypes.INTEGER,
      room_information: DataTypes.TEXT,
      regularPrice: DataTypes.FLOAT,
      specialPrice: DataTypes.FLOAT,
      bedrooms: DataTypes.INTEGER,
      bathrooms: DataTypes.INTEGER,
      available: DataTypes.DATE,
      furnished: DataTypes.STRING,
      type_room: DataTypes.STRING,
      guests: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
  return Room;
};
