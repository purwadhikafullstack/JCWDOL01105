'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpecialPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpecialPrice.init({
    room_id: DataTypes.UUID,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SpecialPrice',
  });
  return SpecialPrice;
};