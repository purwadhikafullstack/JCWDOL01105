'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_picture extends Model {
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
  property_picture.init(
    {
      property_id: DataTypes.UUID,
      property_pictures: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'property_picture',
      tableName: 'property_pictures',
    },
  );
  return property_picture;
};
