'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tenant, {
        foreignKey: 'tenant_id',
        as: 'tenant',
      });
      this.hasMany(models.Room, {
        foreignKey: 'property_id',
        as: 'rooms',
      });
      this.hasMany(models.property_picture, {
        foreignKey: 'property_id',
        as: 'propertyPictures',
      });
    }
  }
  Property.init(
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
      modelName: 'Property',
    },
  );
  return Property;
};
