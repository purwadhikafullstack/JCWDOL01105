'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Properties.belongsTo(models.Tenants, { foreignKey: 'tenant_id' });
      Properties.hasMany(models.Room, {
        foreignKey: 'property_id',
        as: 'rooms',
      });
      Properties.hasMany(models.property_picture, {
        foreignKey: 'property_id',
        as: 'propertyPictures',
      });
    }
  }
  Properties.init(
    {
      tenant_id: DataTypes.UUID,
      categories: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      sell: DataTypes.BOOLEAN,
      rent: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      avg_rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Properties',
    },
  );
  return Properties;
};
